import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // ১. রেসপন্স তৈরি (শুরুতেই)
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // ২. সুপাবেস ক্লায়েন্ট কনফিগারেশন
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          // রিকোয়েস্ট কুকি আপডেট
          request.cookies.set({ name, value, ...options });

          // রেসপন্স অবজেক্ট আবার নতুন করে তৈরি করা (যাতে কুকি সেট হয়)
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          // রিকোয়েস্ট কুকি রিমুভ
          request.cookies.set({ name, value: "", ...options });

          // রেসপন্স অবজেক্ট আপডেট
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({ name, value: "", ...options });
        },
      },
    },
  );

  // ৩. সেশন রিফ্রেশ করা (এটিই আসল ম্যাজিক যা লগইন ধরে রাখে)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ৪. রিডাইরেক্ট রুলস
  const url = request.nextUrl.clone();

  // ক) যদি লগইন করা থাকে এবং আবার লগইন পেজে আসতে চায় -> Dashboard এ পাঠাও
  if (user && (url.pathname === "/login" || url.pathname === "/signup")) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  // খ) যদি লগইন না থাকে এবং প্রোটেক্টেড পেজে যেতে চায় -> Login এ পাঠাও
  if (
    !user &&
    (url.pathname.startsWith("/dashboard") ||
      url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/admin"))
  ) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // ৫. ফাইনাল রেসপন্স রিটার্ন (এটি মিস হলে কুকি সেট হবে না)
  return response;
}

export const config = {
  matcher: [
    /*
     * _next/static বা _next/image ফাইলগুলোকে ইগনোর করা হচ্ছে
     * যাতে আপনার বাটন এবং জাভাস্ক্রিপ্ট ঠিকমতো কাজ করে।
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
