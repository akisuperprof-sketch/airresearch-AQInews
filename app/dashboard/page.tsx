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

export default async function DashboardPage(props: { searchParams: Promise<{ area?: string }> }) {
  const searchParams = await props.searchParams;
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

  const isTokyoGroup = currentAreaId === "tokyo" || tokyoWards.some((w: any) => w.id === currentAreaId);

  // ダミーデータ群
  const mockAlerts: AlertItem[] = [
    { id: "1", type: "大阪エリア", severity: "warning", message: "夕方以降もやっと傾向", time: "10:00" },
    { id: "2", type: "名古屋エリア", severity: "danger", message: "PM2.5がやや高めの推移", time: "10:00" },
    { id: "3", type: "東京23区", severity: "info", message: "一部区でひかえめ空気を観測 (Demo)", time: "10:00" },
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
            {/* SNS用画像を作成ボタンは一旦非表示 */}
            {/* <SnapshotDialog measurement={primaryCity} forecasts={forecasts} /> */}
          </Suspense>
        </div>

        {/* Heroセクション (全幅) */}
        <div className="w-full">
          <AirHeroSummary 
            primaryMeasurement={primaryCity} 
            nextForecast={nextForecast}
            researchNote={researchNote}
          />
        </div>

        {/* 下段グリッド (2カラム構成: 左 Forecast/Intel / 右 Map) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 pb-6">
          
          {/* 左側カラム (5/12): Forecast & Intelligence */}
          <div className="xl:col-span-5 flex flex-col gap-6 min-w-0">
            <ForecastTimeline forecasts={forecasts} />
            <div className="shrink-0 min-h-0 flex-1">
              <AirIntelligenceBrief japanItems={displayJapanItems} globalItems={displayGlobalItems} />
            </div>
            <div className="shrink-0 mt-auto pt-4 hidden xl:block">
              <AirTypeGuidePanel />
            </div>
          </div>

          {/* 右側カラム (7/12): 東京23区マップ */}
          <div className="xl:col-span-7 flex flex-col relative min-w-0">
            {isTokyoGroup ? (
              <Suspense fallback={<div className="flex-1 flex items-center justify-center bg-slate-50 rounded-xl min-h-[400px]">Loading Map...</div>}>
                <TokyoWardsMap measurements={tokyoWards} />
              </Suspense>
            ) : (
              <div className="flex-1 bg-white/40 rounded-xl border border-white/60 shadow-sm flex flex-col items-center justify-center p-8 text-center min-h-[360px]">
                <div className="w-16 h-16 bg-white/50 rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">🗺️</span>
                </div>
                <h3 className="text-lg font-bold text-slate-800">{primaryCity.name}エリア詳細マップは<br/>Phase 2で対応予定</h3>
                <p className="text-sm text-slate-500 mt-2">現在は東京23区の詳細マップを優先的に提供しています。</p>
              </div>
            )}
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
