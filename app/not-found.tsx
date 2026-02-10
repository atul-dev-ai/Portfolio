import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-background text-foreground">
      <h1 className="text-9xl font-bold text-primary mb-2">404</h1>
      <h2 className="text-2xl md:text-4xl font-semibold mb-6">
        Page Not Found
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        Oops! The page you are looking for does not exist or has been moved.
      </p>

      <Link
        href="/"
        className="px-8 py-3 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
