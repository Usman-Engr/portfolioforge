'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import { Loader2, AlertCircle } from 'lucide-react';

export default function CheckoutPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { data: session } = useSession();
    const [error, setError] = useState('');

    const templateId = searchParams.get('template');

    useEffect(() => {
        if (!session) {
            router.push(`/auth/login?callbackUrl=/checkout?template=${templateId}`);
            return;
        }

        if (!templateId) {
            router.push('/templates');
            return;
        }

        const initiateCheckout = async () => {
            try {
                const response = await fetch('/api/create-checkout-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        templateId,
                        templateName: templateId === 'gradient-pro' ? 'Gradient Pro' : 'Creative Studio',
                        price: 9.99,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to create checkout session');
                }

                const { url } = await response.json();
                window.location.href = url;
            } catch (err) {
                setError('Something went wrong. Please try again.');
            }
        };

        initiateCheckout();
    }, [session, templateId, router]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Checkout Error</h2>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
                    <button
                        onClick={() => router.push('/templates')}
                        className="text-blue-600 hover:underline"
                    >
                        Return to Templates
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
            >
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Preparing Checkout...
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Please wait while we redirect you to Stripe.
                </p>
            </motion.div>
        </div>
    );
}
