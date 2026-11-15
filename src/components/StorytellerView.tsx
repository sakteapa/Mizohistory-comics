import { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  ArrowRight,
  BookmarkPlus,
  BookOpen,
  Check,
  Loader2,
  RotateCcw,
  Send,
  Square,
  X,
} from "lucide-react";
import { ORAL_PROMPT_SUGGESTIONS } from "../data/folktales";
import type {
  Folktale,
  Language,
  StorytellerMessage,
} from "../types/folklore";
import { PuanDivider } from "./PuanDivider";

interface StorytellerViewProps {
  language: Language;
  messages: StorytellerMessage[];
  activeTaleContext: Folktale | null;
  pendingPrompt: string | null;
  totalTaleCount: number;
  onConsumePendingPrompt: () => void;
  onChangeLanguage: (lang: Language) => void;
  onUpdateMessages: (
    updater: (prev: StorytellerMessage[]) => StorytellerMessage[]
  ) => void;
  onClearContext: () => void;
  onClearConversation: () => void;
  onSaveTaleToLibrary: (tale: Folktale) => void;
  onOpenSavedTale: (tale: Folktale) => void;
}

export function StorytellerView({
  language,
  messages,
  activeTaleContext,
  pendingPrompt,
  totalTaleCount,
  onConsumePendingPrompt,
  onChangeLanguage,
  onUpdateMessages,
  onClearContext,
  onClearConversation,
  onSaveTaleToLibrary,
  onOpenSavedTale,
}: StorytellerViewProps) {
  const isMz = language === "mz";
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Save-to-Library state per AI message
  const [savingMessageId, setSavingMessageId] = useState<string | null>(null);
  const [savedTalesByMsg, setSavedTalesByMsg] = useState<
    Record<string, Folktale>
  >({});
  const [saveErrorsByMsg, setSaveErrorsByMsg] = useState<
    Record<string, string>
  >({});

  const abortControllerRef = useRef<AbortController | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollAnchorRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isStreaming]);

  const sendMessage = async (rawText: string) => {
    const trimmed = rawText.trim();
    if (!trimmed || isStreaming) return;

    setErrorBanner(null);
    const userMessage: StorytellerMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
      timestamp: Date.now(),
    };
    const modelMessageId = `model-${Date.now() + 1}`;
    const placeholderModelMessage: StorytellerMessage = {
      id: modelMessageId,
      role: "model",
      text: "",
      timestamp: Date.now(),
    };

    const conversationForApi = [...messages, userMessage].map((m) => ({
      role: m.role,
      text: m.text,
    }));

    onUpdateMessages((prev) => [...prev, userMessage, placeholderModelMessage]);
    setInput("");
    setIsStreaming(true);

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const response = await fetch("/api/storyteller/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          messages: conversationForApi,
          language,
          storyContext: activeTaleContext
            ? {
                title: isMz
                  ? activeTaleContext.mizo.title
                  : activeTaleContext.english.title,
                summary: isMz
                  ? activeTaleContext.mizo.summary
                  : activeTaleContext.english.summary,
                region: isMz
                  ? activeTaleContext.originNote.mz
                  : activeTaleContext.originNote.en,
              }
            : undefined,
        }),
      });

      if (!response.ok) {
        const errBody = await response.json().catch(() => ({}));
        throw new Error(
          errBody.error ||
            (isMz
              ? "Thawnthu Hrilhtu nen inzawm theih a ni rih lo."
              : "Could not connect to the AI Storyteller.")
        );
      }

      if (!response.body) {
        throw new Error("Streaming response is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith("data:")) continue;
          const payload = trimmedLine.slice(5).trim();
          if (payload === "[DONE]") {
            break;
          }
          try {
            const parsed = JSON.parse(payload) as {
              text?: string;
              error?: string;
            };
            if (parsed.error) {
              throw new Error(parsed.error);
            }
            if (parsed.text) {
              onUpdateMessages((prev) =>
                prev.map((m) =>
                  m.id === modelMessageId
                    ? { ...m, text: m.text + parsed.text }
                    : m
                )
              );
            }
          } catch (parseErr) {
            if (
              parseErr instanceof Error &&
              parseErr.message !== "Unexpected end of JSON input"
            ) {
              if (payload.includes('"error"')) {
                throw parseErr;
              }
            }
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") {
        onUpdateMessages((prev) =>
          prev.map((m) =>
            m.id === modelMessageId && !m.text
              ? {
                  ...m,
                  text: isMz
                    ? "[Thawnthu hrilh lai tih tawp a ni.]"
                    : "[Storytelling paused.]",
                }
              : m
          )
        );
      } else {
        const errMessage =
          err instanceof Error
            ? err.message
            : isMz
              ? "Thil dik lo a awm palh tlat mai."
              : "Something went wrong while generating the response.";
        setErrorBanner(errMessage);
        onUpdateMessages((prev) =>
          prev.filter((m) => !(m.id === modelMessageId && m.text === ""))
        );
      }
    } finally {
      setIsStreaming(false);
      abortControllerRef.current = null;
    }
  };

  useEffect(() => {
    if (pendingPrompt && !isStreaming) {
      const promptToSend = pendingPrompt;
      onConsumePendingPrompt();
      void sendMessage(promptToSend);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pendingPrompt]);

  const handleStopStream = () => {
    abortControllerRef.current?.abort();
  };

  const handleRetryLast = () => {
    const lastUserMessage = [...messages]
      .reverse()
      .find((m) => m.role === "user");
    if (!lastUserMessage || isStreaming) return;
    setErrorBanner(null);
    void sendMessage(lastUserMessage.text);
  };

  const handleSaveMessageToLibrary = async (msgIndex: number) => {
    const targetMsg = messages[msgIndex];
    if (!targetMsg || targetMsg.role !== "model" || !targetMsg.text.trim()) {
      return;
    }
    if (savingMessageId) return;

    // Look backward for nearest user prompt to give clean topic context
    let topic = "";
    for (let i = msgIndex - 1; i >= 0; i -= 1) {
      if (messages[i].role === "user" && messages[i].text.trim()) {
        topic = messages[i].text.trim();
        break;
      }
    }
    if (!topic) {
      topic = targetMsg.text.split("\n")[0].slice(0, 120);
    }

    setSavingMessageId(targetMsg.id);
    setSaveErrorsByMsg((prev) => {
      const next = { ...prev };
      delete next[targetMsg.id];
      return next;
    });

    try {
      const response = await fetch("/api/storyteller/compose-tale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic,
          conversationExcerpt: targetMsg.text,
          existingCount: totalTaleCount,
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
              ? "Library-ah save theih a ni rih lo."
              : "Could not save this tale to the Library.")
        );
      }

      onSaveTaleToLibrary(data.tale);
      setSavedTalesByMsg((prev) => ({ ...prev, [targetMsg.id]: data.tale! }));
    } catch (err) {
      setSaveErrorsByMsg((prev) => ({
        ...prev,
        [targetMsg.id]:
          err instanceof Error
            ? err.message
            : isMz
              ? "Save laiin thil dik lo a awm."
              : "Unable to save tale.",
      }));
    } finally {
      setSavingMessageId(null);
    }
  };

  return (
    <main className="mx-auto max-w-5xl px-4 pb-20 pt-8 sm:px-8">
      {/* Header Row */}
      <div className="mb-6 flex flex-col gap-4 border-b border-[#DFD7C8] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8C2D19]">
            {isMz ? "Zawlbuk Meilum Eng" : "Interactive Oral Companion"}
          </p>
          <h1 className="mt-1.5 font-display text-4xl font-semibold text-[#1C1917]">
            {isMz ? "Thawnthu Hrilhtu (AI Storyteller)" : "Thawnthu Hrilhtu"}
          </h1>
          <p className="mt-1 text-sm text-[#57534E]">
            {isMz
              ? "Mizo thawnthu i hriat duh apiang zawt la, a chhanna te Library-ah i save nghal thei bawk."
              : "Ask for any Mizo folktale or regional legend—and save any retelling straight to your bilingual Library."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div
            role="group"
            aria-label="Storyteller language"
            className="inline-flex rounded-md border border-[#DFD7C8] bg-[#F2ECE1] p-1"
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

          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearConversation}
              disabled={isStreaming}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#DFD7C8] bg-[#FBF8F3] px-3 py-1.5 text-xs font-medium text-[#57534E] transition-colors hover:text-[#1C1917] disabled:opacity-50 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>{isMz ? "Titi Thar Ṭan" : "New Thread"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Story Context Banner */}
      {activeTaleContext && (
        <div className="mb-6 flex items-center justify-between gap-4 border border-[#DFD7C8] bg-[#F2ECE1]/65 px-4 py-3 text-xs">
          <div className="flex items-center gap-2.5 text-[#1C1917]">
            <BookOpen className="h-4 w-4 text-[#8C2D19] shrink-0" />
            <span>
              {isMz ? "Thawnthu sawiho lai: " : "Reading context: "}
              <strong className="font-semibold">
                {isMz
                  ? activeTaleContext.mizo.title
                  : activeTaleContext.english.title}
              </strong>
            </span>
          </div>
          <button
            type="button"
            onClick={onClearContext}
            className="inline-flex items-center gap-1 text-[#57534E] hover:text-[#1C1917] cursor-pointer shrink-0"
          >
            <X className="h-3.5 w-3.5" />
            <span>{isMz ? "Paih" : "Clear"}</span>
          </button>
        </div>
      )}

      {/* Conversation Canvas */}
      <div className="border border-[#DFD7C8] bg-[#FBF8F3]">
        <div className="min-h-[380px] max-h-[560px] overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Welcome Intro Card when no messages yet */}
          {messages.length === 0 ? (
            <div className="space-y-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-display text-3xl font-semibold text-[#1C1917]">
                  {isMz
                    ? "Mizo thawnthu hluite i hre belh duh em?"
                    : "What Mizo tale shall we hear tonight?"}
                </h2>
                <p className="mt-3 font-prose text-base leading-relaxed text-[#57534E]">
                  {isMz
                    ? "Library-a thawnthu 42+ awm sa bakah, thawnthu dang hriat duh i neih chuan min zawt rawh; ka sawi zawhah i duh chuan Library-ah a chhiar theih nghalin kan dah lut thei zel bawk."
                    : "Beyond our 42+ curated editions, ask about any ballad, pasaltha exploit, or village legend—and save any retelling directly into the Library."}
                </p>
              </div>

              <PuanDivider />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ORAL_PROMPT_SUGGESTIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      void sendMessage(
                        isMz ? item.mizoPrompt : item.englishPrompt
                      )
                    }
                    className="border border-[#DFD7C8] bg-[#F2ECE1]/45 p-4 text-left transition-colors hover:border-[#8C2D19] hover:bg-[#F2ECE1] cursor-pointer"
                  >
                    <p className="text-xs font-medium text-[#1E3A5F]">
                      {isMz ? item.category.mz : item.category.en}
                    </p>
                    <p className="mt-1 font-display text-lg font-semibold text-[#1C1917]">
                      {isMz ? item.mizoTitle : item.englishTitle}
                    </p>
                    <p className="mt-1 text-xs text-[#57534E] line-clamp-2">
                      {isMz ? item.mizoPrompt : item.englishPrompt}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isLastMessage = idx === messages.length - 1;
              const isFinishedModelMessage =
                !isUser &&
                msg.text.trim().length > 40 &&
                !(isStreaming && isLastMessage);
              const savedTale = savedTalesByMsg[msg.id];
              const isSavingThis = savingMessageId === msg.id;
              const saveError = saveErrorsByMsg[msg.id];

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${
                    isUser ? "items-end" : "items-start"
                  }`}
                >
                  <span className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#57534E]">
                    {isUser
                      ? isMz
                        ? "Nangmah"
                        : "You"
                      : isMz
                        ? "Thawnthu Hrilhtu"
                        : "Storyteller"}
                  </span>

                  <div
                    className={`max-w-3xl px-5 py-4 ${
                      isUser
                        ? "border border-[#DFD7C8] bg-[#F2ECE1] text-[#1C1917]"
                        : "border border-[#DFD7C8] bg-[#FBF8F3] font-prose text-[16px] leading-[1.75] text-[#1C1917]"
                    }`}
                  >
                    {msg.text ? (
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    ) : (
                      <span className="text-sm italic text-[#57534E]">
                        {isMz
                          ? "Thawnthu a buatsaih mek..."
                          : "Gathering the tale..."}
                      </span>
                    )}
                  </div>

                  {/* Save AI Tale to Library Action Row */}
                  {isFinishedModelMessage && (
                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      {savedTale ? (
                        <>
                          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1E3A5F]">
                            <Check className="h-3.5 w-3.5" />
                            <span>
                              {isMz
                                ? "Library-ah dahṭhat a ni tawh"
                                : "Saved to Library"}
                            </span>
                          </span>
                          <button
                            type="button"
                            onClick={() => onOpenSavedTale(savedTale)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#8C2D19] underline underline-offset-4 hover:text-[#732312] cursor-pointer"
                          >
                            <span>
                              {isMz ? "Thawnthu Chhiar Rawh" : "Open in Reader"}
                            </span>
                            <ArrowRight className="h-3 w-3" />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          disabled={Boolean(savingMessageId)}
                          onClick={() => void handleSaveMessageToLibrary(idx)}
                          className="inline-flex items-center gap-1.5 rounded-md border border-[#DFD7C8] bg-[#F2ECE1]/60 px-3 py-1.5 text-xs font-semibold text-[#1C1917] transition-colors hover:border-[#8C2D19] hover:text-[#8C2D19] disabled:opacity-50 cursor-pointer"
                        >
                          {isSavingThis ? (
                            <>
                              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#8C2D19]" />
                              <span>
                                {isMz
                                  ? "Library-ah buatsaih mek..."
                                  : "Saving to Library..."}
                              </span>
                            </>
                          ) : (
                            <>
                              <BookmarkPlus className="h-3.5 w-3.5 text-[#8C2D19]" />
                              <span>
                                {isMz
                                  ? "Library-ah Dahṭha Rawh (Mizo & English)"
                                  : "Save This Tale to Library"}
                              </span>
                            </>
                          )}
                        </button>
                      )}

                      {saveError && (
                        <span className="text-xs text-[#8C2D19]">
                          {saveError}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}

          {errorBanner && (
            <div
              role="alert"
              className="flex flex-wrap items-center justify-between gap-3 border border-[#8C2D19]/40 bg-[#8C2D19]/5 px-4 py-3 text-sm text-[#8C2D19]"
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorBanner}</span>
              </div>
              <button
                type="button"
                onClick={handleRetryLast}
                className="rounded border border-[#8C2D19] px-3 py-1 text-xs font-semibold hover:bg-[#8C2D19] hover:text-[#FBF8F3] cursor-pointer"
              >
                {isMz ? "Ti Nawn Leh" : "Retry"}
              </button>
            </div>
          )}

          <div ref={scrollAnchorRef} />
        </div>

        {/* Composer Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input);
          }}
          className="border-t border-[#DFD7C8] bg-[#F2ECE1]/50 p-4 sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
            <label htmlFor="storyteller-input" className="sr-only">
              {isMz ? "I zawhna ziak rawh" : "Ask the Mizo Storyteller"}
            </label>
            <textarea
              id="storyteller-input"
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendMessage(input);
                }
              }}
              placeholder={
                isMz
                  ? "Entirnan: 'Saikuti hla leh thawnthu min hrilh teh' emaw 'Sakei leh Hmeithai sawi rawh'..."
                  : "Ask anything—e.g. 'Tell me the story of Saikuti' or 'Share the tale of Tumpangi'..."
              }
              className="w-full resize-none rounded-md border border-[#DFD7C8] bg-[#FBF8F3] px-3.5 py-2.5 text-sm text-[#1C1917] placeholder:text-[#57534E]/75 focus:border-[#8C2D19] focus:outline-none"
            />

            {isStreaming ? (
              <button
                type="button"
                onClick={handleStopStream}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-[#8C2D19] bg-[#FBF8F3] px-4 py-2.5 text-xs font-semibold text-[#8C2D19] transition-colors hover:bg-[#8C2D19]/10 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <Square className="h-3.5 w-3.5 fill-current" />
                <span>{isMz ? "Chawlhtir" : "Stop"}</span>
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#8C2D19] px-5 py-2.5 text-xs font-semibold text-[#FBF8F3] transition-colors hover:bg-[#732312] disabled:opacity-45 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{isMz ? "Thawn Rawh" : "Send"}</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
