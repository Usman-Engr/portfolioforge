"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/Button";
import {
  Menu,
  X,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  Zap,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { data: session, status } = useSession();

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (pathname?.startsWith("/export")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-100 bg-black/50 backdrop-blur-2xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-500">
              <Zap className="w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-xl font-black text-white tracking-tighter">
              PortfolioForge<span className="text-blue-500">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            <Link
              href="/templates"
              className="text-sm font-bold text-gray-400 hover:text-white transition-colors tracking-tight"
            >
              Templates
            </Link>
            {status === "authenticated" ? (
              <div className="flex items-center gap-6">
                <Link
                  href="/dashboard"
                  className="text-sm font-bold text-gray-400 hover:text-white transition-colors tracking-tight"
                >
                  Dashboard
                </Link>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 pl-2 pr-4 py-1.5 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all group"
                  >
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-black text-xs">
                      {session?.user?.name?.[0]?.toUpperCase() ||
                        session?.user?.email?.[0]?.toUpperCase() ||
                        "C"}
                    </div>
                    <span className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors uppercase tracking-widest">
                      {session?.user?.name?.split(" ")[0] || "Studio"}
                    </span>
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute right-0 mt-4 w-64 bg-[#121212] border border-white/10 rounded-[24px] shadow-2xl p-2 z-110"
                      >
                        <div className="px-5 py-4 border-b border-white/5 mb-2">
                          <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">
                            Authenticated
                          </p>
                          <p className="text-sm font-bold text-white truncate">
                            {session?.user?.email}
                          </p>
                        </div>

                        <Link
                          href="/dashboard"
                          className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Control Center
                        </Link>

                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            handleSignOut();
                          }}
                          className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Terminate Session
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/auth/login">
                  <Button
                    variant="ghost"
                    className="text-sm font-bold text-gray-400 hover:text-white"
                  >
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="h-11 px-6 bg-white text-black hover:bg-gray-200 rounded-xl font-black text-sm tracking-tight transition-transform active:scale-95">
                    Join the Forge
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-10 space-y-8 border-t border-white/5"
            >
              <Link
                href="/templates"
                className="block text-2xl font-black text-white hover:text-blue-500 transition-colors uppercase italic"
                onClick={() => setIsOpen(false)}
              >
                Gallery
              </Link>

              {status === "authenticated" ? (
                <>
                  <Link
                    href="/dashboard"
                    className="block text-2xl font-black text-white hover:text-blue-500 transition-colors uppercase italic"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      handleSignOut();
                    }}
                    className="w-full text-left text-2xl font-black text-red-500 hover:text-red-400 transition-colors uppercase italic"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="space-y-4 pt-4">
                  <Link href="/auth/login" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full h-14 rounded-2xl border-white/10 text-white font-black uppercase tracking-widest"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth/signup" onClick={() => setIsOpen(false)}>
                    <Button className="w-full h-14 rounded-2xl bg-white text-black hover:bg-gray-200 font-black uppercase tracking-widest">
                      Start Building
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};
