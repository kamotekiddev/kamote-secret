import prismadb from "@/libs/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

interface Params {
  secretId: string;
  vaultId: string;
}

export async function DELETE(req: Request, { params }: { params: Params }) {
  try {
    const { userId } = auth();

    if (!userId)
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
