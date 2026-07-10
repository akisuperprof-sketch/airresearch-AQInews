"use client";

import { useState } from "react";
import { Camera, X } from "lucide-react";
import { SnapshotComposer } from "./SnapshotComposer";
import { AirMeasurement } from "@/lib/air/mockData";
import { AirForecast } from "@/lib/air/forecastService";

interface SnapshotDialogProps {
  measurement: AirMeasurement;
  forecasts?: AirForecast[];
}

export function SnapshotDialog({ measurement, forecasts = [] }: SnapshotDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        <Camera className="w-4 h-4" />
        <span>SNS用画像を作成</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh]">
            <div className="px-4 py-3 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800">SNS投稿画像の生成</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 overflow-y-auto bg-slate-100 flex-1">
              {/* SnapshotComposer自体は高さを取るのでそのまま表示 */}
              <div className="h-[500px]">
                <SnapshotComposer measurement={measurement} forecasts={forecasts} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
