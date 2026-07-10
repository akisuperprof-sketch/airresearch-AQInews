export type Region = "japan" | "global";
export type CollectorType = "feed" | "xml" | "official_index";

export interface IntelligenceSource {
  id: string;
  name: string;
  region: Region;
  url: string; // The URL to scrape or fetch
  type: CollectorType;
  keywords?: string[]; // Keywords to filter relevant articles
}

export interface AirIntelligenceItem {
  id?: string;
  region: Region;
  category?: string;
  title: string;
  source_name: string;
  source_id?: string;
  article_url: string;
  published_at?: string; // ISO format string
  brief?: string;
  language?: string;
  data_quality?: "official" | "demo";
  fetched_at?: string;
}
