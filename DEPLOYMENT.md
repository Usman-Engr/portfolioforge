# Deployment Guide for PortfolioForge

This guide will walk you through deploying your PortfolioForge application to production.

## Prerequisites

- GitHub account
- Vercel account (free tier is sufficient)
- Supabase account (free tier is sufficient)
- Stripe account (optional, for payment features)

## Step 1: Set Up Supabase Database

1. **Create a Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Fill in project details
   - Wait for project to be created

2. **Run Database Schema**
   - Open your Supabase project
   - Go to SQL Editor
   - Copy the contents of `DATABASE_SETUP.md`
   - Paste and run the SQL query
   - Verify tables are created in the Table Editor

3. **Get API Keys**
   - Go to Project Settings → API
   - Copy `Project URL` (this is your `NEXT_PUBLIC_SUPABASE_URL`)
   - Copy `anon public` key (this is your `NEXT_PUBLIC_SUPABASE_ANON_KEY`)

## Step 2: Set Up Stripe (Optional)

1. **Create Stripe Account**
   - Go to [stripe.com](https://stripe.com)
   - Sign up for an account
   - Complete account setup

2. **Get API Keys**
   - Go to Developers → API keys
   - Copy `Publishable key` (this is your `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`)
   - Copy `Secret key` (this is your `STRIPE_SECRET_KEY`)

3. **Set Up Webhooks**
   - Go to Developers → Webhooks
   - Add endpoint: `https://your-domain.com/api/webhooks/stripe`
   - Select events: `checkout.session.completed`, `customer.subscription.updated`
   - Copy webhook signing secret (this is your `STRIPE_WEBHOOK_SECRET`)

## Step 3: Push to GitHub

1. **Initialize Git** (if not already done)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New Repository"
   - Name it (e.g., "portfolio-builder")
   - Don't initialize with README (we already have one)

3. **Push Code**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/portfolio-builder.git
   git branch -M main
   git push -u origin main
   ```

## Step 4: Deploy to Vercel

1. **Import Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the repository

2. **Configure Project**
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

3. **Add Environment Variables**
   Click "Environment Variables" and add:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXTAUTH_URL=https://your-app.vercel.app
   NEXTAUTH_SECRET=generate_random_secret_here
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   ```

   **Optional (if using Stripe):**
   ```
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   ```

   **Generate NEXTAUTH_SECRET:**
   ```bash
   openssl rand -base64 32
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-app.vercel.app`

## Step 5: Configure Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to your project settings
   - Click "Domains"
   - Add your custom domain (e.g., `portfolioforge.com`)

2. **Update DNS Records**
   - Go to your domain registrar
   - Add DNS records as shown in Vercel
   - Wait for DNS propagation (can take up to 48 hours)

3. **Update Environment Variables**
   - Update `NEXTAUTH_URL` to your custom domain
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy the app

## Step 6: Update Stripe Webhook (if using Stripe)

1. **Update Webhook URL**
   - Go to Stripe Dashboard → Webhooks
   - Update endpoint URL to your production domain
   - `https://your-domain.com/api/webhooks/stripe`

## Step 7: Test Your Deployment

1. **Test Landing Page**
   - Visit your deployed URL
   - Check all sections load correctly
   - Test responsive design on mobile

2. **Test Builder**
   - Navigate to `/builder`
   - Fill in portfolio form
   - Verify all fields work

3. **Test Demo Portfolio**
   - Navigate to `/p/demo`
   - Verify template renders correctly
   - Check all sections display properly

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every pull request

To deploy updates:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

## Monitoring and Analytics

1. **Vercel Analytics**
   - Go to your project → Analytics
   - View page views, performance metrics

2. **Supabase Monitoring**
   - Go to your Supabase project → Database
   - Monitor queries, connections

3. **Stripe Dashboard**
   - Monitor payments, subscriptions
   - View customer data

## Troubleshooting

### Build Fails
- Check build logs in Vercel
- Verify all environment variables are set
- Ensure no TypeScript errors locally

### Database Connection Issues
- Verify Supabase URL and keys
- Check RLS policies are set correctly
- Ensure tables are created

### Stripe Webhook Not Working
- Verify webhook URL is correct
- Check webhook signing secret
- Test with Stripe CLI locally first

## Security Checklist

- [ ] All environment variables are set in Vercel
- [ ] Supabase RLS policies are enabled
- [ ] NEXTAUTH_SECRET is strong and random
- [ ] Stripe webhook secret is configured
- [ ] No sensitive data in client-side code
- [ ] HTTPS is enabled (automatic with Vercel)

## Performance Optimization

1. **Enable Vercel Analytics**
   - Monitor Core Web Vitals
   - Identify slow pages

2. **Optimize Images**
   - Use Next.js Image component
   - Compress images before upload

3. **Database Indexing**
   - Ensure indexes are created (already in schema)
   - Monitor slow queries in Supabase

## Backup and Recovery

1. **Database Backups**
   - Supabase automatically backs up daily
   - Download manual backups from Supabase dashboard

2. **Code Backups**
   - GitHub serves as version control
   - Tag releases for important versions

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review Supabase logs
3. Check browser console for errors
4. Verify environment variables

---

**Congratulations! Your PortfolioForge app is now live! 🎉**
