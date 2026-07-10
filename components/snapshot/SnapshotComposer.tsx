"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Loader2, Image as ImageIcon, LayoutTemplate } from "lucide-react";
import { ShareCard } from "./ShareCard";
import { ShareCardForecast } from "./ShareCardForecast";
import { ShareCardBestTime } from "./ShareCardBestTime";
import { AirMeasurement } from "@/lib/air/mockData";
import { AirForecast } from "@/lib/air/forecastService";
import { logger } from "@/lib/logger";

interface SnapshotComposerProps {
  measurement: AirMeasurement;
  forecasts?: AirForecast[];
}

export function SnapshotComposer({ measurement, forecasts = [] }: SnapshotComposerProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [template, setTemplate] = useState<"current" | "forecast" | "best_time">("current");

  const handleDownload = async () => {
    if (!cardRef.current) return;
    
    try {
      setIsGenerating(true);
      const dataUrl = await toPng(cardRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        cacheBust: true,
      });

      const now = new Date();
      const filename = `air-research_${template}_${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}_${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}_${measurement.id}.png`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      link.click();
      
      fetch("/api/admin/snapshot-log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: template,
          size: "1200x675",
          title: `SNS Image - ${template}`,
          data_timestamp: measurement.updatedAt,
          file_name: filename,
        })
      }).catch(err => console.error("Failed to log snapshot", err));
      
      logger.info("Snapshot generated successfully", { filename });
    } catch (error) {
      logger.error("Failed to generate snapshot", error);
      alert("画像の生成に失敗しました。");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderTemplate = () => {
    switch (template) {
      case "forecast":
        return <ShareCardForecast measurement={measurement} forecasts={forecasts} />;
      case "best_time":
        return <ShareCardBestTime measurement={measurement} forecasts={forecasts} />;
      case "current":
      default:
        return <ShareCard measurement={measurement} />;
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl border border-white/60 shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-5 py-4 border-b border-slate-200/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/50">
        <div className="flex items-center space-x-2 text-cyan-800">
          <ImageIcon className="w-5 h-5 text-cyan-600" />
          <h3 className="font-bold">SNS投稿画像生成</h3>
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-none">
            <select 
              value={template}
              onChange={(e) => setTemplate(e.target.value as any)}
              className="appearance-none bg-white border border-slate-200 text-slate-700 text-xs font-medium py-2 pl-3 pr-8 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer shadow-sm"
            >
              <option value="current">いまの空気 (基本)</option>
              <option value="forecast">このあとの空気 (予測)</option>
              <option value="best_time">ベストタイム (運動・換気)</option>
            </select>
            <LayoutTemplate className="w-3 h-3 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shrink-0"
          >
            {isGenerating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">ダウンロード</span>
          </button>
        </div>
      </div>
      
      <div className="p-6 bg-slate-50/50 flex-1 flex items-center justify-center overflow-hidden">
        <div className="relative w-full aspect-video bg-white shadow-inner border border-slate-200 flex items-center justify-center overflow-hidden rounded-lg">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-[0.25] sm:scale-[0.28] origin-center pointer-events-none">
            <div ref={cardRef}>
              {renderTemplate()}
            </div>
          </div>
        </div>
      </div>
      <div className="p-3 bg-white/50 text-[10px] text-slate-500 text-center border-t border-slate-200/60">
        ダウンロードされる画像は 1200×675 px (高品質PNG) です。
      </div>
    </div>
  );
}
