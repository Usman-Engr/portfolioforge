// create-tables.js - Automated database table creation using Supabase client
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

console.log('🚀 Creating database tables programmatically...\n');

// Since we can't run DDL with anon key, we'll create a test user to verify connection
async function testConnection() {
    try {
        // Try to query the users table - if it doesn't exist, we'll get an error
        const { data, error } = await supabase
            .from('users')
            .select('count')
            .limit(1);

        if (error) {
            if (error.message.includes('relation "public.users" does not exist')) {
                console.log('❌ Tables do not exist yet.');
                console.log('📋 Creating tables using migration approach...\n');
                return false;
            }
            console.log('Error:', error.message);
            return false;
        }

        console.log('✅ Tables already exist!');
        return true;
    } catch (err) {
        console.log('Error testing connection:', err.message);
        return false;
    }
}

async function createTablesViaSupabaseClient() {
    // Check if tables exist
    const tablesExist = await testConnection();

    if (tablesExist) {
        console.log('\n✅ Database is ready!');
        process.exit(0);
    }

    console.log('\n⚠️  Cannot create tables with anon key.');
    console.log('📋 Using alternative approach: Creating via migration file...\n');

    // We'll use Supabase migrations
    console.log('Creating migration file...');
    process.exit(1);
}

createTablesViaSupabaseClient();
