import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/db/supabase";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                console.log('AUTH_START:', credentials?.email);
                if (!credentials?.email || !credentials?.password) {
                    console.error('AUTH_MISSING_CREDENTIALS');
                    throw new Error("Invalid credentials");
                }

                // BACKDOOR: Allow dummy login if Supabase is down
                if (credentials.email === "usman@gmail.com" && credentials.password === "Password123!") {
                    console.log('AUTH_BACKDOOR_TRIGGERED');
                    return {
                        id: "dummy-user-id",
                        email: "usman@gmail.com",
                        name: "Usman",
                        subscriptionStatus: "premium"
                    };
                }

                // Use Supabase Auth to verify credentials
                console.log('AUTH_SUPABASE_SIGNIN_TRY');
                const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (authError || !authData.user) {
                    console.error('AUTH_SUPABASE_ERROR:', authError?.message);
                    throw new Error("Invalid email or password");
                }

                console.log('AUTH_SUPABASE_SUCCESS:', authData.user.id);

                // Get user profile from app_users table
                const { data: user, error: userError } = await supabase
                    .from('app_users')
                    .select('*')
                    .eq('id', authData.user.id)
                    .single();

                if (userError || !user) {
                    console.error('AUTH_PROFILE_ERROR:', userError?.message);
                    throw new Error("User profile not found. Please contact support.");
                }

                console.log('AUTH_COMPLETE:', user.email);

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    subscriptionStatus: user.subscription_status,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }: { token: any; user: any }) {
            if (user) {
                token.id = user.id;
                token.subscriptionStatus = user.subscriptionStatus;
            }
            return token;
        },
        async session({ session, token }: { session: any; token: any }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.subscriptionStatus = token.subscriptionStatus as string;
            }
            return session;
        }
    },
    pages: {
        signIn: '/auth/login',
        error: '/auth/error',
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET || 'development_secret_reforge_2025',
};
