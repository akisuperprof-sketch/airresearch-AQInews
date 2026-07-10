import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AirTypeBadge } from "@/components/dashboard/AirTypeBadge";

export default function GuideAirTypePage() {
  const airTypes = [
    { type: "すっきり空気", score: "85-100", comment: "とても良好。外出や運動に最適です。" },
    { type: "おだやか空気", score: "70-84", comment: "通常生活向き。大きな心配はありません。" },
    { type: "もやっと空気", score: "55-69", comment: "やや注意。長時間の屋外運動は控えめに。" },
    { type: "ひかえめ空気", score: "40-54", comment: "屋外活動は控えめ。敏感な方は注意してください。" },
    { type: "こもり空気", score: "0-39", comment: "空気状態が悪化。屋内中心の生活を推奨します。" },
  ];

  return (
    <DashboardShell>
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6 border-b border-slate-100 pb-4">
          空気タイプと行動サインのガイド
        </h1>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-800 mb-4">空気タイプとは？</h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            AIR Researchでは、環境省そらまめ君の速報値（PM2.5、光化学オキシダント、二酸化窒素など）を独自のアルゴリズムで100点満点の「空気スコア」に変換し、一般ユーザーにも直感的に伝わる「空気タイプ」として分類しています。
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm">
                  <th className="p-4 font-medium border-b border-slate-200">空気タイプ</th>
                  <th className="p-4 font-medium border-b border-slate-200">スコア目安</th>
                  <th className="p-4 font-medium border-b border-slate-200">意味・状態</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {airTypes.map((item, idx) => (
                  <tr key={idx}>
                    <td className="p-4">
                      {/* @ts-ignore */}
                      <AirTypeBadge airType={item.type} />
                    </td>
                    <td className="p-4 text-slate-700 font-mono">{item.score}</td>
                    <td className="p-4 text-slate-700">{item.comment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-800 mb-4">行動サインの目安</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            空気タイプに応じて、日常生活におけるアクションの目安（行動サイン）を提示しています。
            これらはあくまで参考情報であり、医療機関や行政からの指示・注意報等がある場合はそちらを優先してください。
          </p>
          <ul className="list-disc pl-5 space-y-2 text-slate-700">
            <li><strong>外出:</strong> OK / 少し様子見 / 必要時のみ</li>
            <li><strong>換気:</strong> OK / 短時間 / 窓閉め推奨</li>
            <li><strong>運動:</strong> OK / 軽め / 屋内推奨</li>
            <li><strong>子ども:</strong> 外遊びOK / 短時間 / 屋内推奨</li>
            <li><strong>高齢者:</strong> 散歩OK / 短め / 今日は控えめ</li>
            <li><strong>洗濯:</strong> 外干しOK / 早めに取り込み / 室内干し</li>
          </ul>
        </section>

        <section className="p-6 bg-slate-50 rounded-lg border border-slate-100 text-sm text-slate-600 leading-relaxed">
          <h3 className="font-bold text-slate-800 mb-2">免責事項・注意事項</h3>
          <p>
            本システムで提供する「空気スコア」「空気タイプ」「行動サイン」等の情報は、環境省大気汚染物質広域監視システム（そらまめ君）等の公開データを基に独自算出した生活の目安です。
            大気汚染に関する医療的、あるいは行政的な公的判断を提供するものではありません。
            健康に不安のある方やアレルギー疾患等をお持ちの方は、かかりつけの医師の指示に従ってください。
          </p>
        </section>
      </div>
    </DashboardShell>
  );
}
