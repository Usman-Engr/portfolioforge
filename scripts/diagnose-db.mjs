
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
console.log(`Loading env from: ${envPath}`);

if (fs.existsSync(envPath)) {
    const envConfig = dotenv.parse(fs.readFileSync(envPath));
    for (const k in envConfig) {
        process.env[k] = envConfig[k];
    }
} else {
    console.warn('.env.local file not found!');
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('--- DB Diagnosis ---');
console.log(`URL Present: ${!!supabaseUrl ? 'Yes' : 'No'}`);
console.log(`Service Key Present: ${!!supabaseServiceKey ? 'Yes' : 'No'}`);

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing credentials. Cannot proceed.');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function check() {
    console.log('Checking connection and table "app_portfolios"...');
    // Try check slug logic specifically
    const { data: existing, error: checkError } = await supabase
            .from('app_portfolios')
            .select('id')
            .limit(1);

    if (checkError) {
        console.error('Error connecting or querying table:');
        console.error(JSON.stringify(checkError, null, 2));
    } else {
        console.log('Success! Connection worked. Table exists.');
        console.log('Sample Data:', existing);
    }
}

check();
