# AIR Research Phase 1: DB & API Notes

## 概要
Phase 1では、将来的な環境省そらまめ君APIからの実データ取得を見据え、データを保存・配信するためのSupabaseデータベース構造と内部APIの土台を構築しました。
この段階では実際のAPIコールは行わず、DB未設定時は安全にモックデータへフォールバックする機構を備えています。

## 実装内容

### 1. Supabase データベース定義 (`supabase/migrations/00_init.sql`)
以下のテーブルを設計し、初期データ（東京・大阪・名古屋、東京23区のマスターデータ）を投入するSQLを作成しました。
- `locations`: 観測地点マスター
- `air_measurements_current`: 各地点の最新データ（スコア、コメント等）
- `fetch_logs`: API取得バッチの実行履歴
- `snapshot_logs`: SNS用画像生成の履歴

### 2. 内部APIの構築
Server Componentsからデータを取得し、外部からの直接参照を避けるためのAPIルートを作成しました。
- `/api/air/summary`: 3大都市の空気状態を取得
- `/api/air/tokyo`: 東京23区の空気状態を取得
- `/api/admin/fetch-air`: データ手動更新のトリガーAPI（Phase 1ではログ書き込みの土台のみ）
- `/api/admin/snapshot-log`: SnapshotComposerからの画像ダウンロード時にログを保存

### 3. フォールバック機構
環境変数 `USE_MOCK_DATA="true"` または、Supabaseの接続情報が未設定の場合は、APIルートが `mockData.ts` のデモデータを返すように実装しました。
これにより、DBがまだ用意されていないローカル環境でも画面が壊れることなく、これまで通りのUI開発が継続できます。

### 4. フロントエンド（Dashboard）の変更
- `app/dashboard/page.tsx` を Server Component として構成し、内部APIルート（`/api/air/summary`, `/api/air/tokyo`）から `fetch` でデータを取得するように変更しました。

## 次のステップ (Phase 2)
- Supabaseプロジェクトへの実際のSQL流し込みと接続テスト。
- 環境省そらまめ君API（Phase 2）の仕様調査、および `/api/admin/fetch-air` 内での実データフェッチ・パースロジックの実装。
- 取得した実データを元にしたスコア計算と `air_measurements_current` への upsert 処理。
