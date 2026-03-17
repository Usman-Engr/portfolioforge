import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
    try {
        console.log('Checking if user can authenticate with Supabase Auth...\n');

        // Check auth.users
        const authCheck = await pool.query(`
      SELECT id, email, encrypted_password, email_confirmed_at, created_at 
      FROM auth.users 
      WHERE email = 'manan.valid@gmail.com'
    `);

        if (authCheck.rows.length > 0) {
            console.log('✅ User found in auth.users:');
            console.log('  ID:', authCheck.rows[0].id);
            console.log('  Email:', authCheck.rows[0].email);
            console.log('  Has password:', authCheck.rows[0].encrypted_password ? 'Yes' : 'No');
            console.log('  Email confirmed:', authCheck.rows[0].email_confirmed_at ? 'Yes' : 'No');
            console.log('  Created:', authCheck.rows[0].created_at);
        } else {
            console.log('❌ User NOT found in auth.users');
        }

        // Check app_users
        const appCheck = await pool.query(`
      SELECT id, email, name, subscription_status 
      FROM public.app_users 
      WHERE email = 'manan.valid@gmail.com'
    `);

        if (appCheck.rows.length > 0) {
            console.log('\n✅ User found in app_users:');
            console.log('  ID:', appCheck.rows[0].id);
            console.log('  Email:', appCheck.rows[0].email);
            console.log('  Name:', appCheck.rows[0].name);
            console.log('  Subscription:', appCheck.rows[0].subscription_status);
        } else {
            console.log('\n❌ User NOT found in app_users');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await pool.end();
    }
})();
