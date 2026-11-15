interface PuanDividerProps {
  variant?: "ribbon" | "geometric";
  className?: string;
}

export function PuanDivider({
  variant = "geometric",
  className = "",
}: PuanDividerProps) {
  if (variant === "ribbon") {
    return (
      <div
        aria-hidden="true"
        className={`h-1.5 w-full puan-ribbon-pattern opacity-90 ${className}`}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-4 ${className}`}
    >
      <div className="h-px flex-1 bg-[#DFD7C8]" />
      <svg
        width="76"
        height="14"
        viewBox="0 0 76 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <path
          d="M2 7L8 2L14 7L8 12L2 7Z"
          stroke="#8C2D19"
          strokeWidth="1.25"
        />
        <path
          d="M18 7L24 2L30 7L24 12L18 7Z"
          fill="#1E3A5F"
          fillOpacity="0.16"
          stroke="#1E3A5F"
          strokeWidth="1.25"
        />
        <path
          d="M32 7L38 1.5L44 7L38 12.5L32 7Z"
          fill="#8C2D19"
        />
        <path
          d="M46 7L52 2L58 7L52 12L46 7Z"
          fill="#1E3A5F"
          fillOpacity="0.16"
          stroke="#1E3A5F"
          strokeWidth="1.25"
        />
        <path
          d="M62 7L68 2L74 7L68 12L62 7Z"
          stroke="#8C2D19"
          strokeWidth="1.25"
        />
      </svg>
      <div className="h-px flex-1 bg-[#DFD7C8]" />
    </div>
  );
}
