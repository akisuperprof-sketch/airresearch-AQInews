"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { geoMercator, geoPath } from "d3-geo";
import { AirMeasurement } from "@/lib/air/mockData";
import { Loader2 } from "lucide-react";

interface TokyoWardsMapProps {
  measurements: AirMeasurement[];
}

export function TokyoWardsMap({ measurements }: TokyoWardsMapProps) {
  const [geoData, setGeoData] = useState<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const [hoveredWard, setHoveredWard] = useState<AirMeasurement | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetch("/data/tokyo23.geojson")
      .then(res => res.json())
      .then(data => setGeoData(data))
      .catch(err => console.error("Failed to load map data", err));
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const dataMap = useMemo(() => {
    const map = new Map<string, AirMeasurement>();
    measurements.forEach(m => map.set(m.name, m));
    return map;
  }, [measurements]);

  const getColor = (airType: string) => {
    switch (airType) {
      case "すっきり空気": return { fill: "rgba(14, 165, 233, 0.7)", stroke: "rgb(14, 165, 233)", hover: "rgba(14, 165, 233, 0.9)" }; 
      case "おだやか空気": return { fill: "rgba(34, 197, 94, 0.7)", stroke: "rgb(34, 197, 94)", hover: "rgba(34, 197, 94, 0.9)" };
      case "ひかえめ空気": return { fill: "rgba(249, 115, 22, 0.7)", stroke: "rgb(249, 115, 22)", hover: "rgba(249, 115, 22, 0.9)" };
      case "もやっと空気": return { fill: "rgba(234, 179, 8, 0.7)", stroke: "rgb(234, 179, 8)", hover: "rgba(234, 179, 8, 0.9)" };
      case "こもり空気": return { fill: "rgba(239, 68, 68, 0.7)", stroke: "rgb(239, 68, 68)", hover: "rgba(239, 68, 68, 0.9)" };
      default: return { fill: "rgba(148, 163, 184, 0.4)", stroke: "rgb(148, 163, 184)", hover: "rgba(148, 163, 184, 0.6)" };
    }
  };

  const handleMouseMove = (e: React.MouseEvent, measurement?: AirMeasurement) => {
    if (measurement) {
      setHoveredWard(measurement);
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const handleClick = (measurement?: AirMeasurement) => {
    if (!measurement) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("area", measurement.id);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (!geoData) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-slate-50/50 rounded-xl border border-slate-200 h-full min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-600 mb-2" />
        <p className="text-sm text-slate-500">地図データを読み込み中...</p>
      </div>
    );
  }

  const projection = geoMercator().fitSize([dimensions.width, dimensions.height], geoData);
  const pathGenerator = geoPath().projection(projection);
  const currentAreaId = searchParams.get("area");

  return (
    <div 
      className="flex-1 bg-white/40 rounded-xl border border-white/60 shadow-sm relative overflow-hidden h-full flex flex-col" 
      ref={containerRef}
      onMouseLeave={() => setHoveredWard(null)}
    >
      <div className="absolute top-4 left-4 z-10 bg-white/80 backdrop-blur-md px-3 py-2 rounded-lg shadow-sm border border-white">
        <h3 className="font-bold text-slate-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block animate-pulse"></span>
          東京23区 空気状態マップ
        </h3>
        <p className="text-[10px] text-slate-500 mt-1">区をクリックしてエリアを選択</p>
      </div>

      {dimensions.width > 0 && (
        <svg width={dimensions.width} height={dimensions.height} className="absolute inset-0">
          <g>
            {geoData.features.map((feature: any, i: number) => {
              const wardName = feature.properties.ward_ja || "不明";
              const measurement = dataMap.get(wardName);
              const airType = measurement?.airType || "不明";
              const colors = getColor(airType);
              const isHovered = hoveredWard?.name === wardName;
              const isSelected = currentAreaId === measurement?.id;

              return (
                <path
                  key={`ward-${i}`}
                  d={pathGenerator(feature) || ""}
                  fill={isHovered || isSelected ? colors.hover : colors.fill}
                  stroke={isSelected ? "white" : "rgba(255,255,255,0.8)"}
                  strokeWidth={isSelected ? 2.5 : 1}
                  className="transition-all duration-200 cursor-pointer"
                  onMouseMove={(e) => handleMouseMove(e, measurement)}
                  onClick={() => handleClick(measurement)}
                />
              );
            })}
          </g>
        </svg>
      )}

      {hoveredWard && (
        <div 
          className="fixed z-50 pointer-events-none bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl rounded-xl p-3 w-48 text-sm"
          style={{ 
            left: mousePos.x + 15, 
            top: mousePos.y + 15,
            transform: 'translate(0, 0)'
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <span className="font-bold text-slate-800 text-base">{hoveredWard.name}</span>
            <span className="font-mono font-bold text-slate-700 bg-slate-100 px-1.5 py-0.5 rounded">{hoveredWard.score ?? "-"}</span>
          </div>
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: getColor(hoveredWard.airType).stroke }}>
              {hoveredWard.airType}
            </span>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">PM2.5</span>
              <span className="font-medium">{hoveredWard.pm25 ?? "-"} <span className="text-[10px] text-slate-400">μg</span></span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">O3 (光化学Ox)</span>
              <span className="font-medium">{hoveredWard.ox ?? "-"} <span className="text-[10px] text-slate-400">ppm</span></span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-500">コメント</span>
              <span className="font-medium text-slate-700 truncate max-w-[120px]" title={hoveredWard.comment}>{hoveredWard.comment}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
