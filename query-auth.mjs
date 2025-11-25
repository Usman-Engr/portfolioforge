import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
(async () => { try { const res = await pool.query('SELECT id,email,raw_user_meta_data FROM auth.users WHERE email=$1', ['test.user.valid@gmail.com']); console.log('Auth users rows:', res.rows); } catch (e) { console.error('Error querying auth.users', e); } finally { await pool.end(); } })();
