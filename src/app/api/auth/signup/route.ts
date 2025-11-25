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

        // Use Supabase Auth to sign up the user
        // This will trigger the 'on_auth_user_created' trigger to create the public profile
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    name: name, // Pass name in metadata for the trigger to use
                },
            },
        });

        if (error) {
            console.error('Signup error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }

        if (!data.user) {
            return NextResponse.json(
                { error: 'Failed to create user' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message: 'User created successfully',
                user: {
                    id: data.user.id,
                    name: name,
                    email: data.user.email,
                }
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
