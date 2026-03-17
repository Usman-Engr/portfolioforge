// test-db-connection-v2.mjs - Test connection to app_users
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('\n📝 Testing insert into app_users...');
try {
    const { data, error } = await supabase
        .from('app_users')
        .insert([{
            name: 'Test User',
            email: 'test_new@example.com'
        }])
        .select();

    if (error) {
        console.log('❌ Error inserting into app_users:');
        console.log('   Code:', error.code);
        console.log('   Message:', error.message);
    } else {
        console.log('✅ SUCCESS! app_users table is accessible!');
        console.log('   Data:', data);
    }
} catch (err) {
    console.log('❌ Exception:', err.message);
}
