import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey && process.env.NODE_ENV === 'production') {
    throw new Error("STRIPE_SECRET_KEY is missing!");
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
