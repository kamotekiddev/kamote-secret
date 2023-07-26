import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";

export default async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    console.log(userId);

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    if (!name)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

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

    return NextResponse.json(newSecretChannel);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
