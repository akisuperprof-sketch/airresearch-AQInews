import { NextResponse } from "next/server";
import { getSummaryData } from "@/lib/air/service";

export async function GET() {
  const result = await getSummaryData();
  return NextResponse.json(result);
}
