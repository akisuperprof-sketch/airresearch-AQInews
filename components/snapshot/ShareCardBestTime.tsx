import { AirMeasurement } from "@/lib/air/mockData";
import { AirForecast } from "@/lib/air/forecastService";
import { Cloud, Timer, PersonStanding } from "lucide-react";

interface Props {
  measurement: AirMeasurement;
  forecasts: AirForecast[];
}

export function ShareCardBestTime({ measurement, forecasts }: Props) {
  // 簡単なベストタイム算出ロジック
  // すっきり・おだやかな時間がベスト
  let bestStart = "";
  let bestEnd = "";
  let reason = "空気がきれいな状態が続くため";
  let afternoonTrend = "少しもやっと傾向";

  const goodForecasts = forecasts.filter(f => f.airType === "すっきり空気" || f.airType === "おだやか空気");
  
  if (goodForecasts.length > 0) {
    const sDate = new Date(goodForecasts[0].time);
    const eDate = new Date(goodForecasts[goodForecasts.length - 1].time);
    bestStart = `${sDate.getHours()}:00`;
    bestEnd = `${eDate.getHours() + 1}:00`;
  } else {
    bestStart = "おすすめできる時間帯がありません";
    bestEnd = "";
    reason = "全体的に空気がもやっと・どんよりしているため";
  }

  if (forecasts.length > 6) {
    const afternoon = forecasts[6];
    afternoonTrend = `${afternoon.airType}傾向`;
  }

  return (
    <div 
      className="w-[1200px] h-[675px] bg-slate-900 flex items-center justify-center p-12 overflow-hidden relative text-white"
      style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
    >
      {/* Dark Aurora Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-emerald-500/20 blur-[100px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-blue-500/20 blur-[100px]"></div>

      <div className="w-full h-full flex flex-col z-10 relative">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <div className="flex items-center space-x-3 text-emerald-400">
            <Cloud className="w-12 h-12" />
            <span className="text-3xl font-black tracking-tighter">AIR Research</span>
          </div>
          <div className="text-2xl font-medium text-slate-300 flex items-center gap-3">
             <PersonStanding className="w-8 h-8" />
             今日、<span className="text-white font-bold">{measurement.name}</span>で走るなら？
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          
          <div className="text-center space-y-6 mb-12">
            <div className="inline-flex items-center gap-3 bg-emerald-500/20 text-emerald-300 px-6 py-2 rounded-full border border-emerald-500/30 font-bold text-2xl tracking-widest">
              <Timer className="w-6 h-6" />
              BEST TIME
            </div>
            <div className="text-[120px] font-black tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300 drop-shadow-lg">
              {bestStart}{bestEnd ? ` - ${bestEnd}` : ""}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="text-lg text-emerald-400 font-bold mb-2">おすすめの理由</div>
              <div className="text-3xl font-medium leading-tight">{reason}</div>
            </div>
            <div className="bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10">
              <div className="text-lg text-amber-400 font-bold mb-2">午後は...</div>
              <div className="text-3xl font-medium leading-tight">{afternoonTrend}</div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-end border-t border-white/10 pt-8">
          <div className="text-xl font-bold text-slate-400">
            {new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm font-medium text-slate-500">観測: <span className="text-slate-300">環境省そらまめ君速報値</span></div>
            <div className="text-sm font-medium text-slate-500">予測: <span className="text-slate-300">Open-Meteo Air Quality</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
