import CryptoJS from "crypto-js";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/libs/getCurrentUser";

interface Params {
  vaultId: string;
}

const SECRET_LIMIT = 20;

export async function GET(req: Request, { params }: { params: Params }) {
  try {
    const user = await getCurrentUser();

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const vault = await prismadb.vault.findUnique({
      where: { userId: user.id, id: params.vaultId },
    });

    if (!vault)
      return NextResponse.json({ message: "Vault not found" }, { status: 404 });

    const secrets = await prismadb.secret.findMany({
      where: { vaultId: vault?.id },
      orderBy: { createdAt: "desc" },
    });

    const decryptedSecrets = secrets.map((currSecret) => {
      if (!currSecret.isDecrypted || !user.secretKey) return currSecret;

      const decryptedSecret = CryptoJS.AES.decrypt(
        currSecret.secret,
        user.secretKey!
      ).toString(CryptoJS.enc.Utf8);
      return { ...currSecret, secret: decryptedSecret };
    });

    return NextResponse.json(decryptedSecrets);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error },
      { status: 500 }
    );
  }
}

export async function POST(req: Request, { params }: { params: Params }) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { label, secret } = body;

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!label || !secret)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    if (!user.secretKey)
      return NextResponse.json(
        { message: "Please setup a secret key first" },
        { status: 401 }
      );

    const existingSecret = await prismadb.secret.findFirst({
      where: { vaultId: params.vaultId, label },
    });

    if (existingSecret)
      return NextResponse.json(
        { message: "Label Already exist" },
        { status: 400 }
      );

    const secrets = await prismadb.secret.findMany({
      where: { vaultId: params.vaultId },
    });

    if (secrets.length >= SECRET_LIMIT)
      return NextResponse.json(
        { message: "Your vault reached the maximum limit of secrets allowed" },
        { status: 400 }
      );

    const encryptedSecret = CryptoJS.AES.encrypt(
      JSON.stringify(secret),
      user.secretKey
    ).toString();

    const newSecret = await prismadb.secret.create({
      data: {
        label,
        secret: encryptedSecret,
        vaultId: params.vaultId,
      },
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
