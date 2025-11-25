-- Analytics Tables Migration
-- This migration adds tables for tracking portfolio analytics

-- Table: portfolio_views
-- Tracks individual page views with metadata
CREATE TABLE IF NOT EXISTS portfolio_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP DEFAULT NOW(),
  referrer TEXT,
  device_type VARCHAR(20), -- 'mobile', 'tablet', 'desktop'
  browser VARCHAR(50),
  country VARCHAR(100),
  city VARCHAR(100),
  session_id VARCHAR(255),
  time_spent INTEGER DEFAULT 0, -- seconds spent on page
  created_at TIMESTAMP DEFAULT NOW()
);

-- Table: portfolio_analytics_summary
-- Daily aggregated analytics data for faster queries
CREATE TABLE IF NOT EXISTS portfolio_analytics_summary (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  portfolio_id UUID REFERENCES portfolios(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  avg_time_spent INTEGER DEFAULT 0, -- average seconds
  bounce_rate DECIMAL(5,2) DEFAULT 0.00,
  top_referrer TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(portfolio_id, date)
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_views_portfolio ON portfolio_views(portfolio_id);
CREATE INDEX IF NOT EXISTS idx_views_date ON portfolio_views(viewed_at);
CREATE INDEX IF NOT EXISTS idx_views_session ON portfolio_views(session_id);
CREATE INDEX IF NOT EXISTS idx_summary_portfolio_date ON portfolio_analytics_summary(portfolio_id, date);

-- Row Level Security Policies

-- Enable RLS
ALTER TABLE portfolio_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_analytics_summary ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view analytics for their own portfolios
CREATE POLICY "Users can view their portfolio analytics"
  ON portfolio_views
  FOR SELECT
  USING (
    portfolio_id IN (
      SELECT id FROM portfolios WHERE user_id = auth.uid()
    )
  );

-- Policy: System can insert view records (no auth required for tracking)
CREATE POLICY "Anyone can insert view records"
  ON portfolio_views
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users can view summary for their own portfolios
CREATE POLICY "Users can view their portfolio summary"
  ON portfolio_analytics_summary
  FOR SELECT
  USING (
    portfolio_id IN (
      SELECT id FROM portfolios WHERE user_id = auth.uid()
    )
  );

-- Policy: System can insert/update summary records
CREATE POLICY "System can manage summary records"
  ON portfolio_analytics_summary
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Function: Update analytics summary
-- This function aggregates daily analytics data
CREATE OR REPLACE FUNCTION update_analytics_summary()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO portfolio_analytics_summary (
    portfolio_id,
    date,
    views,
    unique_visitors,
    avg_time_spent,
    bounce_rate,
    top_referrer,
    updated_at
  )
  SELECT
    portfolio_id,
    DATE(viewed_at) as date,
    COUNT(*) as views,
    COUNT(DISTINCT session_id) as unique_visitors,
    AVG(time_spent)::INTEGER as avg_time_spent,
    (COUNT(*) FILTER (WHERE time_spent < 10) * 100.0 / COUNT(*))::DECIMAL(5,2) as bounce_rate,
    MODE() WITHIN GROUP (ORDER BY referrer) as top_referrer,
    NOW() as updated_at
  FROM portfolio_views
  WHERE DATE(viewed_at) = CURRENT_DATE - INTERVAL '1 day'
  GROUP BY portfolio_id, DATE(viewed_at)
  ON CONFLICT (portfolio_id, date)
  DO UPDATE SET
    views = EXCLUDED.views,
    unique_visitors = EXCLUDED.unique_visitors,
    avg_time_spent = EXCLUDED.avg_time_spent,
    bounce_rate = EXCLUDED.bounce_rate,
    top_referrer = EXCLUDED.top_referrer,
    updated_at = NOW();
END;
$$;

-- Add comment to tables
COMMENT ON TABLE portfolio_views IS 'Individual portfolio page views with visitor metadata';
COMMENT ON TABLE portfolio_analytics_summary IS 'Daily aggregated analytics data for portfolios';
