"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Users, FileText, PenTool, Loader2, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    myPosts: 0,
  });

  // Post States
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Technology");
  const [file, setFile] = useState<File | null>(null);
  const [posting, setPosting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const initDashboard = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      // --- SUPER FAST PARALLEL FETCHING ---
      const [profileReq, userCountReq, postCountReq, myPostReq] =
        await Promise.all([
          supabase.from("profiles").select("role").eq("id", user.id).single(),
          supabase.from("profiles").select("*", { count: "exact", head: true }),
          supabase
            .from("posts")
            .select("*", { count: "exact", head: true })
            .eq("status", "approved"), // শুধু অ্যাপ্রুভড পোস্ট কাউন্ট হবে
          supabase
            .from("posts")
            .select("*", { count: "exact", head: true })
            .eq("user_id", user.id),
        ]);

      setIsAdmin(profileReq.data?.role === "admin");
      setStats({
        totalUsers: userCountReq.count || 0,
        totalPosts: postCountReq.count || 0,
        myPosts: myPostReq.count || 0,
      });

      setLoading(false);
    };

    initDashboard();
  }, [router]);

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return toast.error("Title and Content required");
    setPosting(true);

    try {
      let imageUrl = null;
      if (file) {
        const fileName = `${Date.now()}.${file.name.split(".").pop()}`;
        await supabase.storage.from("post_images").upload(fileName, file);
        const { data } = supabase.storage
          .from("post_images")
          .getPublicUrl(fileName);
        imageUrl = data.publicUrl;
      }

      const { error } = await supabase.from("posts").insert({
        title,
        content,
        category,
        image_url: imageUrl,
        user_id: user.id,
        status: "pending", // ডিফল্ট পেন্ডিং
      });

      if (error) throw error;
      toast.success("Post submitted for approval!");
      setTitle("");
      setContent("");
      setFile(null);
      setStats((prev) => ({ ...prev, myPosts: prev.myPosts + 1 }));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setPosting(false);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="flex-1 space-y-8 p-8 pt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {isAdmin && (
          <Card className="bg-blue-50/50 dark:bg-blue-900/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers}</div>
            </CardContent>
          </Card>
        )}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Published Posts
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPosts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              My Submissions
            </CardTitle>
            <PenTool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.myPosts}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Create New Post</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreatePost} className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Post title..."
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Lifestyle">Lifestyle</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    {file && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setFile(null)}
                      >
                        <X className="h-4 w-4 text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write something..."
                  className="min-h-[150px]"
                />
              </div>
              <Button type="submit" disabled={posting} className="w-full">
                {posting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                    Publishing...
                  </>
                ) : (
                  "Submit for Approval"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="h-fit">
          <CardHeader>
            <CardTitle>Status Guide</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
              <li>
                Posts are <strong>Pending</strong> by default.
              </li>
              <li>
                Admins must <strong>Approve</strong> them.
              </li>
              <li>Approved posts appear on the Blog.</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
