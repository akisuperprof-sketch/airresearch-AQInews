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
      
      <div className="overflow-y-auto flex-1 custom-scrollbar p-3 space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="border border-slate-100 rounded-lg p-3 bg-slate-50/50 flex flex-col gap-1.5 hover:bg-slate-50 transition-colors">
            <div className="flex justify-between items-center">
              <span className="text-[11px] font-semibold text-slate-500">{log.time} · {log.target}</span>
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                log.result === "success" ? "bg-green-100 text-green-700" :
                log.result === "partial" ? "bg-yellow-100 text-yellow-700" :
                "bg-red-100 text-red-700"
              }`}>
                {log.result}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-800 line-clamp-2 leading-snug">{log.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
