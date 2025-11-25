import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });
(async () => { try { const res = await pool.query("SELECT tgname FROM pg_trigger WHERE tgrelid = 'auth.users'::regclass"); console.log('Triggers on auth.users:', res.rows); } catch (e) { console.error(e); } finally { await pool.end(); } })();
