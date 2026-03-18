import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
(async () => {
    try {
        const res = await pool.query('SELECT * FROM public.app_users LIMIT 5');
        console.log('App users rows:', res.rows);
    } catch (e) {
        console.error('Error querying app_users:', e);
    } finally {
        await pool.end();
    }
})();
