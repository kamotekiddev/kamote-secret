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

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
    const { action } = await req.json();
    const { vaultId, secretId } = params;

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!vaultId || !secretId || !action)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const secret = await prismadb.secret.findUnique({
      where: { id: secretId, vaultId },
    });

    if (!secret)
      return NextResponse.json(
        { message: "Secret does not exist" },
        { status: 404 }
      );

    const udpatedSecret = await prismadb.secret.update({
      where: { id: secretId, vaultId },
      data: { isDecrypted: action === "encrypt" ? false : true },
    });

    return NextResponse.json({
      message: `Secret successfully ${
        action === "encrypt" ? "encrypted" : "descrypted"
      }`,
      secret: udpatedSecret,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
