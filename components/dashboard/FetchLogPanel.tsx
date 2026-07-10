interface FetchLog {
  id: string;
  time: string;
  type: string;
  target: string;
  message: string;
  result: "success" | "partial" | "failed";
}

interface FetchLogPanelProps {
  logs: FetchLog[];
}

export function FetchLogPanel({ logs }: FetchLogPanelProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-0 flex-1">
      <div className="px-5 py-4 border-b border-slate-100 shrink-0">
        <h3 className="font-bold text-slate-900">取得ログ</h3>
      </div>
      
      <div className="overflow-y-auto overflow-x-auto flex-1 custom-scrollbar">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 text-xs uppercase sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 font-medium">時刻</th>
              <th className="px-5 py-3 font-medium">対象</th>
              <th className="px-5 py-3 font-medium">内容</th>
              <th className="px-5 py-3 font-medium">結果</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-5 py-3 text-slate-500 whitespace-nowrap">{log.time}</td>
                <td className="px-5 py-3 font-medium text-slate-900 whitespace-nowrap">{log.target}</td>
                <td className="px-5 py-3 text-slate-600 whitespace-nowrap">{log.message}</td>
                <td className="px-5 py-3 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    log.result === "success" ? "bg-green-100 text-green-800" :
                    log.result === "partial" ? "bg-yellow-100 text-yellow-800" :
                    "bg-red-100 text-red-800"
                  }`}>
                    {log.result.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
