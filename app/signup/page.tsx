"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
        },
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Account created! Please login.");
      router.push("/login");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100/50 p-4 dark:bg-neutral-900">
      <Button
        variant="ghost"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        asChild
      >
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>
      </Button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-background w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden grid md:grid-cols-2 min-h-[600px] border border-border/50"
      >
        {/* Left Side: Illustration */}
        <div className="hidden md:flex flex-col justify-center items-center bg-blue-50 dark:bg-blue-900/20 p-10 relative">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
            alt="Sign Up"
            className="rounded-xl shadow-lg w-full max-w-sm object-cover hover:scale-105 transition-transform duration-500"
          />
          <div className="mt-8 text-center">
            <h2 className="text-2xl font-bold text-foreground">
              Hello, Friend!
            </h2>
            <p className="text-muted-foreground mt-2">
              Enter your personal details and start your journey with us.
            </p>
          </div>
        </div>

        {/* Right Side: Signup Form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary">Create Account</h1>
            <p className="text-muted-foreground mt-2">
              Registration is easy and free.
            </p>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="First Name"
                className="bg-muted/30"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <Input
                placeholder="Last Name"
                className="bg-muted/30"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            <Input
              type="email"
              placeholder="Email Address"
              className="bg-muted/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Create Password"
              className="bg-muted/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <div className="flex items-center space-x-2 my-2">
              <Checkbox id="terms" required />
              <label htmlFor="terms" className="text-xs text-muted-foreground">
                I agree to Terms & Privacy Policy.
              </label>
            </div>

            {/* ✅ Primary Action: Sign Up */}
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 shadow-md"
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
            </Button>
          </form>

          {/* ✅ Secondary Action: Link to Login */}
          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-blue-600 font-bold hover:underline"
            >
              Sign In
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
