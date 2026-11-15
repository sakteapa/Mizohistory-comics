import type { Language } from "../types/folklore";

export type ActiveView = "library" | "themes" | "storyteller" | "saved";

interface HeaderProps {
  activeView: ActiveView;
  language: Language;
  savedCount: number;
  onNavigate: (view: ActiveView) => void;
  onOpenStoryteller: () => void;
}

export function Header({
  activeView,
  language,
  savedCount,
  onNavigate,
  onOpenStoryteller,
}: HeaderProps) {
  const navItems: { id: ActiveView; mz: string; en: string }[] = [
    { id: "library", mz: "Thawnthu Bu", en: "Library" },
    { id: "themes", mz: "Huangte", en: "Themes" },
    { id: "storyteller", mz: "Hrilhtu", en: "Storyteller" },
    {
      id: "saved",
      mz: savedCount > 0 ? `Dahṭhat (${savedCount})` : "Dahṭhat",
      en: savedCount > 0 ? `Saved (${savedCount})` : "Saved",
    },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-[#DFD7C8] bg-[#FBF8F3]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-8">
        {/* Zone 1: Single-element Brand Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate("library")}
          className="font-display text-2xl font-bold tracking-tight text-[#1C1917] transition-colors hover:text-[#8C2D19] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C2D19]"
        >
          Thawnthu Archive
        </button>

        {/* Zone 2: 4 concise single-line text links */}
        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#57534E]"
        >
          {navItems.map((item) => {
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className={`relative py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8C2D19] ${
                  isActive
                    ? "text-[#1C1917] font-semibold"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                {language === "mz" ? item.mz : item.en}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-[15px] h-[2px] bg-[#8C2D19]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenStoryteller}
            className="rounded-md bg-[#8C2D19] px-4 py-2 text-xs font-semibold tracking-wide text-[#FBF8F3] transition-colors duration-150 hover:bg-[#732312] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8C2D19]"
          >
            {language === "mz" ? "Hrilhtu Zawt Rawh" : "Ask Storyteller"}
          </button>
        </div>
      </div>

      {/* Compact mobile nav row kept lightweight */}
      <nav
        aria-label="Mobile Navigation"
        className="flex md:hidden items-center justify-between gap-2 border-t border-[#DFD7C8]/70 px-4 py-2 text-xs font-medium overflow-x-auto"
      >
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              className={`px-2 py-1 whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                isActive
                  ? "text-[#8C2D19] font-semibold underline underline-offset-4"
                  : "text-[#57534E]"
              }`}
            >
              {language === "mz" ? item.mz : item.en}
            </button>
          );
        })}
      </nav>
    </header>
  );
}
