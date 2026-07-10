import { NextResponse } from "next/server";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(request: Request) {
  // Phase 1 では土台のみ。実際のデータ取得はPhase 2（そらまめ君API連携）で行う。
  const useMock = process.env.USE_MOCK_DATA === "true" || !isSupabaseConfigured();

  if (useMock) {
    return NextResponse.json({ 
      success: true, 
      message: "Mock update triggered (no DB change)", 
      target: "all" 
    });
  }

  try {
    // 取得ログ(fetch_logs)へ開始レコードを書き込む土台
    const { data: logData, error: logError } = await supabase
      .from("fetch_logs")
      .insert({
        target: "all",
        event_type: "manual_fetch",
        status: "started",
      })
      .select()
      .single();

    if (logError) throw logError;

    // TODO: Phase 2 - そらまめ君APIから実データを取得し、air_measurements_current を更新する処理をここに実装

    // ログの更新
    await supabase
      .from("fetch_logs")
      .update({
        status: "completed",
        finished_at: new Date().toISOString(),
        success_count: 0, // 仮
        detail_json: { phase: "1_stub" }
      })
      .eq("id", logData.id);

    return NextResponse.json({ 
      success: true, 
      message: "Fetch cycle completed (Stub)", 
      log_id: logData.id 
    });

  } catch (error: any) {
    console.error("Manual fetch error:", error);
    return NextResponse.json({ success: false, error: error.message || "Unknown error" }, { status: 500 });
  }
}
