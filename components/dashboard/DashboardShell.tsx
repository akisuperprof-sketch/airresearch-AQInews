import { ReactNode } from "react";
import { Cloud, Settings, Share2, Activity, Map, BarChart2, Bell, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DashboardShellProps {
  children: ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="min-h-screen relative font-sans text-slate-900 flex overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute inset-0 bg-slate-50 -z-20"></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-blue-100/40 via-cyan-50/40 to-transparent -z-10 pointer-events-none"></div>
      <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-200/20 blur-3xl -z-10 pointer-events-none"></div>
      
      {/* Side Navigation */}
      <aside className="w-64 bg-white/70 backdrop-blur-xl border-r border-slate-200/60 hidden md:flex flex-col z-10">
        <div className="p-6">
          <Link href="/dashboard" className="flex items-center space-x-2 text-cyan-600">
            <Cloud className="w-8 h-8" />
            <span className="text-xl font-black tracking-tight">AIR Research</span>
          </Link>
          <div className="mt-2 text-xs text-slate-400 font-medium tracking-wider">COMMAND CENTER</div>
        </div>
        
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          <NavItem href="/dashboard" icon={Activity} label="ダッシュボード" active />
          <NavItem href="/intelligence" icon={Sparkles} label="Intelligence" />
          <NavItem href="/dashboard#tokyo-wards" icon={Map} label="東京23区" />
          <NavItem href="/dashboard#alerts" icon={Bell} label="アラート" />
          <div className="pt-4 pb-2">
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Tools
            </p>
          </div>
          <NavItem href="/dashboard#air-type-guide" icon={Share2} label="空気タイプ説明" />
          <NavItem href="#" icon={Settings} label="設定" />
        </nav>
        
        <div className="p-4 border-t border-slate-200/60">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">Admin User</span>
              <span className="text-xs text-slate-500">管理者</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 z-10">
        {/* Header */}
        <header className="bg-white/50 backdrop-blur-md border-b border-slate-200/60 px-6 py-4 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center md:hidden text-cyan-600">
            <Cloud className="w-6 h-6 mr-2" />
            <span className="font-bold">AIR Research</span>
          </div>
          <div className="hidden md:block">
            <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-500">Command Center</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="text-xs text-slate-500 hidden sm:block">
              最終更新: {new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' })}
            </div>
            <button className="bg-cyan-50 text-cyan-600 hover:bg-cyan-100 border border-cyan-200 px-3 py-1.5 rounded-md text-sm font-medium transition-colors shadow-sm">
              今すぐ更新
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

function NavItem({ href, icon: Icon, label, active }: { href: string; icon: any; label: string; active?: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors",
        active 
          ? "bg-cyan-50 text-cyan-700 font-semibold shadow-sm" 
          : "text-slate-600 hover:bg-white/60 hover:text-slate-900"
      )}
    >
      <Icon className={cn("w-5 h-5 mr-3", active ? "text-cyan-600" : "text-slate-400")} />
      {label}
    </Link>
  );
}
