"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User, Save, Camera } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Form States
  const [fullName, setFullName] = useState("");
  const [website, setWebsite] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // ১. ইউজার ডাটা লোড করা
  useEffect(() => {
    const getProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, website, avatar_url")
        .eq("id", user.id)
        .single();

      if (data) {
        setFullName(data.full_name || "");
        setWebsite(data.website || "");
        setAvatarUrl(data.avatar_url || null);
      }
      setLoading(false);
    };

    getProfile();
  }, [router]);

  // ২. প্রোফাইল আপডেট করা
  const updateProfile = async () => {
    setUpdating(true);

    // ১. আপডেটের ডাটা প্রস্তুত করা
    const updates = {
      id: user.id,
      full_name: fullName,
      website: website,
      avatar_url: avatarUrl,
      updated_at: new Date().toISOString(),
    };

    console.log("Sending updates:", updates); // কনসোলে চেক করার জন্য

    // ২. upsert ব্যবহার করা (Update + Insert)
    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.error("Supabase Error:", error); // কনসোলে আসল এরর দেখাবে
      toast.error("Error updating profile: " + error.message);
    } else {
      toast.success("Profile updated successfully!");
      router.refresh();
    }
    setUpdating(false);
  };
  // ৩. ছবি আপলোড করা
  // এই ফাংশনটি রিপ্লেস করুন
  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      setUploading(true);
      console.log("Starting upload..."); // ডিবাগ ১

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      console.log("Uploading file to bucket 'avatars':", fileName); // ডিবাগ ২

      // Supabase Storage এ আপলোড
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload Error Details:", uploadError); // ডিবাগ ৩ (আসল এরর এখানে দেখাবে)
        throw uploadError;
      }

      // ছবির পাবলিক লিংক নেওয়া
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

      console.log("Upload success, URL:", data.publicUrl); // ডিবাগ ৪
      setAvatarUrl(data.publicUrl);
      toast.success("Image uploaded! Don't forget to save.");
    } catch (error: any) {
      console.error("Catch Error:", error); // ডিবাগ ৫
      toast.error("Error uploading image: " + error.message);
    } finally {
      setUploading(false); // লোডিং বন্ধ হবেই
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 max-w-2xl px-4">
      <Card className="shadow-lg border-primary/10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl">My Profile</CardTitle>
          <CardDescription>Manage your public profile details.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-muted cursor-pointer">
                <AvatarImage src={avatarUrl || ""} />
                <AvatarFallback className="text-4xl bg-muted">
                  {fullName ? (
                    fullName.charAt(0).toUpperCase()
                  ) : (
                    <User className="h-12 w-12" />
                  )}
                </AvatarFallback>
              </Avatar>

              {/* Camera Icon Overlay */}
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-lg cursor-pointer hover:bg-primary/90 transition-colors"
              >
                {uploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Camera className="h-5 w-5" />
                )}
              </label>
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={uploading}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Click the camera icon to update photo
            </p>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                value={user?.email}
                disabled
                className="bg-muted/50"
              />
              <p className="text-xs text-muted-foreground">
                Email cannot be changed.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullname">Full Name</Label>
              <Input
                id="fullname"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website (Optional)</Label>
              <Input
                id="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://example.com"
              />
            </div>
          </div>

          <Button
            onClick={updateProfile}
            className="w-full"
            disabled={updating}
          >
            {updating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" /> Save Changes
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
