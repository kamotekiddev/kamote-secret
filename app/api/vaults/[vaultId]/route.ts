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

    const deleteVault = await prismadb.vault.delete({ where: { id } });

    return NextResponse.json({
      message: "Vault deleted successfully",
      vault: deleteVault,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
