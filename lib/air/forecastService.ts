import { supabase, isSupabaseConfigured } from "@/lib/supabase/server";
import { fetchAirQualityForecast, getAirTypeFromEAQI } from "./openMeteo";

export interface AirForecast {
  time: string;
  europeanAqi: number;
  pm25: number;
  pm10: number;
  ozone: number;
  airType: string;
  source: string;
}

export async function getForecastData(locationSlug: string): Promise<{ data: AirForecast[], fallback: boolean }> {
  const useMock = process.env.USE_MOCK_DATA === "true" || !isSupabaseConfigured();

  // 対象エリアの緯度経度を取得 (Supabaseから引くのが理想だが、この関数内で完結させるためDBから取得を試みる)
  let lat = 35.6895; // Default Tokyo
  let lng = 139.6917;
  let locationId = null;

  if (!useMock) {
    const { data: loc } = await supabase.from("locations").select("id, lat, lng").eq("slug", locationSlug).single();
    if (loc) {
      locationId = loc.id;
      if (loc.lat) lat = loc.lat;
      if (loc.lng) lng = loc.lng;
    }
  }

  // Generate fallback/mock data if needed
  const generateMockForecast = () => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    const mockData: AirForecast[] = [];
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getTime() + i * 60 * 60 * 1000);
      let eaqi = 30 + Math.sin(i / 2) * 20; 

      if (locationSlug === "osaka") {
        // Starts around 60 (もやっと), worsens to 90 (どんより)
        eaqi = 60 + i * 2.5; 
      } else if (locationSlug === "nagoya") {
        // Starts around 75 (もやっと), worsens to 105 (きけん)
        eaqi = 75 + i * 2.5; 
      }

      mockData.push({
        time: d.toISOString(),
        europeanAqi: Math.round(eaqi),
        pm25: Math.round(eaqi * 0.4),
        pm10: Math.round(eaqi * 0.6),
        ozone: Math.round(eaqi * 0.8),
        airType: getAirTypeFromEAQI(eaqi),
        source: "Open-Meteo (Demo)"
      });
    }
    return mockData;
  };

  if (useMock || !locationId) {
    return { data: generateMockForecast(), fallback: true };
  }

  try {
    // 1. Fetch from DB
    const nowISO = new Date().toISOString();
    const { data: cachedData, error } = await supabase
      .from("air_forecasts")
      .select("*")
      .eq("location_id", locationId)
      .gte("forecast_at", nowISO)
      .order("forecast_at", { ascending: true })
      .limit(12);

    // If we have enough cached data (e.g., at least 12 hours from now)
    if (cachedData && cachedData.length >= 12) {
      const formatted = cachedData.map(d => ({
        time: d.forecast_at,
        europeanAqi: d.european_aqi,
        pm25: d.pm25,
        pm10: d.pm10,
        ozone: d.ozone,
        airType: d.air_type,
        source: d.source
      }));
      return { data: formatted, fallback: false };
    }

    // 2. Not enough cache, fetch from Open-Meteo
    const rawData = await fetchAirQualityForecast(lat, lng);
    
    // Parse and upsert to DB
    const now = new Date();
    const insertData = [];
    let formattedResult: AirForecast[] = [];
    let matchCount = 0;

    for (let i = 0; i < rawData.hourly.time.length; i++) {
      const forecastTime = new Date(rawData.hourly.time[i]);
      // Only care about now and future
      if (forecastTime >= now || (now.getTime() - forecastTime.getTime()) < 3600000) {
        if (matchCount < 24) { // Save 24 hours to DB for buffer
          const aqi = rawData.hourly.european_aqi[i];
          const forecastRecord = {
            location_id: locationId,
            forecast_at: forecastTime.toISOString(),
            european_aqi: aqi,
            pm25: rawData.hourly.pm2_5[i],
            pm10: rawData.hourly.pm10[i],
            ozone: rawData.hourly.ozone[i],
            air_type: getAirTypeFromEAQI(aqi),
            source: "Open-Meteo Air Quality",
            model_domain: "Japan",
            raw_json: {}
          };
          insertData.push(forecastRecord);

          if (matchCount < 12) { // Return first 12 hours to frontend
            formattedResult.push({
              time: forecastRecord.forecast_at,
              europeanAqi: forecastRecord.european_aqi,
              pm25: forecastRecord.pm25,
              pm10: forecastRecord.pm10,
              ozone: forecastRecord.ozone,
              airType: forecastRecord.air_type,
              source: forecastRecord.source
            });
          }
          matchCount++;
        }
      }
    }

    // Fire and forget upsert (don't block the request)
    supabase.from("air_forecasts").upsert(insertData, { onConflict: "location_id, forecast_at" })
      .then(({ error }) => { if (error) console.error("Error upserting forecasts:", error) });

    return { data: formattedResult, fallback: false };

  } catch (error) {
    console.error("Error in getForecastData:", error);
    return { data: generateMockForecast(), fallback: true };
  }
}
