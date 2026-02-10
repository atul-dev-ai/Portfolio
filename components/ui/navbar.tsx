"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Menu,
  LogOut,
  LayoutDashboard,
  User,
  ShieldCheck,
  Contact,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { supabase } from "@/lib/supabaseClient";
import { toast } from "sonner";
import { Suspense } from "react";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetHeader,
} from "@/components/ui/sheet";

// ---------------------- LINKS CONFIGURATION ----------------------
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
// -----------------------------------------------------------------

function NavbarContent() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [hoveredPath, setHoveredPath] = React.useState<string | null>(null);

  const pathname = usePathname();
  const router = useRouter();

  // চেক করছি ইউজার এখন ব্লগ সেকশনে আছে নাকি পোর্টফোলিও সেকশনে
  const isBlogSection =
    pathname?.startsWith("/blog") ||
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/signup") ||
    pathname?.startsWith("/admin") ||
    pathname?.startsWith("/profile");

  // মিডল মেনু লিংক নির্ধারণ
  const currentLinks = isBlogSection ? blogLinks : portfolioLinks;

  // অথেন্টিকেশন চেক
  React.useEffect(() => {
    const checkUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      if (session?.user) checkAdmin(session.user.id);
    };
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdmin(session.user.id);
      } else {
        setIsAdmin(false);
      }
      router.refresh();
    });

    return () => subscription.unsubscribe();
  }, [router]);

  const checkAdmin = async (userId: string) => {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();
    setIsAdmin(profile?.role === "admin");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setIsOpen(false);
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-xl transition-all">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 mx-auto">
        {/* ================= LEFT SIDE: LOGO ================= */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-2xl transition-transform group-hover:scale-105">
            A
          </div>
          <span className="hidden sm:inline-block font-bold text-lg tracking-tight hover:text-primary transition-colors">
            Atul Paul
          </span>
        </Link>

        {/* ================= MIDDLE: NAVIGATION LINKS (Desktop) ================= */}
        <nav className="hidden md:flex items-center gap-1">
          {currentLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium transition-colors hover:text-foreground/90 text-foreground/60"
              onMouseEnter={() => setHoveredPath(link.href)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <span className="relative z-10">{link.name}</span>
              {hoveredPath === link.href && (
                <motion.div
                  className="absolute inset-0 rounded-full bg-accent/90 dark:bg-accent"
                  layoutId="navbar-hover"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* ================= RIGHT SIDE: BUTTONS (Desktop) ================= */}
        <div className="hidden md:flex items-center gap-3">
          <ModeToggle />

          {user ? (
            // ============ LOGGED IN STATE ============
            isBlogSection ? (
              // >>> BLOG PAGE (Logged In): Admin, Dashboard, Profile, Logout
              <div className="flex items-center gap-2">
                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    asChild
                    className="bg-red-600 hover:bg-red-700"
                  >
                    <Link href="/admin">
                      <ShieldCheck className="mr-2 h-4 w-4" /> Admin
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
                  </Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="text-destructive hover:bg-destructive/10"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              // >>> HOME PAGE (Logged In): Profile, Contact
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </Link>
                </Button>
                <Button className="rounded-full px-6" asChild>
                  <Link href="#contact">Contact</Link>
                </Button>
              </div>
            )
          ) : // ============ LOGGED OUT STATE ============
          isBlogSection ? (
            // >>> BLOG PAGE (Logged Out): Login, Signup
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" className="rounded-full px-6" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            // >>> HOME PAGE (Logged Out): Contact
            <Button className="rounded-full px-6" asChild>
              <Link href="#contact">Contact</Link>
            </Button>
          )}
        </div>

        {/* ================= MOBILE MENU (Hamburger) ================= */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-[85vw] sm:w-[350px] pt-16 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-left font-bold text-xl">
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-3 mt-6">
                {/* Links List */}
                {currentLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 text-lg font-medium rounded-md hover:bg-accent/50 border-b border-border/10"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="mt-4 pt-4 border-t border-border">
                  {user ? (
                    // Mobile: Logged In
                    <div className="flex flex-col gap-3">
                      {isBlogSection ? (
                        // Blog Page Mobile Buttons
                        <>
                          {isAdmin && (
                            <Link
                              href="/admin"
                              onClick={() => setIsOpen(false)}
                              className="px-4 py-3 text-lg font-medium flex items-center gap-3 text-red-500 bg-red-500/10 rounded-md"
                            >
                              <ShieldCheck className="h-5 w-5" /> Admin Panel
                            </Link>
                          )}
                          <Link
                            href="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-lg font-medium flex items-center gap-3 hover:bg-accent rounded-md"
                          >
                            <LayoutDashboard className="h-5 w-5" /> Dashboard
                          </Link>
                          <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-lg font-medium flex items-center gap-3 hover:bg-accent rounded-md"
                          >
                            <User className="h-5 w-5" /> Profile
                          </Link>
                        </>
                      ) : (
                        // Home Page Mobile Buttons
                        <>
                          <Link
                            href="/profile"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-lg font-medium flex items-center gap-3 hover:bg-accent rounded-md"
                          >
                            <User className="h-5 w-5" /> Profile
                          </Link>
                          <Link
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-3 text-lg font-medium flex items-center gap-3 hover:bg-accent rounded-md"
                          >
                            <Contact className="h-5 w-5" /> Contact
                          </Link>
                        </>
                      )}

                      <Button
                        variant="destructive"
                        className="w-full justify-start gap-3 py-6 mt-2 text-lg"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5" /> Logout
                      </Button>
                    </div>
                  ) : (
                    // Mobile: Logged Out
                    <div className="flex flex-col gap-3">
                      {isBlogSection ? (
                        <>
                          <Button
                            className="w-full rounded-xl py-6 text-lg"
                            asChild
                            onClick={() => setIsOpen(false)}
                          >
                            <Link href="/login">Login</Link>
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full rounded-xl py-6 text-lg"
                            asChild
                            onClick={() => setIsOpen(false)}
                          >
                            <Link href="/signup">Sign Up</Link>
                          </Button>
                        </>
                      ) : (
                        <Button
                          className="w-full rounded-xl py-6 text-lg"
                          asChild
                          onClick={() => setIsOpen(false)}
                        >
                          <Link href="#contact">Contact Me</Link>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

// বিল্ড এরর ফিক্স করতে Suspense ব্যবহার করা হয়েছে
export default function Navbar() {
  return (
    <Suspense fallback={<div className="h-16 w-full bg-background border-b" />}>
      <NavbarContent />
    </Suspense>
  );
}
