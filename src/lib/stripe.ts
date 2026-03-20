import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

// Special check for production environment
const isProduction = process.env.NODE_ENV === 'production';
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || process.env.VERCEL_ENV === 'production' && !process.env.STRIPE_SECRET_KEY;

if (isProduction && !stripeSecretKey) {
    if (isBuildPhase) {
        console.warn("⚠️  [STRIPE_WARNING] STRIPE_SECRET_KEY is missing during build. Ensure it is set in Vercel project settings.");
    } else {
        throw new Error("STRIPE_SECRET_KEY is missing in production environment!");
    }
}

export const stripe = new Stripe(stripeSecretKey!, {
    apiVersion: '2025-01-27.acacia' as any, // Use latest or specific version
    typescript: true,
});

export const getStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return null;
    }
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
