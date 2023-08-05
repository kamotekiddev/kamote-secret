import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prismadb from "@/libs/prismadb";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password)
      return NextResponse.json({ message: "Invalid Data" }, { status: 400 });

    const existingUser = await prismadb.user.findFirst({ where: { email } });
    if (existingUser)
      return NextResponse.json(
        { message: "Email already been taken" },
        { status: 400 }
      );

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await prismadb.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json({
      message: "Account created successfully.",
      user: newUser,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invernal Server Error", error },
      { status: 500 }
    );
  }
}
