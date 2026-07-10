import { AirMeasurement } from "@/lib/air/mockData";
import { AirTypeBadge } from "./AirTypeBadge";

interface TokyoWardPanelProps {
  measurements: AirMeasurement[];
}

export function TokyoWardPanel({ measurements }: TokyoWardPanelProps) {
  // スコア順にソート（デモ用）
  const sorted = [...measurements].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  return (
    <div id="tokyo-wards" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full scroll-mt-24">
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center shrink-0">
        <h3 className="font-bold text-slate-900">東京23区 空気状態</h3>
        <span className="text-xs text-slate-500">スコア順</span>
      </div>
      
      <div className="overflow-y-auto flex-1 custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 font-medium">区</th>
              <th className="px-5 py-3 font-medium">状態</th>
              <th className="px-5 py-3 font-medium text-right">スコア</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sorted.map((m) => (
              <tr key={m.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-5 py-3 font-medium text-slate-900">{m.name}</td>
                <td className="px-5 py-3">
                  <AirTypeBadge airType={m.airType} size="sm" />
                </td>
                <td className="px-5 py-3 text-right font-mono font-medium text-slate-700">
                  {m.score ?? "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
