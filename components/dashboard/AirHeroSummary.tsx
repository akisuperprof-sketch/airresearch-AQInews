import { AirMeasurement } from "@/lib/air/mockData";
import { AirForecast } from "@/lib/air/forecastService";
import { AirTypeBadge } from "./AirTypeBadge";
import { ActionSigns } from "./ActionSigns";

interface Props {
  primaryMeasurement: AirMeasurement;
  nextForecast?: AirForecast;
  researchNote?: string;
}

export function AirHeroSummary({ primaryMeasurement: m, nextForecast, researchNote }: Props) {
  // 色分けロジックなどは維持
  let bgGradient = "from-cyan-400 to-blue-500";
  let statusIcon = "✨";

  if (m.airType === "もやっと空気" || m.airType === "ひかえめ空気" || m.airType === "こもり空気") {
    bgGradient = "from-amber-400 to-orange-500";
    statusIcon = "🌫️";
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${bgGradient} p-5 md:p-6 text-white shadow-sm shrink-0`}>
      {/* Aurora Glassmorphism Overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]"></div>
      
      <div className="relative z-10 flex flex-col xl:flex-row gap-6 items-start justify-between">
        <div className="flex-1 space-y-3 min-w-0 w-full">
          <div>
            <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold mb-2 border border-white/30">
              {m.name} の空気
            </div>
            <h1 className="text-3xl xl:text-4xl font-black tracking-tight drop-shadow-sm flex items-center gap-2 flex-wrap">
              {m.airType} <span className="text-2xl">{statusIcon}</span>
            </h1>
            <p className="mt-2 text-lg text-white/90 font-medium whitespace-normal break-words">
              {m.comment}
            </p>
          </div>
          
          {researchNote && (
            <div className="mt-6 bg-black/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
              <h3 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-1 flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                AIR Research Note
              </h3>
              <p className="text-sm font-medium leading-relaxed whitespace-normal break-words">{researchNote}</p>
            </div>
          )}
        </div>

        <div className="shrink-0 flex flex-row flex-wrap gap-3 w-full xl:w-auto">
          {/* 現在の観測値 */}
          <div className="flex-1 min-w-[140px] bg-white/20 backdrop-blur-xl border border-white/30 rounded-2xl p-5 text-center">
            <div className="text-xs font-bold text-white/80 uppercase mb-1">いまの空気</div>
            <div className="text-2xl font-black">{m.score}<span className="text-sm font-normal opacity-70"> /100</span></div>
            <div className="mt-2 pt-2 border-t border-white/20 text-xs font-medium whitespace-normal break-words">
              PM2.5: {m.pm25}
            </div>
            <div className="mt-1 text-[9px] opacity-60">観測値 ({m.sourceLabel})</div>
          </div>
          
          {/* このあとの予測値 */}
          {nextForecast && (
            <div className="flex-1 min-w-[140px] bg-black/20 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-center">
              <div className="text-xs font-bold text-white/80 uppercase mb-1">このあとの空気</div>
              <div className="text-xl font-black mt-2">{nextForecast.airType}</div>
              <div className="mt-3 pt-2 border-t border-white/20 text-xs font-medium whitespace-normal break-words">
                AQI: {nextForecast.europeanAqi}
              </div>
              <div className="mt-1 text-[9px] opacity-60 whitespace-normal break-words">予測 ({nextForecast.source})</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
