// ============================================================
// Loading skeleton for Suspense boundaries
// ============================================================

export default function Loading() {
  return (
    <div className="min-h-screen bg-navy-patih flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-teal-intelligence/30 border-t-teal-intelligence animate-spin" />
        <p className="text-xs font-mono text-white/30 tracking-widest uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
