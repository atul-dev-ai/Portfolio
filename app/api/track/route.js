import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { UAParser } from "ua-parser-js";

// পরিবর্তন: এখন আমরা সার্ভিস রোল কি ব্যবহার করছি (এটি সুপার পাওয়ার!)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY, // <--- এই লাইনটি খেয়াল করুন
);

export async function POST(request) {
  try {
    const body = await request.json();

    const userAgent = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for") || "Unknown";
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    const city = request.headers.get("x-vercel-ip-city") || "Unknown";

    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // সার্ভিস রোল থাকায় RLS বাইপাস করে সরাসরি ইনসার্ট হবে
    const { error } = await supabase.from("visits").insert({
      country: country,
      city: city,
      browser: result.browser.name || "Unknown",
      os: result.os.name || "Unknown",
      device: result.device.type || "Desktop",
      ip_address: ip,
      path: body.path,
    });

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
