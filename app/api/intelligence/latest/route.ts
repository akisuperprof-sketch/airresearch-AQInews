import { NextResponse } from "next/server";
import { getLatestIntelligence } from "@/lib/intelligence/service";
import { AirIntelligenceItem } from "@/lib/intelligence/types";

export const revalidate = 60; // Cache for 60 seconds

export async function GET() {
  try {
    // DBから日本と世界の最新情報を取得
    const japanItems = await getLatestIntelligence("japan", 3);
    const globalItems = await getLatestIntelligence("global", 3);

    // DBにデータがない（モック時のフォールバック処理）
    // 本来はDBのデータをそのまま返す。
    const responseData = {
      japan: japanItems.length > 0 ? japanItems : getFallbackData("japan"),
      global: globalItems.length > 0 ? globalItems : getFallbackData("global"),
    };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error in /api/intelligence/latest:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// フォールバックデータ（DBが設定されていない場合のフェイルセーフ）
function getFallbackData(region: "japan" | "global"): AirIntelligenceItem[] {
  const now = new Date().toISOString();
  if (region === "japan") {
    return [
      { id: "mock-j1", region: "japan", title: "環境省: 微小粒子状物質(PM2.5)に関する注意喚起", source_name: "環境省 報道発表", article_url: "https://www.env.go.jp/press/", published_at: now, data_quality: "demo" },
      { id: "mock-j2", region: "japan", title: "国立環境研究所: アジア太平洋地域の大気観測網を更新", source_name: "国立環境研究所 (NIES)", article_url: "https://www.nies.go.jp/whatsnew/", published_at: now, data_quality: "demo" },
      { id: "mock-j3", region: "japan", title: "気象庁: 春の黄砂飛来予測についてのお知らせ", source_name: "気象庁 報道発表", article_url: "https://www.jma.go.jp/jma/press/", published_at: now, data_quality: "demo" }
    ];
  } else {
    return [
      { id: "mock-g1", region: "global", title: "WHO: Global Air Quality Guidelines Updated", source_name: "WHO Newsroom", article_url: "https://www.who.int/news", published_at: now, data_quality: "demo" },
      { id: "mock-g2", region: "global", title: "NASA Earth Observatory: Tracking Wildfire Smoke Across Continents", source_name: "NASA Earth Observatory", article_url: "https://science.nasa.gov/earth/earth-observatory/", published_at: now, data_quality: "demo" },
      { id: "mock-g3", region: "global", title: "EEA: Europe's air quality status 2026 report released", source_name: "EEA Newsroom", article_url: "https://www.eea.europa.eu/en/newsroom", published_at: now, data_quality: "demo" }
    ];
  }
}
