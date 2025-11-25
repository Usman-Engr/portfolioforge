const fs = require('fs');
const path = require('path');

const content = `# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://cntyiunqbczfkzwhyyqa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudHlpdW5xYmN6Zmt6d2h5eXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzUyMDYsImV4cCI6MjA3OTU1MTIwNn0.UocN-K1-ewDrGlKM9178LrW8LSi2EoWZxcghujfovLw

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=development_secret_key_123

# Google OAuth (Optional - placeholders)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Stripe Configuration (Optional - placeholders)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;

fs.writeFileSync(path.resolve(process.cwd(), '.env.local'), content);
console.log('.env.local updated');
