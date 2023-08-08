import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import getCurrentUser from "@/libs/getCurrentUser";
import prismadb from "@/libs/prismadb";

export async function GET(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ currentUser });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error });
  }
}

export async function PUT(req: Request) {
  try {
    const { secretKey } = await req.json();
    const currentUser = await getCurrentUser();

    if (!currentUser?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!secretKey)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const encryptedSecretKey = await bcrypt.hash(secretKey, 12);

    const user = await prismadb.user.update({
      where: { id: currentUser.id },
      data: { secretKey: encryptedSecretKey },
    });

    return NextResponse.json({ message: "Encryption Key Added.", user });
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error });
  }
}
