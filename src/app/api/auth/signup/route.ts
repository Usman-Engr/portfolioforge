import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';
import { supabaseAdmin } from '@/lib/db/supabase-admin';

export async function POST(request: Request) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email address format' },
                { status: 400 }
            );
        }

        // Password strength: min 8 chars, at least 1 uppercase, 1 number
        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }
        if (!/[A-Z]/.test(password)) {
            return NextResponse.json(
                { error: 'Password must contain at least one uppercase letter' },
                { status: 400 }
            );
        }
        if (!/[0-9]/.test(password)) {
            return NextResponse.json(
                { error: 'Password must contain at least one number' },
                { status: 400 }
            );
        }

        // Check if a profile already exists for this email
        const { data: existingProfile } = await supabaseAdmin
            .from('app_users')
            .select('id')
            .eq('email', email)
            .maybeSingle();

        if (existingProfile) {
            return NextResponse.json(
                { error: 'An account with this email already exists' },
                { status: 409 }
            );
        }

        // Create the Auth User
        const { data, error: authError } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name },
            },
        });

        if (authError) {
            console.error('SUPABASE_AUTH_SIGNUP_ERROR:', authError.message);
            return NextResponse.json(
                { error: authError.message },
                { status: 400 }
            );
        }

        if (!data.user) {
            return NextResponse.json(
                { error: 'User creation failed' },
                { status: 500 }
            );
        }

        // Explicitly create the public profile in app_users using Admin client
        // This bypasses RLS which might prevent the anon client from upserting correctly.
        const { error: profileError } = await supabaseAdmin
            .from('app_users')
            .upsert([
                {
                    id: data.user.id,
                    email: email,
                    name: name,
                    subscription_status: 'free',
                    created_at: new Date().toISOString(),
                }
            ], { onConflict: 'id' });

        if (profileError) {
            console.error('SUPABASE_PROFILE_INSERT_ERROR:', profileError.message);
            // Profile creation failed — the auth user exists but profile doesn't.
            // This would cause login to fail, so we must surface this as an error.
            return NextResponse.json(
                { error: 'Account created but profile setup failed. Please contact support or try signing up again.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: 'Studio account forged successfully.',
                user: {
                    id: data.user.id,
                    name: name,
                    email: data.user.email,
                }
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error('SIGNUP_CATCH_ERROR:', error);
        return NextResponse.json(
            { error: error.message || 'The Forge encountered an internal error.' },
            { status: 500 }
        );
    }
}
