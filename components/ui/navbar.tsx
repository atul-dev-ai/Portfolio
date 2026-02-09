"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, LogOut, LayoutDashboard, User, ShieldCheck, Contact2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
// ফিক্স ১: পাথ চেক করুন (সাধারণত এটি ui ফোল্ডারের বাইরে থাকে)
import { ModeToggle } from "@/components/ui/mode-toggle";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader, // ফিক্স ২: এটি ইমপোর্ট করা জরুরি
} from "@/components/ui/sheet";

const portfolioLinks = [
  { name: "Home", href: "/" },
  { name: "Bio", href: "/#bio" },
  { name: "Education", href: "/#education-section" },
  { name: "Skills", href: "/#skills" },
  { name: "Projects", href: "/#projects" },
  { name: "Blog", href: "/blog" },
];

const blogLinks = [
  { name: "Home", href: "/" },
  { name: "All Posts", href: "/blog" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  const isBlogSection =
    pathname?.startsWith("/blog") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/profile");

  const currentLinks = isBlogSection ? blogLinks : portfolioLinks;

  React.useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      }
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", session.user.id)
          .single();
        setIsAdmin(profile?.role === "admin");
      } else {
        setIsAdmin(false);
      }
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    toast.success("Logged out successfully");
    window.location.href = "/"; // Force refresh to clear state
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        {/* লোগো */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl transition-transform group-hover:scale-105 animate-pulse">
            A
          </div>
          <span className="hidden sm:inline-block font-bold text-lg tracking-tight transition duration-700 hover:-translate-y-0.5 hover:scale-110 hover:text-pink-400 animate-pulse">
            Atul Paul
          </span>
        </Link>

        {/* ডাইনামিক মেনু লিংকস (Desktop) */}
        <nav className="hidden md:flex items-center gap-1">
          {currentLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/90 text-foreground/60 duration-500 hover:-translate-y-0.5 hover:scale-110"
              onMouseEnter={() => setHoveredPath(link.href)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <span className="relative z-10">{link.name}</span>
              {hoveredPath === link.href && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/90 dark:bg-accent "
                  layoutId="navbar-hover"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* বাটন লজিক (Desktop) */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {user ? (
            /* --- লগইন থাকলে --- */
            isBlogSection ? (
              /* ব্লগ সাইড: Admin, Profile, Dashboard, Logout */
              <div className="flex items-center gap-2 mr-5">
                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    asChild
                    className="bg-red-600 hover:bg-red-700 duration-300 transition hover:translate-y-0.5 hover:scale-105"
                  >
                    <Link href="/admin">
                      <ShieldCheck className="mr-2 h-4 w-4 animate-pulse" />{" "}
                      Admin
                    </Link>
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="transition duration-300 hover:-translate-y-0.5 hover:scale-105"
                >
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4 animate-pulse" /> Profile
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  asChild
                  className="transition duration-300 hover:translate-y-0.5 hover:scale-105"
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4 animate-pulse" />{" "}
                    Dashboard
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-destructive ml-2 transition duration-300 hover:scale-105 hover:-translate-0.5"
                >
                  <LogOut className="h-4 w-5 ml-8 animate-pulse" />
                  logout
                </Button>
              </div>
            ) : (
              /* হোম পেজ: Profile + Contact */
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:bg-accent border border-transparent hover:border-border transition duration-300 hover:-translate-0.5"
                >
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4 animate-pulse" />
                    <span className="text-sm font-medium">Profile</span>
                  </Link>
                </Button>
                <Button
                  className="rounded-full px-6 transition duration-300 hover:-translate-0.5"
                  asChild
                >
                  <Link href="#contact">Contact</Link>
                </Button>
              </div>
            )
          ) : /* --- লগআউট থাকলে --- */
          isBlogSection ? (
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hover:-translate-1.5 duration-300 transition"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                className="rounded-full px-6 hover:-translate-0.5 duration-300 transition"
                asChild
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <Button
              className="rounded-full px-6 hover:-translate-0.5 duration-300 transition"
              asChild
            >
              <Link href="#contact">Contact</Link>
            </Button>
          )}
        </div>

        {/* মোবাইল ভিউ */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] pt-16">
              {/* ফিক্স ২: SheetTitle অবশ্যই SheetHeader এর ভেতরে থাকতে হবে */}
              <SheetHeader>
                <SheetTitle className="text-left">Menu</SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-3 mt-4">
                {currentLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-2 text-lg font-medium rounded-md hover:bg-accent/50"
                  >
                    {link.name}
                  </Link>
                ))}

                <hr className="my-4 border-border/50" />

                {user ? (
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-lg font-medium flex items-center gap-2"
                    >
                      <User /> Profile
                    </Link>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 text-lg font-medium flex items-center gap-2"
                    >
                      <LayoutDashboard /> Dashboard
                    </Link>
                    <Button
                      variant="destructive"
                      className="w-full justify-start gap-2 py-6"
                      onClick={handleLogout}
                    >
                      <LogOut /> Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    className="w-full rounded-xl py-6"
                    asChild
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/login">Login / Sign Up</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
