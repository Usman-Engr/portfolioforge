import { NextResponse } from 'next/server';
import { supabase } from '@/lib/db/supabase';

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

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
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

        // Explicitly create the public profile in app_users
        // This ensures the login 'authorize' function can find the user profile.
        const { error: profileError } = await supabase
            .from('app_users')
            .upsert([
                {
                    id: data.user.id,
                    email: email,
                    name: name,
                    subscription_status: 'free',
                    created_at: new Date().toISOString(),
                }
            ]);

        if (profileError) {
            console.error('SUPABASE_PROFILE_INSERT_ERROR:', profileError.message);
            // We don't fail the whole request if profile exists, but we log it.
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
