import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AirHeroSummary } from "@/components/dashboard/AirHeroSummary";
import { TokyoWardsMap } from "@/components/dashboard/TokyoWardsMap";
import { AlertPanel, AlertItem } from "@/components/dashboard/AlertPanel";
import { KpiPanel } from "@/components/dashboard/KpiPanel";
import { FetchLogPanel } from "@/components/dashboard/FetchLogPanel";
import { SnapshotDialog } from "@/components/snapshot/SnapshotDialog";
import { LocationSelector } from "@/components/dashboard/LocationSelector";
import { ForecastTimeline } from "@/components/dashboard/ForecastTimeline";
import { AirTypeGuidePanel } from "@/components/dashboard/AirTypeGuidePanel";
import { AirIntelligenceBrief } from "@/components/intelligence/AirIntelligenceBrief";
import { RightUtilityPanel } from "@/components/dashboard/RightUtilityPanel";
import { getSummaryData, getTokyoData } from "@/lib/air/service";
import { getForecastData } from "@/lib/air/forecastService";
import { getLatestIntelligence } from "@/lib/intelligence/service";

export default async function DashboardPage({ searchParams }: { searchParams: { area?: string } }) {
  const currentAreaId = searchParams?.area || "tokyo";

  const [summaryRes, tokyoRes, forecastRes, japanItems, globalItems] = await Promise.all([
    getSummaryData(),
    getTokyoData(),
    getForecastData(currentAreaId),
    getLatestIntelligence("japan", 1),
    getLatestIntelligence("global", 1)
  ]);

  const majorCities = summaryRes.data;
  const tokyoWards = tokyoRes.data;
  const forecasts = forecastRes.data;

  // 選択された地点の観測データを探す（主要都市または東京23区から）
  const primaryCity = 
    majorCities.find((c: any) => c.id === currentAreaId) || 
    tokyoWards.find((c: any) => c.id === currentAreaId) || 
    majorCities[0];

  const nextForecast = forecasts.length > 0 ? forecasts[0] : undefined;

  let researchNote = `現在の観測値は${primaryCity.airType.replace("空気", "")}です。`;
  if (forecasts.length >= 6) {
    const futureForecast = forecasts[5]; // 約5時間後
    if (futureForecast.airType !== primaryCity.airType) {
      researchNote += ` 一方、予測モデルでは夕方にかけて${futureForecast.airType.replace("空気", "")}傾向へ変化する見通しです。`;
    } else {
      researchNote += ` 予測モデルでもしばらくは${futureForecast.airType.replace("空気", "")}傾向が続く見通しです。`;
    }
  }

  // ダミーデータ群
  const mockAlerts: AlertItem[] = [
    { id: "1", type: "もやっと注意エリア", severity: "warning", message: "江戸川区・足立区でもやっと空気の傾向", time: "10:00" },
    { id: "2", type: "一部データ欠損", severity: "warning", message: "港区の光化学Oxが一部欠損しています", time: "10:00" },
    { id: "3", type: "投稿候補生成", severity: "info", message: "「今日の東京23区」を投稿できます", time: "10:00" },
  ];

  const mockKpi = { freshnessMin: 10, successRate: 96, missingRate: 4, cautionAreasCount: 5, snapshotReadyCount: 3 };

  const mockLogs = [
    { id: "1", time: "10:00", type: "fetch_success", target: "東京23区", message: "速報値を取得", result: "success" as const },
    { id: "2", time: "10:00", type: "data_missing", target: "港区", message: "光化学Oxが一部欠損", result: "partial" as const },
    { id: "3", time: "09:00", type: "fetch_success", target: "3大都市", message: "データを取得", result: "success" as const },
  ];

  // AIR Intelligence 取得結果（DBが空の場合はMVPダミーデータ）
  const now = new Date().toISOString();
  const displayJapanItems = japanItems.length > 0 ? japanItems : [
    { id: "mock-j1", region: "japan" as const, title: "環境省: 微小粒子状物質(PM2.5)に関する注意喚起", source_name: "環境省 報道発表", article_url: "https://www.env.go.jp/press/", published_at: now, data_quality: "demo" as const }
  ];
  const displayGlobalItems = globalItems.length > 0 ? globalItems : [
    { id: "mock-g1", region: "global" as const, title: "WHO: Global Air Quality Guidelines Updated", source_name: "WHO Newsroom", article_url: "https://www.who.int/news", published_at: now, data_quality: "demo" as const }
  ];

  return (
    <DashboardShell>
      <div className="flex flex-col gap-4">
        {/* ツールバー（エリア選択など） */}
        <div className="shrink-0 flex justify-between items-center bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-2xl shadow-sm">
          <Suspense fallback={<div className="h-10 w-32 bg-slate-200 animate-pulse rounded-lg"></div>}>
            <LocationSelector currentArea={currentAreaId} />
          </Suspense>
          <Suspense fallback={<div className="h-10 w-32 bg-slate-200 animate-pulse rounded-lg"></div>}>
            <SnapshotDialog measurement={primaryCity} forecasts={forecasts} />
          </Suspense>
        </div>

        {/* メイングリッド (2カラム構成: 左40% / 右60%) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-6">
          
          {/* 左側カラム (5/12): サマリー系 */}
          <div className="xl:col-span-5 flex flex-col gap-6 min-w-0">
            <AirHeroSummary 
              primaryMeasurement={primaryCity} 
              nextForecast={nextForecast}
              researchNote={researchNote}
            />
            <div className="shrink-0">
              <ForecastTimeline forecasts={forecasts} />
            </div>
            <div className="shrink-0 min-h-0 flex-1">
              <AirIntelligenceBrief japanItems={displayJapanItems} globalItems={displayGlobalItems} />
            </div>
            <div className="shrink-0 mt-auto pt-4 hidden xl:block">
              <AirTypeGuidePanel />
            </div>
          </div>

          {/* 中央カラム (7/12): 東京23区マップ */}
          <div className="xl:col-span-7 flex flex-col relative min-w-0">
            <Suspense fallback={<div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl min-h-[400px]">Loading Map...</div>}>
              <TokyoWardsMap measurements={tokyoWards} />
            </Suspense>
            <div className="xl:hidden mt-4 shrink-0">
              <AirTypeGuidePanel />
            </div>
          </div>

        </div>

        {/* 右スライドパネル (Utility) */}
        <RightUtilityPanel>
          <AlertPanel alerts={mockAlerts} />
          <div className="shrink-0">
            <KpiPanel data={mockKpi} />
          </div>
          <FetchLogPanel logs={mockLogs} />
        </RightUtilityPanel>
      </div>
    </DashboardShell>
  );
}
