const fs = require('fs');
const content = `NEXT_PUBLIC_SUPABASE_URL=https://cntyiunqbczfkzwhyyqa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNudHlpdW5xYmN6Zmt6d2h5eXFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM5NzUyMDYsImV4cCI6MjA3OTU1MTIwNn0.UocN-K1-ewDrGlKM9178LrW8LSi2EoWZxcghujfovLw
NEXT_PUBLIC_APP_URL=http://localhost:3000
`;
fs.writeFileSync('.env.local', content, 'utf8');
console.log('Fixed .env.local');
