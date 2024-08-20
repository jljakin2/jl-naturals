import { NextResponse, NextRequest } from "next/server";
import connectMongo from "@/lib/mongoose";
import Product from "@/models/Product";

export async function GET() {
  try {
    await connectMongo();
    const products = await Product.find();

    return NextResponse.json({ products });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
