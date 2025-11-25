import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
    try {
        console.log('Checking auth.users table...');
        const authUsers = await pool.query('SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5');
        console.log('Auth users:', authUsers.rows);

        console.log('\nChecking public.app_users table...');
        const appUsers = await pool.query('SELECT id, email, name, created_at FROM public.app_users ORDER BY created_at DESC LIMIT 5');
        console.log('App users:', appUsers.rows);
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await pool.end();
    }
})();
