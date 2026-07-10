import * as cheerio from "cheerio";
import { IntelligenceSource, AirIntelligenceItem } from "./types";
import { normalizeUrl } from "./normalizeUrl";
import { isRelevant } from "./relevance";

export async function fetchFromOfficialIndex(source: IntelligenceSource): Promise<AirIntelligenceItem[]> {
  const items: AirIntelligenceItem[] = [];
  try {
    const res = await fetch(source.url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; AIR_Research_Bot/1.0)" },
      next: { revalidate: 3600 }
    });
    
    if (!res.ok) {
      console.warn(`Failed to fetch ${source.url}: ${res.status}`);
      return [];
    }

    const html = await res.text();
    const $ = cheerio.load(html);

    // Extract all anchor tags
    const links = $("a");
    const seenUrls = new Set<string>();

    links.each((_, el) => {
      const href = $(el).attr("href");
      const text = $(el).text().trim().replace(/\s+/g, " ");

      // Basic heuristic: title must be long enough to be an article title
      if (!href || text.length < 15) return;

      // Avoid structural links
      if (href.startsWith("#") || href.includes("javascript:")) return;

      const fullUrl = normalizeUrl(href, source.url);
      
      // Avoid duplicates from the same page
      if (seenUrls.has(fullUrl)) return;
      seenUrls.add(fullUrl);

      // Check relevance based on keywords
      if (isRelevant(text, "", source.keywords)) {
        // Try to find a date near this link if possible (fallback to now)
        // A robust official index collector would have site-specific selectors, 
        // but for MVP we rely on a generic fallback where published_at might be missing
        let published_at = new Date().toISOString(); 
        
        items.push({
          region: source.region,
          title: text,
          source_name: source.name,
          source_id: source.id,
          article_url: fullUrl,
          published_at,
          data_quality: "official"
        });
      }
    });

    return items;
  } catch (error) {
    console.error(`Error collecting from ${source.name}:`, error);
    return [];
  }
}

export async function collectAllIntelligence(): Promise<AirIntelligenceItem[]> {
  const { AIR_INTELLIGENCE_SOURCES } = await import("./sources");
  const allItems: AirIntelligenceItem[] = [];

  for (const source of AIR_INTELLIGENCE_SOURCES) {
    if (source.type === "official_index") {
      const items = await fetchFromOfficialIndex(source);
      allItems.push(...items);
    }
    // FeedCollector, XmlCollector can be added here
  }

  return allItems;
}
