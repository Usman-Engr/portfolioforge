import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    console.error('CRITICAL: STRIPE_SECRET_KEY is missing from environment variables');
    // Using a non-working dummy key just to prevent build crashes, but any API call will fail.
} else if (stripeSecretKey.startsWith('sk_live_') && process.env.NODE_ENV !== 'production') {
    console.warn('WARNING: Using Stripe LIVE key in non-production environment!');
}

export const stripe = new Stripe(stripeSecretKey || 'sk_test_placeholder_error', {
    apiVersion: '2025-01-27.acacia' as any, // Use latest or specific version
    typescript: true,
});

export const getStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return null;
    }
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
