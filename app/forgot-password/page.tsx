"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ForgotPasswordComingSoon() {
  return (
    <div className="min-h-screen bg-[#000000] mt-10 flex items-center justify-center overflow-hidden relative">
      {/* Animated Background Glows */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[140px]"
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-purple-600 rounded-full blur-[130px]"
        />
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative z-10 text-center px-4"
      >
        <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/10 p-10 md:p-16 rounded-[48px] shadow-2xl max-w-xl mx-auto">
          {/* Subtle Glow Icon */}
          <div className="w-16 h-16 bg-white/5 rounded-2xl mx-auto mb-10 flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="text-2xl text-blue-400">🔑</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40">
              Forgot Password?
            </span>
          </h1>

          {/* Glowing Feature Text */}
          <div className="relative inline-block">
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-xl md:text-2xl font-light text-blue-400 tracking-wide mb-8 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            >
              Feature is coming soon.
            </motion.p>
          </div>

          <p className="text-gray-500 max-w-xs mx-auto mb-10 leading-relaxed font-light">
            We are refining the security protocols to ensure your account
            remains safe.
          </p>

          {/* Back to Login Button */}
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(255,255,255,0.1)]"
            >
              Back to Login
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="absolute bottom-8 w-full text-center">
        <p className="text-[10px] uppercase tracking-[0.5em] text-gray-700 font-medium">
          Secure Access | Atul Paul 2026
        </p>
      </div>
    </div>
  );
}
