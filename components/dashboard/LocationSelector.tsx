"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useCallback } from "react";

const areas = [
  { id: "tokyo", name: "東京", group: "主要都市" },
  { id: "osaka", name: "大阪", group: "主要都市" },
  { id: "nagoya", name: "名古屋", group: "主要都市" },
  { id: "tokyo-ward-chiyoda", name: "千代田区", group: "東京23区" },
  { id: "tokyo-ward-chuo", name: "中央区", group: "東京23区" },
  { id: "tokyo-ward-minato", name: "港区", group: "東京23区" },
  { id: "tokyo-ward-shinjuku", name: "新宿区", group: "東京23区" },
  { id: "tokyo-ward-shibuya", name: "渋谷区", group: "東京23区" },
  { id: "tokyo-ward-shinagawa", name: "品川区", group: "東京23区" },
  { id: "tokyo-ward-meguro", name: "目黒区", group: "東京23区" },
  { id: "tokyo-ward-ota", name: "大田区", group: "東京23区" },
  { id: "tokyo-ward-setagaya", name: "世田谷区", group: "東京23区" },
  { id: "tokyo-ward-nakano", name: "中野区", group: "東京23区" },
  { id: "tokyo-ward-suginami", name: "杉並区", group: "東京23区" },
  { id: "tokyo-ward-toshima", name: "豊島区", group: "東京23区" },
];

export function LocationSelector({ currentArea = "tokyo" }: { currentArea?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSelect = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newArea = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set("area", newArea);
    router.push(`${pathname}?${params.toString()}`);
  }, [router, pathname, searchParams]);

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="area-select" className="text-sm font-medium text-slate-500 whitespace-nowrap">
        エリア選択
      </label>
      <select
        id="area-select"
        value={currentArea}
        onChange={handleSelect}
        className="form-select block w-40 rounded-full border-slate-200 bg-white/60 backdrop-blur-md shadow-sm focus:border-cyan-500 focus:ring-cyan-500 text-slate-700 transition-all cursor-pointer hover:bg-white/80"
      >
        <optgroup label="主要都市">
          {areas.filter(a => a.group === "主要都市").map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </optgroup>
        <optgroup label="東京23区">
          {areas.filter(a => a.group === "東京23区").map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}
