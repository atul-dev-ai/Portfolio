// components/BlogMotionWrapper.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

export default function BlogMotionWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className=""
    >
      {children}
    </motion.div>
  );
}
