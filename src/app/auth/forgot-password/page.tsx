"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Shield, Mail, Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { supabase } from "@/lib/db/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setIsLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
      });

      if (error) throw error;
      
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden selection:bg-blue-500/30">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[440px] px-6 relative z-10"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform duration-500">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              PortfolioForge
              <span className="text-blue-500 text-6xl leading-0">.</span>
            </h1>
          </Link>
          <p className="text-gray-400 mt-4 font-medium tracking-tight">
            Reforge your access keys.
          </p>
        </div>

        {/* Forge Container */}
        <div className="bg-[#121212]/50 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
          {success ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-6"
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                If an account exists for <span className="text-white font-medium">{email}</span>, we've sent
                instructions to reset your password.
              </p>
              <Link href="/auth/login">
                <Button className="w-full h-[56px] rounded-2xl bg-white/5 hover:bg-white/10 text-white font-bold transition-all">
                  Return to Login
                </Button>
              </Link>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 shrink-0" />
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-blue-500 transition-colors" />
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="studio@example.com"
                    required
                    className="bg-white/5 border-white/10 text-white pl-12 h-[56px] rounded-2xl focus:border-blue-500/50 focus:ring-blue-500/10 transition-all placeholder:text-gray-600 font-medium"
                  />
                </div>
              </div>

              {/* Submit */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isLoading || !email}
                  className="w-full h-[56px] rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-base shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Forging Reset Link...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Reset Link</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          )}

          {!success && (
            <div className="mt-8 pt-8 border-t border-white/5 text-center">
              <p className="text-sm text-gray-500 font-medium">
                Remember your password?{" "}
                <Link
                  href="/auth/login"
                  className="text-white hover:text-blue-500 font-bold underline decoration-blue-500/30 underline-offset-4 transition-colors"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
