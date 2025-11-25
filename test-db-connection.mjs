// test-db-connection.mjs - Test Supabase connection and table access
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Testing Supabase Connection...\n');
console.log('URL:', supabaseUrl);
console.log('Key:', supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'MISSING');

const supabase = createClient(supabaseUrl, supabaseKey);

// Test 1: List all tables
console.log('\n📊 Test 1: Checking table access...');
try {
    const { data, error } = await supabase
        .from('users')
        .select('count');

    if (error) {
        console.log('❌ Error accessing users table:');
        console.log('   Code:', error.code);
        console.log('   Message:', error.message);
        console.log('   Details:', error.details);
        console.log('   Hint:', error.hint);
    } else {
        console.log('✅ Users table accessible!');
        console.log('   Data:', data);
    }
} catch (err) {
    console.log('❌ Exception:', err.message);
}

// Test 2: Try to insert a test user
console.log('\n📝 Test 2: Attempting to insert test user...');
try {
    const { data, error } = await supabase
        .from('users')
        .insert([{
            name: 'Test User',
            email: 'test123@example.com',
            password_hash: '$2a$10$test',
            subscription_status: 'free'
        }])
        .select();

    if (error) {
        console.log('❌ Error inserting user:');
        console.log('   Code:', error.code);
        console.log('   Message:', error.message);
        console.log('   Details:', error.details);
        console.log('   Hint:', error.hint);
    } else {
        console.log('✅ User inserted successfully!');
        console.log('   Data:', data);
    }
} catch (err) {
    console.log('❌ Exception:', err.message);
}

console.log('\n✅ Connection test complete!');
