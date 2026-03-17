import pg from 'pg';
const { Pool } = pg;

const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
    try {
        console.log('🚀 Starting database schema updates...\n');

        // Read SQL file
        const fs = await import('fs/promises');
        const sql = await fs.readFile('./schema-updates.sql', 'utf-8');

        // Execute SQL
        await pool.query(sql);

        console.log('✅ Database schema updated successfully!');
        console.log('   - Added view_count, is_draft, published_at, thumbnail_url columns');
        console.log('   - Added onboarding_goal column to app_users');
        console.log('   - Created performance indexes');
        console.log('   - Updated trigger to auto-confirm emails');

    } catch (error) {
        console.error('❌ Error updating schema:', error);
    } finally {
        await pool.end();
    }
})();
