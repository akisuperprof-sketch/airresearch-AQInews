import { getAirQualityLevel, AirType, AirSubType } from "./score";
import { getAirComment } from "./comments";
import { getActionSigns, ActionSigns } from "./actionSigns";

export type DataQuality = "live" | "cached" | "partial" | "delayed" | "fallback" | "demo";

export interface AirMeasurement {
  id: string; // location slug
  name: string;
  score: number | null;
  airType: AirType;
  subType: AirSubType;
  comment: string;
  actionSigns: ActionSigns;
  dataQuality: DataQuality;
  updatedAt: string;
  stationName: string;
  sourceLabel: string;
  pm25?: number | null;
  ox?: number | null;
  no2?: number | null;
}

const generateMockMeasurement = (
  id: string,
  name: string,
  score: number,
  stationName: string
): AirMeasurement => {
  const level = getAirQualityLevel(score);
  return {
    id,
    name,
    score,
    airType: level.airType,
    subType: level.subType,
    comment: getAirComment(level.airType),
    actionSigns: getActionSigns(level.airType),
    dataQuality: "demo",
    updatedAt: new Date().toISOString(),
    stationName,
    sourceLabel: process.env.NEXT_PUBLIC_DATA_SOURCE_LABEL || "環境省そらまめ君速報値",
    pm25: Math.floor(Math.random() * 30),
    ox: Math.floor(Math.random() * 60) / 1000,
    no2: Math.floor(Math.random() * 40) / 1000,
  };
};

export const mockMajorCities: AirMeasurement[] = [
  generateMockMeasurement("tokyo", "東京", 88, "新宿局"),
  generateMockMeasurement("osaka", "大阪", 55, "梅田局"), // もやっと空気
  generateMockMeasurement("nagoya", "名古屋", 45, "栄局"), // ひかえめ空気
];

const tokyoWardsList = [
  { slug: "tokyo-ward-chiyoda", name: "千代田区" },
  { slug: "tokyo-ward-chuo", name: "中央区" },
  { slug: "tokyo-ward-minato", name: "港区" },
  { slug: "tokyo-ward-shinjuku", name: "新宿区" },
  { slug: "tokyo-ward-bunkyo", name: "文京区" },
  { slug: "tokyo-ward-taito", name: "台東区" },
  { slug: "tokyo-ward-sumida", name: "墨田区" },
  { slug: "tokyo-ward-koto", name: "江東区" },
  { slug: "tokyo-ward-shinagawa", name: "品川区" },
  { slug: "tokyo-ward-meguro", name: "目黒区" },
  { slug: "tokyo-ward-ota", name: "大田区" },
  { slug: "tokyo-ward-setagaya", name: "世田谷区" },
  { slug: "tokyo-ward-shibuya", name: "渋谷区" },
  { slug: "tokyo-ward-nakano", name: "中野区" },
  { slug: "tokyo-ward-suginami", name: "杉並区" },
  { slug: "tokyo-ward-toshima", name: "豊島区" },
  { slug: "tokyo-ward-kita", name: "北区" },
  { slug: "tokyo-ward-arakawa", name: "荒川区" },
  { slug: "tokyo-ward-itabashi", name: "板橋区" },
  { slug: "tokyo-ward-nerima", name: "練馬区" },
  { slug: "tokyo-ward-adachi", name: "足立区" },
  { slug: "tokyo-ward-katsushika", name: "葛飾区" },
  { slug: "tokyo-ward-edogawa", name: "江戸川区" }
];

export const mockTokyoWards: AirMeasurement[] = tokyoWardsList.map((ward, index) => {
  // ランダムっぽく見せるための擬似的なスコア（30〜95の範囲に分散）
  // 一部注意レベル（ひかえめ、こもり）が出るように調整
  const baseScores = [88, 72, 60, 45, 92, 58, 38, 85, 76, 50];
  const score = baseScores[index % baseScores.length] + (index % 5);
  return generateMockMeasurement(ward.slug, ward.name, score, `${ward.name}局`);
});
