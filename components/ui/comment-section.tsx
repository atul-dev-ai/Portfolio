"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface CommentSectionProps {
  postId: number;
}

export function CommentSection({ postId }: CommentSectionProps) {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // ১. ইউজার এবং কমেন্ট লোড করা
  useEffect(() => {
    const fetchData = async () => {
      // ইউজার চেক
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);

      // কমেন্ট লোড (Join profiles to get email/name)
      const { data, error } = await supabase
        .from("comments")
        .select("*, profiles(email)")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (error) console.error("Error loading comments:", error);
      else setComments(data || []);
    };

    fetchData();
  }, [postId]);

  // ২. নতুন কমেন্ট সাবমিট করা
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("comments").insert({
      post_id: postId,
      user_id: user.id,
      content: newComment,
    });

    if (error) {
      alert("Error adding comment");
    } else {
      setNewComment("");
      // কমেন্ট লিস্ট রিফ্রেশ (Simulated for speed)
      const { data } = await supabase
        .from("comments")
        .select("*, profiles(email)")
        .eq("post_id", postId)
        .order("created_at", { ascending: false });

      if (data) setComments(data);
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8 mt-12 border-t pt-8">
      <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>

      {/* কমেন্ট ফর্ম */}
      {user ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-4">
            <Avatar>
              <AvatarFallback>
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Share your thoughts..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        </form>
      ) : (
        <div className="bg-muted/50 p-6 rounded-lg text-center space-y-2">
          <p className="text-muted-foreground">
            Please login to join the discussion.
          </p>
          <Button variant="outline" asChild>
            <Link href="/login">Login to Comment</Link>
          </Button>
        </div>
      )}

      {/* কমেন্ট লিস্ট */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-primary/10 text-primary">
                {comment.profiles?.email?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm">
                  {comment.profiles?.email?.split("@")[0] || "Anonymous"}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <p className="text-sm text-foreground/80 leading-relaxed">
                {comment.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
