import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { supabase } from "@/lib/db/supabase";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                // Use Supabase Auth to verify credentials
                const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password,
                });

                if (authError || !authData.user) {
                    throw new Error("Invalid email or password");
                }

                // Get user profile from app_users table
                const { data: user, error: userError } = await supabase
                    .from('app_users')
                    .select('*')
                    .eq('id', authData.user.id)
                    .single();

                if (userError || !user) {
                    throw new Error("User profile not found");
                }

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
        strategy: "jwt" as const,
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
