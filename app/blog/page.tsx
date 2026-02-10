import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const supabase = await createClient();

  // 🔥 অপটিমাইজেশন: content বাদ দিয়ে শুধু প্রয়োজনীয় তথ্য আনা হচ্ছে
  const { data: posts, error } = await supabase
    .from("posts")
    .select("id, title, created_at, image_url, content") // content আনছি প্রিভিউয়ের জন্য, তবে লিমিট দিচ্ছি
    .order("created_at", { ascending: false })
    .limit(12); // 🚀 একসাথে মাত্র ১২টা পোস্ট লোড হবে, তাই সুপার ফাস্ট হবে

  if (error) {
    console.log("Supabase Error:", error.message);
  }

  // কন্টেন্টের ছোট প্রিভিউ তৈরি (প্রথম ১০০ অক্ষর)
  const getExcerpt = (text: string) => {
    if (!text) return "";
    return text.length > 100 ? text.substring(0, 100) + "..." : text;
  };

  return (
    <div className="container mx-auto px-6 py-32 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Latest <span className="text-primary">Articles</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts?.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="group flex flex-col border border-white/10 bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all hover:shadow-xl hover:-translate-y-1"
            >
              {/* ইমেজ সেকশন */}
              <div className="relative w-full h-48 bg-gray-900 overflow-hidden">
                {post.image_url ? (
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy" // 🚀 ইমেজ লেজি লোড হবে
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-600">
                    No Image
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 line-clamp-3 mb-4 flex-1">
                  {getExcerpt(post.content)}
                </p>
                <span className="text-xs font-medium text-primary flex items-center gap-1 mt-auto">
                  Read Article <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>

        {(!posts || posts.length === 0) && (
          <p className="text-center text-gray-500 py-10">No posts found.</p>
        )}
      </div>
    </div>
  );
}
