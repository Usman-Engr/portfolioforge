import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
    try {
        console.log('Checking if trigger created app_users entry...\n');

        const result = await pool.query(`
      SELECT 
        au.id,
        au.email,
        au.name,
        au.subscription_status,
        au.created_at,
        u.email as auth_email,
        u.raw_user_meta_data
      FROM public.app_users au
      LEFT JOIN auth.users u ON au.id = u.id
      WHERE au.email = 'manan.valid@gmail.com'
    `);

        if (result.rows.length > 0) {
            console.log('✅ SUCCESS! Trigger worked correctly!');
            console.log('App user entry:', JSON.stringify(result.rows[0], null, 2));
        } else {
            console.log('❌ FAILED! No app_users entry found for manan.valid@gmail.com');
            console.log('Checking auth.users for this email...');
            const authCheck = await pool.query(`
        SELECT id, email, raw_user_meta_data, created_at 
        FROM auth.users 
        WHERE email = 'manan.valid@gmail.com'
      `);
            console.log('Auth user:', JSON.stringify(authCheck.rows[0], null, 2));
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await pool.end();
    }
})();
