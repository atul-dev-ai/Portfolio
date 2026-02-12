"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { motion, AnimatePresence } from "framer-motion";

// ১. এরর ফিক্স: ভেরিয়েবলের শেষে '!' ব্যবহার করা হয়েছে
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

// ২. ডাটার টাইপ ডিফাইন করা (TypeScript Interface)
interface Post {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<string>("pending");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPosts(activeTab);
  }, [activeTab]);

  // প্যারামিটার টাইপ (status: string) ফিক্স করা হয়েছে
  const fetchPosts = async (status: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("status", status)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
    } else {
      setPosts((data as Post[]) || []);
    }
    setLoading(false);
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from("posts")
      .update({ status: "approved" })
      .eq("id", id);

    if (!error) {
      alert("Post Approved! ✅");
      fetchPosts(activeTab);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    const { error } = await supabase.from("posts").delete().eq("id", id);

    if (!error) {
      alert("Post Deleted! 🗑️");
      fetchPosts(activeTab);
    }
  };

  return (
    <div className="min-h-screen bg-black mt-15 text-white p-6 md:p-12 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto relative z-10">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 tracking-tighter">
            Management
          </h1>
          <p className="text-gray-500 mt-2 font-light tracking-[0.2em] uppercase text-[10px]">
            Administrative Control Center
          </p>
        </header>

        {/* --- Tabs --- */}
        <div className="flex space-x-2 mb-10 bg-white/[0.03] p-1.5 rounded-2xl w-fit border border-white/10 backdrop-blur-3xl shadow-2xl">
          {["pending", "approved"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2.5 rounded-xl font-semibold transition-all duration-500 capitalize ${activeTab === tab ? "bg-white text-black shadow-lg" : "text-gray-500 hover:text-white"}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* --- Post List --- */}
        <div className="grid gap-4">
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-600 tracking-widest uppercase text-xs animate-pulse py-10"
              >
                Syncing with Database...
              </motion.div>
            ) : posts.length === 0 ? (
              <div
                key="empty"
                className="bg-white/[0.02] border border-white/5 p-20 rounded-[40px] text-center"
              >
                <p className="text-gray-600 font-light text-xl italic tracking-tight">
                  No records found in {activeTab}.
                </p>
              </div>
            ) : (
              posts.map((post) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={post.id}
                  className="bg-white/[0.02] backdrop-blur-3xl border border-white/10 p-6 md:p-8 rounded-[30px] flex flex-col md:flex-row justify-between items-start md:items-center group hover:bg-white/[0.04] transition-all duration-500 shadow-2xl"
                >
                  <div className="mb-5 md:mb-0">
                    <h3 className="text-2xl font-semibold text-white tracking-tight mb-2">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4">
                      <p className="text-[10px] text-gray-500 font-medium uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                        {new Date(post.created_at).toDateString()}
                      </p>
                      <span
                        className={`w-2 h-2 rounded-full ${post.status === "approved" ? "bg-green-500" : "bg-yellow-500"}`}
                      ></span>
                    </div>
                  </div>
                  <div className="flex gap-4 w-full md:w-auto">
                    {activeTab === "pending" && (
                      <button
                        onClick={() => handleApprove(post.id)}
                        className="flex-1 md:flex-none bg-white text-black px-8 py-3 rounded-2xl font-bold hover:scale-105 transition-all text-sm"
                      >
                        Approve
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="flex-1 md:flex-none bg-red-500/10 text-red-500 border border-red-500/20 px-8 py-3 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
