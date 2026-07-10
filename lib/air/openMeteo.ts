export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: {
    time: string[];
    european_aqi: number[];
    pm2_5: number[];
    pm10: number[];
    ozone: number[];
  };
}

export async function fetchAirQualityForecast(lat: number, lng: number): Promise<OpenMeteoResponse> {
  // Fetch up to 2 days of forecast to ensure we have enough data for the next 12 hours from current time
  const url = `https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lng}&hourly=pm10,pm2_5,ozone,european_aqi&timezone=Asia%2FTokyo&forecast_days=2`;

  const res = await fetch(url, {
    // Open-Meteo allows caching, but we'll cache it in our DB layer mostly. 
    // Here we can use Next.js fetch cache for a short period.
    next: { revalidate: 3600 } 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch from Open-Meteo: ${res.status} ${res.statusText}`);
  }

  const data: OpenMeteoResponse = await res.json();
  return data;
}

// Convert EAQI to our standard air types
export function getAirTypeFromEAQI(eaqi: number): string {
  if (eaqi == null) return "不明";
  if (eaqi <= 20) return "すっきり";
  if (eaqi <= 40) return "おだやか";
  if (eaqi <= 60) return "ひかえめ";
  if (eaqi <= 80) return "もやっと";
  if (eaqi <= 100) return "どんより";
  return "きけん";
}
