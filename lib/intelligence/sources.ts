import { IntelligenceSource } from "./types";

export const AIR_INTELLIGENCE_SOURCES: IntelligenceSource[] = [
  // JAPAN SOURCES
  {
    id: "moe-japan",
    name: "環境省 報道発表",
    region: "japan",
    url: "https://www.env.go.jp/press/index.html",
    type: "official_index",
    keywords: ["大気", "PM2.5", "黄砂", "オゾン", "排出", "環境", "脱炭素", "CCS", "気候"]
  },
  {
    id: "nies-japan",
    name: "国立環境研究所 (NIES)",
    region: "japan",
    url: "https://www.nies.go.jp/whatsnew/index.html",
    type: "official_index",
    keywords: ["大気", "環境", "観測", "気候", "汚染", "エアロゾル"]
  },
  {
    id: "jma-japan",
    name: "気象庁 報道発表",
    region: "japan",
    url: "https://www.jma.go.jp/jma/press/index.html",
    type: "official_index",
    keywords: ["黄砂", "光化学", "大気", "オゾン", "火山", "気候"]
  },
  
  // GLOBAL SOURCES
  {
    id: "who-global",
    name: "WHO Newsroom",
    region: "global",
    url: "https://www.who.int/news",
    type: "official_index",
    keywords: ["air", "pollution", "climate", "environment", "health"]
  },
  {
    id: "nasa-eo-global",
    name: "NASA Earth Observatory",
    region: "global",
    url: "https://science.nasa.gov/earth/earth-observatory/",
    type: "official_index",
    keywords: ["atmosphere", "smoke", "dust", "wildfire", "climate", "air"]
  },
  {
    id: "eea-global",
    name: "EEA Newsroom",
    region: "global",
    url: "https://www.eea.europa.eu/en/newsroom",
    type: "official_index",
    keywords: ["air", "pollution", "emission", "climate", "pm10", "pm2.5", "ozone"]
  }
];
