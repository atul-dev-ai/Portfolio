// app/loading.tsx
export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="relative flex flex-col items-center gap-4">
        {/* অ্যানিমেটেড স্পিনার */}
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent shadow-lg shadow-primary/20"></div>

        {/* লোডিং টেক্সট (অপশনাল) */}
        <p className="text-muted-foreground animate-pulse font-medium">
          Loading content...
        </p>
      </div>
    </div>
  );
}
