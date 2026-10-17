export default function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-px w-6 bg-[#101820]/25" />
      <span className="text-xs font-medium uppercase tracking-[0.18em] text-[#101820]/55">
        {children}
      </span>
    </div>
  );
}
