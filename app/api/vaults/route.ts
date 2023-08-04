import { NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/libs/getCurrentUser";

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser();
    const body = await req.json();
    const { name } = body;

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!name)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const isExist = await prismadb.vault.findFirst({
      where: { name, userId: user.id },
    });

    if (isExist)
      return NextResponse.json(
        { message: "Vault already exist" },
        { status: 400 }
      );

    const newVault = await prismadb.vault.create({
      data: { userId: user.id, name },
    });

    if (!newVault)
      return NextResponse.json(
        {
          message: "Something went wrong, Please try again later.",
        },
        { status: 500 }
      );

    return NextResponse.json({
      message: "Vault created successfully.",
      vault: newVault,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const channels = await prismadb.vault.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(channels);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
