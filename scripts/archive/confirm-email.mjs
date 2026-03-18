import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
    try {
        console.log('Manually confirming email for manan.valid@gmail.com...\n');

        const result = await pool.query(`
      UPDATE auth.users 
      SET email_confirmed_at = NOW()
      WHERE email = 'manan.valid@gmail.com'
      RETURNING id, email, email_confirmed_at
    `);

        if (result.rows.length > 0) {
            console.log('✅ Email confirmed successfully!');
            console.log('  User ID:', result.rows[0].id);
            console.log('  Email:', result.rows[0].email);
            console.log('  Confirmed at:', result.rows[0].email_confirmed_at);
        } else {
            console.log('❌ User not found');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await pool.end();
    }
})();
