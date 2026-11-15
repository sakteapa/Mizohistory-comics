import { useEffect, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  LayoutGrid,
  List,
  Loader2,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import {
  ORAL_PROMPT_SUGGESTIONS,
  THEME_LABELS,
} from "../data/folktales";
import type { Folktale, Language, TaleTheme } from "../types/folklore";
import { ArchivalImage } from "./ArchivalImage";
import { PuanDivider } from "./PuanDivider";

interface ArchiveLibraryProps {
  tales: Folktale[];
  language: Language;
  activeTheme: TaleTheme;
  searchQuery: string;
  bookmarkedIds: string[];
  onlySaved?: boolean;
  onChangeLanguage: (lang: Language) => void;
  onChangeTheme: (theme: TaleTheme) => void;
  onChangeSearch: (q: string) => void;
  onToggleBookmark: (id: string) => void;
  onSelectTale: (tale: Folktale) => void;
  onAskPrompt: (promptText: string) => void;
  onAddCustomTale: (tale: Folktale) => void;
  onDeleteCustomTale: (id: string) => void;
}

const PAGE_SIZE = 12;

export function ArchiveLibrary({
  tales,
  language,
  activeTheme,
  searchQuery,
  bookmarkedIds,
  onlySaved = false,
  onChangeLanguage,
  onChangeTheme,
  onChangeSearch,
  onToggleBookmark,
  onSelectTale,
  onAskPrompt,
  onAddCustomTale,
  onDeleteCustomTale,
}: ArchiveLibraryProps) {
  const isMz = language === "mz";
  const [viewMode, setViewMode] = useState<"grid" | "index">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Inline AI Tale Composer state
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerTopic, setComposerTopic] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const [composeError, setComposeError] = useState<string | null>(null);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeTheme, searchQuery, onlySaved, viewMode]);

  const filteredTales = tales.filter((tale) => {
    if (onlySaved && !bookmarkedIds.includes(tale.id)) return false;
    if (!onlySaved && activeTheme !== "all" && tale.theme !== activeTheme) {
      return false;
    }
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    const haystack = [
      tale.accessionNumber,
      tale.mizo.title,
      tale.mizo.subtitle,
      tale.mizo.summary,
      tale.english.title,
      tale.english.subtitle,
      tale.english.summary,
      ...tale.characters,
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });

  const featuredTale = tales.find((t) => t.featured) ?? tales[0];
  const showHero =
    !onlySaved && activeTheme === "all" && searchQuery.trim() === "";

  const catalogTales = showHero && featuredTale
    ? filteredTales.filter((t) => t.id !== featuredTale.id)
    : filteredTales;

  const displayedGridTales = catalogTales.slice(0, visibleCount);
  const hasMoreGridTales = visibleCount < catalogTales.length;

  const themeKeys: TaleTheme[] = [
    "all",
    "wit",
    "pasaltha",
    "fables",
    "heroic",
    "resilience",
    "love",
    "spirits",
  ];

  const handleComposeTale = async (topicOverride?: string) => {
    const topic = (topicOverride ?? composerTopic).trim();
    if (topic.length < 2 || isComposing) return;

    setComposeError(null);
    setIsComposing(true);

    try {
      const response = await fetch("/api/storyteller/compose-tale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          existingCount: tales.length,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        tale?: Folktale;
        error?: string;
      };

      if (!response.ok || !data.tale) {
        throw new Error(
          data.error ||
            (isMz
              ? "Thawnthu thar siam chhuah theih a ni rih lo."
              : "Could not compose the requested folktale right now.")
        );
      }

      onAddCustomTale(data.tale);
      setComposerTopic("");
      setComposerOpen(false);
      onSelectTale(data.tale);
    } catch (err) {
      setComposeError(
        err instanceof Error
          ? err.message
          : isMz
            ? "Thil dik lo a awm palh tlat mai."
            : "Failed to compose and save tale."
      );
    } finally {
      setIsComposing(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-8">
      {/* Archive Utility Toolbar (Language Toggle + Theme Filter + Search + Compose) */}
      <section
        aria-label={isMz ? "Zawnna leh Ṭawng Thlakna" : "Archive Controls"}
        className="mb-8 space-y-4 border-b border-[#DFD7C8] pb-6"
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {/* Language Segmented Control */}
            <div
              role="group"
              aria-label="Language toggle"
              className="inline-flex items-center rounded-md border border-[#DFD7C8] bg-[#F2ECE1] p-1"
            >
              <button
                type="button"
                onClick={() => onChangeLanguage("mz")}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === "mz"
                    ? "bg-[#FBF8F3] text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                Mizo ṭawng
              </button>
              <button
                type="button"
                onClick={() => onChangeLanguage("en")}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === "en"
                    ? "bg-[#FBF8F3] text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                English
              </button>
            </div>

            {!onlySaved && (
              <button
                type="button"
                onClick={() => {
                  setComposeError(null);
                  setComposerOpen((prev) => !prev);
                }}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#8C2D19] bg-[#FBF8F3] px-3 py-1.5 text-xs font-semibold text-[#8C2D19] transition-colors hover:bg-[#8C2D19] hover:text-[#FBF8F3] whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>
                  {isMz ? "Thawnthu Thar Dah Belh (AI)" : "Add Tale via AI"}
                </span>
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-72 sm:flex-none">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#57534E]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => onChangeSearch(e.target.value)}
                placeholder={
                  isMz
                    ? "Thawnthu emaw hming zawng rawh..."
                    : "Search 42+ tales or characters..."
                }
                aria-label={isMz ? "Thawnthu zawnna" : "Search folktales"}
                className="w-full rounded-md border border-[#DFD7C8] bg-[#FBF8F3] py-2 pl-9 pr-3 text-sm text-[#1C1917] placeholder:text-[#57534E]/75 focus:border-[#8C2D19] focus:outline-none"
              />
            </div>

            {/* Grid / Archival Index Segmented Control */}
            <div
              role="group"
              aria-label={isMz ? "En Dan Thlakna" : "View mode"}
              className="inline-flex items-center rounded-md border border-[#DFD7C8] bg-[#F2ECE1] p-1 shrink-0"
            >
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === "grid"
                    ? "bg-[#FBF8F3] text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                <LayoutGrid className="h-3.5 w-3.5" />
                <span>{isMz ? "Card" : "Grid"}</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode("index")}
                className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  viewMode === "index"
                    ? "bg-[#FBF8F3] text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                <List className="h-3.5 w-3.5" />
                <span>{isMz ? "List" : "Index"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Theme Filter Strip */}
        {!onlySaved && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {themeKeys.map((key) => {
              const active = activeTheme === key;
              const countForKey =
                key === "all"
                  ? tales.length
                  : tales.filter((t) => t.theme === key).length;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onChangeTheme(key)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? "bg-[#1E3A5F] text-[#FBF8F3]"
                      : "text-[#57534E] hover:bg-[#F2ECE1] hover:text-[#1C1917]"
                  }`}
                >
                  <span>{isMz ? THEME_LABELS[key].mz : THEME_LABELS[key].en}</span>
                  <span
                    className={`tabular-nums text-[11px] ${
                      active ? "text-[#FBF8F3]/80" : "text-[#57534E]/75"
                    }`}
                  >
                    ({countForKey})
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Inline AI Tale Composer Drawer */}
        {composerOpen && !onlySaved && (
          <div className="border border-[#8C2D19]/35 bg-[#F2ECE1]/70 p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#8C2D19]">
                  {isMz ? "AI Thawnthu Buatsaihtu" : "AI Archival Edition Composer"}
                </p>
                <h2 className="mt-1 font-display text-2xl font-semibold text-[#1C1917]">
                  {isMz
                    ? "Thawnthu Thar Library-ah Ziak Lut Rawh"
                    : "Compose & Save Any Mizo Folktale to the Library"}
                </h2>
                <p className="mt-1 text-xs text-[#57534E]">
                  {isMz
                    ? "Mizo thawnthu hming emaw thupui ziak la, Mizo leh English-in a chhiar theih nghal turin a siam sak ang che."
                    : "Enter any Mizo folktale title, historical figure, or motif to generate and save a full bilingual edition."}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setComposerOpen(false)}
                aria-label={isMz ? "Khar rawh" : "Close composer"}
                className="rounded p-1 text-[#57534E] hover:bg-[#FBF8F3] hover:text-[#1C1917] cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void handleComposeTale();
              }}
              className="mt-4 flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={composerTopic}
                onChange={(e) => setComposerTopic(e.target.value)}
                disabled={isComposing}
                placeholder={
                  isMz
                    ? "Entirnan: Saikuti, Tumpangi, Sakei leh Hmeithai, Lalruanga leh Vawk..."
                    : "e.g., Saikuti, Tumpangi, The Tiger and the Widow..."
                }
                className="flex-1 rounded-md border border-[#DFD7C8] bg-[#FBF8F3] px-3.5 py-2.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/75 focus:border-[#8C2D19] focus:outline-none disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isComposing || composerTopic.trim().length < 2}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#8C2D19] px-5 py-2.5 text-xs font-semibold text-[#FBF8F3] transition-colors hover:bg-[#732312] disabled:opacity-45 whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isComposing ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    <span>
                      {isMz ? "Buatsaih mek..." : "Composing..."}
                    </span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5" />
                    <span>
                      {isMz ? "Siam & Save Rawh" : "Compose & Save"}
                    </span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
              <span>{isMz ? "Entirnan:" : "Try:"}</span>
              {[
                isMz ? "Saikuti Hla leh Thawnthu" : "Saikuti the Poetess",
                isMz ? "Tumpangi Thawnthu" : "Ballad of Tumpangi",
                isMz ? "Sakei leh Hmeithai" : "The Tiger and the Widow",
                isMz ? "Thangzawra" : "Thangzawra",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  disabled={isComposing}
                  onClick={() => setComposerTopic(suggestion)}
                  className="rounded border border-[#DFD7C8] bg-[#FBF8F3] px-2.5 py-1 text-xs font-medium text-[#1C1917] hover:border-[#8C2D19] disabled:opacity-50 cursor-pointer"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {composeError && (
              <div
                role="alert"
                className="mt-3 flex items-center gap-2 border border-[#8C2D19]/40 bg-[#8C2D19]/5 px-3 py-2 text-xs text-[#8C2D19]"
              >
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{composeError}</span>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Saved Header when in Saved View */}
      {onlySaved && (
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-widest text-[#57534E]">
            {isMz ? "I Thawnthu Dahṭhatte" : "Personal Reading Collection"}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#1C1917] text-balance">
            {isMz ? "Thawnthu Chhinchhiah Sa" : "Saved Folktales"}
          </h1>
        </div>
      )}

      {/* Exhibition Lead Hero Split */}
      {showHero && featuredTale && (
        <section className="mb-14">
          <div className="grid grid-cols-1 items-stretch gap-8 border border-[#DFD7C8] bg-[#F2ECE1]/55 lg:grid-cols-12">
            <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-6">
              <div>
                <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#57534E]">
                  <span className="font-semibold text-[#8C2D19]">
                    {featuredTale.accessionNumber}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {isMz
                      ? THEME_LABELS[featuredTale.theme].mz
                      : THEME_LABELS[featuredTale.theme].en}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="tabular-nums">
                    {featuredTale.readingMinutes}{" "}
                    {isMz ? "minit chhiar" : "min read"}
                  </span>
                </div>

                <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.12] tracking-tight text-[#1C1917] sm:text-5xl text-balance">
                  {isMz
                    ? featuredTale.mizo.title
                    : featuredTale.english.title}
                </h1>

                <p className="mt-3 font-prose text-base italic text-[#57534E]">
                  {isMz
                    ? featuredTale.mizo.subtitle
                    : featuredTale.english.subtitle}
                </p>

                <p className="mt-5 font-prose text-base leading-relaxed text-[#1C1917]/90">
                  {isMz
                    ? featuredTale.mizo.summary
                    : featuredTale.english.summary}
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#DFD7C8] pt-4">
                <button
                  type="button"
                  onClick={() => onSelectTale(featuredTale)}
                  className="inline-flex items-center gap-2 rounded-md bg-[#8C2D19] px-5 py-2.5 text-sm font-semibold text-[#FBF8F3] transition-colors hover:bg-[#732312] whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>{isMz ? "Thawnthu Chhiar Rawh" : "Read This Tale"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onAskPrompt(
                      isMz
                        ? ORAL_PROMPT_SUGGESTIONS[0].mizoPrompt
                        : ORAL_PROMPT_SUGGESTIONS[0].englishPrompt
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-md border border-[#1E3A5F]/35 bg-[#FBF8F3] px-4 py-2.5 text-sm font-semibold text-[#1E3A5F] transition-colors hover:bg-[#1E3A5F]/5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {isMz
                    ? "Thawnthu dang i hre vek em?"
                    : "Explore More Tales with AI"}
                </button>
              </div>
            </div>

            <div className="relative min-h-[280px] lg:col-span-6">
              <ArchivalImage
                src={featuredTale.imageUrl}
                alt={
                  isMz ? featuredTale.mizo.title : featuredTale.english.title
                }
                titleFallback={
                  isMz ? featuredTale.mizo.title : featuredTale.english.title
                }
                className="h-full w-full object-cover lg:h-full"
              />
            </div>
          </div>

          {/* 4-column Archive Operational Strip below hero split */}
          <div className="mt-4 grid grid-cols-2 gap-4 border border-[#DFD7C8] bg-[#FBF8F3] px-6 py-4 sm:grid-cols-4">
            <div>
              <p className="text-xs text-[#57534E]">
                {isMz ? "Thawnthu Ziak Sa" : "Curated Editions"}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-[#1C1917] tabular-nums">
                {tales.length}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#57534E]">
                {isMz ? "Ṭawng Hman Theih" : "Bilingual Texts"}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-[#1C1917]">
                Mizo · English
              </p>
            </div>
            <div>
              <p className="text-xs text-[#57534E]">
                {isMz ? "AI Thawnthu Hrilhtu" : "Oral Companion"}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-[#1C1917]">
                {isMz ? "Thawnthu Hrilhtu" : "Live Storytelling"}
              </p>
            </div>
            <div>
              <p className="text-xs text-[#57534E]">
                {isMz ? "I Dahṭhatte" : "Saved Collection"}
              </p>
              <p className="mt-1 font-display text-2xl font-semibold text-[#1C1917] tabular-nums">
                {bookmarkedIds.length}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Puan Motif Divider */}
      {showHero && <PuanDivider variant="ribbon" className="mb-12" />}

      {/* Catalog Section Heading */}
      <div className="mb-6 flex items-baseline justify-between gap-4">
        <div>
          <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
            {onlySaved
              ? isMz
                ? "Thawnthu Thlan Chhuahte"
                : "Your Bookmarked Archive"
              : activeTheme !== "all"
                ? isMz
                  ? THEME_LABELS[activeTheme].mz
                  : THEME_LABELS[activeTheme].en
                : isMz
                  ? "Mizo Thawnthu Hluite"
                  : "The Oral Heritage Collection"}
          </h2>
          <p className="mt-1 text-sm text-[#57534E]">
            {isMz
              ? "Chhura & Nahaia, Pasaltha huaisen, Ramsa & Sava, leh hmanlai hmangaihna thawnthu hluite."
              : "Bilingual editions covering Chhura cycles, Pasaltha legends, animal fables, romances, and spirit lore."}
          </p>
        </div>
        <span className="text-xs font-medium text-[#57534E] tabular-nums whitespace-nowrap shrink-0">
          {filteredTales.length}{" "}
          {isMz ? "thawnthu" : filteredTales.length === 1 ? "tale" : "tales"}
        </span>
      </div>

      {/* Empty State */}
      {catalogTales.length === 0 ? (
        <div className="border border-[#DFD7C8] bg-[#F2ECE1]/45 px-6 py-14 text-center">
          <p className="font-display text-2xl font-semibold text-[#1C1917]">
            {onlySaved
              ? isMz
                ? "Thawnthu dahṭhat i la nei rih lo."
                : "No tales bookmarked yet."
              : isMz
                ? "I thawnthu zawn kan hmu zo rih lo."
                : "No matching tales found in the archive."}
          </p>
          <p className="mx-auto mt-2 max-w-md text-sm text-[#57534E]">
            {onlySaved
              ? isMz
                ? "Library aṭangin thawnthu i chhiar duh zawngte bookmark hmetin dahṭha rawh."
                : "Bookmark any tale from the Library to keep it ready for quiet reading."
              : isMz
                ? "Zawnna thlak danglam la, a nih loh leh AI hmangin thawnthu thar buatsaih nghal rawh."
                : "Try resetting your search filters, or compose and save a new tale with AI."}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {!onlySaved && (
              <button
                type="button"
                onClick={() => {
                  onChangeTheme("all");
                  onChangeSearch("");
                }}
                className="inline-flex items-center gap-2 rounded-md border border-[#DFD7C8] bg-[#FBF8F3] px-4 py-2 text-xs font-semibold text-[#1C1917] hover:bg-[#F2ECE1] cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {isMz ? "Tilang Vek Rawh" : "Reset Filters"}
              </button>
            )}
            {searchQuery.trim() && !onlySaved && (
              <>
                <button
                  type="button"
                  disabled={isComposing}
                  onClick={() => {
                    setComposerOpen(true);
                    setComposerTopic(searchQuery.trim());
                    void handleComposeTale(searchQuery.trim());
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-[#8C2D19] px-4 py-2 text-xs font-semibold text-[#FBF8F3] hover:bg-[#732312] cursor-pointer"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {isMz
                    ? `"${searchQuery.trim()}" AI-in siam & save rawh`
                    : `Compose & save "${searchQuery.trim()}"`}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onAskPrompt(
                      isMz
                        ? `"${searchQuery.trim()}" tih thawnthu emaw Mizo thawnthua a chungchang hi min hrilh thei em?`
                        : `Can you tell me the Mizo folktale or lore related to "${searchQuery.trim()}"?`
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-md border border-[#1E3A5F]/40 bg-[#FBF8F3] px-4 py-2 text-xs font-semibold text-[#1E3A5F] hover:bg-[#1E3A5F]/5 cursor-pointer"
                >
                  {isMz
                    ? `"${searchQuery.trim()}" Hrilhtu Zawt Rawh`
                    : `Ask Storyteller about "${searchQuery.trim()}"`}
                </button>
              </>
            )}
          </div>
        </div>
      ) : viewMode === "index" ? (
        /* Archival Index Ledger View */
        <div className="border border-[#DFD7C8] bg-[#FBF8F3] divide-y divide-[#DFD7C8]">
          {catalogTales.map((tale) => {
            const content = isMz ? tale.mizo : tale.english;
            const isBookmarked = bookmarkedIds.includes(tale.id);

            return (
              <article
                key={tale.id}
                className="flex flex-col gap-3 p-4 transition-colors hover:bg-[#F2ECE1]/45 sm:flex-row sm:items-center sm:justify-between sm:px-6"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#57534E]">
                    <span className="font-semibold text-[#8C2D19] tabular-nums">
                      {tale.accessionNumber}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>
                      {isMz
                        ? THEME_LABELS[tale.theme].mz
                        : THEME_LABELS[tale.theme].en}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{tale.readingMinutes}m</span>
                    {tale.isCustom && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="font-medium text-[#1E3A5F]">
                          {isMz ? "AI Dah Belh" : "AI Added"}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-1 font-display text-xl font-semibold text-[#1C1917]">
                    <button
                      type="button"
                      onClick={() => onSelectTale(tale)}
                      className="text-left hover:text-[#8C2D19] cursor-pointer"
                    >
                      {content.title}
                    </button>
                  </h3>
                  <p className="mt-0.5 font-prose text-xs text-[#57534E] line-clamp-1">
                    {content.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {tale.isCustom && (
                    <button
                      type="button"
                      onClick={() => onDeleteCustomTale(tale.id)}
                      aria-label={
                        isMz ? "AI thawnthu paih rawh" : "Remove custom tale"
                      }
                      className="rounded p-1.5 text-[#57534E] hover:bg-[#F2ECE1] hover:text-[#8C2D19] cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => onToggleBookmark(tale.id)}
                    aria-label={
                      isBookmarked
                        ? isMz
                          ? "Dahṭhat paih rawh"
                          : "Remove bookmark"
                        : isMz
                          ? "Dahṭha rawh"
                          : "Bookmark tale"
                    }
                    className="rounded p-1.5 text-[#57534E] hover:bg-[#F2ECE1] hover:text-[#8C2D19] cursor-pointer"
                  >
                    <Bookmark
                      className={`h-4 w-4 ${
                        isBookmarked ? "fill-[#8C2D19] text-[#8C2D19]" : ""
                      }`}
                    />
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectTale(tale)}
                    className="inline-flex items-center gap-1.5 rounded border border-[#DFD7C8] bg-[#FBF8F3] px-3 py-1.5 text-xs font-semibold text-[#8C2D19] hover:border-[#8C2D19] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{isMz ? "Chhiar Rawh" : "Read"}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        /* Catalog Cards Grid */
        <>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedGridTales.map((tale) => {
              const content = isMz ? tale.mizo : tale.english;
              const isBookmarked = bookmarkedIds.includes(tale.id);

              return (
                <article
                  key={tale.id}
                  className="group flex flex-col border border-[#DFD7C8] bg-[#FBF8F3] transition-colors duration-150 hover:border-[#8C2D19]/50"
                >
                  <button
                    type="button"
                    onClick={() => onSelectTale(tale)}
                    className="block aspect-[4/3] w-full overflow-hidden bg-[#F2ECE1] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-[#8C2D19]"
                  >
                    <ArchivalImage
                      src={tale.imageUrl}
                      alt={content.title}
                      titleFallback={content.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </button>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {/* Unboxed Metadata with typographic separators */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#57534E]">
                          <span className="font-semibold text-[#8C2D19] tabular-nums">
                            {tale.accessionNumber}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>
                            {isMz
                              ? THEME_LABELS[tale.theme].mz
                              : THEME_LABELS[tale.theme].en}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums">
                            {tale.readingMinutes}m
                          </span>
                          {tale.isCustom && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="font-medium text-[#1E3A5F]">
                                {isMz ? "AI Dah Belh" : "AI Added"}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="flex items-center gap-1 shrink-0">
                          {tale.isCustom && (
                            <button
                              type="button"
                              onClick={() => onDeleteCustomTale(tale.id)}
                              aria-label={
                                isMz
                                  ? "AI thawnthu paih rawh"
                                  : "Remove custom tale"
                              }
                              className="rounded p-1.5 text-[#57534E] transition-colors hover:bg-[#F2ECE1] hover:text-[#8C2D19] cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => onToggleBookmark(tale.id)}
                            aria-label={
                              isBookmarked
                                ? isMz
                                  ? "Dahṭhat paih rawh"
                                  : "Remove bookmark"
                                : isMz
                                  ? "Dahṭha rawh"
                                  : "Bookmark tale"
                            }
                            className="rounded p-1.5 text-[#57534E] transition-colors hover:bg-[#F2ECE1] hover:text-[#8C2D19] cursor-pointer"
                          >
                            <Bookmark
                              className={`h-4 w-4 ${
                                isBookmarked
                                  ? "fill-[#8C2D19] text-[#8C2D19]"
                                  : ""
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <h3 className="mt-2.5 font-display text-2xl font-semibold leading-snug text-[#1C1917]">
                        <button
                          type="button"
                          onClick={() => onSelectTale(tale)}
                          className="text-left transition-colors hover:text-[#8C2D19] cursor-pointer"
                        >
                          {content.title}
                        </button>
                      </h3>

                      <p className="mt-2 font-prose text-sm leading-relaxed text-[#57534E] line-clamp-3">
                        {content.summary}
                      </p>
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#DFD7C8]/80 pt-4">
                      <span className="text-xs text-[#57534E] truncate max-w-[170px]">
                        {tale.characters.slice(0, 2).join(" · ")}
                      </span>
                      <button
                        type="button"
                        onClick={() => onSelectTale(tale)}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C2D19] transition-colors hover:text-[#732312] whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        <span>{isMz ? "Chhiar Rawh" : "Read Tale"}</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {hasMoreGridTales && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3 border-t border-[#DFD7C8] pt-8">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
                className="inline-flex items-center gap-2 rounded-md border border-[#8C2D19] bg-[#FBF8F3] px-5 py-2.5 text-xs font-semibold text-[#8C2D19] transition-colors hover:bg-[#8C2D19] hover:text-[#FBF8F3] cursor-pointer"
              >
                <span>
                  {isMz
                    ? `Thawnthu Dang En Belh Rawh (${displayedGridTales.length}/${catalogTales.length})`
                    : `Show More Tales (${displayedGridTales.length} of ${catalogTales.length})`}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setVisibleCount(catalogTales.length)}
                className="inline-flex items-center gap-2 rounded-md border border-[#DFD7C8] bg-[#F2ECE1]/60 px-4 py-2.5 text-xs font-medium text-[#57534E] transition-colors hover:text-[#1C1917] cursor-pointer"
              >
                {isMz ? "Tilang Vek Rawh" : "Show All"}
              </button>
            </div>
          )}
        </>
      )}

      {/* Ask the AI Storyteller About More Traditional Tales */}
      {!onlySaved && (
        <section className="mt-16 border-t border-[#DFD7C8] pt-12">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#8C2D19]">
                {isMz ? "Thawnthu Dang Zawn Belhna" : "Beyond the Curated Shelf"}
              </p>
              <h2 className="mt-1 font-display text-3xl font-semibold text-[#1C1917]">
                {isMz
                  ? "AI Thawnthu Hrilhtu Hnenah Zawt Rawh"
                  : "Ask the AI Storyteller About Any Mizo Tale"}
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#57534E]">
              {isMz
                ? "AI-in a hrilh zawhah i duh chuan Library-ah 'Save' hmetin a chhiar theih rengin i dah lut nghal thei."
                : "Ask about lesser-known ballads and regional lore—then save any response straight to your Library."}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ORAL_PROMPT_SUGGESTIONS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  onAskPrompt(isMz ? item.mizoPrompt : item.englishPrompt)
                }
                className="flex flex-col justify-between border border-[#DFD7C8] bg-[#F2ECE1]/45 p-5 text-left transition-colors duration-150 hover:border-[#8C2D19] hover:bg-[#F2ECE1] cursor-pointer"
              >
                <div>
                  <span className="text-xs font-medium text-[#1E3A5F]">
                    {isMz ? item.category.mz : item.category.en}
                  </span>
                  <h3 className="mt-1.5 font-display text-xl font-semibold text-[#1C1917]">
                    {isMz ? item.mizoTitle : item.englishTitle}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#57534E]">
                    {isMz ? item.mizoPrompt : item.englishPrompt}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-[#8C2D19]">
                  <span>
                    {isMz ? "Hrilhtu Zawt Rawh" : "Ask Storyteller"}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </button>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
