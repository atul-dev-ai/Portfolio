"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import {
  CheckCircle,
  XCircle,
  Loader2,
  ShieldAlert,
  Eye,
  Calendar,
  User,
  ImageIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

export default function AdminDashboard() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initAdmin = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }

      const [profileReq, postsReq] = await Promise.all([
        supabase.from("profiles").select("role").eq("id", user.id).single(),
        supabase
          .from("posts")
          .select("*, profiles(full_name, email)")
          .eq("status", "pending")
          .order("created_at", { ascending: false }),
      ]);

      if (profileReq.data?.role !== "admin") {
        router.push("/");
        return;
      }

      setPosts(postsReq.data || []);
      setLoading(false);
    };

    initAdmin();
  }, [router]);

  const handleAction = async (
    postId: string,
    status: "approved" | "rejected",
  ) => {
   const promise = Promise.resolve(
     supabase.from("posts").update({ status }).eq("id", postId),
   );
    toast.promise(promise, {
      loading: "Processing...",
      success: () => {
        setPosts(posts.filter((p) => p.id !== postId));
        return `Post ${status}!`;
      },
      error: "Error updating post",
    });
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );

  return (
    <div className="container mx-auto py-28 px-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-6 w-6 text-red-500" />
            <CardTitle>Admin Approval Panel</CardTitle>
          </div>
          <CardDescription>Pending Review: {posts.length}</CardDescription>
        </CardHeader>
        <CardContent>
          {posts.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground border border-dashed rounded-lg">
              <CheckCircle className="h-10 w-10 mx-auto mb-2 text-green-500" />
              <p>No pending posts found.</p>
            </div>
          ) : (
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead> {/* নতুন কলাম */}
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      {/* --- IMAGE THUMBNAIL COLUMN --- */}
                      <TableCell>
                        {post.image_url ? (
                          <div className="h-12 w-20 rounded-md overflow-hidden border bg-muted">
                            <img
                              src={post.image_url}
                              alt="Thumbnail"
                              className="h-full w-full object-cover hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                        ) : (
                          <div className="h-12 w-20 rounded-md bg-muted flex items-center justify-center text-muted-foreground border">
                            <ImageIcon className="h-5 w-5 opacity-50" />
                          </div>
                        )}
                      </TableCell>

                      <TableCell className="font-medium">
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm">
                            {post.profiles?.full_name}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post.profiles?.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{post.category}</Badge>
                      </TableCell>

                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* VIEW MODAL (WITH LARGE IMAGE) */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-blue-500 hover:text-blue-600 hover:bg-blue-50"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>{post.title}</DialogTitle>
                                <DialogDescription className="flex gap-4 pt-2">
                                  <Badge>{post.category}</Badge>
                                  <span className="flex items-center gap-1 text-xs">
                                    <User className="h-3 w-3" />{" "}
                                    {post.profiles?.full_name}
                                  </span>
                                </DialogDescription>
                              </DialogHeader>

                              <div className="space-y-4 mt-4">
                                {post.image_url ? (
                                  <img
                                    src={post.image_url}
                                    alt="Post Cover"
                                    className="w-full rounded-lg border shadow-sm max-h-[400px] object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground border border-dashed">
                                    No cover image provided
                                  </div>
                                )}
                                <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground/80">
                                  {post.content}
                                </p>
                              </div>

                              <div className="flex justify-end gap-2 mt-6 border-t pt-4">
                                <Button
                                  variant="destructive"
                                  onClick={() =>
                                    handleAction(post.id, "rejected")
                                  }
                                >
                                  Reject
                                </Button>
                                <Button
                                  className="bg-green-600 hover:bg-green-700"
                                  onClick={() =>
                                    handleAction(post.id, "approved")
                                  }
                                >
                                  Approve
                                </Button>
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:bg-red-50"
                            onClick={() => handleAction(post.id, "rejected")}
                          >
                            <XCircle className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleAction(post.id, "approved")}
                          >
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
