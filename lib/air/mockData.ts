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
  generateMockMeasurement("osaka", "大阪", 65, "梅田局"),
  generateMockMeasurement("nagoya", "名古屋", 45, "栄局"),
];

const tokyoWardsList = [
  "千代田区", "中央区", "港区", "新宿区", "文京区", "台東区", "墨田区", "江東区",
  "品川区", "目黒区", "大田区", "世田谷区", "渋谷区", "中野区", "杉並区", "豊島区",
  "北区", "荒川区", "板橋区", "練馬区", "足立区", "葛飾区", "江戸川区"
];

export const mockTokyoWards: AirMeasurement[] = tokyoWardsList.map((ward, index) => {
  // ランダムっぽく見せるための擬似的なスコア
  const score = 40 + (index * 7) % 60;
  return generateMockMeasurement(ward, ward, score, `${ward}局`);
});
