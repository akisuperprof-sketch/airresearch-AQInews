-- Create locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  area_group text NOT NULL, -- e.g., 'major_cities', 'tokyo_wards'
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  prefecture text NOT NULL,
  city text,
  lat numeric,
  lng numeric,
  station_id text,
  station_name text,
  station_note text,
  is_active boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create air_measurements_current table
CREATE TABLE IF NOT EXISTS air_measurements_current (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid REFERENCES locations(id) ON DELETE CASCADE,
  observed_at timestamptz NOT NULL,
  fetched_at timestamptz NOT NULL DEFAULT now(),
  pm25 numeric,
  ox numeric,
  no2 numeric,
  spm numeric,
  so2 numeric,
  no numeric,
  nmhc numeric,
  score int,
  air_type text,
  sub_type text,
  dominant_factor text,
  comment text,
  action_signs jsonb,
  raw_json jsonb,
  data_quality text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create fetch_logs table
CREATE TABLE IF NOT EXISTS fetch_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  target text NOT NULL,
  event_type text NOT NULL,
  status text NOT NULL,
  started_at timestamptz DEFAULT now(),
  finished_at timestamptz,
  request_count int DEFAULT 0,
  success_count int DEFAULT 0,
  failed_count int DEFAULT 0,
  error_message text,
  detail_json jsonb,
  created_at timestamptz DEFAULT now()
);

-- Create snapshot_logs table
CREATE TABLE IF NOT EXISTS snapshot_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  variant text NOT NULL,
  size text,
  title text,
  generated_at timestamptz DEFAULT now(),
  data_timestamp timestamptz,
  file_name text,
  created_at timestamptz DEFAULT now()
);

-- Insert initial data for locations
-- Major cities
INSERT INTO locations (area_group, name, slug, prefecture, station_name, sort_order)
VALUES
  ('major_cities', '東京', 'tokyo', '東京都', '新宿局', 1),
  ('major_cities', '大阪', 'osaka', '大阪府', '梅田局', 2),
  ('major_cities', '名古屋', 'nagoya', '愛知県', '栄局', 3)
ON CONFLICT (slug) DO NOTHING;

-- Tokyo wards
INSERT INTO locations (area_group, name, slug, prefecture, city, station_name, sort_order)
VALUES
  ('tokyo_wards', '千代田区', 'chiyoda', '東京都', '千代田区', '千代田局', 101),
  ('tokyo_wards', '中央区', 'chuo', '東京都', '中央区', '中央局', 102),
  ('tokyo_wards', '港区', 'minato', '東京都', '港区', '港局', 103),
  ('tokyo_wards', '新宿区', 'shinjuku', '東京都', '新宿区', '新宿局', 104),
  ('tokyo_wards', '文京区', 'bunkyo', '東京都', '文京区', '文京局', 105),
  ('tokyo_wards', '台東区', 'taito', '東京都', '台東区', '台東局', 106),
  ('tokyo_wards', '墨田区', 'sumida', '東京都', '墨田区', '墨田局', 107),
  ('tokyo_wards', '江東区', 'koto', '東京都', '江東区', '江東局', 108),
  ('tokyo_wards', '品川区', 'shinagawa', '東京都', '品川区', '品川局', 109),
  ('tokyo_wards', '目黒区', 'meguro', '東京都', '目黒区', '目黒局', 110),
  ('tokyo_wards', '大田区', 'ota', '東京都', '大田区', '大田局', 111),
  ('tokyo_wards', '世田谷区', 'setagaya', '東京都', '世田谷区', '世田谷局', 112),
  ('tokyo_wards', '渋谷区', 'shibuya', '東京都', '渋谷区', '渋谷局', 113),
  ('tokyo_wards', '中野区', 'nakano', '東京都', '中野区', '中野局', 114),
  ('tokyo_wards', '杉並区', 'suginami', '東京都', '杉並区', '杉並局', 115),
  ('tokyo_wards', '豊島区', 'toshima', '東京都', '豊島区', '豊島局', 116),
  ('tokyo_wards', '北区', 'kita', '東京都', '北区', '北局', 117),
  ('tokyo_wards', '荒川区', 'arakawa', '東京都', '荒川区', '荒川局', 118),
  ('tokyo_wards', '板橋区', 'itabashi', '東京都', '板橋区', '板橋局', 119),
  ('tokyo_wards', '練馬区', 'nerima', '東京都', '練馬区', '練馬局', 120),
  ('tokyo_wards', '足立区', 'adachi', '東京都', '足立区', '足立局', 121),
  ('tokyo_wards', '葛飾区', 'katsushika', '東京都', '葛飾区', '葛飾局', 122),
  ('tokyo_wards', '江戸川区', 'edogawa', '東京都', '江戸川区', '江戸川局', 123)
ON CONFLICT (slug) DO NOTHING;
