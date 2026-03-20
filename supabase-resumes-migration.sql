-- PortfolioForge: app_resumes table migration
-- Run this in your Supabase SQL editor

CREATE TABLE IF NOT EXISTS public.app_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.app_users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template_id TEXT NOT NULL DEFAULT 'resume-classic',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_app_resumes_user_id ON public.app_resumes(user_id);

-- Trigger for updated_at
CREATE TRIGGER update_app_resumes_updated_at
BEFORE UPDATE ON public.app_resumes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.app_resumes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own resumes"
  ON public.app_resumes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Force PostgREST to reload the schema cache
NOTIFY pgrst, 'reload schema';
