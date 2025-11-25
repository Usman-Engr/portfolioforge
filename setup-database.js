// setup-database.js - Automated database setup script
const https = require('https');

const SUPABASE_URL = 'https://cntyiunqbczfkzwhyyqa.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudHlpdW5xYmN6Zmt6d2h5eXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzUyMDYsImV4cCI6MjA3OTU1MTIwNn0.UocN-K1-ewDrGlKM9178LrW8LSi2EoWZxcghujfovLw';

const SQL_SCHEMA = `
-- Create tables
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium')),
  stripe_customer_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  template_id TEXT NOT NULL,
  data JSONB NOT NULL,
  is_published BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  stripe_payment_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  status TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_portfolios_user_id ON portfolios(user_id);
CREATE INDEX IF NOT EXISTS idx_portfolios_slug ON portfolios(slug);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);

-- Create functions
CREATE OR REPLACE FUNCTION increment_views(portfolio_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE portfolios SET views = views + 1 WHERE slug = portfolio_slug;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_portfolios_updated_at
BEFORE UPDATE ON portfolios
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (true);
CREATE POLICY "Enable insert for signup" ON users FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (true);
CREATE POLICY "Anyone can view published portfolios" ON portfolios FOR SELECT USING (is_published = true);
CREATE POLICY "Users can create own portfolios" ON portfolios FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update own portfolios" ON portfolios FOR UPDATE USING (true);
CREATE POLICY "Users can delete own portfolios" ON portfolios FOR DELETE USING (true);
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (true);
`;

console.log('🚀 Setting up database...\n');
console.log('Note: This uses the anon key which may not have permissions to run DDL.');
console.log('If this fails, you need to run the SQL manually in Supabase SQL Editor.\n');

const data = JSON.stringify({ query: SQL_SCHEMA });

const options = {
    hostname: 'cntyiunqbczfkzwhyyqa.supabase.co',
    port: 443,
    path: '/rest/v1/rpc/exec_sql',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Length': data.length
    }
};

const req = https.request(options, (res) => {
    let responseData = '';

    res.on('data', (chunk) => {
        responseData += chunk;
    });

    res.on('end', () => {
        console.log(`Status Code: ${res.statusCode}`);
        console.log(`Response: ${responseData}\n`);

        if (res.statusCode === 200 || res.statusCode === 201) {
            console.log('✅ Database setup completed successfully!');
        } else {
            console.log('❌ Database setup failed.');
            console.log('\n📋 MANUAL SETUP REQUIRED:');
            console.log('1. Go to: https://supabase.com/dashboard/project/cntyiunqbczfkzwhyyqa/sql');
            console.log('2. Copy the contents of supabase-schema.sql');
            console.log('3. Paste into SQL Editor');
            console.log('4. Click "Run"');
        }
    });
});

req.on('error', (error) => {
    console.error('❌ Error:', error.message);
    console.log('\n📋 MANUAL SETUP REQUIRED:');
    console.log('1. Go to: https://supabase.com/dashboard/project/cntyiunqbczfkzwhyyqa/sql');
    console.log('2. Copy the contents of supabase-schema.sql');
    console.log('3. Paste into SQL Editor');
    console.log('4. Click "Run"');
});

req.write(data);
req.end();
