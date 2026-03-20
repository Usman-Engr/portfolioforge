// verify-project-id.mjs
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
console.log('Environment Supabase URL:', supabaseUrl);

const projectId = supabaseUrl ? supabaseUrl.split('.')[0].split('//')[1] : 'UNDEFINED';
console.log('Extracted Project ID:', projectId);

const expectedId = 'cntyiunqbczfkzwhyyqa';
console.log('Expected Project ID (from browser):', expectedId);

if (projectId === expectedId) {
    console.log('✅ Project IDs MATCH!');
} else {
    console.log('❌ Project IDs DO NOT MATCH!');
}
