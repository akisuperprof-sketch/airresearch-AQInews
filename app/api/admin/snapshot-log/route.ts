import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const useMock = process.env.USE_MOCK_DATA === "true" || !isSupabaseConfigured();

  try {
    const body = await request.json();
    const { variant, size, title, data_timestamp, file_name } = body;

    if (useMock) {
      console.log("Mock snapshot log saved:", body);
      return NextResponse.json({ success: true, message: "Mock log saved" });
    }

    const { error } = await supabase
      .from("snapshot_logs")
      .insert({
        variant,
        size,
        title,
        data_timestamp,
        file_name,
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Failed to save snapshot log:", error);
    return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 });
  }
}
