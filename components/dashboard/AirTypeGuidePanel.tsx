import { AirTypeBadge } from "@/components/dashboard/AirTypeBadge";

export function AirTypeGuidePanel() {
  const airTypes = [
    { type: "すっきり空気", score: "85-100", comment: "とても良好。外出や運動に最適です。" },
    { type: "おだやか空気", score: "70-84", comment: "通常生活向き。大きな心配はありません。" },
    { type: "もやっと空気", score: "55-69", comment: "やや注意。長時間の屋外運動は控えめに。" },
    { type: "ひかえめ空気", score: "40-54", comment: "屋外活動は控えめ。敏感な方は注意してください。" },
    { type: "こもり空気", score: "0-39", comment: "空気状態が悪化。屋内中心の生活を推奨します。" },
  ];

  return (
    <div id="air-type-guide" className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm p-6 scroll-mt-24">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        空気タイプガイド
      </h2>

      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
        <h3 className="font-bold text-slate-800 text-sm mb-1">AQI（空気質指数）とは？</h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-2">
          AQI (Air Quality Index) は、PM2.5やオゾンなどの汚染物質から算出される国際的な空気の汚れの指標で、<strong>数値が小さいほど空気がきれい</strong>であることを示します。
        </p>
        <p className="text-xs text-slate-600 leading-relaxed">
          ※本ダッシュボードの「空気タイプ」は、AQIなどの観測データを元に<strong>100点満点の独自スコア（高いほど良好）</strong>に変換し、より直感的に分かりやすく分類したものです。
        </p>
      </div>

      <div className="overflow-x-auto mb-4">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-white/50 text-slate-500">
              <th className="p-2 font-medium border-b border-slate-200/60 whitespace-nowrap">タイプ</th>
              <th className="p-2 font-medium border-b border-slate-200/60 whitespace-nowrap">目安</th>
              <th className="p-2 font-medium border-b border-slate-200/60">状態</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/50">
            {airTypes.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/40 transition-colors">
                <td className="p-2 whitespace-nowrap">
                  {/* @ts-ignore */}
                  <AirTypeBadge airType={item.type} />
                </td>
                <td className="p-2 text-slate-700 font-mono">{item.score}</td>
                <td className="p-2 text-slate-700 text-xs">{item.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-cyan-50/50 p-4 rounded-xl border border-cyan-100/50">
        <h3 className="font-bold text-cyan-800 text-sm mb-2">免責事項</h3>
        <p className="text-xs text-slate-600 leading-relaxed">
          本情報は独自の目安であり、医療的・行政的な判断を提供するものではありません。
          注意報等が発令された場合は行政の指示に従ってください。
        </p>
      </div>
    </div>
  );
}
