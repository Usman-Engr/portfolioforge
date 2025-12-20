import { supabase } from './src/lib/db/supabase.js';

async function testConnection() {
    console.log('Testing Supabase Connection...');
    console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    
    try {
        const { data, error } = await supabase.from('app_users').select('count', { count: 'exact', head: true });
        if (error) {
            console.error('Connection failed:', error.message);
        } else {
            console.log('Connection successful! User count:', data);
        }
    } catch (e) {
        console.error('Error during test:', e);
    }
}

testConnection();
