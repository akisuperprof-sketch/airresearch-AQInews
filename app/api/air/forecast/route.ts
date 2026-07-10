import { NextResponse } from "next/server";
import { getForecastData } from "@/lib/air/forecastService";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const location = searchParams.get("location") || "tokyo";

  const result = await getForecastData(location);
  
  return NextResponse.json(result);
}
