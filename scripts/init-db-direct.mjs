// init-db-direct.mjs
import pg from 'pg';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Transaction Pooler connection string (IPv4 compatible)
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

console.log('🔌 Connecting to Postgres via Pooler...');

const pool = new Pool({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

async function init() {
    try {
        const sqlPath = path.join(__dirname, 'supabase-schema.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('🚀 Executing SQL schema...');
        // Split by semicolon to execute statements individually if needed, 
        // but pg can handle multiple statements in one query usually.
        // However, for better error reporting, let's try one big block first.

        await pool.query(sql);
        console.log('✅ Schema executed successfully!');

        // Verify
        const resTables = await pool.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);
        console.log('   Tables now in public:', resTables.rows.map(r => r.table_name));

    } catch (err) {
        console.error('❌ Error executing schema:', err);
    } finally {
        await pool.end();
    }
}

init();
