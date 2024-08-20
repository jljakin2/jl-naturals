import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/mongoose";
import Inventory from "@/models/Inventory";

export async function GET() {
  try {
    await connectMongo();
    const inventory = await Inventory.find();

    return NextResponse.json({ inventory });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
