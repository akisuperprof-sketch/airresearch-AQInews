# AIR Intelligence Information Sources

## 実地調査サマリー
ユーザー指示に基づき、RSSに固執せず、公式新着情報一覧やXML、APIからの実データ取得可能性を再調査しました。
AIR Intelligence MVPの要件である「日本3件・世界3件の実データリンク取得」を満たすため、取得方式（Collector Type）を柔軟に構成しています。

### Collector Type の定義
MVPでは以下の3種類のCollectorを利用して実データを取得します。一般サイトの無差別スクレイピングや全文取得は禁止されています。
*   **FeedCollector**: 公式のRSS / Atomフィード
*   **XmlCollector**: 公式の公開XML / JSON（API）
*   **OfficialIndexCollector**: 事前登録した公式新着情報や報道発表一覧から、メタデータ（タイトル、URL、日付、カテゴリ）のみを限定的に抽出。

---

## 調査結果と採用判定

### 日本ソース (Japan)

| Source Name | Official URL | Collector Type | 取得可能項目 | AIR Research関連性 | MVP採用 | 不採用理由 |
|---|---|---|---|---|---|---|
| 環境省 報道発表 | `https://www.env.go.jp/press/` | OfficialIndexCollector | タイトル、URL、カテゴリ等 | 大気環境、PM2.5、黄砂等のキーワードでフィルタ可能 | **採用** | - |
| 国立環境研究所 (NIES) | `https://www.nies.go.jp/whatsnew/` | OfficialIndexCollector | タイトル、URL等 | 大気観測、環境研究等のキーワードでフィルタ可能 | **採用** | - |
| 気象庁 防災情報 | `https://www.jma.go.jp/bosai/info/` | XmlCollector (JSON) | タイトル、URL、発表日時 | 黄砂、光化学スモッグ等（Signal候補として収集可能） | **採用** | - |

### 世界ソース (Global)

| Source Name | Official URL | Collector Type | 取得可能項目 | AIR Research関連性 | MVP採用 | 不採用理由 |
|---|---|---|---|---|---|---|
| NASA Earth Observatory | `https://science.nasa.gov/earth/earth-observatory/` | OfficialIndexCollector | タイトル、URL等 | Natural Events、大気、気候など | **採用** | 旧RSSは統合でリダイレクト。Index抽出で対応 |
| EEA (欧州環境機関) | `https://www.eea.europa.eu/en/newsroom` | OfficialIndexCollector | タイトル、URL等 | 大気汚染、PM10、Ozoneなど | **採用** | RSSがReactルーターの挙動を示すためHTML抽出を主軸に |
| WHO Newsroom | `https://www.who.int/news` | OfficialIndexCollector | タイトル、URL等 | Air quality, pollution, healthなど | **採用** | 公式RSSなし。一覧からの抽出で対応 |
| Copernicus CAMS | `https://atmosphere.copernicus.eu/news` | OfficialIndexCollector | タイトル、URL等 | Air Quality, Emissionsなど | (予備) | 他ソースで3件満たせるためMVPでは予備扱い |

---

## MVPにおける実データソース構成
上記の調査結果から、以下のソース構成で日本3件・世界3件の実データリンク取得を実現します。

**日本 (Japan):**
1. 環境省 報道発表 (OfficialIndexCollector) - キーワード: 大気環境, PM2.5, 黄砂
2. 国立環境研究所 (OfficialIndexCollector) - キーワード: 大気, 環境
3. 気象庁 報道・防災情報 (XmlCollector または OfficialIndexCollector) - キーワード: 黄砂, 光化学

**世界 (Global):**
1. WHO Newsroom (OfficialIndexCollector) - キーワード: Air quality, Pollution
2. NASA Earth Observatory (OfficialIndexCollector) - キーワード: Natural Events, Atmosphere
3. EEA Newsroom (OfficialIndexCollector) - キーワード: Air quality, PM10

※デモデータ（Mock）はネットワーク障害時などのUI fallback用途にのみ限定し、実データ6件の取得を以てMVP完了とします。
