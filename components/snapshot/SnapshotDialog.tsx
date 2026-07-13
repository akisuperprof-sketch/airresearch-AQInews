"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // keydown for ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const modal = mounted && isOpen ? createPortal(
    <div 
      className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden relative flex flex-col max-h-[90vh] sm:max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 py-3 border-b flex justify-between items-center bg-slate-50">
          <h2 className="font-bold text-slate-800">SNS投稿画像の生成</h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-0 sm:p-4 overflow-y-auto bg-slate-100 flex-1">
          <div className="h-auto min-h-[400px]">
            <SnapshotComposer measurement={measurement} forecasts={forecasts} />
          </div>
        </div>
      </div>
    </div>,
    document.body
  ) : null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
      >
        <Camera className="w-4 h-4" />
        <span className="hidden sm:inline">SNS画像作成</span>
        <span className="sm:hidden">SNS画像</span>
      </button>

      {modal}
    </>
  );
}
