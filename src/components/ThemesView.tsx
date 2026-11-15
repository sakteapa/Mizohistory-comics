import { ArrowRight } from "lucide-react";
import { THEME_LABELS } from "../data/folktales";
import type { Folktale, Language, TaleTheme } from "../types/folklore";
import { PuanDivider } from "./PuanDivider";

interface ThemesViewProps {
  tales: Folktale[];
  language: Language;
  onChangeLanguage: (lang: Language) => void;
  onOpenThemeInLibrary: (theme: Exclude<TaleTheme, "all">) => void;
  onAskStoryteller: (prompt: string) => void;
}

const THEME_DESCRIPTIONS: Record<
  Exclude<TaleTheme, "all">,
  { mz: string; en: string; sampleTerms: string }
> = {
  wit: {
    mz: "Chhura leh Nahaia thawnthu chi hrang hrang, Chemtatrawta, Pawngvina leh Mizo fiamthu fing zirtirna nei te.",
    en: "Beloved trickster cycles of Chhura and Nahaia, cumulative fables, and village wit that mock greed.",
    sampleTerms: "Chhura · Nahaia · Sekibuhchhuak · Mawngping",
  },
  pasaltha: {
    mz: "Hmanlai Mizo pasaltha hmingthang—Vanapa, Taitesena, Chawngbawla, Khuangchera, Zampuimanga leh Neuva te huaisenna.",
    en: "Legendary warriors and hunters—Vanapa, Taitesena, Khuangchera, and Zampuimanga—models of Mizo Tlawmngaihna.",
    sampleTerms: "Tlawmngaihna · Zawlbuk · Sa Lu · Hrangchhuana",
  },
  fables: {
    mz: "Ramsa leh sava thawnthu ngaihnawm tak tak—Sihal, Satel, Bâk, Vawkpui leh ramhnuai nungchate finna.",
    en: "Classic animal parables of fox, tortoise, monkey, and night bat explaining forest wisdom and natural traits.",
    sampleTerms: "Sihal · Satel · Bâk · Hleikapsen",
  },
  heroic: {
    mz: "Pasaltha leh hmangaihte chhan chhuah nana hlauhna hnehna thawnthu te—Phaw leh Fei kenga zin kawng thui zawhna.",
    en: "Journeys across misty ridges and perilous spirit realms where steadfast courage triumphs over deception.",
    sampleTerms: "Phaw leh Fei · Khuavang · Darlalpuii",
  },
  resilience: {
    mz: "Fahrah leh tuarchhelte chawimawi leh unau inhmangaihna thawnthu—hmusitna karah pawh rilru thianghlim vawng tlattute.",
    en: "Stories of orphaned youths and quiet endurance, affirming that generosity and integrity outlast cruelty.",
    sampleTerms: "Mauruangi · Liandova · Rairahtea · Favai",
  },
  love: {
    mz: "Tlang dung karah pawh inthlahlel tlat hmangaihna lungkuai, Lianchhiari leh Mizo hla hluite lo chhuahna thawnthu.",
    en: "Poignant ballads of devotion separated by wealth and distance, immortalized in traditional Mizo poetry.",
    sampleTerms: "Tualvungi · Chawngvungi · Lianchhiari · Ngaiteii",
  },
  spirits: {
    mz: "Lasi, Keimi, Rulngan leh khawtlang thawnthu mak—hmanlai Mizoten khawvel leh thlarau inzawmna an hmuh dan.",
    en: "Ancient tales from bamboo groves and hills exploring Lasi spirits, taboos, and village origin lore.",
    sampleTerms: "Lasi · Rulngan · Tualte Vanglai · Sabereka",
  },
};

export function ThemesView({
  tales,
  language,
  onChangeLanguage,
  onOpenThemeInLibrary,
  onAskStoryteller,
}: ThemesViewProps) {
  const isMz = language === "mz";
  const themes: Exclude<TaleTheme, "all">[] = [
    "wit",
    "pasaltha",
    "fables",
    "heroic",
    "resilience",
    "love",
    "spirits",
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-8">
      <div className="mb-8 flex flex-col gap-4 border-b border-[#DFD7C8] pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8C2D19]">
            {isMz ? "Thawnthu Thliarna & Nunphung" : "Curatorial Taxonomy"}
          </p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-[#1C1917] sm:text-5xl text-balance">
            {isMz
              ? "Mizo Thawnthu Huangte leh Puan Ze Hlui"
              : "Motifs & Themes of Mizo Oral Tradition"}
          </h1>
        </div>

        <div
          role="group"
          aria-label="Language toggle"
          className="inline-flex self-start rounded-md border border-[#DFD7C8] bg-[#F2ECE1] p-1"
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
      </div>

      {/* Theme Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {themes.map((themeKey, idx) => {
          const count = tales.filter((t) => t.theme === themeKey).length;
          const info = THEME_DESCRIPTIONS[themeKey];

          return (
            <section
              key={themeKey}
              className="flex flex-col justify-between border border-[#DFD7C8] bg-[#FBF8F3] p-6"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#57534E]">
                  <span className="font-semibold text-[#8C2D19] tabular-nums">
                    0{idx + 1}
                  </span>
                  <span className="tabular-nums">
                    {count}{" "}
                    {isMz
                      ? "thawnthu ziak sa"
                      : count === 1
                        ? "curated tale"
                        : "curated tales"}
                  </span>
                </div>

                <h2 className="mt-3 font-display text-2xl font-semibold text-[#1C1917]">
                  {isMz ? THEME_LABELS[themeKey].mz : THEME_LABELS[themeKey].en}
                </h2>

                <p className="mt-3 font-prose text-sm leading-relaxed text-[#57534E]">
                  {isMz ? info.mz : info.en}
                </p>

                <p className="mt-4 text-xs font-medium text-[#1E3A5F]">
                  {info.sampleTerms}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#DFD7C8] pt-4">
                <button
                  type="button"
                  onClick={() => onOpenThemeInLibrary(themeKey)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C2D19] hover:text-[#732312] cursor-pointer"
                >
                  <span>{isMz ? "Library-ah En Rawh" : "Browse in Library"}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onAskStoryteller(
                      isMz
                        ? `"${THEME_LABELS[themeKey].mz}" huang chhunga Mizo thawnthu dang hriat hlawh tak pakhat min hrilh thei em?`
                        : `Tell me another traditional Mizo folktale from the "${THEME_LABELS[themeKey].en}" tradition.`
                    )
                  }
                  className="text-xs font-medium text-[#57534E] underline underline-offset-4 hover:text-[#1C1917] cursor-pointer"
                >
                  {isMz ? "Hrilhtu Zawt" : "Ask AI"}
                </button>
              </div>
            </section>
          );
        })}
      </div>

      <PuanDivider className="my-14" />

      {/* Cultural Pillar Essay: Puan & Zawlbuk */}
      <section className="grid grid-cols-1 gap-8 border border-[#DFD7C8] bg-[#F2ECE1]/50 p-6 sm:p-10 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#1E3A5F]">
            {isMz ? "Zawlbuk Meilum" : "The Zawlbuk Oral School"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#1C1917]">
            {isMz
              ? "Engtin nge Mizo Thawnthute vawnhim a nih?"
              : "How Stories Survived Across Generations"}
          </h2>
          <p className="mt-4 font-prose text-base leading-relaxed text-[#1C1917]/85">
            {isMz
              ? "Hmanlai Mizote chuan lehkha ziak an la neih hmain, thawnthu hluite hi Zawlbuk meilum bulah upate leh pasalthaten tlangval leh naupangte hnenah an hrilh chhawng ṭhin. Chhura finna leh nuihzatthlakna te, Mauruangi tuarchhelna te leh Phawthira huaisenna te hi nunphung leh Tlawmngaihna zirtirna hmanraw pawimawh ber a ni."
              : "Long before written scripts arrived in the Lushai hills, elders and seasoned hunters gathered youth beside the glowing Zawlbuk hearth. Through rhythmic oral telling, stories of Chhura's humor, Mauruangi's patience, and Phawthira's valor carried Mizo ethics, village memory, and Tlawmngaihna from one generation to the next."}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[#8C2D19]">
            {isMz ? "Puan Ze Mawi" : "Woven Memory in Mizo Puan"}
          </p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-[#1C1917]">
            {isMz
              ? "Puanchei, Pawndum leh Ngotekherh"
              : "Why Puan Geometry Frames This Archive"}
          </h2>
          <p className="mt-4 font-prose text-base leading-relaxed text-[#1C1917]/85">
            {isMz
              ? "Mizo Puan tah ziarang—Puanchei rawng sen leh eng mawi tak te, Pawndum dum pawl lungkuai te, leh Ngotekherh ze rinmawi te hian thawnthu ang bawkin Mizo rilru leh chanchin an phochhuak ṭhin. He archive rawng leh cheimawina pawh hi chung Puan ze hluite entawna duan a ni."
              : "Just as oral tales preserve spoken memory, traditional handwoven Puan textiles—the celebratory crimson bands of Puanchei, the deep indigo of Pawndum, and the crisp diamond geometry of Ngotekherh—encode identity in thread. Every divider and accent color in this archive honors those looms."}
          </p>
        </div>
      </section>
    </main>
  );
}
