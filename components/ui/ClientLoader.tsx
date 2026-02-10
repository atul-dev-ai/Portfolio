"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import Preloader from "./Preloader";

export default function ClientLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // ১. আগের পাথ মনে রাখার জন্য useRef (এটি লুপ আটকাবে)
  const prevPath = useRef(pathname);

  const [isLoading, setIsLoading] = useState(true);

  // ২. পাথনেম চেঞ্জ হলে লোডিং হবে, কিন্তু শুধু যদি পাথ আসলেই বদলে থাকে
  useEffect(() => {
    if (pathname !== prevPath.current) {
      setIsLoading(true);
      prevPath.current = pathname; // বর্তমান পাথ আপডেট করা হলো
    }
  }, [pathname, searchParams]);

  // ৩. ফাংশনটি মেমোরিতে ধরে রাখা (যাতে বারবার রি-ক্রিয়েট না হয়)
  const handleFinish = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {/* key={pathname} রাখা জরুরি যাতে অ্যানিমেশন রিসেট হয় */}
        {isLoading && <Preloader key={pathname} onFinish={handleFinish} />}
      </AnimatePresence>

      {/* লোডিং শেষ না হওয়া পর্যন্ত কন্টেন্ট হাইড রাখা */}
      <div className={isLoading ? "hidden" : "block"}>{children}</div>
    </>
  );
}
