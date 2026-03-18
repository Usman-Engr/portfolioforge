-- SQL Database Schema for PortfolioForge

-- Instructions:
-- 1. Create a new Supabase project at https://supabase.com
-- 2. Go to SQL Editor in your Supabase dashboard
-- 3. Copy and paste this entire schema
-- 4. Run the query to create all tables and functions

-- Users table (profiles linked to Supabase Auth)
CREATE TABLE IF NOT EXISTS app_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Portfolios table
CREATE TABLE IF NOT EXISTS app_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES app_users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL,
  data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payments table
CREATE TABLE IF NOT EXISTS app_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES app_users(id) ON DELETE CASCADE,
  stripe_payment_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_app_portfolios_user_id ON app_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_app_portfolios_slug ON app_portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_app_payments_user_id ON app_payments(user_id);

-- Function to increment portfolio views
CREATE OR REPLACE FUNCTION increment_views(portfolio_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE app_portfolios
  SET views = views + 1
  WHERE slug = portfolio_slug;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_app_portfolios_updated_at
BEFORE UPDATE ON app_portfolios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE app_payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for app_users table
CREATE POLICY "Users can view own profile"
  ON app_users FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "System can create profiles"
  ON app_users FOR INSERT
  WITH CHECK (true);

-- RLS Policies for app_portfolios table
CREATE POLICY "Anyone can view published portfolios"
  ON app_portfolios FOR SELECT
  USING (is_published = true);

CREATE POLICY "Users can manage own portfolios"
  ON app_portfolios FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for app_payments table
CREATE POLICY "Users can view own payments"
  ON app_payments FOR SELECT
  USING (auth.uid() = user_id);
