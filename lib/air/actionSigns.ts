import { AirType } from "./score";

export interface ActionSigns {
  goOut: string;
  ventilation: string;
  exercise: string;
  kids: string;
  elderly: string;
  laundry: string;
}

export function getActionSigns(airType: AirType): ActionSigns {
  switch (airType) {
    case "すっきり空気":
      return {
        goOut: "OK",
        ventilation: "OK",
        exercise: "OK",
        kids: "外遊びOK",
        elderly: "散歩OK",
        laundry: "外干しOK",
      };
    case "おだやか空気":
      return {
        goOut: "OK",
        ventilation: "OK",
        exercise: "軽め",
        kids: "外遊びOK",
        elderly: "散歩OK",
        laundry: "外干しOK",
      };
    case "もやっと空気":
      return {
        goOut: "少し様子見",
        ventilation: "短時間",
        exercise: "屋内推奨",
        kids: "短時間",
        elderly: "短め",
        laundry: "早めに取り込み",
      };
    case "ひかえめ空気":
      return {
        goOut: "必要時のみ",
        ventilation: "窓閉め推奨",
        exercise: "屋内推奨",
        kids: "屋内推奨",
        elderly: "今日は控えめ",
        laundry: "室内干し",
      };
    case "こもり空気":
      return {
        goOut: "必要時のみ",
        ventilation: "窓閉め推奨",
        exercise: "屋内推奨",
        kids: "屋内推奨",
        elderly: "今日は控えめ",
        laundry: "室内干し",
      };
    case "確認中":
    default:
      return {
        goOut: "確認中",
        ventilation: "確認中",
        exercise: "確認中",
        kids: "確認中",
        elderly: "確認中",
        laundry: "確認中",
      };
  }
}
