import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
    console.warn('Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
}

if (!supabaseServiceKey) {
    console.warn('Missing SUPABASE_SERVICE_ROLE_KEY environment variable. Admin operations will fail.');
}

// Server-side Supabase client with service role key (bypasses RLS)
// We provide fallback values to prevent build-time/import-time crashes.
// Actual operations will fail if keys are invalid, but this allows the API to return JSON errors instead of crashing with HTML.
export const supabaseAdmin = createClient(
    supabaseUrl!, 
    supabaseServiceKey!, 
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    }
);
