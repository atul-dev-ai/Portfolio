"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // পেজ লোড হলেই API কল করবে
    const trackVisit = async () => {
      try {
        await fetch("/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ path: pathname }),
        });
        console.log("Tracking visit for:", pathname);
      } catch (error) {
        console.error("Tracking failed:", error);
      }
    };

    trackVisit();
  }, [pathname]); // পাথ পরিবর্তন হলেই আবার রান করবে

  return null; // এটি স্ক্রিনে কিছু দেখাবে না
}
