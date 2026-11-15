import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, ThinkingLevel, Type } from "@google/genai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "1mb" }));

interface ChatMessageInput {
  role: "user" | "model";
  text: string;
}

interface StoryContextInput {
  title: string;
  summary: string;
  region: string;
}

function buildSystemInstruction(
  language: "mz" | "en",
  storyContext?: StoryContextInput
): string {
  const languageDirective =
    language === "mz"
      ? "The user's interface is currently set to Mizo (Mizo ṭawng). Reply primarily in natural, expressive, respectful Mizo ṭawng (using proper Mizo orthography such as ṭ when appropriate, clear storytelling cadence, and warm fireside Zawlbuk tone), unless the user explicitly asks you to reply in English."
      : "The user's interface is currently set to English. Reply in evocative, literary English while preserving authentic Mizo folklore terms (such as *thawnthu*, *Zawlbuk*, *Tlawmngaihna*, *Sekibuhchhuak*, *Khuavang*, *Puan*) with brief clear explanations, unless the user writes to you in Mizo and asks for Mizo.";

  const contextSection = storyContext
    ? `\n\nThe reader currently has the following folktale open in their reading room:\n- Title: ${storyContext.title}\n- Origin/Context: ${storyContext.region}\n- Summary: ${storyContext.summary}\nIf their question refers to "this story", "he thawnthu hi", or characters in it, ground your answer in this tale while also offering deeper oral-tradition nuances.`
    : "";

  return [
    "You are 'Thawnthu Hrilhtu', a deeply learned Mizo folklore curator and traditional storyteller steeped in the oral traditions of Mizoram and the Lushai Hills.",
    "You know the breadth of Mizo folktales (*thawnthu*)—including Chhura (Chhurbura) leh Nahaia, Mauruangi, Liandova Te Unau, Tualvungi leh Zawlpala, Kungawrhi leh Phawthira, Chawngchilhi, Sichangneii, Chemtatrawta, Kelchawngi, Lalruanga leh Hrangchhuana, Rimenhawihi, Hmuichukchuruduninu, Thlanrawkpa Khuangchawi, Sabereka Khuangkaih, Pasaltha legends (Vanapa, Taitesena, Chawngbawla, Khuangchera, Zampuimanga, Neuva, Thanghlianga), animal fables, and origin/spirit legends of the hills.",
    "Guidelines:",
    "1. Honor Mizo oral heritage with cultural accuracy, warmth, and vivid storytelling rhythm—as though recounting tales beside a warm Zawlbuk hearth.",
    "2. Because Mizo folktales were passed down orally across villages and clans, openly acknowledge when different regions or elders preserve slight variations in an ending or character detail.",
    "3. When recounting a tale, structure it cleanly with an evocative opening, clear narrative flow, and a brief reflection on its cultural lesson (*zirtirna*) or traditional Mizo values (*Tlawmngaihna*, hospitality, wit, devotion).",
    "4. Never invent fake academic citations or fabricated dates. Keep formatting clean (clear paragraphs, minimal emphasis, no cluttered markdown tables or emoji spam).",
    languageDirective,
    contextSection,
  ].join("\n");
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/storyteller/stream", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "GEMINI_API_KEY is not configured on the server. Add it in Settings > Secrets to enable the AI Storyteller.",
    });
    return;
  }

  const { messages, language, storyContext } = req.body as {
    messages?: ChatMessageInput[];
    language?: "mz" | "en";
    storyContext?: StoryContextInput;
  };

  if (!Array.isArray(messages) || messages.length === 0) {
    res.status(400).json({ error: "Please provide at least one message." });
    return;
  }

  const sanitizedMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "model") &&
        typeof m.text === "string" &&
        m.text.trim().length > 0
    )
    .slice(-14);

  if (sanitizedMessages.length === 0) {
    res.status(400).json({ error: "Message text cannot be empty." });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  let clientClosed = false;
  req.on("close", () => {
    clientClosed = true;
  });

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const contents = sanitizedMessages.map((msg) => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const responseStream = await ai.models.generateContentStream({
      model: "gemini-4-hydrogen",
      contents,
      config: {
        systemInstruction: buildSystemInstruction(
          language === "mz" ? "mz" : "en",
          storyContext
        ),
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });

    for await (const chunk of responseStream) {
      if (clientClosed) break;
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    if (!clientClosed) {
      res.write("data: [DONE]\n\n");
      res.end();
    }
  } catch (err) {
    console.error("Storyteller Gemini stream error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Unable to reach the AI Storyteller right now.";
    if (!clientClosed) {
      res.write(`data: ${JSON.stringify({ error: message })}\n\n`);
      res.write("data: [DONE]\n\n");
      res.end();
    }
  }
});

app.post("/api/storyteller/tts", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "GEMINI_API_KEY is not configured on the server. Add it in Settings > Secrets to enable narration.",
    });
    return;
  }

  const { text, language } = req.body as {
    text?: string;
    language?: "mz" | "en";
  };

  if (typeof text !== "string" || text.trim().length === 0) {
    res.status(400).json({ error: "Text for narration cannot be empty." });
    return;
  }

  const sanitizedText = text.trim().slice(0, 3500);
  const stylePrompt =
    language === "mz"
      ? "Warm, clear, expressive Mizo traditional storyteller reading a folktale aloud in Mizo at a calm, natural pace."
      : "Warm, expressive literary storyteller reading a traditional folktale aloud with clear, unhurried pacing.";

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash-lite-tts",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: sanitizedText,
              speechMetadata: {
                style: stylePrompt,
              },
            },
          ],
        },
      ],
      config: {
        responseModalities: ["AUDIO"],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: "Kore" },
          },
        },
      },
    });

    const base64Audio =
      response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;

    if (!base64Audio) {
      res.status(502).json({
        error: "No audio returned by the text-to-speech service.",
      });
      return;
    }

    const wavBuffer = Buffer.from(base64Audio, "base64");
    res.setHeader("Content-Type", "audio/wav");
    res.setHeader("Content-Length", String(wavBuffer.length));
    res.send(wavBuffer);
  } catch (err) {
    console.error("Storyteller TTS error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Unable to generate speech narration right now.";
    res.status(500).json({ error: message });
  }
});

const THEME_IMAGE_MAP: Record<string, string> = {
  heroic: "/src/assets/images/hero_mizo_hills_1794733235479.jpg",
  wit: "/src/assets/images/tale_chhura_1794733236182.jpg",
  pasaltha: "/src/assets/images/tale_pasaltha_1794734554137.jpg",
  fables: "/src/assets/images/tale_fables_1794734555882.jpg",
  resilience: "/src/assets/images/tale_liandova_1794733238332.jpg",
  love: "/src/assets/images/tale_chawngvungi_1794734559115.jpg",
  spirits: "/src/assets/images/tale_chawngchilhi_1794733238782.jpg",
};

const VALID_THEMES = new Set([
  "heroic",
  "wit",
  "pasaltha",
  "fables",
  "resilience",
  "love",
  "spirits",
]);

app.post("/api/storyteller/compose-tale", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "GEMINI_API_KEY is not configured on the server. Add it in Settings > Secrets to compose bilingual tales.",
    });
    return;
  }

  const { topic, conversationExcerpt, existingCount } = req.body as {
    topic?: string;
    conversationExcerpt?: string;
    existingCount?: number;
  };

  if (typeof topic !== "string" || topic.trim().length < 2) {
    res.status(400).json({ error: "Please provide a tale title or topic." });
    return;
  }

  const cleanTopic = topic.trim().slice(0, 400);
  const cleanExcerpt =
    typeof conversationExcerpt === "string"
      ? conversationExcerpt.trim().slice(0, 4500)
      : "";
  const nextNumber =
    typeof existingCount === "number" && existingCount >= 1
      ? existingCount + 1
      : 43;

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const localizedContentSchema = {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        subtitle: { type: Type.STRING },
        summary: { type: Type.STRING },
        pullQuote: { type: Type.STRING },
        paragraphs: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
        moral: { type: Type.STRING },
        culturalNotes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              term: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["term", "explanation"],
          },
        },
      },
      required: [
        "title",
        "subtitle",
        "summary",
        "pullQuote",
        "paragraphs",
        "moral",
        "culturalNotes",
      ],
    };

    const promptLines = [
      `Create a complete, culturally authentic bilingual (Mizo and English) archival edition of a Mizo folktale or oral legend based on this topic/request: "${cleanTopic}".`,
      cleanExcerpt
        ? `\nUse and expand upon this storyteller narration excerpt while ensuring rich narrative detail in both Mizo and English:\n"""\n${cleanExcerpt}\n"""`
        : "",
      "\nRequirements:",
      "- Write natural, expressive Mizo (using proper orthography such as ṭ when appropriate) in `mizo`, and literary evocative English in `english`.",
      "- Choose the single best `theme` from: heroic, wit, pasaltha, fables, resilience, love, spirits.",
      "- Provide 3 to 5 rich narrative paragraphs in both `mizo.paragraphs` and `english.paragraphs`.",
      "- Include an evocative pullQuote (enclosed in quotation marks), a concise summary, a traditional moral, and 1 to 3 concise culturalNotes.",
      "- Keep `readingMinutes` between 3 and 7.",
    ].join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: [{ role: "user", parts: [{ text: promptLines }] }],
      config: {
        systemInstruction:
          "You are an expert Mizo folklore archivist and bilingual literary translator. Produce accurate, respectful, deeply evocative Mizo and English folktale editions following traditional Lushai oral heritage.",
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            theme: { type: Type.STRING },
            readingMinutes: { type: Type.INTEGER },
            originNote: {
              type: Type.OBJECT,
              properties: {
                mz: { type: Type.STRING },
                en: { type: Type.STRING },
              },
              required: ["mz", "en"],
            },
            characters: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            mizo: localizedContentSchema,
            english: localizedContentSchema,
          },
          required: [
            "theme",
            "readingMinutes",
            "originNote",
            "characters",
            "mizo",
            "english",
          ],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      res.status(502).json({
        error: "The archivist model returned an empty response.",
      });
      return;
    }

    const parsed = JSON.parse(rawText) as {
      theme: string;
      readingMinutes: number;
      originNote: { mz: string; en: string };
      characters: string[];
      mizo: {
        title: string;
        subtitle: string;
        summary: string;
        pullQuote: string;
        paragraphs: string[];
        moral: string;
        culturalNotes: { term: string; explanation: string }[];
      };
      english: {
        title: string;
        subtitle: string;
        summary: string;
        pullQuote: string;
        paragraphs: string[];
        moral: string;
        culturalNotes: { term: string; explanation: string }[];
      };
    };

    const safeTheme = VALID_THEMES.has(parsed.theme)
      ? (parsed.theme as
          | "heroic"
          | "wit"
          | "pasaltha"
          | "fables"
          | "resilience"
          | "love"
          | "spirits")
      : "spirits";

    const slug = (parsed.english?.title || cleanTopic)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 36);
    const id = `custom-${slug || "tale"}-${Date.now().toString(36)}`;
    const accessionNumber = `THW.${String(nextNumber).padStart(2, "0")}`;

    const tale = {
      id,
      accessionNumber,
      theme: safeTheme,
      readingMinutes: Math.max(
        3,
        Math.min(10, Number(parsed.readingMinutes) || 5)
      ),
      originNote: {
        mz:
          parsed.originNote?.mz ||
          "AI Thawnthu Hrilhtu Zawn Chhuah · Mizo Oral Tradition",
        en:
          parsed.originNote?.en ||
          "AI Storyteller Edition · Mizo Oral Tradition",
      },
      characters:
        Array.isArray(parsed.characters) && parsed.characters.length > 0
          ? parsed.characters.slice(0, 6)
          : [parsed.mizo?.title || cleanTopic],
      imageUrl:
        THEME_IMAGE_MAP[safeTheme] ||
        "/src/assets/images/hero_mizo_hills_1794733235479.jpg",
      imageCaption: {
        mz: `${accessionNumber} — ${parsed.mizo.title} (AI Thawnthu Hrilhtu dah belh).`,
        en: `${accessionNumber} — ${parsed.english.title} (Composed & archived via AI Storyteller).`,
      },
      isCustom: true,
      createdAt: Date.now(),
      mizo: parsed.mizo,
      english: parsed.english,
    };

    res.json({ tale });
  } catch (err) {
    console.error("Compose tale error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Unable to compose bilingual tale right now.";
    res.status(500).json({ error: message });
  }
});

const COMIC_SCENE_ART_MAP: Record<string, string> = {
  manga_pasaltha: "/src/assets/images/comic_manga_pasaltha_1794736306048.jpg",
  manga_chhura: "/src/assets/images/comic_manga_chhura_1794736305427.jpg",
  manga_romance: "/src/assets/images/comic_manga_romance_1794736305827.jpg",
  manga_spirits: "/src/assets/images/comic_manga_spirits_1794736305497.jpg",
  hills_overview: "/src/assets/images/hero_mizo_hills_1794733235479.jpg",
  tiger_hunter: "/src/assets/images/tale_tiger_hunter_1794734555301.jpg",
  fables_animals: "/src/assets/images/tale_fables_1794734555882.jpg",
  birds_bat: "/src/assets/images/tale_birds_bat_1794734555318.jpg",
  village_tualte: "/src/assets/images/tale_village_tualte_1794734557429.jpg",
  stream_machete: "/src/assets/images/tale_chemtatrawta_1794734006773.jpg",
  sky_vine: "/src/assets/images/tale_kelchawngi_1794734005091.jpg",
  sorcerer_duel: "/src/assets/images/tale_lalruanga_1794734006905.jpg",
  mauruangi_stream: "/src/assets/images/tale_mauruangi_1794733236880.jpg",
  hearth_brothers: "/src/assets/images/tale_liandova_1794733238332.jpg",
  feast_drums: "/src/assets/images/tale_thlanrawkpa_1794734009003.jpg",
};

const VALID_LAYOUTS = new Set(["wide", "standard", "tall"]);
const VALID_FRAMINGS = new Set([
  "wide-establishing",
  "left-focus",
  "right-focus",
  "dramatic-closeup",
  "pan-center",
]);
const VALID_EFFECTS = new Set([
  "none",
  "action-lines",
  "halftone-drama",
  "moonlight-noir",
  "warm-hearth",
]);
const VALID_BUBBLE_STYLES = new Set(["speech", "thought", "shout"]);

app.post("/api/storyteller/comic-script", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({
      error:
        "GEMINI_API_KEY is not configured on the server. Add it in Settings > Secrets to generate Comic Mode.",
    });
    return;
  }

  const {
    taleId,
    titleMz,
    titleEn,
    summaryMz,
    summaryEn,
    paragraphsMz,
    paragraphsEn,
    characters,
    theme,
    defaultImageUrl,
  } = req.body as {
    taleId?: string;
    titleMz?: string;
    titleEn?: string;
    summaryMz?: string;
    summaryEn?: string;
    paragraphsMz?: string[];
    paragraphsEn?: string[];
    characters?: string[];
    theme?: string;
    defaultImageUrl?: string;
  };

  if (!taleId || !titleMz || !titleEn) {
    res.status(400).json({ error: "Missing tale details for comic script." });
    return;
  }

  try {
    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const localizedPanelSchema = {
      type: Type.OBJECT,
      properties: {
        caption: { type: Type.STRING },
        sfx: { type: Type.STRING },
        dialogue: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              speaker: { type: Type.STRING },
              line: { type: Type.STRING },
              style: { type: Type.STRING },
            },
            required: ["speaker", "line", "style"],
          },
        },
      },
      required: ["caption", "dialogue"],
    };

    const sceneKeysPrompt = Object.keys(COMIC_SCENE_ART_MAP)
      .concat(["tale_primary"])
      .join(", ");

    const promptText = [
      `Adapt this Mizo folktale into a dramatic, engaging 6-panel Modern Graphic Novel / Manga storyboard in BOTH Mizo (mizo) and English (english).`,
      `Title (Mizo): ${titleMz}`,
      `Title (English): ${titleEn}`,
      `Theme: ${theme ?? "spirits"}`,
      `Key Characters: ${(characters ?? []).join(", ")}`,
      `Summary (Mizo): ${summaryMz ?? ""}`,
      `Summary (English): ${summaryEn ?? ""}`,
      `Story Prose (Mizo):\n${(paragraphsMz ?? []).join("\n")}`,
      `Story Prose (English):\n${(paragraphsEn ?? []).join("\n")}`,
      "",
      "Instructions for the 6 panels (panelNumber 1 through 6):",
      "- Structure the 6 panels cleanly: 1 Opening Hook, 2 Rising Action, 3 Turning Point / Trick / Encounter, 4 Dramatic Climax, 5 Resolution, 6 Heartfelt Closing / Moral.",
      "- For `sceneArtKey`, choose the single best matching visual key per panel from: " + sceneKeysPrompt + ". Vary keys across panels when helpful (e.g. `tale_primary` for the tale's signature scene, `manga_pasaltha` for warrior/action courage, `manga_chhura` for trickster/hut comedy, `manga_romance` for moonlight love/parting, `manga_spirits` for dark bamboo forest/spirits, `tiger_hunter` for tiger encounters, `fables_animals` for woodland mammals, `birds_bat` for birds/bats, `village_tualte` for Mizo village crowds, `hearth_brothers` for family/hearth scenes, `feast_drums` for festivals/drums).",
      "- For `layoutHint`: panel 1 and panel 6 should usually be 'wide'; middle panels mix 'standard' and 'tall'.",
      "- For `cameraFraming`: vary across 'wide-establishing', 'left-focus', 'right-focus', 'dramatic-closeup', 'pan-center'.",
      "- For `mangaEffect`: vary across 'none', 'action-lines', 'halftone-drama', 'moonlight-noir', 'warm-hearth'.",
      "- Keep captions crisp (1-2 vivid sentences). Keep each dialogue `line` punchy (under 18 words) with 1 to 2 bubbles per panel and `style` from: speech, thought, shout.",
      "- Include punchy graphic novel `sfx` on dramatic panels (e.g. 'KRAK!', 'VURR!', 'CHAK!', 'HUI!', or empty string for quiet panels).",
    ].join("\n");

    const response = await ai.models.generateContent({
      model: "gemini-4-hydrogen",
      contents: [{ role: "user", parts: [{ text: promptText }] }],
      config: {
        systemInstruction:
          "You are an acclaimed graphic novel writer and Mizo folklore adapter. Write vivid, faithful, deeply expressive bilingual Mizo and English comic scripts with natural Mizo dialogue (proper orthography like ṭ) and dynamic manga pacing.",
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            styleNote: {
              type: Type.OBJECT,
              properties: {
                mz: { type: Type.STRING },
                en: { type: Type.STRING },
              },
              required: ["mz", "en"],
            },
            panels: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  panelNumber: { type: Type.INTEGER },
                  layoutHint: { type: Type.STRING },
                  sceneArtKey: { type: Type.STRING },
                  cameraFraming: { type: Type.STRING },
                  mangaEffect: { type: Type.STRING },
                  mizo: localizedPanelSchema,
                  english: localizedPanelSchema,
                },
                required: [
                  "panelNumber",
                  "layoutHint",
                  "sceneArtKey",
                  "cameraFraming",
                  "mangaEffect",
                  "mizo",
                  "english",
                ],
              },
            },
          },
          required: ["styleNote", "panels"],
        },
      },
    });

    const rawText = response.text;
    if (!rawText) {
      res.status(502).json({ error: "Comic script response was empty." });
      return;
    }

    const parsed = JSON.parse(rawText) as {
      styleNote?: { mz: string; en: string };
      panels?: Array<{
        panelNumber: number;
        layoutHint: string;
        sceneArtKey: string;
        cameraFraming: string;
        mangaEffect: string;
        mizo: {
          caption: string;
          sfx?: string;
          dialogue: Array<{ speaker: string; line: string; style: string }>;
        };
        english: {
          caption: string;
          sfx?: string;
          dialogue: Array<{ speaker: string; line: string; style: string }>;
        };
      }>;
    };

    const fallbackArt =
      defaultImageUrl ||
      "/src/assets/images/comic_manga_pasaltha_1794736306048.jpg";

    const sanitizeDialogue = (
      items: Array<{ speaker: string; line: string; style: string }> | undefined
    ) =>
      (Array.isArray(items) ? items : [])
        .slice(0, 2)
        .filter((d) => d && typeof d.line === "string" && d.line.trim())
        .map((d) => ({
          speaker: (d.speaker || "").trim() || "Narrator",
          line: d.line.trim(),
          style: VALID_BUBBLE_STYLES.has(d.style)
            ? (d.style as "speech" | "thought" | "shout")
            : "speech",
        }));

    const panels = (Array.isArray(parsed.panels) ? parsed.panels : [])
      .slice(0, 6)
      .map((p, index) => {
        const sceneArtUrl =
          p.sceneArtKey === "tale_primary"
            ? fallbackArt
            : COMIC_SCENE_ART_MAP[p.sceneArtKey] || fallbackArt;

        return {
          panelNumber: index + 1,
          layoutHint: VALID_LAYOUTS.has(p.layoutHint)
            ? (p.layoutHint as "wide" | "standard" | "tall")
            : index === 0 || index === 5
              ? "wide"
              : "standard",
          sceneArtUrl,
          cameraFraming: VALID_FRAMINGS.has(p.cameraFraming)
            ? (p.cameraFraming as
                | "wide-establishing"
                | "left-focus"
                | "right-focus"
                | "dramatic-closeup"
                | "pan-center")
            : "pan-center",
          mangaEffect: VALID_EFFECTS.has(p.mangaEffect)
            ? (p.mangaEffect as
                | "none"
                | "action-lines"
                | "halftone-drama"
                | "moonlight-noir"
                | "warm-hearth")
            : "halftone-drama",
          mizo: {
            caption: (p.mizo?.caption || "").trim(),
            sfx: (p.mizo?.sfx || "").trim(),
            dialogue: sanitizeDialogue(p.mizo?.dialogue),
          },
          english: {
            caption: (p.english?.caption || "").trim(),
            sfx: (p.english?.sfx || "").trim(),
            dialogue: sanitizeDialogue(p.english?.dialogue),
          },
        };
      });

    if (panels.length === 0) {
      res.status(502).json({
        error: "Could not assemble comic panels from the story.",
      });
      return;
    }

    res.json({
      comic: {
        taleId,
        generatedAt: Date.now(),
        styleNote: {
          mz:
            parsed.styleNote?.mz ||
            "Modern Graphic Novel / Manga Edition · Mizo Oral Adaptation",
          en:
            parsed.styleNote?.en ||
            "Modern Graphic Novel / Manga Edition · Oral Folklore Adaptation",
        },
        panels,
      },
    });
  } catch (err) {
    console.error("Comic script generation error:", err);
    const message =
      err instanceof Error
        ? err.message
        : "Unable to build comic adaptation right now.";
    res.status(500).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Thawnthu Archive server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
