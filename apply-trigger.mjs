import { readFileSync } from 'fs';
import pg from 'pg';
const { Pool } = pg;

// Use Transaction Pooler connection string (same as before)
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';

const pool = new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

async function applyTrigger() {
    try {
        const sql = readFileSync('init-trigger.sql', 'utf8');
        console.log('Applying trigger SQL...');
        await pool.query(sql);
        console.log('Trigger applied successfully.');
    } catch (err) {
        console.error('Error applying trigger:', err);
    } finally {
        await pool.end();
    }
}

applyTrigger();
