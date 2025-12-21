
const fs = require('fs');
const dotenv = require('dotenv');
const config = dotenv.parse(fs.readFileSync('.env.local'));
console.log('SUPABASE_URL:', config.NEXT_PUBLIC_SUPABASE_URL);
