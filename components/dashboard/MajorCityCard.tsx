import { AirMeasurement } from "@/lib/air/mockData";
import { AirTypeBadge } from "./AirTypeBadge";
import { ActionSigns } from "./ActionSigns";
import { DataQualityBadge } from "../common/DataQualityBadge";
import { SourceBadge } from "../common/SourceBadge";
import { format } from "date-fns";

interface MajorCityCardProps {
  measurement: AirMeasurement;
}

export function MajorCityCard({ measurement }: MajorCityCardProps) {
  const updateTime = format(new Date(measurement.updatedAt), "HH:mm");

  return (
    <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-900">{measurement.name}</h3>
          <div className="flex items-center space-x-2 mt-1">
            <span className="text-xs text-slate-500">{updateTime} 発表</span>
            <DataQualityBadge quality={measurement.dataQuality} />
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm font-semibold text-slate-500">SCORE</div>
          <div className="text-2xl font-bold text-slate-800">{measurement.score ?? "-"}</div>
        </div>
      </div>

      <div className="mb-4">
        <AirTypeBadge airType={measurement.airType} size="lg" className="mb-2" />
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          {measurement.comment}
        </p>
      </div>

      <div className="mt-auto pt-4 border-t border-slate-100">
        <ActionSigns signs={measurement.actionSigns} variant="compact" />
        
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-3 text-[10px] text-slate-400 font-mono">
            <span>PM2.5: {measurement.pm25 ?? "-"}</span>
            <span>Ox: {measurement.ox ?? "-"}</span>
          </div>
          <SourceBadge label={measurement.sourceLabel} />
        </div>
      </div>
    </div>
  );
}
