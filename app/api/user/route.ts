import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
  } catch (error) {
    return NextResponse.json({ message: "Internal Server Error", error });
  }
}
