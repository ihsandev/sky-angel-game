import { db } from "@/configs/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await db
      .from("players")
      .select("*")
      .order("created_at", { ascending: false });
    return NextResponse.json(response);
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    if (!data) {
      return NextResponse.json({ error: "No data provided" }, { status: 400 });
    }

    const { error } = await db.from("players").insert([data]);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Data inserted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
