import { AirType } from "./score";

export function getAirComment(airType: AirType): string {
  switch (airType) {
    case "すっきり空気":
      return "今日の空気は比較的すっきりしています。外出や短時間の運動もしやすい状態です。";
    case "おだやか空気":
      return "大きな心配は少ない空気状態です。換気や外出は通常通りでよさそうです。";
    case "もやっと空気":
      return "少しもやっとした空気です。長時間の屋外運動や換気のタイミングは様子を見てください。";
    case "ひかえめ空気":
      return "空気がやや重たい状態です。屋外運動は軽めにし、換気は短時間がおすすめです。";
    case "こもり空気":
      return "空気状態が悪化しています。屋外活動は控えめにし、子どもや高齢者は無理をしないでください。";
    case "確認中":
    default:
      return "現在、一部データを確認中です。最新の速報値が取得され次第、更新します。";
  }
}
