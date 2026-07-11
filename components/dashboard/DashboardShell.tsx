"use client";

import { ReactNode, useState } from "react";
import { Cloud, Settings, Share2, Activity, Map, BarChart2, Bell, Sparkles, RefreshCw, Layers, Menu } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen relative font-sans text-slate-900 flex overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-slate-50 -z-20"></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-blue-100/40 via-cyan-50/40 to-transparent -z-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-200/20 blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Side Navigation */}
      <aside className={cn(
        "bg-white/90 backdrop-blur-xl border-r border-slate-200/60 flex flex-col z-40 transition-all duration-300 ease-in-out absolute lg:relative h-full",
        isSidebarOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-20"
      )}>
        <div className="p-4 flex items-center justify-center lg:justify-start lg:px-6 shrink-0 h-16">
          <Link href="/dashboard" className="flex items-center text-cyan-600 gap-2">
            <Cloud className="w-8 h-8 shrink-0" />
            <span className={cn("text-xl font-black tracking-tight", isSidebarOpen ? "block" : "hidden lg:hidden")}>AIR</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar mt-4">
          <NavItem href="/dashboard" icon={Activity} label="ダッシュボード" active expanded={isSidebarOpen} />
          <NavItem href="/intelligence" icon={Sparkles} label="Intelligence" expanded={isSidebarOpen} />
          <NavItem href="/dashboard#tokyo-wards" icon={Map} label="東京23区" expanded={isSidebarOpen} />
          <NavItem href="/dashboard#alerts" icon={Bell} label="アラート" expanded={isSidebarOpen} />
          <div className="pt-4 pb-2 text-center lg:text-left">
            <p className={cn("px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider", isSidebarOpen ? "block" : "hidden lg:hidden")}>
              Tools
            </p>
          </div>
          <NavItem href="/dashboard#air-type-guide" icon={Share2} label="空気タイプ説明" expanded={isSidebarOpen} />
          <NavItem href="#" icon={Settings} label="設定" expanded={isSidebarOpen} />
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10 w-full">
        {/* Header */}
        <header className="bg-white/50 backdrop-blur-md border-b border-slate-200/60 px-4 md:px-6 py-3 flex items-center justify-between sticky top-0 z-20 h-16 shrink-0">
          <div className="flex items-center text-cyan-600 gap-3">
            <button 
              className="lg:hidden p-1.5 -ml-1.5 hover:bg-slate-100 rounded-lg transition-colors text-slate-500"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <Cloud className="w-6 h-6 md:hidden" />
            <span className="font-bold hidden sm:block md:hidden">AIR</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">Command Center</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="hidden sm:block">
              {/* Dummy data, assume primaryCity exists in global context if needed, or pass null if snapshot modal can fetch. Actually SnapshotDialog needs measurement. We'll add it in page.tsx instead, and here just provide a slot or handle it via context.
                  Wait, SnapshotDialog needs measurement and forecasts. It's better to place SnapshotDialog in page.tsx toolbar where LocationSelector is.
              */}
            </div>
            <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors group relative">
              <RefreshCw className="w-5 h-5 group-hover:animate-spin-slow" />
              <span className="absolute -bottom-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">最新に更新</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors group relative">
              <Share2 className="w-5 h-5" />
              <span className="absolute -bottom-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">SNS投稿</span>
            </button>
            <button className="p-2 text-slate-400 hover:text-cyan-600 hover:bg-cyan-50 rounded-full transition-colors group relative">
              <Settings className="w-5 h-5" />
              <span className="absolute -bottom-8 right-0 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap">設定</span>
            </button>
          </div>
        </header>

        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon: Icon, label, active, expanded }: { href: string; icon: any; label: string; active?: boolean; expanded?: boolean }) {
  return (
    <Link
      href={href}
      title={label}
      className={cn(
        "flex items-center py-2.5 font-medium rounded-md transition-colors",
        expanded ? "px-3" : "justify-center px-0 lg:justify-center",
        active 
          ? "bg-cyan-50 text-cyan-700 shadow-sm" 
          : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
      )}
    >
      <Icon className={cn("w-5 h-5 shrink-0", active ? "text-cyan-600" : "text-slate-400", expanded ? "mr-3" : "")} />
      <span className={cn("text-sm whitespace-nowrap overflow-hidden", expanded ? "block" : "hidden lg:hidden")}>{label}</span>
    </Link>
  );
}
