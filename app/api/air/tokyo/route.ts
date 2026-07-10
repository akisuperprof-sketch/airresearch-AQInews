import { NextResponse } from "next/server";
import { getTokyoData } from "@/lib/air/service";

export async function GET() {
  const result = await getTokyoData();
  return NextResponse.json(result);
}
