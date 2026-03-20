// verify-user-creation.mjs
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

const email = 'test.user.valid@gmail.com';

console.log(`🔍 Verifying user creation for: ${email}`);

async function verify() {
    // Check app_users table
    const { data, error } = await supabase
        .from('app_users')
        .select('*')
        .eq('email', email);

    if (error) {
        console.log('❌ Error querying app_users:', error.message);
        if (error.code === 'PGRST205') {
            console.log('   ⚠️  Schema cache error still present for app_users table.');
        }
    } else if (data && data.length > 0) {
        console.log('✅ User found in app_users!');
        console.log('   User Data:', data[0]);
    } else {
        console.log('❌ User NOT found in app_users (Trigger might have failed)');
    }
}

verify();
