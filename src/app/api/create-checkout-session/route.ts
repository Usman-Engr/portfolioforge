import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { templateId, templateName, price } = await req.json();

        if (!templateId || !price) {
            return new NextResponse('Missing required fields', { status: 400 });
        }

        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${templateName} Template`,
                            description: `Lifetime access to the ${templateName} portfolio template`,
                        },
                        unit_amount: Math.round(price * 100), // Convert to cents
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/builder?template=${templateId}&payment=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/templates?canceled=true`,
            metadata: {
                userId: session.user.id,
                templateId: templateId,
            },
        });

        return NextResponse.json({ url: checkoutSession.url });
    } catch (error) {
        console.error('[STRIPE_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
