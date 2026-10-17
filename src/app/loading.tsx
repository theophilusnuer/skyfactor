export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#080E1A] backdrop-blur"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-white/15 border-t-[#F6F2EA]" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
