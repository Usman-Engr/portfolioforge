"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, useSession } from "next-auth/react";
import {
  Zap,
  Shield,
  Mail,
  Lock,
  User,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const { status } = useSession();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, password });
    setPasswordStrength(calculatePasswordStrength(password));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        const text = await response.text();
        console.error("Non-JSON response:", text);
        setError(
          "The Forge returned an unexpected response. The system might be still waking up."
        );
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        setError(data.error || "Failed to create studio account");
        setIsLoading(false);
        return;
      }

      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(
          "Account created, but entry was denied. Please sign in manually."
        );
        setIsLoading(false);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      setError("The Forge is currently unstable. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] overflow-hidden selection:bg-purple-500/30 py-20">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-[480px] px-6 relative z-10"
      >
        {/* Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:rotate-12 transition-transform duration-500">
              <Zap className="w-6 h-6 text-white fill-current" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tighter">
              PortfolioForge
              <span className="text-purple-500 text-6xl leading-[0]">.</span>
            </h1>
          </Link>
          <p className="text-gray-400 mt-4 font-medium tracking-tight">
            Join 10,000+ creators building the future.
          </p>
        </div>

        {/* Signup Container */}
        <div className="bg-[#121212]/50 backdrop-blur-2xl border border-white/10 rounded-[32px] p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-2xl text-sm font-medium flex items-center gap-2"
                >
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Creative Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Alex Studio"
                  required
                  className="bg-white/5 border-white/10 text-white pl-12 h-[56px] rounded-2xl focus:border-purple-500/50 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 font-medium"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Studio Email
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="alex@studio.com"
                  required
                  className="bg-white/5 border-white/10 text-white pl-12 h-[56px] rounded-2xl focus:border-purple-500/50 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 font-medium"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Secure Key
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-white/5 border-white/10 text-white pl-12 h-[56px] rounded-2xl focus:border-purple-500/50 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 font-medium"
                />
              </div>
              {/* Strength Indicator */}
              {formData.password && (
                <div className="flex gap-1.5 px-1 pt-1">
                  {[1, 2, 3, 4].map((step) => (
                    <div
                      key={step}
                      className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                        passwordStrength >= step
                          ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                          : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Verify Key
              </label>
              <div className="relative group">
                <CheckCircle2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-purple-500 transition-colors" />
                <Input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  placeholder="••••••••"
                  required
                  className="bg-white/5 border-white/10 text-white pl-12 h-[56px] rounded-2xl focus:border-purple-500/50 focus:ring-purple-500/10 transition-all placeholder:text-gray-600 font-medium"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[56px] rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-black text-base shadow-lg shadow-purple-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Forging Portal...</span>
                  </>
                ) : (
                  <>
                    <span>Initialise Account</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </div>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500 font-medium">
              Already a member?{" "}
              <Link
                href="/auth/login"
                className="text-white hover:text-purple-500 font-bold underline decoration-purple-500/30 underline-offset-4 transition-colors"
              >
                Enter Studio
              </Link>
            </p>
          </div>
        </div>

        {/* Footer Link */}
        <div className="text-center mt-8">
          <p className="text-[10px] text-gray-600 uppercase tracking-[0.2em] font-black">
            By entering, you agree to our Terms of Design & Privacy Protocols.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
