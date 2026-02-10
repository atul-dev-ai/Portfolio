"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function BlogList({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        No posts found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group border border-primary/10 bg-card rounded-xl overflow-hidden hover:shadow-lg transition-all"
        >
          <Link href={`/blog/${post.id}`} className="block p-6 h-full">
            <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground line-clamp-3">
              {post.content}
            </p>
            <div className="mt-4 text-xs font-medium text-primary flex items-center gap-1">
              Read Article <span>→</span>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
