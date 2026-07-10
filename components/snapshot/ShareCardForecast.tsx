import { AirMeasurement } from "@/lib/air/mockData";
import { AirForecast } from "@/lib/air/forecastService";
import { Cloud } from "lucide-react";


interface Props {
  measurement: AirMeasurement;
  forecasts: AirForecast[];
}

export function ShareCardForecast({ measurement, forecasts }: Props) {
  const nextForecast = forecasts.length > 0 ? forecasts[0] : null;
  const futureForecast = forecasts.length > 5 ? forecasts[5] : nextForecast;
  
  let changeTimeStr = "";
  if (futureForecast) {
    const d = new Date(futureForecast.time);
    changeTimeStr = `${d.getHours()}時ごろから`;
  }

  let bgGradient = "from-cyan-400 to-blue-500";
  if (futureForecast && (futureForecast.airType === "もやっと空気" || futureForecast.airType === "ひかえめ空気" || futureForecast.airType === "こもり空気")) {
    bgGradient = "from-amber-400 to-orange-500";
  }

  return (
    <div 
      className="w-[1200px] h-[675px] bg-slate-50 flex items-center justify-center p-12 overflow-hidden relative"
      style={{ fontFamily: "'Inter', 'Noto Sans JP', sans-serif" }}
    >
      {/* Background Graphic */}
      <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient} opacity-10`}></div>
      <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-cyan-200/40 blur-3xl"></div>
      <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-blue-200/40 blur-3xl"></div>

      <div className="bg-white/80 backdrop-blur-2xl w-full h-full rounded-[40px] shadow-2xl border border-white/50 flex flex-col p-12 z-10 relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-3 text-cyan-700">
            <Cloud className="w-12 h-12" />
            <span className="text-3xl font-black tracking-tighter">AIR Research</span>
          </div>
          <div className="text-2xl font-bold text-slate-400 bg-white/50 px-6 py-2 rounded-full border border-slate-200/50">
            {measurement.name} の空気予報
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center gap-12">
          
          <div className="flex justify-between items-center bg-white/60 p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex-1">
              <div className="text-xl font-bold text-slate-500 mb-2">いまの空気</div>
              <div className="text-6xl font-black text-slate-800">{measurement.airType}</div>
            </div>
            
            <div className="px-6 flex flex-col items-center justify-center text-slate-400">
              <div className="text-2xl font-bold mb-2">{changeTimeStr}</div>
              <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>

            <div className="flex-1 text-right">
              <div className="text-xl font-bold text-slate-500 mb-2">このあとの空気</div>
              <div className="text-6xl font-black text-cyan-600">{futureForecast?.airType || "不明"}</div>
            </div>
          </div>

          <div className="bg-slate-800 text-white p-10 rounded-3xl shadow-lg relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-400/20 pointer-events-none"></div>
             <p className="text-3xl font-medium leading-relaxed relative z-10">
               {measurement.name}の現在の観測値は{measurement.airType}です。<br/>
               一方、予測モデルによると{changeTimeStr}は<span className="text-cyan-300 font-bold">{futureForecast?.airType || "不明"}</span>傾向へ変化する見通しです。
             </p>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-8 flex justify-between items-end border-t border-slate-200/50 pt-8">
          <div className="text-xl font-bold text-slate-400">
            {new Date().toLocaleDateString('ja-JP', { month: 'long', day: 'numeric', weekday: 'short' })}
          </div>
          <div className="text-right space-y-1">
            <div className="text-sm font-medium text-slate-400">観測データ出典: <span className="text-slate-600">環境省そらまめ君速報値</span></div>
            <div className="text-sm font-medium text-slate-400">予測データ出典: <span className="text-slate-600">Open-Meteo Air Quality</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
