import pg from 'pg';
const { Pool } = pg;
const connectionString = 'postgresql://postgres.cntyiunqbczfkzwhyyqa:SecurePass123!_Supabase@aws-1-ap-south-1.pooler.supabase.com:6543/postgres';
const pool = new Pool({ connectionString, ssl: { rejectUnauthorized: false } });

(async () => {
    try {
        console.log('Checking if portfolio was created...\n');

        const result = await pool.query(`
      SELECT id, user_id, slug, template_id, is_published, created_at, updated_at
      FROM public.app_portfolios
      ORDER BY created_at DESC
      LIMIT 5
    `);

        if (result.rows.length > 0) {
            console.log(`✅ Found ${result.rows.length} portfolio(s):`);
            result.rows.forEach((p, i) => {
                console.log(`\n  Portfolio ${i + 1}:`);
                console.log(`    ID: ${p.id}`);
                console.log(`    User ID: ${p.user_id}`);
                console.log(`    Slug: ${p.slug}`);
                console.log(`    Template: ${p.template_id}`);
                console.log(`    Published: ${p.is_published}`);
                console.log(`    Created: ${p.created_at}`);
            });
        } else {
            console.log('❌ No portfolios found in database');
        }
    } catch (e) {
        console.error('Error:', e);
    } finally {
        await pool.end();
    }
})();
