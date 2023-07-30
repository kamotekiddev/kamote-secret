import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismadb from "@/libs/prismadb";

interface Params {
  params: { vaultId: string };
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const { userId } = auth();
    const id = params.vaultId;

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!id)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const deletedVault = await prismadb.vault.delete({ where: { id } });

    return NextResponse.json({
      message: "Vault deleted successfully",
      vault: deletedVault,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: Params) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const id = params.vaultId;
    const { name } = body;

    if (!userId)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!id)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const updatedVault = await prismadb.vault.update({
      where: { id },
      data: {
        name,
      },
    });

    return NextResponse.json({
      message: "Vault updated successfully",
      vault: updatedVault,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
