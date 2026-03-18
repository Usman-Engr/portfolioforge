// test-auth-signup.mjs
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

console.log('🧪 Testing Supabase Auth SignUp...');

const email = `auth_test_${Date.now()}@example.com`;
const password = 'TestPass123!';

async function testSignup() {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.log('❌ Auth SignUp Error:', error.message);
    } else {
        console.log('✅ Auth SignUp Success!');
        console.log('   User ID:', data.user?.id);
        console.log('   Email:', data.user?.email);
    }
}

testSignup();
