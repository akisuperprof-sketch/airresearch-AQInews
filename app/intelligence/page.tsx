import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { AirIntelligenceCard } from "@/components/intelligence/AirIntelligenceCard";
import { Sparkles, Globe, MapPin } from "lucide-react";
import { getLatestIntelligence } from "@/lib/intelligence/service";
import { AirIntelligenceItem } from "@/lib/intelligence/types";

export default async function IntelligencePage() {
  // DBから日本と世界の最新情報を取得（Fallbackあり）
  let japanItems = await getLatestIntelligence("japan", 10);
  let globalItems = await getLatestIntelligence("global", 10);

  // フォールバック（API層と同じロジックを直書き、本来は一元化すべきだが今回はMVP）
  const now = new Date().toISOString();
  if (japanItems.length === 0) {
    japanItems = [
      { id: "mock-j1", region: "japan", title: "環境省: 微小粒子状物質(PM2.5)に関する注意喚起", source_name: "環境省 報道発表", article_url: "https://www.env.go.jp/press/", published_at: now, data_quality: "demo" },
      { id: "mock-j2", region: "japan", title: "国立環境研究所: アジア太平洋地域の大気観測網を更新", source_name: "国立環境研究所 (NIES)", article_url: "https://www.nies.go.jp/whatsnew/", published_at: now, data_quality: "demo" },
      { id: "mock-j3", region: "japan", title: "気象庁: 春の黄砂飛来予測についてのお知らせ", source_name: "気象庁 報道発表", article_url: "https://www.jma.go.jp/jma/press/", published_at: now, data_quality: "demo" }
    ];
  }
  
  if (globalItems.length === 0) {
    globalItems = [
      { id: "mock-g1", region: "global", title: "WHO: Global Air Quality Guidelines Updated", source_name: "WHO Newsroom", article_url: "https://www.who.int/news", published_at: now, data_quality: "demo" },
      { id: "mock-g2", region: "global", title: "NASA Earth Observatory: Tracking Wildfire Smoke Across Continents", source_name: "NASA Earth Observatory", article_url: "https://science.nasa.gov/earth/earth-observatory/", published_at: now, data_quality: "demo" },
      { id: "mock-g3", region: "global", title: "EEA: Europe's air quality status 2026 report released", source_name: "EEA Newsroom", article_url: "https://www.eea.europa.eu/en/newsroom", published_at: now, data_quality: "demo" }
    ];
  }

  return (
    <DashboardShell>
      <div className="flex flex-col gap-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-indigo-100 p-2.5 rounded-xl text-indigo-600 shadow-sm">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600">
              AIR Intelligence
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              国内外の公式機関から収集した大気・空気質に関する最新の一次情報
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Japan Section */}
          <section>
            <div className="flex items-center space-x-2 mb-4 border-b border-slate-200/60 pb-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-slate-800">Japan Curation</h2>
            </div>
            <div className="space-y-3">
              {japanItems.map((item, i) => (
                <AirIntelligenceCard key={item.id || i} item={item} />
              ))}
            </div>
          </section>

          {/* Global Section */}
          <section>
            <div className="flex items-center space-x-2 mb-4 border-b border-slate-200/60 pb-2">
              <Globe className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-slate-800">Global Curation</h2>
            </div>
            <div className="space-y-3">
              {globalItems.map((item, i) => (
                <AirIntelligenceCard key={item.id || i} item={item} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </DashboardShell>
  );
}
