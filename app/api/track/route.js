import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {UAParser} from "ua-parser-js";

// সুপাবেস ক্লায়েন্ট কনফিগারেশন
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export async function POST(request) {
  try {
    const body = await request.json();

    // ১. হেডার থেকে ইউজার ইনফো নেওয়া
    const userAgent = request.headers.get("user-agent") || "";
    const ip = request.headers.get("x-forwarded-for") || "Unknown";
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    const city = request.headers.get("x-vercel-ip-city") || "Unknown";

    // ২. ব্রাউজার এবং ওএস ডিটেক্ট করা
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    // ৩. ডাটাবেসে ইনসার্ট করা
    const { data, error } = await supabase.from("visits").insert({
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
    console.error("Server Error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
