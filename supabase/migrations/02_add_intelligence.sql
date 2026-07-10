-- AIR Intelligence (Phase 2 Additive)

-- 1. Create table
CREATE TABLE IF NOT EXISTS public.air_intelligence_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    region TEXT NOT NULL, -- 'japan' or 'global'
    category TEXT,        -- e.g., 'News', 'Press Release', 'Natural Event'
    title TEXT NOT NULL,
    source_name TEXT NOT NULL,
    article_url TEXT NOT NULL UNIQUE,
    published_at TIMESTAMPTZ,
    brief TEXT,
    language TEXT,        -- 'ja' or 'en'
    data_quality TEXT DEFAULT 'official', -- 'official' or 'demo'
    fetched_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Indexes for performance
CREATE INDEX IF NOT EXISTS idx_intelligence_region ON public.air_intelligence_items(region);
CREATE INDEX IF NOT EXISTS idx_intelligence_published_at ON public.air_intelligence_items(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_intelligence_fetched_at ON public.air_intelligence_items(fetched_at DESC);

-- 3. RLS
ALTER TABLE public.air_intelligence_items ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read access
CREATE POLICY "Allow public read access to air_intelligence_items"
    ON public.air_intelligence_items
    FOR SELECT
    USING (true);

-- Allow service role to insert/update
CREATE POLICY "Allow service_role full access to air_intelligence_items"
    ON public.air_intelligence_items
    FOR ALL
    USING (auth.role() = 'service_role')
    WITH CHECK (auth.role() = 'service_role');
