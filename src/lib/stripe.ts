import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Special check for production environment
const isProduction = process.env.NODE_ENV === 'production';
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL_ENV === 'production' && !process.env.STRIPE_SECRET_KEY;

// We use a lazy initialization pattern to prevent the Stripe SDK from crashing during build time.
let stripeInstance: Stripe | null = null;

export const stripe = {
    get instance() {
        if (!stripeInstance) {
            const key = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder';
            stripeInstance = new Stripe(key, {
                apiVersion: '2025-01-27.acacia' as any,
                typescript: true,
            });
        }
        return stripeInstance;
    },
    // Proxy common methods used in the app
    get checkout() { return this.instance.checkout; },
    get webhooks() { return this.instance.webhooks; },
};

if (isProduction && !stripeSecretKey) {
    console.warn("⚠️  [STRIPE_WARNING] STRIPE_SECRET_KEY is missing. Payment functionality will fail until it is set in project settings.");
}

export const getStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return null;
    }
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
