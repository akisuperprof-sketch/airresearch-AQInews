-- 1. Create air_forecasts table
CREATE TABLE IF NOT EXISTS air_forecasts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  forecast_at timestamptz NOT NULL, -- The target time of the forecast
  fetched_at timestamptz NOT NULL DEFAULT now(),
  european_aqi numeric,
  pm25 numeric,
  pm10 numeric,
  ozone numeric,
  air_type text,
  action_signs jsonb,
  source text DEFAULT 'Open-Meteo',
  model_domain text,
  raw_json jsonb,
  created_at timestamptz DEFAULT now()
);

-- Ensure we only have one forecast per location per hour to allow upserts
CREATE UNIQUE INDEX IF NOT EXISTS air_forecasts_location_time_idx ON air_forecasts (location_id, forecast_at);

-- 2. Update locations with latitude and longitude for Open-Meteo API calls
-- These are approximate coordinates for the representative stations/areas

-- Major Cities
UPDATE locations SET lat = 35.6895, lng = 139.6917 WHERE slug = 'tokyo';
UPDATE locations SET lat = 34.6937, lng = 135.5023 WHERE slug = 'osaka';
UPDATE locations SET lat = 35.1815, lng = 136.9066 WHERE slug = 'nagoya';

-- Tokyo Wards
UPDATE locations SET lat = 35.6940, lng = 139.7536 WHERE slug = 'chiyoda';
UPDATE locations SET lat = 35.6706, lng = 139.7715 WHERE slug = 'chuo';
UPDATE locations SET lat = 35.6581, lng = 139.7515 WHERE slug = 'minato';
UPDATE locations SET lat = 35.6938, lng = 139.7034 WHERE slug = 'shinjuku';
UPDATE locations SET lat = 35.7073, lng = 139.7528 WHERE slug = 'bunkyo';
UPDATE locations SET lat = 35.7126, lng = 139.7800 WHERE slug = 'taito';
UPDATE locations SET lat = 35.7107, lng = 139.8015 WHERE slug = 'sumida';
UPDATE locations SET lat = 35.6728, lng = 139.8174 WHERE slug = 'koto';
UPDATE locations SET lat = 35.6092, lng = 139.7302 WHERE slug = 'shinagawa';
UPDATE locations SET lat = 35.6415, lng = 139.6981 WHERE slug = 'meguro';
UPDATE locations SET lat = 35.5612, lng = 139.7160 WHERE slug = 'ota';
UPDATE locations SET lat = 35.6466, lng = 139.6532 WHERE slug = 'setagaya';
UPDATE locations SET lat = 35.6620, lng = 139.7038 WHERE slug = 'shibuya';
UPDATE locations SET lat = 35.7074, lng = 139.6638 WHERE slug = 'nakano';
UPDATE locations SET lat = 35.6995, lng = 139.6355 WHERE slug = 'suginami';
UPDATE locations SET lat = 35.7263, lng = 139.7155 WHERE slug = 'toshima';
UPDATE locations SET lat = 35.7528, lng = 139.7336 WHERE slug = 'kita';
UPDATE locations SET lat = 35.7360, lng = 139.7835 WHERE slug = 'arakawa';
UPDATE locations SET lat = 35.7511, lng = 139.7088 WHERE slug = 'itabashi';
UPDATE locations SET lat = 35.7356, lng = 139.6517 WHERE slug = 'nerima';
UPDATE locations SET lat = 35.7750, lng = 139.8044 WHERE slug = 'adachi';
UPDATE locations SET lat = 35.7433, lng = 139.8471 WHERE slug = 'katsushika';
UPDATE locations SET lat = 35.7067, lng = 139.8673 WHERE slug = 'edogawa';
