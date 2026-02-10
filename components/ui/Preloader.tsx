"use client"; // এটি বাধ্যতামূলক

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Preloader({ onFinish }: { onFinish: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // এখানে window চেক করার দরকার নেই, কারণ আমরা CSS দিয়ে ফুল স্ক্রিন করছি
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onFinish, 800); // ১০০ হওয়ার পর একটু অপেক্ষা
          return 100;
        }
        return prev + 1;
      });
    }, 20); // লোডিং স্পিড

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <motion.div className="fixed inset-0 z-[9999] bg-black text-white flex flex-col items-center justify-center">
      <h1 className="text-8xl font-bold">{count}%</h1>
      <p className="mt-4 text-gray-400">Loading Portfolio...</p>
    </motion.div>
  );
}
