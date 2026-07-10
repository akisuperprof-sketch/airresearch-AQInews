import { mockMajorCities, mockTokyoWards } from "./mockData";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/server";

export async function getSummaryData() {
  const useMock = process.env.USE_MOCK_DATA === "true" || !isSupabaseConfigured();

  if (useMock) {
    return { data: mockMajorCities, fallback: true };
  }

  try {
    const { data, error } = await supabase
      .from("air_measurements_current")
      .select(`
        *,
        location:locations!inner(*)
      `)
      .eq("location.area_group", "major_cities")
      .order("location.sort_order", { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      return { data: mockMajorCities, fallback: true };
    }

    const formattedData = data.map((d: any) => ({
      id: d.location.slug,
      name: d.location.name,
      score: d.score,
      airType: d.air_type,
      subType: d.sub_type,
      comment: d.comment,
      actionSigns: d.action_signs,
      dataQuality: d.data_quality,
      updatedAt: d.observed_at,
      stationName: d.location.station_name,
      sourceLabel: process.env.NEXT_PUBLIC_DATA_SOURCE_LABEL || "環境省そらまめ君速報値",
      pm25: d.pm25,
      ox: d.ox,
      no2: d.no2,
    }));

    return { data: formattedData, fallback: false };
  } catch (error) {
    console.error("Failed to fetch summary data from DB:", error);
    return { data: mockMajorCities, fallback: true, error: "DB Error" };
  }
}

export async function getTokyoData() {
  const useMock = process.env.USE_MOCK_DATA === "true" || !isSupabaseConfigured();

  if (useMock) {
    return { data: mockTokyoWards, fallback: true };
  }

  try {
    const { data, error } = await supabase
      .from("air_measurements_current")
      .select(`
        *,
        location:locations!inner(*)
      `)
      .eq("location.area_group", "tokyo_wards")
      .order("location.sort_order", { ascending: true });

    if (error) throw error;

    if (!data || data.length === 0) {
      return { data: mockTokyoWards, fallback: true };
    }

    const formattedData = data.map((d: any) => ({
      id: d.location.slug,
      name: d.location.name,
      score: d.score,
      airType: d.air_type,
      subType: d.sub_type,
      comment: d.comment,
      actionSigns: d.action_signs,
      dataQuality: d.data_quality,
      updatedAt: d.observed_at,
      stationName: d.location.station_name,
      sourceLabel: process.env.NEXT_PUBLIC_DATA_SOURCE_LABEL || "環境省そらまめ君速報値",
      pm25: d.pm25,
      ox: d.ox,
      no2: d.no2,
    }));

    return { data: formattedData, fallback: false };
  } catch (error) {
    console.error("Failed to fetch tokyo data from DB:", error);
    return { data: mockTokyoWards, fallback: true, error: "DB Error" };
  }
}
