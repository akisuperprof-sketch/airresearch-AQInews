# Open-Meteo Air Quality API ライセンスおよび帰属要件

本プロジェクト (AIR Research) では、「このあとの空気（12時間予測）」のデータソースとして Open-Meteo Air Quality API を利用します。

## ライセンス (Terms of Use)
- Open-Meteo は非商用（Non-Commercial）利用において、登録不要で無料で使用できます。
- 無料枠（Free API）の制限は **1日あたり 10,000 API calls** です。
- データの再配布や商用利用を行う場合は、コマーシャルプランへの登録が必要です。
- 本プロジェクトはMVP（内部検証用ダッシュボード）であるため、現在の無料枠での利用が可能です。

## 帰属要件 (Attribution)
- Open-Meteo のデータを利用してサービスやアプリケーションを構築する場合、**必ず出典（帰属）を明示する必要があります**。
- リンク先として `https://open-meteo.com/` を明記することが求められています。

### AIR Research での対応
- **ダッシュボード画面**: 「このあとの空気」セクションのデータソース表示に「Open-Meteo Air Quality」と記載し、Open-Meteoへのリンクを設定します。
- **SNS Snapshot（画像生成）**: 生成されるPNG画像内に、小さく「データ予測: Open-Meteo」または「Forecast by Open-Meteo」等の出典情報をレンダリングします。
- **APIフェッチの制限**: クライアント（ブラウザ）から直接Open-Meteoへリクエストを送るのではなく、Next.js Server Layer 経由で取得し、Supabaseの `air_forecasts` テーブルへ保存・キャッシュします。これによりAPIコール数を最小限（例えば1時間に1回程度）に抑え、10,000回/日の制限を安全にクリアします。
