"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

/**
 * ১. সুপাবেস কানেকশন (TypeScript Fix)
 * 'as string' ব্যবহার করে নিশ্চিত করা হয়েছে যাতে বিল্ড এরর না আসে।
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ২. ডাটা টাইপ ইন্টারফেস
 */
interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  created_at: string;
}

export default function BlogPostDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  /**
   * ৩. সিঙ্গেল পোস্ট ফেচ ফাংশন
   */
  const fetchPost = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      console.error("Post not found:", error?.message);
      // পোস্ট না পাওয়া গেলে আপনি চাইলে অন্য কোথাও পাঠাতে পারেন
    } else {
      setPost(data as Post);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-gray-500 tracking-[0.3em] uppercase text-xs animate-pulse">
          Loading Story...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <p className="text-xl font-light italic text-gray-500">
          Post not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-20 relative overflow-hidden">
      {/* Apple-style Ambient Glow Background */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-12 text-gray-500 hover:text-white transition-colors flex items-center gap-2 group"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          <span className="text-xs uppercase tracking-widest font-medium">
            Back
          </span>
        </button>

        <header className="mb-10">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter leading-tight mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-500">
            <p className="text-[10px] uppercase tracking-widest font-semibold bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              {new Date(post.created_at).toDateString()}
            </p>
            <span className="w-1 h-1 bg-gray-700 rounded-full"></span>
            <p className="text-[10px] uppercase tracking-widest font-semibold">
              Atul Paul
            </p>
          </div>
        </header>

        {/* Content Section with Glassmorphism Effect */}
        <div className="prose prose-invert max-w-none">
          <div className="bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[40px] backdrop-blur-3xl shadow-2xl">
            <p className="text-xl text-gray-300 leading-relaxed font-light whitespace-pre-wrap">
              {post.content}
            </p>
          </div>
        </div>

        {/* Footer Branding */}
        <footer className="mt-20 py-10 text-center border-t border-white/5">
          <p className="text-[10px] text-gray-700 uppercase tracking-[0.6em] font-semibold">
            Atul Paul | Design Redefined 2026
          </p>
        </footer>
      </motion.div>
    </div>
  );
}
