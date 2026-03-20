-- PortfolioForge: app_resumes table migration
-- Added as migration 006 to ensure it's tracked by Supabase CLI

CREATE TABLE IF NOT EXISTS public.app_resumes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.app_users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL DEFAULT 'Untitled Resume',
  template_id TEXT NOT NULL DEFAULT 'resume-classic',
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_app_resumes_user_id ON public.app_resumes(user_id);

-- Trigger for automatic updated_at column
DROP TRIGGER IF EXISTS update_app_resumes_updated_at ON public.app_resumes;
CREATE TRIGGER update_app_resumes_updated_at
BEFORE UPDATE ON public.app_resumes
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE public.app_resumes ENABLE ROW LEVEL SECURITY;

-- Security Policy: Users can only see/edit their own resumes
DROP POLICY IF EXISTS "Users can manage own resumes" ON public.app_resumes;
CREATE POLICY "Users can manage own resumes"
  ON public.app_resumes
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Force PostgREST to reload the schema cache so the table is detected immediately
NOTIFY pgrst, 'reload schema';
