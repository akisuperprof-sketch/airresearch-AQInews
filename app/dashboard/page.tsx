import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AirHeroSummary } from "@/components/dashboard/AirHeroSummary";
import { MajorCityCard } from "@/components/dashboard/MajorCityCard";
import { TokyoWardPanel } from "@/components/dashboard/TokyoWardPanel";
import { AlertPanel, AlertItem } from "@/components/dashboard/AlertPanel";
import { KpiPanel } from "@/components/dashboard/KpiPanel";
import { FetchLogPanel } from "@/components/dashboard/FetchLogPanel";
import { SnapshotComposer } from "@/components/snapshot/SnapshotComposer";
import { LocationSelector } from "@/components/dashboard/LocationSelector";
import { ForecastTimeline } from "@/components/dashboard/ForecastTimeline";
import { AirTypeGuidePanel } from "@/components/dashboard/AirTypeGuidePanel";
import { getSummaryData, getTokyoData } from "@/lib/air/service";
import { getForecastData } from "@/lib/air/forecastService";

export default async function DashboardPage({ searchParams }: { searchParams: { area?: string } }) {
  const currentAreaId = searchParams?.area || "tokyo";

  const [summaryRes, tokyoRes, forecastRes] = await Promise.all([
    getSummaryData(),
    getTokyoData(),
    getForecastData(currentAreaId)
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

  return (
    <DashboardShell>
      <div className="flex flex-col gap-4 h-[calc(100vh-3rem)]">
        {/* ツールバー（エリア選択など） */}
        <div className="shrink-0 flex justify-between items-center bg-white/40 backdrop-blur-xl border border-white/60 p-3 rounded-2xl shadow-sm">
          <Suspense fallback={<div className="h-10 w-32 bg-slate-200 animate-pulse rounded-lg"></div>}>
            <LocationSelector currentArea={currentAreaId} />
          </Suspense>
        </div>

        {/* メイングリッド */}
        <div className="flex-1 grid grid-cols-1 xl:grid-cols-12 gap-4 min-h-0">
          
          {/* 左側：メインコンテンツ (8/12) */}
          <div className="xl:col-span-8 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
            {/* いまの空気 と このあとの空気 (サマリー) */}
            <AirHeroSummary 
              primaryMeasurement={primaryCity} 
              nextForecast={nextForecast}
              researchNote={researchNote}
            />
            
            {/* 今日の空気の流れ (タイムライン) */}
            <div className="shrink-0">
              <ForecastTimeline forecasts={forecasts} />
            </div>
            
            {/* 下部パネル：23区とガイド */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1 min-h-[300px]">
              <TokyoWardPanel measurements={tokyoWards} />
              <AirTypeGuidePanel />
            </div>
          </div>

          {/* 右側：サイドコンテンツ (4/12) */}
          <div className="xl:col-span-4 flex flex-col gap-4 overflow-y-auto pr-1 custom-scrollbar">
            <div className="shrink-0">
              <SnapshotComposer measurement={primaryCity} forecasts={forecasts} />
            </div>
            
            <AlertPanel alerts={mockAlerts} />
            <FetchLogPanel logs={mockLogs} />
            
            <div className="shrink-0">
              <KpiPanel data={mockKpi} />
            </div>
          </div>

        </div>
      </div>
    </DashboardShell>
  );
}
