export default function Logo({ light = false, className = "" }) {
  const main = light ? "#ffffff" : "#13234f";
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg viewBox="0 0 64 48" className="h-9 w-auto" aria-hidden>
        <circle cx="20" cy="12" r="7" fill="#0e8a85" />
        <path d="M2 44 22 22l9 10 11-17 20 29" fill="none" stroke={main} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="leading-none">
        <span className="block text-2xl font-extrabold tracking-tight" style={{ color: main }}>
          Trip<span style={{ color: light ? "#ffffff" : "#0e8a85" }}>Nest</span>
        </span>
        <span className="mt-1 block text-[8px] font-semibold uppercase tracking-[0.22em]" style={{ color: light ? "#ffffffb3" : "#13234f99" }}>
          Travel Tech Company Limited
        </span>
      </span>
    </span>
  );
}
