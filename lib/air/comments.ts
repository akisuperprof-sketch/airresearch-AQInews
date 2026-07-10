import { AirType } from "./score";

export function getAirComment(airType: AirType): string {
  switch (airType) {
    case "すっきり空気":
      return "今日の空気は比較的すっきりしています。外出や短時間の運動もしやすい状態です。";
    case "おだやか空気":
      return "大きな心配はありません。通常の外出は問題なさそうです。";
    case "もやっと空気":
      return "粒子状物質や光化学Oxがやや気になります。長時間の屋外運動は控えめに。";
    case "ひかえめ空気":
      return "空気状態がやや不安定です。敏感な方は外出や換気の時間を選んでください。";
    case "こもり空気":
      return "空気状態が悪化しています。子どもや高齢者は屋内中心がおすすめです。";
    case "確認中":
    default:
      return "現在、一部データを確認中です。最新の速報値が取得され次第、更新します。";
  }
}
