import { createClient } from "@supabase/supabase-js";

// 環境変数が設定されていない場合でもビルドが落ちないようにフォールバック（Warningを出してmockを利用する前提）
const supabaseUrl = process.env.SUPABASE_URL || "https://placeholder-url.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || "placeholder-key";

// 本番やAPIルートでのみService Role Keyを使う想定だが、今回はMVPとして単一クライアントで構成
export const supabase = createClient(supabaseUrl, supabaseKey);

// DBが正しく設定されているか（フォールバック中でないか）を判定するユーティリティ
export const isSupabaseConfigured = () => {
  return process.env.SUPABASE_URL && process.env.SUPABASE_URL !== "https://your-project.supabase.co";
};
