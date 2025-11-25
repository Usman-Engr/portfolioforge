-- Phase 0: Database Schema Updates
-- Add new columns to app_portfolios
ALTER TABLE public.app_portfolios 
ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS is_draft BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS published_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add user goal column for onboarding
ALTER TABLE public.app_users
ADD COLUMN IF NOT EXISTS onboarding_goal TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON public.app_portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON public.app_portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_published ON public.app_portfolios(is_published, published_at);

-- Update trigger to auto-confirm email
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  -- Auto-confirm email (no verification required)
  UPDATE auth.users 
  SET email_confirmed_at = NOW() 
  WHERE id = NEW.id;
  
  -- Insert into app_users
  INSERT INTO public.app_users (id, email, name, subscription_status)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email),
    'free'
  );
  
  RETURN NEW;
END;
$$;

-- Ensure trigger exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
