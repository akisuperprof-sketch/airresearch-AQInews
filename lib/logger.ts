export const logger = {
  info: (message: string, meta?: any) => {
    // 開発環境でのみコンソール出力。本番環境では外部ログサービス等への連携を想定
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[INFO] ${message}`, meta ? meta : '');
    }
  },
  warn: (message: string, meta?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[WARN] ${message}`, meta ? meta : '');
    }
  },
  error: (message: string, error?: any) => {
    if (process.env.NODE_ENV !== 'production') {
      console.error(`[ERROR] ${message}`, error ? error : '');
    }
  },
};
