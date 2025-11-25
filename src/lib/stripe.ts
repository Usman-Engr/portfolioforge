import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    typescript: true,
});

export const getStripe = () => {
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
        return null;
    }
    return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
};
