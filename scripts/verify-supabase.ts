import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Error: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function verifyConnection() {
  console.log('Verifying Supabase connection...');
  try {
    // Try to fetch a non-existent user to check connection
    const { data, error } = await supabase.from('users').select('count', { count: 'exact', head: true });

    if (error) {
      console.error('Connection failed:', error.message);
      process.exit(1);
    }

    console.log('Connection successful!');
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

verifyConnection();
