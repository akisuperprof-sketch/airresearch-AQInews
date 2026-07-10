import { AirIntelligenceItem } from "./types";

/**
 * Basic relevance checker to filter out non-air related news if needed.
 * Returns true if no keywords are specified (accept all).
 */
export function isRelevant(title: string, brief?: string, keywords?: string[]): boolean {
  if (!keywords || keywords.length === 0) return true;

  const content = `${title} ${brief || ""}`.toLowerCase();
  
  return keywords.some(keyword => content.includes(keyword.toLowerCase()));
}
