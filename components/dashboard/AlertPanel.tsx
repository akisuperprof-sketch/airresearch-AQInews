import { AlertTriangle, AlertCircle, Info, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Severity = "info" | "success" | "warning" | "danger";

export interface AlertItem {
  id: string;
  type: string;
  severity: Severity;
  message: string;
  time: string;
}

interface AlertPanelProps {
  alerts: AlertItem[];
}

export function AlertPanel({ alerts }: AlertPanelProps) {
  return (
    <div id="alerts" className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden scroll-mt-24">
      <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
        <h3 className="font-bold text-slate-900">システムアラート</h3>
        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded-full font-medium">
          {alerts.length}件
        </span>
      </div>
      
      <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
        {alerts.length === 0 ? (
          <div className="p-6 text-center text-sm text-slate-500">
            現在アラートはありません
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} className="p-4 flex items-start space-x-3 hover:bg-slate-50 transition-colors">
              <AlertIcon severity={alert.severity} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">
                  {alert.message}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  {alert.time} • {alert.type}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AlertIcon({ severity }: { severity: Severity }) {
  switch (severity) {
    case "info":
      return <Info className="w-5 h-5 text-blue-500 shrink-0" />;
    case "success":
      return <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />;
    case "danger":
      return <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />;
  }
}
