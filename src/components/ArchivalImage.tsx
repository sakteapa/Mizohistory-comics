import { useState } from "react";
import { BookOpen } from "lucide-react";

interface ArchivalImageProps {
  src: string;
  alt: string;
  titleFallback: string;
  className?: string;
}

export function ArchivalImage({
  src,
  alt,
  titleFallback,
  className = "",
}: ArchivalImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#F2ECE1] border border-[#DFD7C8] p-6 text-center ${className}`}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[#DFD7C8] bg-[#FBF8F3] text-[#8C2D19]">
          <BookOpen className="h-5 w-5" />
        </div>
        <p className="font-display text-lg font-semibold text-[#1C1917]">
          {titleFallback}
        </p>
        <p className="mt-1 text-xs text-[#57534E]">Archival Plate</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
