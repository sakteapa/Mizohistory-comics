import { useEffect, useMemo, useState } from "react";
import { Header, type ActiveView } from "./components/Header";
import { ArchiveLibrary } from "./components/ArchiveLibrary";
import { ThemesView } from "./components/ThemesView";
import { StoryReader } from "./components/StoryReader";
import { StorytellerView } from "./components/StorytellerView";
import { PuanDivider } from "./components/PuanDivider";
import { FOLKTALES } from "./data/folktales";
import type {
  Folktale,
  Language,
  StorytellerMessage,
  TaleTheme,
} from "./types/folklore";

const STORAGE_LANG_KEY = "thawnthu_language_v1";
const STORAGE_BOOKMARKS_KEY = "thawnthu_bookmarks_v1";
const STORAGE_CHAT_KEY = "thawnthu_chat_v1";
const STORAGE_CUSTOM_TALES_KEY = "thawnthu_custom_tales_v1";

function loadStoredLanguage(): Language {
  try {
    const val = localStorage.getItem(STORAGE_LANG_KEY);
    return val === "en" ? "en" : "mz";
  } catch {
    return "mz";
  }
}

function loadStoredBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_BOOKMARKS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function loadStoredMessages(): StorytellerMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_CHAT_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function loadStoredCustomTales(): Folktale[] {
  try {
    const raw = localStorage.getItem(STORAGE_CUSTOM_TALES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(
          (t) =>
            t &&
            typeof t.id === "string" &&
            t.mizo &&
            typeof t.mizo.title === "string" &&
            t.english &&
            typeof t.english.title === "string"
        )
      : [];
  } catch {
    return [];
  }
}

export default function App() {
  const [language, setLanguage] = useState<Language>(loadStoredLanguage);
  const [activeView, setActiveView] = useState<ActiveView>("library");
  const [activeTheme, setActiveTheme] = useState<TaleTheme>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTale, setSelectedTale] = useState<Folktale | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    loadStoredBookmarks
  );
  const [customTales, setCustomTales] = useState<Folktale[]>(
    loadStoredCustomTales
  );
  const [chatMessages, setChatMessages] = useState<StorytellerMessage[]>(
    loadStoredMessages
  );
  const [storyContext, setStoryContext] = useState<Folktale | null>(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const allTales = useMemo(
    () => [...customTales, ...FOLKTALES],
    [customTales]
  );

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, language);
    } catch {
      // Ignore storage quota issues
    }
  }, [language]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_BOOKMARKS_KEY, JSON.stringify(bookmarkedIds));
    } catch {
      // Ignore storage quota issues
    }
  }, [bookmarkedIds]);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_CUSTOM_TALES_KEY,
        JSON.stringify(customTales)
      );
    } catch {
      // Ignore storage quota issues
    }
  }, [customTales]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHAT_KEY, JSON.stringify(chatMessages.slice(-24)));
    } catch {
      // Ignore storage quota issues
    }
  }, [chatMessages]);

  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddCustomTale = (tale: Folktale) => {
    setCustomTales((prev) => {
      if (prev.some((existing) => existing.id === tale.id)) return prev;
      return [{ ...tale, isCustom: true }, ...prev];
    });
  };

  const handleDeleteCustomTale = (id: string) => {
    setCustomTales((prev) => prev.filter((t) => t.id !== id));
    setBookmarkedIds((prev) => prev.filter((bId) => bId !== id));
    if (selectedTale?.id === id) {
      setSelectedTale(null);
    }
  };

  const handleSelectTale = (tale: Folktale) => {
    setSelectedTale(tale);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigate = (view: ActiveView) => {
    setSelectedTale(null);
    setActiveView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenStorytellerWithPrompt = (
    prompt?: string,
    taleForContext: Folktale | null = null
  ) => {
    setSelectedTale(null);
    setStoryContext(taleForContext);
    if (prompt) {
      setPendingPrompt(prompt);
    }
    setActiveView("storyteller");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenThemeInLibrary = (theme: Exclude<TaleTheme, "all">) => {
    setSelectedTale(null);
    setActiveTheme(theme);
    setSearchQuery("");
    setActiveView("library");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isMz = language === "mz";

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F3] text-[#1C1917]">
      <Header
        activeView={selectedTale ? "library" : activeView}
        language={language}
        savedCount={bookmarkedIds.length}
        onNavigate={handleNavigate}
        onOpenStoryteller={() => handleOpenStorytellerWithPrompt()}
      />

      <div className="flex-1">
        {selectedTale ? (
          <StoryReader
            tale={selectedTale}
            allTales={allTales}
            language={language}
            isBookmarked={bookmarkedIds.includes(selectedTale.id)}
            onBack={() => setSelectedTale(null)}
            onChangeLanguage={setLanguage}
            onToggleBookmark={handleToggleBookmark}
            onSelectTale={handleSelectTale}
            onAskAboutTale={(tale, starterPrompt) =>
              handleOpenStorytellerWithPrompt(starterPrompt, tale)
            }
          />
        ) : activeView === "themes" ? (
          <ThemesView
            tales={allTales}
            language={language}
            onChangeLanguage={setLanguage}
            onOpenThemeInLibrary={handleOpenThemeInLibrary}
            onAskStoryteller={(prompt) => handleOpenStorytellerWithPrompt(prompt)}
          />
        ) : activeView === "storyteller" ? (
          <StorytellerView
            language={language}
            messages={chatMessages}
            activeTaleContext={storyContext}
            pendingPrompt={pendingPrompt}
            totalTaleCount={allTales.length}
            onConsumePendingPrompt={() => setPendingPrompt(null)}
            onChangeLanguage={setLanguage}
            onUpdateMessages={setChatMessages}
            onClearContext={() => setStoryContext(null)}
            onClearConversation={() => {
              setChatMessages([]);
              setStoryContext(null);
            }}
            onSaveTaleToLibrary={handleAddCustomTale}
            onOpenSavedTale={(tale) => {
              setActiveView("library");
              handleSelectTale(tale);
            }}
          />
        ) : (
          <ArchiveLibrary
            tales={allTales}
            language={language}
            activeTheme={activeTheme}
            searchQuery={searchQuery}
            bookmarkedIds={bookmarkedIds}
            onlySaved={activeView === "saved"}
            onChangeLanguage={setLanguage}
            onChangeTheme={setActiveTheme}
            onChangeSearch={setSearchQuery}
            onToggleBookmark={handleToggleBookmark}
            onSelectTale={handleSelectTale}
            onAskPrompt={(prompt) => handleOpenStorytellerWithPrompt(prompt)}
            onAddCustomTale={handleAddCustomTale}
            onDeleteCustomTale={handleDeleteCustomTale}
          />
        )}
      </div>

      <footer className="border-t border-[#DFD7C8] bg-[#F2ECE1]/55">
        <PuanDivider variant="ribbon" />
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-xs text-[#57534E] sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p className="font-prose">
            <strong className="font-display text-sm font-semibold text-[#1C1917]">
              Thawnthu Archive
            </strong>{" "}
            —{" "}
            {isMz
              ? "Mizo thawnthu hluite leh hmanlai nunphung vawnhimna."
              : "Preserving Mizo folktales and oral heritage in Mizo and English."}
          </p>
          <div className="flex items-center gap-5">
            <button
              type="button"
              onClick={() => handleNavigate("library")}
              className="hover:text-[#1C1917] cursor-pointer"
            >
              {isMz ? "Thawnthu Bu" : "Library"}
            </button>
            <button
              type="button"
              onClick={() => handleNavigate("themes")}
              className="hover:text-[#1C1917] cursor-pointer"
            >
              {isMz ? "Huangte" : "Themes"}
            </button>
            <button
              type="button"
              onClick={() => handleOpenStorytellerWithPrompt()}
              className="hover:text-[#1C1917] cursor-pointer"
            >
              {isMz ? "Thawnthu Hrilhtu" : "AI Storyteller"}
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
