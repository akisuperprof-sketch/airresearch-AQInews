import { AirIntelligenceItem } from "@/lib/intelligence/types";
import { AirIntelligenceCard } from "./AirIntelligenceCard";
import { Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AirIntelligenceBriefProps {
  japanItems: AirIntelligenceItem[];
  globalItems: AirIntelligenceItem[];
}

export function AirIntelligenceBrief({ japanItems, globalItems }: AirIntelligenceBriefProps) {
  // Japan 1件、Global 1件だけダッシュボードにサマリー表示する
  const featuredJapan = japanItems[0];
  const featuredGlobal = globalItems[0];

  return (
    <div className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 rounded-2xl border border-indigo-100/60 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="bg-indigo-100 p-1.5 rounded-lg text-indigo-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <h2 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600">
            AIR Intelligence Brief
          </h2>
        </div>
        <Link 
          href="/intelligence" 
          className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center group"
        >
          すべて見る
          <ArrowRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2 gap-4 min-w-0">
        {featuredJapan ? (
          <AirIntelligenceCard item={featuredJapan} className="bg-white/80 [&_h4]:line-clamp-2" />
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 text-slate-400 text-sm text-center">
            Japan news not available
          </div>
        )}
        
        {featuredGlobal ? (
          <AirIntelligenceCard item={featuredGlobal} className="bg-white/80 [&_h4]:line-clamp-2" />
        ) : (
          <div className="p-4 rounded-xl border border-dashed border-slate-300 text-slate-400 text-sm text-center">
            Global news not available
          </div>
        )}
      </div>
      
      <div className="mt-4 text-xs text-slate-500 text-center">
        国内外の公式機関（環境省、WHOなど）から最新の空気質・大気環境の一次情報をキュレーションしています。
      </div>
    </div>
  );
}
