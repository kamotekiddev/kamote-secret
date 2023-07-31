import CryptoJS from "crypto-js";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

interface Params {
  vaultId: string;
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

    const encryptedSecret = CryptoJS.AES.encrypt(
      secret,
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
