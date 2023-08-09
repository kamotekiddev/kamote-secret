import bcrypt from "bcrypt";
import getCurrentUser from "@/libs/getCurrentUser";
import prismadb from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface Params {
  secretId: string;
  vaultId: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const user = await getCurrentUser();
    const { secretKey } = await req.json();

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!secretKey)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const correctKey = await bcrypt.compare(secretKey, user.secretKey!);
    if (!correctKey)
      return NextResponse.json(
        { message: "Invalid passphrase" },
        { status: 400 }
      );

    const deletedSecret = await prismadb.secret.delete({
      where: { id: params.secretId, vaultId: params.vaultId },
    });

    return NextResponse.json({
      message: "Secret has been deleted successfully",
      secret: deletedSecret,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, { params }: { params: Params }) {
  try {
    const user = await getCurrentUser();
    const { action, secretKey } = await req.json();
    const { vaultId, secretId } = params;

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!vaultId || !secretId || !action || !secretKey)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const secret = await prismadb.secret.findUnique({
      where: { id: secretId, vaultId },
    });

    if (!secret)
      return NextResponse.json(
        { message: "Secret does not exist" },
        { status: 404 }
      );

    if (!user.secretKey)
      return NextResponse.json(
        { message: "Please setup a encryption key first to proceed." },
        { status: 400 }
      );

    const correctKey = await bcrypt.compare(secretKey, user.secretKey);

    if (!correctKey)
      return NextResponse.json(
        { message: "The inputtuted phrase is incorrect" },
        { status: 400 }
      );

    if (action === "encrypt") {
      const encryptSecret = await prismadb.secret.update({
        where: { id: secretId, vaultId },
        data: { isDecrypted: false },
      });

      return NextResponse.json({
        message: "Secret successfully encrypted",
        secret: encryptSecret,
      });
    }

    const decryptedSecret = await prismadb.secret.update({
      where: { id: secretId, vaultId },
      data: { isDecrypted: true },
    });

    return NextResponse.json({
      message: "Secret successfully encrypted",
      secret: decryptedSecret,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
