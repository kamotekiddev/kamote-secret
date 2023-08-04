import { NextResponse } from "next/server";

import prismadb from "@/libs/prismadb";
import getCurrentUser from "@/libs/getCurrentUser";

interface Params {
  params: { vaultId: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    const id = params.vaultId;

    if (!user?.id)
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    if (!id)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const vault = await prismadb.vault.findUnique({
      where: { id },
      include: { secrets: true },
    });

    return NextResponse.json(vault);
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Params) {
  try {
    const user = await getCurrentUser();
    const id = params.vaultId;

    if (!user?.id)
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
    const user = await getCurrentUser();
    const body = await req.json();
    const id = params.vaultId;
    const { name } = body;

    if (!user?.id)
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
