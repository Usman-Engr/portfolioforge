-- PortfolioForge Database Schema (Direct Postgres Version)

-- Create tables
CREATE TABLE IF NOT EXISTS public.app_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.app_portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.app_users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL,
  data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.app_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.app_users(id) ON DELETE CASCADE,
  stripe_payment_id TEXT NOT NULL UNIQUE,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_app_portfolios_user_id ON public.app_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_app_portfolios_slug ON public.app_portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_app_payments_user_id ON public.app_payments(user_id);

-- Create functions
CREATE OR REPLACE FUNCTION public.increment_views(portfolio_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE public.app_portfolios SET views = views + 1 WHERE slug = portfolio_slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_app_portfolios_updated_at
BEFORE UPDATE ON public.app_portfolios
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Auth Trigger to create user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.app_users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'New User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop trigger if exists to avoid errors on re-run
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS (Optional since we use direct connection, but good practice)
ALTER TABLE public.app_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.app_payments ENABLE ROW LEVEL SECURITY;

-- Replace permissive RLS policies with secure ownership-based policies
DROP POLICY IF EXISTS "Enable all access for app_users" ON public.app_users;
DROP POLICY IF EXISTS "Enable all access for app_portfolios" ON public.app_portfolios;
DROP POLICY IF EXISTS "Enable all access for app_payments" ON public.app_payments;
DROP POLICY IF EXISTS "Users can view own profile" ON public.app_users;
DROP POLICY IF EXISTS "Users can update own profile" ON public.app_users;
DROP POLICY IF EXISTS "System can insert user profiles" ON public.app_users;
DROP POLICY IF EXISTS "Anyone can view published portfolios" ON public.app_portfolios;
DROP POLICY IF EXISTS "Users can insert own portfolios" ON public.app_portfolios;
DROP POLICY IF EXISTS "Users can update own portfolios" ON public.app_portfolios;
DROP POLICY IF EXISTS "Users can delete own portfolios" ON public.app_portfolios;
DROP POLICY IF EXISTS "Users can view own payments" ON public.app_payments;

CREATE POLICY "Users can view own profile"
  ON public.app_users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.app_users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "System can insert user profiles"
  ON public.app_users
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view published portfolios"
  ON public.app_portfolios
  FOR SELECT
  USING (is_published = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert own portfolios"
  ON public.app_portfolios
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own portfolios"
  ON public.app_portfolios
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own portfolios"
  ON public.app_portfolios
  FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments"
  ON public.app_payments
  FOR SELECT
  USING (auth.uid() = user_id);
