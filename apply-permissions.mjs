import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
(async () => {
    try {
        console.log('Granting INSERT on public.app_users to authenticator role...');
        await pool.query('GRANT INSERT ON public.app_users TO authenticator;');
        console.log('Setting trigger function as SECURITY DEFINER...');
        await pool.query('ALTER FUNCTION public.handle_new_user() SECURITY DEFINER;');
        console.log('Permissions updated successfully.');
    } catch (e) {
        console.error('Error applying permissions:', e);
    } finally {
        await pool.end();
    }
})();
