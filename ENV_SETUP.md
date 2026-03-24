# Environment Variables Setup Guide

## Required Environment Variables

Add these to your `.env.local` file:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3009
NEXTAUTH_SECRET=your_nextauth_secret_here

# Stripe Configuration (for premium features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3009
```

## How to Get These Values

### Supabase Keys

1. Go to https://supabase.com/dashboard
2. Select your project
3. Go to Settings → API
4. Copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` ⚠️ **KEEP THIS SECRET!**

### NextAuth Secret

Generate a random secret:

```bash
openssl rand -base64 32
```

Or use: https://generate-secret.vercel.app/32

### Stripe Keys (Optional - for premium features)

1. Go to https://dashboard.stripe.com
2. Get your API keys from Developers → API keys
3. Use TEST mode keys for development

## ⚠️ Important Notes

- Never commit `.env.local` to git (it's in .gitignore)
- The service role key bypasses Row Level Security - keep it secret!
- Restart your dev server after adding/changing env vars
