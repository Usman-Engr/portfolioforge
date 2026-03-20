import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { supabaseAdmin } from '@/lib/db/supabase-admin';
import { getTemplateCheckoutPriceCents } from '@/lib/billing';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('Stripe-Signature');
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!signature || !webhookSecret) {
        return new NextResponse('Webhook Error: Missing signature or secret', { status: 400 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    if (event.type === 'checkout.session.completed') {
        const userId = session.metadata?.userId;
        const templateId = session.metadata?.templateId;
        const amount = session.amount_total;
        const expectedAmount = templateId ? getTemplateCheckoutPriceCents(templateId) : null;

        if (!userId || !templateId || amount === null || expectedAmount === null) {
            return new NextResponse('Webhook Error: Missing metadata', { status: 400 });
        }

        if (amount !== expectedAmount) {
            return new NextResponse('Webhook Error: Amount mismatch', { status: 400 });
        }

        try {
            // Idempotency: skip duplicate replayed webhooks.
            const { data: existingPurchase, error: checkError } = await supabaseAdmin
                .from('template_purchases')
                .select('id')
                .eq('stripe_payment_id', session.id)
                .maybeSingle();

            if (checkError) {
                console.error('Error checking existing purchase:', checkError);
                return new NextResponse('Database Error', { status: 500 });
            }

            if (existingPurchase) {
                return new NextResponse(null, { status: 200 });
            }

            // Record purchase in database
            const { error } = await supabaseAdmin
                .from('template_purchases')
                .insert({
                    user_id: userId,
                    template_id: templateId,
                    stripe_payment_id: session.id,
                    amount,
                    status: 'completed',
                });

            if (error) {
                console.error('Error recording purchase:', error);
                return new NextResponse('Database Error', { status: 500 });
            }

        } catch (error) {
            console.error('Error processing webhook:', error);
            return new NextResponse('Internal Error', { status: 500 });
        }
    }

    return new NextResponse(null, { status: 200 });
}
