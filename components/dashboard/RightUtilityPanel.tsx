"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, X, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

export function RightUtilityPanel({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-1/2 -translate-y-1/2 z-40 bg-white border border-slate-200 shadow-lg p-2.5 rounded-l-xl transition-all duration-300 hover:bg-slate-50 flex items-center gap-2 group",
          isOpen ? "right-80 md:right-96" : "right-0"
        )}
        title="Utility Panel (アラート・ログ・KPI)"
      >
        {isOpen ? (
          <ChevronRight className="w-5 h-5 text-slate-500" />
        ) : (
          <>
            <ChevronLeft className="w-5 h-5 text-slate-500" />
            <Wrench className="w-4 h-4 text-slate-400 group-hover:text-cyan-600 transition-colors" />
          </>
        )}
      </button>

      {/* Backdrop for Mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Panel */}
      <div 
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50 bg-slate-50/95 backdrop-blur-2xl border-l border-white/80 shadow-2xl transition-transform duration-300 ease-in-out w-[85vw] sm:w-80 md:w-96 flex flex-col",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center p-4 border-b border-slate-200/60 bg-white/80 shrink-0 shadow-sm">
          <h2 className="font-bold text-slate-800 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-cyan-600" />
            System Utility
          </h2>
          <button onClick={() => setIsOpen(false)} className="p-1.5 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 custom-scrollbar">
          {children}
        </div>
      </div>
    </>
  );
}
