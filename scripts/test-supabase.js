// Test Supabase Connection and Database Setup
// Run with: node scripts/test-supabase.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('🔍 Testing Supabase Connection...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('✓ SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
console.log('✓ SERVICE_ROLE_KEY:', supabaseServiceKey ? '✅ Set' : '❌ Missing');
console.log('');

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('❌ Missing required environment variables!');
    console.log('\nPlease add to .env.local:');
    console.log('NEXT_PUBLIC_SUPABASE_URL=your_url');
    console.log('SUPABASE_SERVICE_ROLE_KEY=your_key');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function testConnection() {
    try {
        // Test 1: Check if we can connect
        console.log('Test 1: Testing connection...');
        const { data, error } = await supabase.from('app_users').select('count').limit(1);

        if (error) {
            if (error.message.includes('relation "app_users" does not exist')) {
                console.log('❌ Table "app_users" does not exist');
                console.log('\n📝 You need to run the database schema!');
                console.log('Run this SQL in your Supabase SQL Editor:');
                console.log('File: supabase-schema.sql\n');
                return false;
            }
            throw error;
        }

        console.log('✅ Connected to Supabase successfully!');
        console.log('✅ Table "app_users" exists\n');

        // Test 2: Check all required tables
        console.log('Test 2: Checking required tables...');
        const tables = ['app_users', 'app_portfolios', 'app_payments'];

        for (const table of tables) {
            const { error } = await supabase.from(table).select('count').limit(1);
            if (error) {
                console.log(`❌ Table "${table}" - ${error.message}`);
            } else {
                console.log(`✅ Table "${table}" exists`);
            }
        }

        console.log('\n✅ All tests passed!');
        console.log('🎉 Supabase is configured correctly!\n');
        return true;

    } catch (error) {
        console.error('❌ Error:', error.message);
        return false;
    }
}

testConnection().then(success => {
    process.exit(success ? 0 : 1);
});
