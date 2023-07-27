import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/libs/prismadb";

interface Params {
  params: { channelId: string };
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { userId } = auth();
    const id = params.channelId;

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!id)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const deletedChannel = await prismadb.channel.delete({ where: { id } });

    return NextResponse.json({
      message: "Channel deleted successfully",
      channel: deletedChannel,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
