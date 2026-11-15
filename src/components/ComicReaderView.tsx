import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Loader2,
  Maximize2,
  Pause,
  Play,
  RefreshCw,
  Square,
  Volume2,
} from "lucide-react";
import type {
  ComicCameraFraming,
  ComicDialogueBubble,
  ComicPanel,
  ComicStorybook,
  Folktale,
  Language,
} from "../types/folklore";
import {
  deleteCachedComic,
  getCachedComic,
  saveCachedComic,
} from "../utils/comicCache";
import { ArchivalImage } from "./ArchivalImage";

interface ComicReaderViewProps {
  tale: Folktale;
  language: Language;
}

type ComicTtsStatus = "idle" | "loading" | "playing" | "paused" | "error";

const GRID_SPAN_BY_INDEX = [
  "md:col-span-6",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-2",
  "md:col-span-6",
];

function getCameraClasses(framing: ComicCameraFraming): string {
  switch (framing) {
    case "left-focus":
      return "object-[22%_45%] scale-110";
    case "right-focus":
      return "object-[78%_45%] scale-110";
    case "dramatic-closeup":
      return "object-center scale-125";
    case "wide-establishing":
      return "object-center scale-100";
    case "pan-center":
    default:
      return "object-center scale-105";
  }
}

function ComicBubble({ bubble }: { bubble: ComicDialogueBubble }) {
  if (bubble.style === "shout") {
    return (
      <div className="manga-bubble-shout relative bg-[#FBF8F3] px-3.5 py-2.5 text-[#1C1917]">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C2D19]">
          {bubble.speaker}
        </p>
        <p className="mt-0.5 text-xs sm:text-sm font-bold leading-snug text-[#1C1917]">
          “{bubble.line}”
        </p>
      </div>
    );
  }

  if (bubble.style === "thought") {
    return (
      <div className="relative rounded-2xl border-2 border-dashed border-[#1E3A5F] bg-[#FBF8F3]/95 px-3.5 py-2.5 text-[#1C1917]">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-[#1E3A5F]">
          {bubble.speaker}
        </p>
        <p className="mt-0.5 font-prose text-xs sm:text-sm italic leading-snug text-[#1C1917]">
          {bubble.line}
        </p>
      </div>
    );
  }

  return (
    <div className="manga-bubble-speech relative rounded-xl bg-[#FBF8F3] px-3.5 py-2.5 text-[#1C1917]">
      <p className="text-[10px] font-bold uppercase tracking-wider text-[#8C2D19]">
        {bubble.speaker}
      </p>
      <p className="mt-0.5 text-xs sm:text-sm font-medium leading-snug text-[#1C1917]">
        “{bubble.line}”
      </p>
    </div>
  );
}

function MangaPanelCard({
  panel,
  index,
  language,
  isFocusedView,
  isActivelyNarrated,
  onSelectFocus,
}: {
  panel: ComicPanel;
  index: number;
  language: Language;
  isFocusedView: boolean;
  isActivelyNarrated: boolean;
  onSelectFocus?: () => void;
}) {
  const isMz = language === "mz";
  const loc = isMz ? panel.mizo : panel.english;
  const spanClass = isFocusedView
    ? "col-span-full"
    : GRID_SPAN_BY_INDEX[index] ?? "md:col-span-3";

  const artworkHeightClass = isFocusedView
    ? "aspect-[16/10] sm:aspect-[16/9]"
    : index === 0 || index === 5
      ? "aspect-[16/10] md:aspect-[21/9]"
      : "aspect-[4/3]";

  return (
    <article
      className={`${spanClass} flex flex-col bg-[#FBF8F3] transition-all duration-200 ${
        isActivelyNarrated
          ? "manga-panel-frame-active"
          : "manga-panel-frame"
      }`}
    >
      {/* Inked Graphic Novel Artwork Frame */}
      <div
        className={`relative w-full overflow-hidden bg-[#1C1917] ${artworkHeightClass}`}
      >
        <ArchivalImage
          src={panel.sceneArtUrl}
          alt={loc.caption || `Panel ${panel.panelNumber}`}
          titleFallback={`Panel ${panel.panelNumber}`}
          className={`h-full w-full object-cover contrast-110 transition-transform duration-300 ${getCameraClasses(
            panel.cameraFraming
          )}`}
        />

        {/* Manga Halftone Screen Tone */}
        {(panel.mangaEffect === "halftone-drama" ||
          panel.mangaEffect === "action-lines") && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 manga-halftone-overlay opacity-75"
          />
        )}

        {/* Radial Manga Action Speed Lines */}
        {panel.mangaEffect === "action-lines" && (
          <svg
            aria-hidden="true"
            viewBox="0 0 200 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 h-full w-full opacity-35"
          >
            <g stroke="#FBF8F3" strokeWidth="1.2">
              <line x1="0" y1="0" x2="55" y2="35" />
              <line x1="25" y1="0" x2="68" y2="32" />
              <line x1="175" y1="0" x2="132" y2="34" />
              <line x1="200" y1="0" x2="145" y2="38" />
              <line x1="0" y1="120" x2="55" y2="85" />
              <line x1="200" y1="120" x2="145" y2="85" />
              <line x1="0" y1="60" x2="40" y2="60" />
              <line x1="200" y1="60" x2="160" y2="60" />
            </g>
          </svg>
        )}

        {/* Atmospheric Mood Vignette */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${
            panel.mangaEffect === "moonlight-noir"
              ? "bg-gradient-to-t from-[#1E3A5F]/65 via-transparent to-[#1C1917]/35"
              : panel.mangaEffect === "warm-hearth"
                ? "bg-gradient-to-t from-[#8C2D19]/35 via-transparent to-transparent"
                : "bg-gradient-to-t from-[#1C1917]/50 via-transparent to-transparent"
          }`}
        />

        {/* Panel Number Plate */}
        <div className="absolute left-3 top-3 flex items-center gap-2">
          <span className="border border-[#FBF8F3]/70 bg-[#1C1917]/90 px-2 py-0.5 text-[11px] font-bold tracking-widest text-[#FBF8F3] tabular-nums">
            {String(panel.panelNumber).padStart(2, "0")}
          </span>
        </div>

        {/* Focus Zoom Affordance in Grid View */}
        {!isFocusedView && onSelectFocus && (
          <button
            type="button"
            onClick={onSelectFocus}
            aria-label={
              isMz
                ? `Panel ${panel.panelNumber} en fiah rawh`
                : `Focus Panel ${panel.panelNumber}`
            }
            className="absolute right-3 top-3 inline-flex items-center justify-center border border-[#1C1917] bg-[#FBF8F3]/95 p-1.5 text-[#1C1917] transition-colors hover:bg-[#8C2D19] hover:text-[#FBF8F3] cursor-pointer"
          >
            <Maximize2 className="h-3.5 w-3.5" />
          </button>
        )}

        {/* Bold Manga SFX Onomatopoeia */}
        {loc.sfx && (
          <div className="pointer-events-none absolute bottom-3 right-3 -rotate-6 border-2 border-[#1C1917] bg-[#FBF8F3] px-2.5 py-0.5 font-display text-lg font-bold tracking-wider text-[#8C2D19] shadow-[2px_2px_0_#1C1917]">
            {loc.sfx}
          </div>
        )}
      </div>

      {/* Lower Inked Narration & Speech Bubbles Strip */}
      <div className="flex flex-1 flex-col justify-between gap-3 border-t-2 border-[#1C1917] bg-[#F2ECE1]/65 p-4">
        {loc.caption && (
          <div className="border border-[#1C1917]/40 bg-[#FBF8F3] px-3 py-2">
            <p className="font-prose text-xs sm:text-sm leading-relaxed text-[#1C1917]">
              {loc.caption}
            </p>
          </div>
        )}

        {loc.dialogue.length > 0 && (
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {loc.dialogue.map((bubble, bIdx) => (
              <div
                key={`${panel.panelNumber}-b-${bIdx}`}
                className={loc.dialogue.length === 1 ? "sm:col-span-2" : ""}
              >
                <ComicBubble bubble={bubble} />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export function ComicReaderView({ tale, language }: ComicReaderViewProps) {
  const isMz = language === "mz";
  const [comic, setComic] = useState<ComicStorybook | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [layoutMode, setLayoutMode] = useState<"spread" | "focus">("spread");
  const [focusedIdx, setFocusedIdx] = useState(0);

  // Synchronized Comic Voice Narration state
  const [ttsStatus, setTtsStatus] = useState<ComicTtsStatus>("idle");
  const [ttsError, setTtsError] = useState<string | null>(null);
  const [activeNarrationPanelIdx, setActiveNarrationPanelIdx] = useState<
    number | null
  >(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const inflightRef = useRef<Map<string, Promise<string>>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);
  const playbackSessionRef = useRef(0);

  const stopNarration = useCallback(() => {
    playbackSessionRef.current += 1;
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    setTtsStatus("idle");
    setActiveNarrationPanelIdx(null);
    setTtsError(null);
  }, []);

  useEffect(() => {
    stopNarration();
  }, [tale.id, language, stopNarration]);

  useEffect(() => {
    const cache = audioCacheRef.current;
    return () => {
      playbackSessionRef.current += 1;
      abortControllerRef.current?.abort();
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      cache.forEach((url) => URL.revokeObjectURL(url));
      cache.clear();
    };
  }, []);

  const loadOrGenerateComic = useCallback(
    async (forceRegenerate = false) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!forceRegenerate) {
          const cached = await getCachedComic(tale.id);
          if (cached && cached.panels.length > 0) {
            setComic(cached);
            setIsLoading(false);
            return;
          }
        } else {
          await deleteCachedComic(tale.id);
        }

        const response = await fetch("/api/storyteller/comic-script", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            taleId: tale.id,
            titleMz: tale.mizo.title,
            titleEn: tale.english.title,
            summaryMz: tale.mizo.summary,
            summaryEn: tale.english.summary,
            paragraphsMz: tale.mizo.paragraphs,
            paragraphsEn: tale.english.paragraphs,
            characters: tale.characters,
            theme: tale.theme,
            defaultImageUrl: tale.imageUrl,
          }),
        });

        const data = (await response.json().catch(() => ({}))) as {
          comic?: ComicStorybook;
          error?: string;
        };

        if (!response.ok || !data.comic) {
          throw new Error(
            data.error ||
              (isMz
                ? "Comic thawnthu buatsaih theih a ni rih lo."
                : "Could not build the comic adaptation right now.")
          );
        }

        setComic(data.comic);
        setFocusedIdx(0);
        await saveCachedComic(data.comic);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : isMz
              ? "Comic buatsaih laiin thil dik lo a awm."
              : "Failed to generate comic panels."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [tale, isMz]
  );

  useEffect(() => {
    void loadOrGenerateComic(false);
  }, [loadOrGenerateComic]);

  // Narration script per panel in current language
  const panelScripts = useMemo(() => {
    if (!comic) return [];
    return comic.panels.map((p) => {
      const loc = isMz ? p.mizo : p.english;
      const lines = loc.dialogue.map((d) => `${d.speaker}: ${d.line}`).join(" ");
      return `${loc.caption} ${lines}`.trim();
    });
  }, [comic, isMz]);

  const fetchPanelAudioUrl = useCallback(
    async (panelIdx: number): Promise<string> => {
      const key = `comic:${tale.id}:${language}:${panelIdx}`;
      const cached = audioCacheRef.current.get(key);
      if (cached) return cached;

      const existing = inflightRef.current.get(key);
      if (existing) return existing;

      const text = panelScripts[panelIdx];
      if (!text) throw new Error("Panel script is empty.");

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const promise = (async () => {
        const res = await fetch("/api/storyteller/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ text, language }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.error ||
              (isMz
                ? "Comic aw siam chhuah theih a ni rih lo."
                : "Unable to generate comic voice narration.")
          );
        }

        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        audioCacheRef.current.set(key, url);
        return url;
      })();

      inflightRef.current.set(key, promise);
      try {
        return await promise;
      } finally {
        inflightRef.current.delete(key);
      }
    },
    [tale.id, language, panelScripts, isMz]
  );

  const playPanelSegment = useCallback(
    async (panelIdx: number, sessionId: number) => {
      if (sessionId !== playbackSessionRef.current) return;
      if (panelIdx >= panelScripts.length) {
        setTtsStatus("idle");
        setActiveNarrationPanelIdx(null);
        return;
      }

      setActiveNarrationPanelIdx(panelIdx);
      if (layoutMode === "focus") {
        setFocusedIdx(panelIdx);
      }
      setTtsStatus("loading");
      setTtsError(null);

      try {
        const url = await fetchPanelAudioUrl(panelIdx);
        if (sessionId !== playbackSessionRef.current) return;

        if (panelIdx + 1 < panelScripts.length) {
          void fetchPanelAudioUrl(panelIdx + 1).catch(() => {});
        }

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          if (sessionId !== playbackSessionRef.current) return;
          void playPanelSegment(panelIdx + 1, sessionId);
        };

        audio.onerror = () => {
          if (sessionId !== playbackSessionRef.current) return;
          setTtsStatus("error");
          setTtsError(
            isMz ? "Audio play theih a ni lo." : "Audio playback failed."
          );
        };

        await audio.play();
        if (sessionId === playbackSessionRef.current) {
          setTtsStatus("playing");
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        if (sessionId !== playbackSessionRef.current) return;
        setTtsStatus("error");
        setTtsError(
          err instanceof Error
            ? err.message
            : isMz
              ? "Aw siam chhuah theih a ni lo."
              : "Unable to play comic narration."
        );
      }
    },
    [fetchPanelAudioUrl, panelScripts.length, layoutMode, isMz]
  );

  const handleToggleComicTts = () => {
    if (ttsStatus === "playing" && audioRef.current) {
      audioRef.current.pause();
      setTtsStatus("paused");
      return;
    }
    if (ttsStatus === "paused" && audioRef.current) {
      void audioRef.current.play();
      setTtsStatus("playing");
      return;
    }
    if (ttsStatus === "loading") {
      stopNarration();
      return;
    }
    const nextSession = playbackSessionRef.current + 1;
    playbackSessionRef.current = nextSession;
    const startIdx =
      layoutMode === "focus"
        ? focusedIdx
        : activeNarrationPanelIdx ?? 0;
    void playPanelSegment(startIdx, nextSession);
  };

  if (isLoading) {
    return (
      <section className="space-y-6">
        <div className="flex items-center gap-3 border border-[#DFD7C8] bg-[#F2ECE1]/70 px-5 py-4">
          <Loader2 className="h-4 w-4 animate-spin text-[#8C2D19] shrink-0" />
          <p className="text-sm font-medium text-[#1C1917]">
            {isMz
              ? "Modern Graphic Novel / Manga comic panel 6 siam mek a ni..."
              : "Adapting this folktale into 6 Modern Graphic Novel panels..."}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
          {GRID_SPAN_BY_INDEX.map((span, idx) => (
            <div
              key={idx}
              className={`${span} manga-panel-frame bg-[#F2ECE1]/60 p-4`}
            >
              <div className="h-44 w-full bg-[#DFD7C8]/60" />
              <div className="mt-3 h-4 w-3/4 bg-[#DFD7C8]/80" />
              <div className="mt-2 h-3 w-1/2 bg-[#DFD7C8]/60" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error || !comic) {
    return (
      <section className="border border-[#8C2D19]/40 bg-[#8C2D19]/5 p-6 text-center">
        <div className="mx-auto flex max-w-md flex-col items-center gap-3">
          <AlertCircle className="h-6 w-6 text-[#8C2D19]" />
          <p className="font-display text-2xl font-semibold text-[#1C1917]">
            {isMz
              ? "Comic Buatsaih Theih A Ni Rih Lo"
              : "Unable to Load Comic Edition"}
          </p>
          <p className="text-sm text-[#57534E]">{error}</p>
          <button
            type="button"
            onClick={() => void loadOrGenerateComic(true)}
            className="mt-2 inline-flex items-center gap-2 rounded-md bg-[#8C2D19] px-4 py-2 text-xs font-semibold text-[#FBF8F3] hover:bg-[#732312] cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{isMz ? "Ti Nawn Leh Rawh" : "Try Again"}</span>
          </button>
        </div>
      </section>
    );
  }

  const totalPanels = comic.panels.length;
  const focusedPanel = comic.panels[focusedIdx] ?? comic.panels[0];

  return (
    <section className="space-y-6">
      {/* Comic Toolbar */}
      <div className="flex flex-col gap-3 border-2 border-[#1C1917] bg-[#F2ECE1]/80 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#8C2D19]">
            {isMz ? comic.styleNote.mz : comic.styleNote.en}
          </p>
          <p className="mt-0.5 text-xs text-[#57534E] tabular-nums">
            {totalPanels}{" "}
            {isMz
              ? "Graphic Novel panel · Mizo leh English speech bubbles"
              : "Graphic Novel panels · Bilingual speech & narration"}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Comic Voice Narration */}
          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleToggleComicTts}
              className={`inline-flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                ttsStatus === "playing" || ttsStatus === "loading"
                  ? "border-[#8C2D19] bg-[#8C2D19] text-[#FBF8F3]"
                  : "border-[#1C1917] bg-[#FBF8F3] text-[#1C1917] hover:bg-[#8C2D19] hover:border-[#8C2D19] hover:text-[#FBF8F3]"
              }`}
            >
              {ttsStatus === "loading" ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>{isMz ? "Aw buatsaih..." : "Preparing..."}</span>
                </>
              ) : ttsStatus === "playing" ? (
                <>
                  <Pause className="h-3.5 w-3.5" />
                  <span className="tabular-nums">
                    {isMz
                      ? `Chawl (Panel ${(activeNarrationPanelIdx ?? 0) + 1}/${totalPanels})`
                      : `Pause (Panel ${(activeNarrationPanelIdx ?? 0) + 1}/${totalPanels})`}
                  </span>
                </>
              ) : ttsStatus === "paused" ? (
                <>
                  <Play className="h-3.5 w-3.5" />
                  <span>{isMz ? "Chhunzawm" : "Resume"}</span>
                </>
              ) : (
                <>
                  <Volume2 className="h-3.5 w-3.5" />
                  <span>
                    {isMz ? "Comic Ngaithla Rawh" : "Listen to Comic"}
                  </span>
                </>
              )}
            </button>

            {(ttsStatus === "playing" ||
              ttsStatus === "paused" ||
              ttsStatus === "loading") && (
              <button
                type="button"
                onClick={stopNarration}
                aria-label={isMz ? "Tawp rawh" : "Stop narration"}
                className="inline-flex items-center justify-center rounded border border-[#1C1917] bg-[#FBF8F3] p-1.5 text-[#1C1917] hover:border-[#8C2D19] hover:text-[#8C2D19] cursor-pointer shrink-0"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
              </button>
            )}
          </div>

          {/* Spread vs Focus Stepper */}
          <div
            role="group"
            aria-label={isMz ? "Comic en dan" : "Comic layout"}
            className="inline-flex rounded border border-[#1C1917]/35 bg-[#FBF8F3] p-0.5"
          >
            <button
              type="button"
              onClick={() => setLayoutMode("spread")}
              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                layoutMode === "spread"
                  ? "bg-[#1C1917] text-[#FBF8F3]"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              <LayoutGrid className="h-3.5 w-3.5" />
              <span>{isMz ? "Page" : "Spread"}</span>
            </button>
            <button
              type="button"
              onClick={() => setLayoutMode("focus")}
              className={`inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs font-semibold whitespace-nowrap shrink-0 cursor-pointer ${
                layoutMode === "focus"
                  ? "bg-[#1C1917] text-[#FBF8F3]"
                  : "text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span>{isMz ? "Pakhat Zelin" : "Focus"}</span>
            </button>
          </div>

          {/* Regenerate Comic Adaptation */}
          <button
            type="button"
            onClick={() => {
              stopNarration();
              void loadOrGenerateComic(true);
            }}
            className="inline-flex items-center gap-1.5 rounded border border-[#DFD7C8] bg-[#FBF8F3] px-3 py-1.5 text-xs font-medium text-[#57534E] transition-colors hover:border-[#8C2D19] hover:text-[#8C2D19] whitespace-nowrap shrink-0 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>{isMz ? "Siam Thar" : "Regenerate"}</span>
          </button>
        </div>
      </div>

      {ttsError && (
        <div
          role="alert"
          className="flex items-center justify-between gap-3 border border-[#8C2D19]/40 bg-[#8C2D19]/5 px-4 py-2.5 text-xs text-[#8C2D19]"
        >
          <span>{ttsError}</span>
          <button
            type="button"
            onClick={handleToggleComicTts}
            className="font-semibold underline cursor-pointer"
          >
            {isMz ? "Ti Nawn Leh" : "Retry"}
          </button>
        </div>
      )}

      {layoutMode === "focus" && focusedPanel ? (
        <div className="space-y-4">
          <MangaPanelCard
            panel={focusedPanel}
            index={focusedIdx}
            language={language}
            isFocusedView
            isActivelyNarrated={activeNarrationPanelIdx === focusedIdx}
          />

          <div className="flex items-center justify-between border border-[#DFD7C8] bg-[#F2ECE1]/60 px-4 py-3">
            <button
              type="button"
              disabled={focusedIdx <= 0}
              onClick={() => setFocusedIdx((i) => Math.max(0, i - 1))}
              className="inline-flex items-center gap-1.5 rounded border border-[#1C1917] bg-[#FBF8F3] px-3.5 py-1.5 text-xs font-semibold text-[#1C1917] disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>{isMz ? "Panel Hmasa" : "Prev Panel"}</span>
            </button>

            <span className="text-xs font-semibold text-[#1C1917] tabular-nums">
              Panel {focusedIdx + 1} / {totalPanels}
            </span>

            <button
              type="button"
              disabled={focusedIdx >= totalPanels - 1}
              onClick={() =>
                setFocusedIdx((i) => Math.min(totalPanels - 1, i + 1))
              }
              className="inline-flex items-center gap-1.5 rounded border border-[#1C1917] bg-[#FBF8F3] px-3.5 py-1.5 text-xs font-semibold text-[#1C1917] disabled:opacity-40 cursor-pointer"
            >
              <span>{isMz ? "Panel Dawt" : "Next Panel"}</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-6">
          {comic.panels.map((panel, idx) => (
            <MangaPanelCard
              key={panel.panelNumber}
              panel={panel}
              index={idx}
              language={language}
              isFocusedView={false}
              isActivelyNarrated={activeNarrationPanelIdx === idx}
              onSelectFocus={() => {
                setFocusedIdx(idx);
                setLayoutMode("focus");
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
