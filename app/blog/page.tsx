"use client";
import React from "react";
import { motion } from "framer-motion";

export default function BlogMaintenance() {
  return (
    <div className="min-h-screen bg-[#000000] mt-8 flex items-center justify-center overflow-hidden relative">
      {/* Apple Style Animated Glow Background */}
      <div className="absolute inset-0 z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-600 rounded-full blur-[100px] ml-20"
        />
      </div>

      {/* Main Content Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6"
      >
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-12 rounded-[40px] shadow-2xl max-w-2xl mx-auto">
          {/* Pulsating Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl mx-auto mb-8 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.5)]"
          >
            <span className="text-3xl">🚀</span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tight mb-4">
            Blog is on its way.
          </h1>

          <p className="text-xl text-gray-400 font-light tracking-wide max-w-md mx-auto leading-relaxed">
            We're currently under maintenance to bring you a brand new
            experience. Stay tuned for the big reveal.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4">
            <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <p className="text-xs uppercase tracking-[0.3em] text-blue-500 font-semibold animate-pulse">
              Coming Soon
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
