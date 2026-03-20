import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Special check for production environment
const isProduction = process.env.NODE_ENV === 'production';
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL_ENV === 'production' && !process.env.STRIPE_SECRET_KEY;

// Stripe requires a secret key to initialize.
// We provide a placeholder key if it's missing to prevent build-time crashes.
// Real operations will still require a valid key set in Vercel.
const effectiveKey = stripeSecretKey || 'sk_test_placeholder_for_build';

if (isProduction && !stripeSecretKey) {
    console.warn("⚠️  [STRIPE_WARNING] STRIPE_SECRET_KEY is missing. Payment functionality will fail until it is set in project settings.");
}

export const stripe = new Stripe(effectiveKey, {
    apiVersion: '2025-01-27.acacia' as any,
    typescript: true,
});

export const getStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return null;
    }
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
