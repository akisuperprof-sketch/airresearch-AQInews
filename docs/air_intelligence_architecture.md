# AIR Intelligence Architecture

## 概要
AIR Intelligenceは、国内外の大気質・空気に関する最新情報をキュレーションする内部向け機能です。

## コンポーネント構造

### 1. Collector (Data Fetcher)
- `lib/intelligence/sources.ts`: 取得対象の情報源（レジストリ）
- `lib/intelligence/rssParser.ts`: RSS/Atomフィードを取得し、統一フォーマットにパースする層
- MVPでは取得安定性の低い実データソースの代わりに `mock-japan` などのデモソースを定義し、UIへの結合を確認します。

### 2. Filter & Normalizer
- `lib/intelligence/relevance.ts`: 「PM2.5」「黄砂」などのキーワードによる大気質関連ニュースのフィルタリング
- `lib/intelligence/normalizeUrl.ts`: URLからトラッキングパラメータ（`utm_source`等）を除去し、一意なURLを生成する関数

### 3. Deduplication (重複排除)
- SupabaseのDB制約（`article_url` のユニーク制約）を活用。
- 登録時に `ON CONFLICT DO NOTHING` または `upsert` を使い、重複するURLの記事を無視します。

### 4. Database (Supabase)
- `air_intelligence_items` テーブル
  - `id`, `region`, `category`, `title`, `source_name`, `source_id`, `article_url` (UNIQUE), `published_at`, `brief`, `language`, `fetched_at` 等を保持。

### 5. API Layer
- **Client Fetch**: `GET /api/intelligence/latest` (最新の日本・世界各3件を取得)
- **Cron Fetch**: `GET / POST /api/cron/fetch-intelligence` (スケジューラから叩かれ、外部RSSを取得しDBを更新)

### 6. UI Layer
- `app/dashboard/page.tsx`: 既存ダッシュボードの左カラム下部に `AirIntelligenceBrief` を追加。
- `app/intelligence/page.tsx`: 詳細ページ（日本と世界で2カラム、またはスマホで縦積み）。
- サムネイル画像は非表示とし、カテゴリ・タイトル・公開日時・Brief（要約）をテキスト中心で表示します。
- 全てのリンクは `target="_blank" rel="noopener noreferrer"` とします。

## Fallback & Data Quality
- 取得に失敗した場合（ネットワークエラーなど）は、DBにある最新のキャッシュデータを引き続き提供します。
- モックソースを利用したデータは `dataQuality: "demo"` を保持し、画面上に「デモデータ」と明示します。
