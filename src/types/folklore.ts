export type Language = "mz" | "en";

export type TaleTheme =
  | "all"
  | "heroic"
  | "wit"
  | "pasaltha"
  | "fables"
  | "resilience"
  | "love"
  | "spirits";

export interface CulturalNote {
  term: string;
  explanation: string;
}

export interface LocalizedTaleContent {
  title: string;
  subtitle: string;
  summary: string;
  pullQuote: string;
  paragraphs: string[];
  moral: string;
  culturalNotes: CulturalNote[];
}

export interface Folktale {
  id: string;
  accessionNumber: string;
  theme: Exclude<TaleTheme, "all">;
  readingMinutes: number;
  originNote: {
    mz: string;
    en: string;
  };
  characters: string[];
  imageUrl: string;
  imageCaption: {
    mz: string;
    en: string;
  };
  featured?: boolean;
  isCustom?: boolean;
  createdAt?: number;
  mizo: LocalizedTaleContent;
  english: LocalizedTaleContent;
}

export interface StorytellerMessage {
  id: string;
  role: "user" | "model";
  text: string;
  timestamp: number;
  error?: boolean;
}

export interface OralPromptSuggestion {
  id: string;
  mizoTitle: string;
  englishTitle: string;
  mizoPrompt: string;
  englishPrompt: string;
  category: {
    mz: string;
    en: string;
  };
}

export type ComicBubbleStyle = "speech" | "thought" | "shout";
export type ComicLayoutHint = "wide" | "standard" | "tall";
export type ComicCameraFraming =
  | "wide-establishing"
  | "left-focus"
  | "right-focus"
  | "dramatic-closeup"
  | "pan-center";
export type ComicMangaEffect =
  | "none"
  | "action-lines"
  | "halftone-drama"
  | "moonlight-noir"
  | "warm-hearth";

export interface ComicDialogueBubble {
  speaker: string;
  line: string;
  style: ComicBubbleStyle;
}

export interface ComicLocalizedPanel {
  caption: string;
  sfx?: string;
  dialogue: ComicDialogueBubble[];
}

export interface ComicPanel {
  panelNumber: number;
  layoutHint: ComicLayoutHint;
  sceneArtUrl: string;
  cameraFraming: ComicCameraFraming;
  mangaEffect: ComicMangaEffect;
  mizo: ComicLocalizedPanel;
  english: ComicLocalizedPanel;
}

export interface ComicStorybook {
  taleId: string;
  generatedAt: number;
  styleNote: {
    mz: string;
    en: string;
  };
  panels: ComicPanel[];
}

