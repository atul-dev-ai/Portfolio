import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";

// ❌ generateStaticParams এখানে আর রাখা যাবে না, ওটাই এরর দিচ্ছিল।
export const dynamic = "force-dynamic";

export default async function BlogPost({ params }: { params: { id: string } }) {
  // ১. প্যারামস রিজলভ করা (Next.js 15 এর নিয়ম)
  const { id } = await params;

  const supabase = await createClient();

  // ২. নির্দিষ্ট পোস্টটি আনা
  const { data: post, error } = await supabase
    .from("posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !post) {
    return notFound();
  }

  return (
    <article className="container mx-auto px-6 py-32 max-w-4xl min-h-screen">
      <Link
        href="/blog"
        className="text-sm text-gray-400 hover:text-white mb-8 inline-block transition-colors"
      >
        ← Back to all posts
      </Link>

      {/* বড় ইমেজ */}
      {post.image_url && (
        <div className="w-full h-[300px] md:h-[500px] rounded-2xl overflow-hidden mb-10 border border-white/10 bg-gray-900">
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight text-white">
        {post.title}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500 mb-10 border-b border-white/10 pb-8">
        <p>{new Date(post.created_at).toLocaleDateString()}</p>
        <span>•</span>
        <p>By Atul Paul</p>
      </div>

      {/* কন্টেন্ট */}
      <div className="prose prose-lg prose-invert max-w-none whitespace-pre-wrap text-gray-300">
        {post.content}
      </div>
    </article>
  );
}
