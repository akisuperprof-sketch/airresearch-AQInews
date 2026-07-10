export type AirType = 
  | "すっきり空気"
  | "おだやか空気"
  | "もやっと空気"
  | "ひかえめ空気"
  | "こもり空気"
  | "確認中";

export type AirSubType = 
  | "空気晴れ"
  | "空気うす曇り"
  | "空気くもり"
  | "空気もや"
  | "空気注意報"
  | "データ確認中";

export interface AirQualityLevel {
  level: number;
  airType: AirType;
  subType: AirSubType;
}

export function getAirTypeColor(airType: AirType | string) {
  switch (airType) {
    case "すっきり空気": return { fill: "rgba(14, 165, 233, 0.7)", stroke: "rgb(14, 165, 233)", hover: "rgba(14, 165, 233, 0.9)" }; 
    case "おだやか空気": return { fill: "rgba(34, 197, 94, 0.7)", stroke: "rgb(34, 197, 94)", hover: "rgba(34, 197, 94, 0.9)" };
    case "ひかえめ空気": return { fill: "rgba(249, 115, 22, 0.7)", stroke: "rgb(249, 115, 22)", hover: "rgba(249, 115, 22, 0.9)" };
    case "もやっと空気": return { fill: "rgba(234, 179, 8, 0.7)", stroke: "rgb(234, 179, 8)", hover: "rgba(234, 179, 8, 0.9)" };
    case "こもり空気": return { fill: "rgba(239, 68, 68, 0.7)", stroke: "rgb(239, 68, 68)", hover: "rgba(239, 68, 68, 0.9)" };
    default: return { fill: "rgba(148, 163, 184, 0.4)", stroke: "rgb(148, 163, 184)", hover: "rgba(148, 163, 184, 0.6)" };
  }
}

export function getAirQualityLevel(score: number | null): AirQualityLevel {
  if (score === null || isNaN(score)) {
    return { level: 0, airType: "確認中", subType: "データ確認中" };
  }
  
  if (score >= 85) {
    return { level: 5, airType: "すっきり空気", subType: "空気晴れ" };
  } else if (score >= 70) {
    return { level: 4, airType: "おだやか空気", subType: "空気うす曇り" };
  } else if (score >= 55) {
    return { level: 3, airType: "もやっと空気", subType: "空気くもり" };
  } else if (score >= 40) {
    return { level: 2, airType: "ひかえめ空気", subType: "空気もや" };
  } else {
    return { level: 1, airType: "こもり空気", subType: "空気注意報" };
  }
}

// 暫定的なスコア計算関数（PM2.5, Ox, NO2などの値から算出する想定）
export function calculateAirScore(pm25?: number | null, ox?: number | null, no2?: number | null): number | null {
  // 実データ取得前のため、ダミーロジック。
  // 引数がすべてnull/undefinedの場合はnullを返す
  if (pm25 == null && ox == null && no2 == null) {
    return null;
  }
  
  // 今はモックデータ側でscoreを直接持つように設計するため、この関数は将来のAPI接続時に充実させる
  return 85; // ダミー値
}
