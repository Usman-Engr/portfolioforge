// verify-direct-db.mjs
import pg from 'pg';
const { Pool } = pg;

// Transaction Pooler connection string (IPv4 compatible)
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

console.log('🔌 Connecting to Postgres via Pooler...');

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function verify() {
    try {
        // List all tables in public schema
        console.log('\n📋 Listing tables in public schema...');
        const resTables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('   Tables:', resTables.rows.map(r => r.table_name));

        // Check auth.users
        console.log('\n🔐 Checking auth.users table...');
        try {
            const resAuth = await pool.query('SELECT id, email, created_at FROM auth.users LIMIT 5');
            console.log(`   Found ${resAuth.rows.length} auth users.`);
            console.log('   Auth Users:', resAuth.rows);
        } catch (e) {
            console.log('   ❌ Error checking auth.users:', e.message);
        }

        // Check app_users again
        console.log('\n📊 Checking app_users table...');
        try {
            const resUsers = await pool.query('SELECT * FROM public.app_users');
            console.log(`   Found ${resUsers.rows.length} users.`);
        } catch (e) {
            console.log('   ❌ Error checking app_users:', e.message);
        }

    } catch (err) {
        console.error('❌ Global Error:', err);
    } finally {
        await pool.end();
    }
}

verify();
