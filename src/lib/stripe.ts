// Mock Stripe implementation to unblock build
// The user doesn't have a Stripe account yet, so we are disabling the real SDK
// and providing dummy methods for now.

export const stripe = {
    checkout: {
        sessions: {
            create: async () => ({ url: '#' }),
        }
    },
    webhooks: {
        constructEvent: () => ({ type: 'mock.event', data: { object: {} } }),
    }
};

export const getStripe = () => {
    return null;
};
