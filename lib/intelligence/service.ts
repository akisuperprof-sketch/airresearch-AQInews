import { supabase } from "../supabase/server";
import { AirIntelligenceItem } from "./types";

export async function saveIntelligenceItems(items: AirIntelligenceItem[]) {
  if (!items || items.length === 0) return { success: true, count: 0 };

  try {
    const { data, error } = await supabase
      .from("air_intelligence_items")
      .upsert(
        items.map(item => ({
          ...item,
          // DB側のデフォルトでnow()が入るが、明示的に入れることも可能
        })),
        { onConflict: "article_url", ignoreDuplicates: true }
      );

    if (error) {
      console.error("Error saving intelligence items:", error);
      return { success: false, error };
    }

    return { success: true, count: items.length };
  } catch (error) {
    console.error("Exception saving intelligence items:", error);
    return { success: false, error };
  }
}

export async function getLatestIntelligence(region: "japan" | "global", limit: number = 3) {
  try {
    const { data, error } = await supabase
      .from("air_intelligence_items")
      .select("*")
      .eq("region", region)
      .order("published_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.error(`Error fetching latest intelligence for ${region}:`, error);
      return [];
    }

    return data as AirIntelligenceItem[];
  } catch (error) {
    console.error(`Exception fetching latest intelligence for ${region}:`, error);
    return [];
  }
}
