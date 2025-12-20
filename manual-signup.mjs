// manual-signup.mjs
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function signUp() {
    console.log('🚀 Attempting manual signup for usman@gmail.com...');
    
    const { data, error } = await supabase.auth.signUp({
        email: 'usman@gmail.com',
        password: 'Password123!', // Strong dummy password
        options: {
            data: {
                name: 'Usman'
            }
        }
    });

    if (error) {
        console.error('❌ Signup failed:', error.message);
    } else {
        console.log('✅ Signup successful!');
        console.log('User ID:', data.user?.id);
        console.log('Email:', data.user?.email);
    }
}

signUp();
