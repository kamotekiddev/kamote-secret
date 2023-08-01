import CryptoJS from "crypto-js";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

interface Params {
  vaultId: string;
}

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const { userId } = auth();

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const vault = await prismadb.vault.findUnique({
      where: { userId, id: params.vaultId },
    });

    if (!vault)
      return NextResponse.json({ message: "Vault not found" }, { status: 404 });

    const secrets = await prismadb.secret.findMany({
      where: { vaultId: vault?.id },
    });

    return NextResponse.json(secrets);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const body = await req.json();
    const { userId } = auth();
    const { label, secret } = body;

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!label || !secret)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const isExist = await prismadb.secret.findFirst({
      where: { vaultId: params.vaultId, label },
    });

    if (isExist)
      return NextResponse.json(
        { message: "Label Already exist" },
        { status: 400 }
      );

    const encryptedSecret = CryptoJS.AES.encrypt(
      JSON.stringify(secret),
      process.env.ENCRYPTION_SECRET!
    ).toString();

    const newSecret = await prismadb.secret.create({
      data: { label, secret: encryptedSecret, vaultId: params.vaultId },
    });

    return NextResponse.json({
      message: "New secret is created",
      secret: newSecret,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}
