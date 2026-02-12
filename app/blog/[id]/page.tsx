"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);

export default function SinglePost({ params }) {
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // 🔴 আপনার ইমেইল বসান
  const ADMIN_EMAIL = "paulatul@gmail.com";

  useEffect(() => {
    // পোস্ট আনা
    supabase
      .from("posts")
      .select("*")
      .eq("id", params.id)
      .single()
      .then(({ data }) => setPost(data));

    // ইমেইল চেক
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user && user.email === ADMIN_EMAIL) setIsAdmin(true);
    });
  }, [params.id]);

  const handleDelete = async () => {
    if (!confirm("Delete post?")) return;
    await supabase.from("posts").delete().eq("id", params.id);
    router.push("/blog");
  };

  if (!post) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold">{post.title}</h1>
        {isAdmin && (
          <button
            onClick={handleDelete}
            className="bg-red-600 px-4 py-2 rounded font-bold hover:bg-red-700 text-white"
          >
            Delete Post
          </button>
        )}
      </div>
      <p className="text-gray-400 mb-8">
        {new Date(post.created_at).toDateString()}
      </p>
      <div className="prose prose-invert lg:prose-xl">
        <p className="whitespace-pre-wrap">{post.content}</p>
      </div>
    </div>
  );
}
