import { AirIntelligenceItem } from "@/lib/intelligence/types";
import { formatDistanceToNow } from "date-fns";
import { ja } from "date-fns/locale";
import { Globe, MapPin, ExternalLink, ShieldCheck, Beaker } from "lucide-react";
import { cn } from "@/lib/utils";

interface AirIntelligenceCardProps {
  item: AirIntelligenceItem;
  className?: string;
}

export function AirIntelligenceCard({ item, className }: AirIntelligenceCardProps) {
  const publishedText = item.published_at 
    ? formatDistanceToNow(new Date(item.published_at), { addSuffix: true, locale: ja })
    : "不明";

  const isJapan = item.region === "japan";
  const SourceIcon = isJapan ? MapPin : Globe;
  
  return (
    <a 
      href={item.article_url} 
      target="_blank" 
      rel="noopener noreferrer"
      className={cn(
        "block p-4 rounded-xl border border-slate-200/60 bg-white/50 backdrop-blur-sm hover:bg-white/80 transition-all shadow-sm group",
        className
      )}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center space-x-2 text-xs font-medium">
          <div className={cn(
            "flex items-center space-x-1 px-2 py-0.5 rounded-full",
            isJapan ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"
          )}>
            <SourceIcon className="w-3 h-3" />
            <span>{isJapan ? "Japan" : "Global"}</span>
          </div>
          <span className="text-slate-500">{item.source_name}</span>
        </div>
        
        {/* Data Quality Indicator */}
        <div className="flex items-center" title={item.data_quality === "official" ? "公式実データ" : "デモデータ"}>
          {item.data_quality === "official" ? (
             <ShieldCheck className="w-4 h-4 text-emerald-500" />
          ) : (
             <Beaker className="w-4 h-4 text-amber-500" />
          )}
        </div>
      </div>
      
      <h3 className="font-semibold text-slate-800 leading-snug group-hover:text-cyan-700 transition-colors line-clamp-2">
        {item.title}
      </h3>
      
      <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
        <span>{publishedText}</span>
        <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </a>
  );
}
