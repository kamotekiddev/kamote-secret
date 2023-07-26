import { auth, useAuth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!name)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const isExist = await prismadb.channel.findFirst({
      where: { name, userId },
    });

    if (isExist)
      return NextResponse.json(
        { message: "Channel already exist" },
        { status: 400 }
      );

    const newSecretChannel = await prismadb.channel.create({
      data: { userId, name },
    });

    if (!newSecretChannel)
      return NextResponse.json(
        {
          message: "Something went wrong, Please try again later.",
        },
        { status: 500 }
      );

    return NextResponse.json({
      message: "Channel created successfully.",
      channel: newSecretChannel,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const channels = await prismadb.channel.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(channels);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
