import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookOpen,
  Loader2,
  MessageSquare,
  PanelsTopLeft,
  Pause,
  Play,
  Square,
  Volume2,
} from "lucide-react";
import { FOLKTALES, THEME_LABELS } from "../data/folktales";
import type { Folktale, Language } from "../types/folklore";
import { ArchivalImage } from "./ArchivalImage";
import { ComicReaderView } from "./ComicReaderView";
import { PuanDivider } from "./PuanDivider";

interface StoryReaderProps {
  tale: Folktale;
  allTales?: Folktale[];
  language: Language;
  isBookmarked: boolean;
  onBack: () => void;
  onChangeLanguage: (lang: Language) => void;
  onToggleBookmark: (id: string) => void;
  onSelectTale: (tale: Folktale) => void;
  onAskAboutTale: (tale: Folktale, starterPrompt?: string) => void;
}

type TtsStatus = "idle" | "loading" | "playing" | "paused" | "error";

export function StoryReader({
  tale,
  allTales = FOLKTALES,
  language,
  isBookmarked,
  onBack,
  onChangeLanguage,
  onToggleBookmark,
  onSelectTale,
  onAskAboutTale,
}: StoryReaderProps) {
  const isMz = language === "mz";
  const content = isMz ? tale.mizo : tale.english;
  const articleRef = useRef<HTMLElement | null>(null);
  const [readingMode, setReadingMode] = useState<"text" | "comic">("text");
  const [readProgress, setReadProgress] = useState(0);

  // Text-to-Speech state
  const [ttsStatus, setTtsStatus] = useState<TtsStatus>("idle");
  const [ttsError, setTtsError] = useState<string | null>(null);
  const [activeSegmentIdx, setActiveSegmentIdx] = useState<number>(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCacheRef = useRef<Map<string, string>>(new Map());
  const inflightFetchesRef = useRef<Map<string, Promise<string>>>(new Map());
  const abortControllerRef = useRef<AbortController | null>(null);
  const playbackSessionRef = useRef<number>(0);

  // Split story into natural narration segments so audio begins quickly
  const narrationSegments = useMemo(() => {
    const clean = (s: string) => s.replace(/\*/g, "").trim();
    const intro = `${clean(content.title)}. ${clean(content.subtitle)}. ${clean(
      content.paragraphs[0] ?? ""
    )}`;
    const middle = content.paragraphs.slice(1).map(clean).filter(Boolean);
    const moralPrefix = isMz ? "Thawnthu zirtirna: " : "Traditional moral: ";
    const outro = `${moralPrefix}${clean(content.moral)}`;
    return [intro, ...middle, outro].filter(Boolean);
  }, [content, isMz]);

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
    setActiveSegmentIdx(0);
    setTtsError(null);
  }, []);

  // Stop narration when switching stories or languages
  useEffect(() => {
    stopNarration();
  }, [tale.id, language, stopNarration]);

  // Revoke cached object URLs and clean up audio on unmount
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

  const fetchSegmentAudioUrl = useCallback(
    async (segmentIndex: number): Promise<string> => {
      const cacheKey = `${tale.id}:${language}:${segmentIndex}`;
      const cached = audioCacheRef.current.get(cacheKey);
      if (cached) return cached;

      const existingInflight = inflightFetchesRef.current.get(cacheKey);
      if (existingInflight) return existingInflight;

      const segmentText = narrationSegments[segmentIndex];
      if (!segmentText) {
        throw new Error("Narration segment is empty.");
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;

      const promise = (async () => {
        const res = await fetch("/api/storyteller/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            text: segmentText,
            language,
          }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(
            errData.error ||
              (isMz
                ? "Aw (Text-to-Speech) siam chhuah theih a ni rih lo."
                : "Unable to generate speech narration right now.")
          );
        }

        const blob = await res.blob();
        const objectUrl = URL.createObjectURL(blob);
        audioCacheRef.current.set(cacheKey, objectUrl);
        return objectUrl;
      })();

      inflightFetchesRef.current.set(cacheKey, promise);
      try {
        return await promise;
      } finally {
        inflightFetchesRef.current.delete(cacheKey);
      }
    },
    [tale.id, language, narrationSegments, isMz]
  );

  const playSegment = useCallback(
    async (segmentIndex: number, sessionId: number) => {
      if (sessionId !== playbackSessionRef.current) return;
      if (segmentIndex >= narrationSegments.length) {
        setTtsStatus("idle");
        setActiveSegmentIdx(0);
        return;
      }

      setActiveSegmentIdx(segmentIndex);
      setTtsStatus("loading");
      setTtsError(null);

      try {
        const url = await fetchSegmentAudioUrl(segmentIndex);
        if (sessionId !== playbackSessionRef.current) return;

        // Prefetch the next segment silently while current segment plays
        if (segmentIndex + 1 < narrationSegments.length) {
          void fetchSegmentAudioUrl(segmentIndex + 1).catch(() => {
            // Prefetch error will be handled when that segment is reached
          });
        }

        const audio = new Audio(url);
        audioRef.current = audio;

        audio.onended = () => {
          if (sessionId !== playbackSessionRef.current) return;
          void playSegment(segmentIndex + 1, sessionId);
        };

        audio.onerror = () => {
          if (sessionId !== playbackSessionRef.current) return;
          setTtsStatus("error");
          setTtsError(
            isMz
              ? "Audio play laiin thil dik lo a awm palh tlat mai."
              : "Audio playback failed."
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
              ? "Aw siam chhuah theih a ni rih lo."
              : "Unable to start narration."
        );
      }
    },
    [fetchSegmentAudioUrl, narrationSegments.length, isMz]
  );

  const handleToggleTts = () => {
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
    const startIdx = ttsStatus === "error" ? activeSegmentIdx : 0;
    void playSegment(startIdx, nextSession);
  };

  useEffect(() => {
    let frameId: number | null = null;

    const updateProgress = () => {
      frameId = null;
      const articleEl = articleRef.current;
      if (!articleEl) {
        setReadProgress(0);
        return;
      }

      const scrollY = window.scrollY;
      if (scrollY <= 4) {
        setReadProgress(0);
        return;
      }

      const nearPageBottom =
        scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 6;
      if (nearPageBottom) {
        setReadProgress(100);
        return;
      }

      const rect = articleEl.getBoundingClientRect();
      const articleTop = rect.top + scrollY;
      const start = Math.max(0, articleTop - 96);
      const end = Math.max(
        start + 1,
        articleTop + articleEl.offsetHeight - window.innerHeight * 0.85
      );
      const pct = Math.min(100, Math.max(0, ((scrollY - start) / (end - start)) * 100));
      setReadProgress(Math.round(pct));
    };

    const handleScrollOrResize = () => {
      if (frameId === null) {
        frameId = window.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    window.addEventListener("scroll", handleScrollOrResize, { passive: true });
    window.addEventListener("resize", handleScrollOrResize, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("scroll", handleScrollOrResize);
      window.removeEventListener("resize", handleScrollOrResize);
    };
  }, [tale.id, language, readingMode]);

  const currentIndex = allTales.findIndex((t) => t.id === tale.id);
  const prevTale = currentIndex > 0 ? allTales[currentIndex - 1] : null;
  const nextTale =
    currentIndex >= 0 && currentIndex < allTales.length - 1
      ? allTales[currentIndex + 1]
      : null;

  return (
    <div className="relative">
      {/* Sticky Scroll-Based Reading Progress Bar */}
      <div className="sticky top-[93px] md:top-[57px] z-20 bg-[#FBF8F3]">
        <progress
          value={readProgress}
          max={100}
          aria-label={
            isMz
              ? `Thawnthu chhiar tawh chin: ${readProgress}%`
              : `Story reading progress: ${readProgress}%`
          }
          className="reading-progress"
        />
      </div>

      <main className="mx-auto max-w-7xl px-4 pb-24 pt-6 sm:px-8">
        {/* Top Reader Utility Strip */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#DFD7C8] pb-4">
          <div className="flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#57534E] transition-colors hover:text-[#1C1917] cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{isMz ? "Thawnthu Bu-ah Kir Rawh" : "Back to Library"}</span>
            </button>
            <span aria-hidden="true" className="text-[#DFD7C8]">
              |
            </span>
            <span className="text-xs font-medium text-[#57534E] tabular-nums whitespace-nowrap shrink-0">
              {isMz ? "Chhiar chin" : "Progress"} ·{" "}
              <strong className="font-semibold text-[#8C2D19]">
                {readProgress}%
              </strong>
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Text Mode vs Comic Mode Segmented Control */}
            <div
              role="group"
              aria-label={isMz ? "Chhiar Dan Thlakna" : "Reading mode"}
              className="inline-flex items-center rounded-md border border-[#DFD7C8] bg-[#F2ECE1] p-1"
            >
              <button
                type="button"
                onClick={() => setReadingMode("text")}
                className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  readingMode === "text"
                    ? "bg-[#FBF8F3] text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span>{isMz ? "Thawnthu Ziak" : "Text"}</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  stopNarration();
                  setReadingMode("comic");
                }}
                className={`inline-flex items-center gap-1.5 rounded px-2.5 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  readingMode === "comic"
                    ? "bg-[#8C2D19] text-[#FBF8F3] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                <PanelsTopLeft className="h-3.5 w-3.5" />
                <span>{isMz ? "Comic Mode" : "Comic"}</span>
              </button>
            </div>

            {/* Text-to-Speech Narration Button (Text Mode) */}
            {readingMode === "text" && (
              <div className="inline-flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={handleToggleTts}
                  aria-pressed={ttsStatus === "playing"}
                  className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    ttsStatus === "playing" || ttsStatus === "loading"
                      ? "border-[#8C2D19] bg-[#8C2D19] text-[#FBF8F3]"
                      : ttsStatus === "paused"
                        ? "border-[#8C2D19] bg-[#8C2D19]/10 text-[#8C2D19]"
                        : "border-[#DFD7C8] bg-[#FBF8F3] text-[#1C1917] hover:border-[#8C2D19] hover:text-[#8C2D19]"
                  }`}
                >
                  {ttsStatus === "loading" ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      <span>
                        {isMz ? "Aw buatsaih mek..." : "Preparing audio..."}
                      </span>
                    </>
                  ) : ttsStatus === "playing" ? (
                    <>
                      <Pause className="h-3.5 w-3.5" />
                      <span className="tabular-nums">
                        {isMz
                          ? `Chawl (${activeSegmentIdx + 1}/${narrationSegments.length})`
                          : `Pause (${activeSegmentIdx + 1}/${narrationSegments.length})`}
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
                        {isMz ? "Mizo-in Ngaithla Rawh" : "Listen in English"}
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
                    className="inline-flex items-center justify-center rounded-md border border-[#DFD7C8] bg-[#FBF8F3] p-1.5 text-[#57534E] transition-colors hover:border-[#8C2D19] hover:text-[#8C2D19] cursor-pointer shrink-0"
                  >
                    <Square className="h-3.5 w-3.5 fill-current" />
                  </button>
                )}
              </div>
            )}

            {/* Instant Mizo / English switch right inside reader */}
            <div
              role="group"
              aria-label="Story language toggle"
              className="inline-flex items-center rounded-md border border-[#DFD7C8] bg-[#F2ECE1] p-1"
            >
              <button
                type="button"
                onClick={() => onChangeLanguage("mz")}
                className={`rounded px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
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
                className={`rounded px-3 py-1 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  language === "en"
                    ? "bg-[#FBF8F3] text-[#1C1917] shadow-xs"
                    : "text-[#57534E] hover:text-[#1C1917]"
                }`}
              >
                English
              </button>
            </div>

            <button
              type="button"
              onClick={() => onToggleBookmark(tale.id)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                isBookmarked
                  ? "border-[#8C2D19] bg-[#8C2D19]/10 text-[#8C2D19]"
                  : "border-[#DFD7C8] bg-[#FBF8F3] text-[#57534E] hover:text-[#1C1917]"
              }`}
            >
              <Bookmark
                className={`h-3.5 w-3.5 ${isBookmarked ? "fill-[#8C2D19]" : ""}`}
              />
              <span>
                {isBookmarked
                  ? isMz
                    ? "Dahṭhat Sa"
                    : "Saved"
                  : isMz
                    ? "Dahṭha Rawh"
                    : "Save Tale"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => onAskAboutTale(tale)}
              className="inline-flex items-center gap-1.5 rounded-md bg-[#1E3A5F] px-3.5 py-1.5 text-xs font-semibold text-[#FBF8F3] transition-colors hover:bg-[#162C49] whitespace-nowrap shrink-0 cursor-pointer"
            >
              <MessageSquare className="h-3.5 w-3.5" />
              <span>
                {isMz ? "Hrilhtu Zawt Rawh" : "Ask Storyteller"}
              </span>
            </button>
          </div>
        </div>

        {/* TTS Error Banner */}
        {ttsError && (
          <div
            role="alert"
            className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-[#8C2D19]/40 bg-[#8C2D19]/5 px-4 py-3 text-sm text-[#8C2D19]"
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{ttsError}</span>
            </div>
            <button
              type="button"
              onClick={handleToggleTts}
              className="rounded border border-[#8C2D19] px-3 py-1 text-xs font-semibold hover:bg-[#8C2D19] hover:text-[#FBF8F3] cursor-pointer"
            >
              {isMz ? "Ti Nawn Leh" : "Retry"}
            </button>
          </div>
        )}

        {/* 70% Main Prose / 30% Cultural Margin Rail */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <article ref={articleRef} className="lg:col-span-8">
          {/* Accession Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-[#57534E]">
              <span className="font-semibold text-[#8C2D19]">
                {tale.accessionNumber}
              </span>
              <span aria-hidden="true">·</span>
              <span>
                {isMz ? THEME_LABELS[tale.theme].mz : THEME_LABELS[tale.theme].en}
              </span>
              <span aria-hidden="true">·</span>
              <span>{isMz ? tale.originNote.mz : tale.originNote.en}</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">
                {tale.readingMinutes} {isMz ? "minit chhiar" : "min read"}
              </span>
            </div>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-[1.12] text-[#1C1917] sm:text-5xl text-balance">
              {content.title}
            </h1>

            <p className="mt-3 font-prose text-lg italic text-[#57534E]">
              {content.subtitle}
            </p>
          </header>

          {readingMode === "comic" ? (
            <div className="mb-12">
              <ComicReaderView tale={tale} language={language} />
            </div>
          ) : (
            <>
              {/* Editorial Plate with Figure Caption */}
              <figure className="mb-10">
                <div className="overflow-hidden border border-[#DFD7C8] bg-[#F2ECE1]">
                  <ArchivalImage
                    src={tale.imageUrl}
                    alt={content.title}
                    titleFallback={content.title}
                    className="aspect-[16/10] w-full object-cover"
                  />
                </div>
                <figcaption className="mt-2.5 font-prose text-xs italic text-[#57534E]">
                  {isMz ? tale.imageCaption.mz : tale.imageCaption.en}
                </figcaption>
              </figure>

              <PuanDivider className="mb-10" />

              {/* Long-Form Reading Measure */}
              <div className="mx-auto max-w-prose space-y-6 font-prose text-[17px] leading-[1.82] text-[#1C1917]">
                {content.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={idx === 0 ? "editorial-drop-cap" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Centered Editorial Pull Quote (No thick left accent border) */}
              <blockquote className="my-12 border-y border-[#DFD7C8] py-7 text-center">
                <p className="mx-auto max-w-xl font-display text-2xl italic leading-snug text-[#1C1917] sm:text-3xl">
                  {content.pullQuote}
                </p>
              </blockquote>
            </>
          )}

          {/* Moral / Zirtirna */}
          <section className="border border-[#DFD7C8] bg-[#F2ECE1]/60 p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#8C2D19]">
              {isMz ? "Thawnthu Zirtirna" : "Traditional Moral"}
            </p>
            <p className="mt-2.5 font-prose text-base leading-relaxed text-[#1C1917]">
              {content.moral}
            </p>
          </section>

          {/* Next / Previous Tale Navigation */}
          <nav
            aria-label="Adjacent Tales"
            className="mt-12 grid grid-cols-1 gap-4 border-t border-[#DFD7C8] pt-8 sm:grid-cols-2"
          >
            {prevTale ? (
              <button
                type="button"
                onClick={() => onSelectTale(prevTale)}
                className="flex flex-col items-start border border-[#DFD7C8] bg-[#FBF8F3] p-4 text-left transition-colors hover:border-[#8C2D19] cursor-pointer"
              >
                <span className="inline-flex items-center gap-1 text-xs text-[#57534E]">
                  <ArrowLeft className="h-3 w-3" />
                  {isMz ? "Thawnthu Hmasa" : "Previous Tale"}
                </span>
                <span className="mt-1 font-display text-xl font-semibold text-[#1C1917]">
                  {isMz ? prevTale.mizo.title : prevTale.english.title}
                </span>
              </button>
            ) : (
              <div />
            )}

            {nextTale && (
              <button
                type="button"
                onClick={() => onSelectTale(nextTale)}
                className="flex flex-col items-end border border-[#DFD7C8] bg-[#FBF8F3] p-4 text-right transition-colors hover:border-[#8C2D19] cursor-pointer"
              >
                <span className="inline-flex items-center gap-1 text-xs text-[#57534E]">
                  {isMz ? "Thawnthu Dawt" : "Next Tale"}
                  <ArrowRight className="h-3 w-3" />
                </span>
                <span className="mt-1 font-display text-xl font-semibold text-[#1C1917]">
                  {isMz ? nextTale.mizo.title : nextTale.english.title}
                </span>
              </button>
            )}
          </nav>
        </article>

        {/* Right 30% Cultural Margin Rail */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            {/* Accession & Characters DL */}
            <div className="border border-[#DFD7C8] bg-[#F2ECE1]/45 p-6">
              <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
                {isMz ? "Thawnthu Chanchin" : "Archival Notes"}
              </h2>
              <dl className="mt-4 divide-y divide-[#DFD7C8] text-sm">
                <div className="py-3">
                  <dt className="text-xs font-medium text-[#57534E]">
                    {isMz ? "Chhinchhiahna" : "Catalog Index"}
                  </dt>
                  <dd className="mt-1 font-medium text-[#1C1917]">
                    {tale.accessionNumber}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-xs font-medium text-[#57534E]">
                    {isMz ? "Changtute" : "Key Figures"}
                  </dt>
                  <dd className="mt-1 text-[#1C1917]">
                    {tale.characters.join(" · ")}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-xs font-medium text-[#57534E]">
                    {isMz ? "Lo Chhuahna" : "Oral Provenance"}
                  </dt>
                  <dd className="mt-1 text-[#1C1917]">
                    {isMz ? tale.originNote.mz : tale.originNote.en}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Cultural Margin Glossary */}
            <div className="border border-[#DFD7C8] bg-[#FBF8F3] p-6">
              <h2 className="font-display text-2xl font-semibold text-[#1C1917]">
                {isMz ? "Mizo Ṭawng & Nunphung" : "Cultural Margin Notes"}
              </h2>
              <dl className="mt-4 divide-y divide-[#DFD7C8]">
                {content.culturalNotes.map((note) => (
                  <div key={note.term} className="py-3.5 first:pt-1 last:pb-0">
                    <dt className="font-display text-lg font-semibold text-[#8C2D19]">
                      {note.term}
                    </dt>
                    <dd className="mt-1 font-prose text-sm leading-relaxed text-[#57534E]">
                      {note.explanation}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Interactive AI Storyteller Bridge */}
            <div className="border border-[#DFD7C8] bg-[#F2ECE1]/65 p-6">
              <h2 className="font-display text-xl font-semibold text-[#1C1917]">
                {isMz
                  ? "He Thawnthu Hi Zawt Belh Rawh"
                  : "Explore Variants with AI"}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-[#57534E]">
                {isMz
                  ? "Khaw hrang hranga sawi dan danglam te emaw naupang tana hrilh nawn tur te zawt rawh."
                  : "Ask our AI Storyteller for regional village variations, song verses, or deeper folklore context."}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onAskAboutTale(
                      tale,
                      isMz
                        ? `"${content.title}" thawnthu hi hmanlai upaten sawi dan danglam deuh (variants) an nei em? Min hrilh thei em?`
                        : `Are there different regional Mizo versions or deeper oral details in the story of "${content.title}"?`
                    )
                  }
                  className="w-full rounded-md border border-[#DFD7C8] bg-[#FBF8F3] px-3.5 py-2 text-left text-xs font-medium text-[#1C1917] transition-colors hover:border-[#8C2D19] cursor-pointer"
                >
                  {isMz
                    ? "Sawi dan danglam a awm em?"
                    : "Compare oral variations"}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onAskAboutTale(
                      tale,
                      isMz
                        ? `"${content.title}" hi Zawlbuk meilum bula naupangte tana ngaihnawm takin han hrilh nawn teh.`
                        : `Retell "${content.title}" in warm fireside Zawlbuk storytelling voice.`
                    )
                  }
                  className="w-full rounded-md bg-[#8C2D19] px-3.5 py-2 text-left text-xs font-semibold text-[#FBF8F3] transition-colors hover:bg-[#732312] cursor-pointer"
                >
                  {isMz
                    ? "Zawlbuk thawnthu hrilh angin hrilh nawn teh"
                    : "Hear a fireside Zawlbuk retelling"}
                </button>
              </div>
            </div>
          </div>
        </aside>
        </div>
      </main>
    </div>
  );
}
