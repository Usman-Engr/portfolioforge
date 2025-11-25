// scripts/init-db.ts - Database initialization script
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function initializeDatabase() {
    console.log('🚀 Initializing database...\n');

    // Test connection by trying to query users table
    console.log('📊 Checking if tables exist...');
    const { data, error } = await supabase
        .from('users')
        .select('count')
        .limit(1);

    if (error) {
        if (error.message.includes('does not exist') || error.code === 'PGRST116') {
            console.log('❌ Tables do not exist\n');
            console.log('📋 MANUAL SETUP REQUIRED:');
            console.log('   1. Go to: https://supabase.com/dashboard/project/cntyiunqbczfkzwhyyqa/sql');
            console.log('   2. Copy contents of: supabase-schema.sql');
            console.log('   3. Paste and click RUN\n');
            process.exit(1);
        } else {
            console.log('❌ Database error:', error.message);
            process.exit(1);
        }
    }

    console.log('✅ Database tables exist!');
    console.log('✅ Database is ready!\n');
    process.exit(0);
}

initializeDatabase();
