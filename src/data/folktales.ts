import type { Folktale, OralPromptSuggestion, TaleTheme } from "../types/folklore";
import { MORE_FOLKTALES } from "./folktalesMore";

export const THEME_LABELS: Record<TaleTheme, { mz: string; en: string }> = {
  all: { mz: "Thawnthu Zawng Zawng", en: "All Tales" },
  wit: { mz: "Fiamthu & Finna", en: "Wit & Chhura" },
  pasaltha: { mz: "Pasaltha & Tuanthu", en: "Pasaltha & Legends" },
  fables: { mz: "Ramsa & Sava", en: "Animal Fables" },
  heroic: { mz: "Huaisenna & Zin Kawng", en: "Heroic Quests" },
  resilience: { mz: "Tuarchhelna & Unau", en: "Resilience & Kin" },
  love: { mz: "Hmangaihna & Hla Hlui", en: "Love & Ballads" },
  spirits: { mz: "Lasi, Thlarau & Khawtlang", en: "Spirits & Lore" },
};

const BASE_FOLKTALES: Folktale[] = [
  {
    id: "kungawrhi",
    accessionNumber: "THW.01",
    theme: "heroic",
    readingMinutes: 6,
    originNote: {
      mz: "Mizo Khawchhak leh Thlang lam Thawnthu Hlui",
      en: "Lushai Hills Oral Tradition",
    },
    characters: ["Kungawrhi", "Phawthira", "Keimi", "Khuavang"],
    imageUrl: "/src/assets/images/hero_mizo_hills_1794733235479.jpg",
    imageCaption: {
      mz: "Fig. 1 — Tlangram khawthim leh Zawlbuk mei eng, thawnthu hrilhna hmunpui.",
      en: "Fig. 1 — Dusk over the Lushai ridges and the warm Zawlbuk hearth where tales were kept alive.",
    },
    featured: true,
    mizo: {
      title: "Kungawrhi leh Phawthira",
      subtitle: "Hnute tui hmangaihna, Keimi thlemna leh Lei hnuai khaw chhanchhuahna",
      summary:
        "Nula hmelṭha leh nungchang mawi Kungawrhi chu thlarau sual leh Keimi ten lei hnuai khuaah an hruai bo a; a pasal huaisen Phawthira chuan thihna hlau lovin a va zawng chhuak leh ta a ni.",
      pullQuote:
        "\"Khawiah pawh awm mah la, thim hnuaia thlarau khua thleng pawhin ka phaw leh ka fei nen ka rawn zawng chhuak zel ang che.\"",
      paragraphs: [
        "Hmanlaiin Mizo khaw pakhatah hian nula hmelṭha leh fel em em, a hming Kungawrhi an tih a awm a. A pa hian ramhnuaiah thing a kihna lamah a kut zungpui a tihhliam palh a, chuta ṭang chuan mak tak maiin Kungawrhi chu a lo piang ta a ni, tiin upaten an sawi ṭhin. A hmel a ṭhat mai bakah a zaidam a, khaw chhung mite leh tlangvalte ngaihsan rawn a ni.",
        "Tlangval huaisen leh rorum tak Phawthira chuan Kungawrhi chu nupui atan a nei ta a. An nupa chuan inhmangaih takin an khawsa dun a, an hlim em em ṭhin. Mahse mi hmelṭha leh vannei reng reng hi thlarau sualte leh mihring rilru chhia te itsikna tawk an ni chawk a, Keimi leh thlarau lam thil tithei tak takte chuan Kungawrhi chu an it ta tlat mai.",
        "Nikhat chu Phawthira ram chhuah hlanin, dawt leh phiarrukna mak tak hmangin khuavang leh thlarau sual pawlten Kungawrhi chu an bum chhuak a, mihring khawvel piah lam lei hnuai khaw thimah an hruai bo ta daih mai. Phawthira lo hawin a nupui a hmuh tak lohah chuan a lungngaiin a thinrim hle a, a thih leh thih, a dam leh dam tiin a phaw leh fei a la chhuak a, a zui ve ta ngat mai.",
        "Kawng thui tak leh hlauhawm paltlangin, sa hlauhawm leh Keimi te bei thlain, lei kawh hmun thim piah lamah a lut thla a. Thluak leh finna hmangin a nupui hruaibotu thlaraute bumna a phelh darh vek a, tawpah chuan Kungawrhi chu him dam takin a chhanchhuak leh ta a ni.",
        "An khuaa an kir leh hnu chuan khawtlangin ropui takin an lo lawm a. Phawthira huaisenna leh Kungawrhi rinawmna chu Mizo thawnthua hmangaihna leh tlawmngaihna entirna ropui ber zinga pakhat a lo ni reng ta a ni.",
      ],
      moral:
        "Hmangaihna dik tak leh huaisenna chuan hlauhna leh thimna engpawh a hneh thei a; inthlahdah lova inngaihsak tawn hi nupa leh chhungkaw nghet innghahna a ni.",
      culturalNotes: [
        {
          term: "Phaw leh Fei",
          explanation:
            "Hmanlai Mizo tlangval leh pasalthate ralthuam pawimawh ber, huaisenna leh chhungkaw venhimna entirna a ni.",
        },
        {
          term: "Keimi",
          explanation:
            "Mizo thawnthua mihring leh sakei nihna kawp thei, thlarau lam thiltihtheihna nei anga sawi thin a ni.",
        },
        {
          term: "Khuavang",
          explanation:
            "Mizo hmanlai sakhua leh thawnthua van lam thlarau emaw vanneihna leh hringnun vawngtu anga ngaih a ni.",
        },
      ],
    },
    english: {
      title: "Kungawrhi and Phawthira",
      subtitle: "A tale of devotion, deceit by shapeshifters, and the journey beneath the earth",
      summary:
        "When the gentle and celebrated Kungawrhi is spirited away into the subterranean realm by deceptive spirits, her fearless husband Phawthira braves perilous trials to bring her home.",
      pullQuote:
        "\"Though you be hidden beneath the roots of the hills, my shield and spear shall follow until we stand in the sunlight again.\"",
      paragraphs: [
        "In the ancient hills there lived a young woman named Kungawrhi, whose grace and gentle heart were spoken of across neighboring villages. Elders tell that she was born miraculously from a thorn-pricked thumb while her father cleared forest bamboo, and she grew into a figure of rare beauty, diligence, and kindness.",
        "She wed Phawthira, a courageous young hunter whose steady spirit matched her own. For a time their hearth knew quiet abundance and joy. Yet extraordinary fortune in old folklore rarely escapes envy; forest spirits and *Keimi*—those uncanny beings said to walk as both human and tiger—coveted Kungawrhi for their hidden realm.",
        "While Phawthira was away hunting across the ridges, deceptive spirits lured Kungawrhi beyond the village palisade and bore her away down into the shadowy underworld. Returning to a silent hearth, Phawthira did not surrender to grief. Taking up his traditional shield (*phaw*) and iron-tipped spear (*fei*), he vowed to trace her path past the threshold of the living.",
        "Through mist-choked gorges, trickster riddles, and guardians of the underground villages, Phawthira matched courage with keen wit. Refusing every illusion offered to break his resolve, he outmaneuvered her captors and led Kungawrhi safely back toward the mountain daylight.",
        "When the pair emerged onto the familiar ridge of their homeland, the entire village celebrated their return. In Mizo oral memory, Phawthira and Kungawrhi endure as an emblem of unwavering fidelity and *Tlawmngaihna*—courageous selflessness in the face of dread.",
      ],
      moral:
        "Devotion paired with steadfast courage can pierce even the darkest deception; loyalty is proven not in ease, but when everything seems lost.",
      culturalNotes: [
        {
          term: "Phaw leh Fei",
          explanation:
            "The traditional hide shield and iron spear carried by Mizo warriors (*pasaltha*), symbolizing protection and valor.",
        },
        {
          term: "Keimi",
          explanation:
            "A legendary lycanthropic figure in Mizo lore capable of shifting between human and tiger forms.",
        },
        {
          term: "Khuavang",
          explanation:
            "Benevolent guardian spirits or cosmic watchers in pre-Christian Mizo belief who shaped destiny and fortune.",
        },
      ],
    },
  },
  {
    id: "chhura",
    accessionNumber: "THW.02",
    theme: "wit",
    readingMinutes: 5,
    originNote: {
      mz: "Chhurbura leh Nahaia Thawnthu Huang",
      en: "The Chhura & Nahaia Cycle",
    },
    characters: ["Chhura", "Nahaia", "Phungpuinu", "Sekibuhchhuak"],
    imageUrl: "/src/assets/images/tale_chhura_1794733236182.jpg",
    imageCaption: {
      mz: "Fig. 2 — Chhura leh a Sekibuhchhuak mak tak mai, buhchhuak mawlh mawlh lai.",
      en: "Fig. 2 — Chhura beside the bamboo granary holding the miraculous Sekibuhchhuak horn.",
    },
    mizo: {
      title: "Chhura leh Sekibuhchhuak",
      subtitle: "Finna mak danglam, Phungpuinu bumna leh thilpek hlu Sekibuhchhuak",
      summary:
        "Chhura chuan ramhnuaia thlarau hlauhawm Phungpuinu chu finthiam takin a hneh a, buh leh sa chhuak reng thei 'Sekibuhchhuak' a hlawh chhuak a; a u Nahaia erawh chuan itsikna avangin thleng sak a tum ta a ni.",
      pullQuote:
        "\"Sekibuhchhuak, buh leh sa chhuak rawh! tiin han chham ila, chawhtawlh a khat nghal zel mai a nia.\"",
      paragraphs: [
        "Mizo thawnthua mi lar ber chu Chhura (Chhurbura) leh a u Nahaia te hi an ni. Chhura hi mi mawl leh rilru tluang tak anga lang, mahse a chang chuan fing phakar tak leh thilmak tawng fuh thei em em a ni a. A u Nahaia erawh chu mi fing vervek deuh, a nau buma chan ṭha zawk chan tum reng chi a ni thung.",
        "Tum khat chu Chhura leh Phungpuinu (ramhnuaia ramhuai nu hlauhawm) an intawng a. Thlam hnuaia pipu-ah Chhura chuan Phungpuinu chu a lo chang ru a, pipu a uai lai takin a samah a lo man bet ta tlat mai. Phungpuinu chuan a nun zuah sak turin a ngen a, a tlan chhuah manah thilmak 'Sekibuhchhuak'—lehlam aṭanga buh chhuak leh lehlam aṭanga sa tuihnai chhuak reng thei seki chu Chhura a pe ta a ni.",
        "Chhura chuan lawm takin inah a hawn a, thawk hah ngai lovin buh leh sa tuihnai tak tak an ei ṭhin. Mahse a u Nahaia chuan chu Sekibuhchhuak chu a it ta em em a. Chhura mawlna hmang ṭangkaiin thleng a rawt a, seki pangngai leh Sekibuhchhuak chu thlakthleng sak a tum ta a.",
        "Chhura thawnthu hrang hrang—Mawngping khuaa thilmak hralh tum te, chi lei tuma tui chhunga chi a dah bo te, leh a u Nahaia nena an intihbuaina te hi Mizo naupang leh puitling ten Zawlbuk meilum bula an nuihpui dar dar ṭhin ber a ni.",
        "Nuihzatthlak tak anga lang si hian, Chhura thawnthu chuan duhâmna ṭhat lohzia leh rilru thianghlimna hlutna min zirtir ru reng a ni.",
      ],
      moral:
        "Duhâmna leh mahni unaute bum tumna chuan hlimna tluantling a thlen ngai lo va; rilru tluang leh lungawina hian harsatna karah pawh nuih a tiza zawk ṭhin.",
      culturalNotes: [
        {
          term: "Sekibuhchhuak",
          explanation:
            "Thawnthua seki (mithun horn) mak tak, chaw leh sa chhuak reng thei—malsawmna tam tak entirna.",
        },
        {
          term: "Phungpuinu",
          explanation:
            "Mizo thawnthua ramhnuaia cheng ramhuai nu hlauhawm leh thlarau sual anga sawi thin.",
        },
      ],
    },
    english: {
      title: "Chhura and the Miraculous Horn",
      subtitle: "Foolish wisdom, outwitting the ogress Phungpuinu, and the Sekibuhchhuak",
      summary:
        "Simple-hearted yet unexpectedly shrewd, Chhura outsmarts the forest ogress Phungpuinu to win the magical Sekibuhchhuak—a mithun horn that pours forth endless rice and meat.",
      pullQuote:
        "\"Speak to the horn with an open heart, and warm rice pours into the basket without a single furrow plowed.\"",
      paragraphs: [
        "No figure in Mizo storytelling draws warmer laughter around the hearth than Chhura—also called Chhurbura—and his calculating elder brother, Nahaia. Chhura stands at the delightful crossroads of innocent simplicity and uncanny luck, stumbling headfirst into absurd mishaps yet occasionally outsmarting the craftiest foe.",
        "In one celebrated exploit, Chhura matched wits with the feared forest ogress *Phungpuinu*. Setting a trap beneath a field hut's hanging swing, Chhura seized her by the hair when she sat to sway. To win her freedom, *Phungpuinu* surrendered the legendary *Sekibuhchhuak*—a miraculous mithun horn that poured steamed rice from one side and savory meat from the other.",
        "Word of the horn soon reached Nahaia, whose sharp eyes burned with envy. Hoping to exploit his brother's trusting nature, Nahaia plotted to swap the miraculous *Sekibuhchhuak* for an ordinary dried horn. Across the sprawling Chhura cycle—from selling an invisible rainbow fly in Mawngping to soaking salt in a stream—greed repeatedly trips over Chhura's disarming candor.",
        "Whenever Nahaia tried to hoard the horn's bounty for himself, misfortune or a sudden reversal turned his cleverness inside out. Chhura, meanwhile, remained unbothered by status, greeting life's surprises with quiet humor.",
        "Beneath the laughter that echoed through every *Zawlbuk* dormitory at night, Chhura's stories gently satirize vanity, reminding listeners that greed impoverishes the soul far faster than simplicity ever could.",
      ],
      moral:
        "Greed and scheming against one's own kin always unravel in the end; an honest, unpretentious heart remains richer than any hoarded prize.",
      culturalNotes: [
        {
          term: "Sekibuhchhuak",
          explanation:
            "Literally a 'mithun horn that produces rice'—a beloved motif of boundless abundance in Mizo folklore.",
        },
        {
          term: "Phungpuinu",
          explanation:
            "A giant forest ogress in Mizo lore whom Chhura famously outwitted to earn his magical horn.",
        },
      ],
    },
  },
  {
    id: "mauruangi",
    accessionNumber: "THW.03",
    theme: "resilience",
    readingMinutes: 6,
    originNote: {
      mz: "Mizo Thawnthu Hlui Lar Ber Pawl",
      en: "Classic Mizo Moral Tale",
    },
    characters: ["Mauruangi", "Bingtaii", "Nuhrawn", "Vai Lal"],
    imageUrl: "/src/assets/images/tale_mauruangi_1794733236880.jpg",
    imageCaption: {
      mz: "Fig. 3 — Mauruangi lui kamah, a nu thlarau leh savaten an awmpui lai.",
      en: "Fig. 3 — Mauruangi beside the mountain stream under the flowering tree where birds befriended her.",
    },
    mizo: {
      title: "Mauruangi",
      subtitle: "Tuarchhelna, nu thlarau ngilneihna leh hringnun inthlak danglamna",
      summary:
        "A nu boral hnua nuhrawn leh Bingtaii ten an tihduhdah em em Mauruangi chu a zaidamna leh a nu thlarau venhimna avangin vanneihna ropui takin a hmuak ta a ni.",
      pullQuote:
        "\"Buh tak chu Bingtaii chan a ni a, favai leh hnathawh hahthlak zawng chu Mauruangi chan a ni reng ṭhin.\"",
      paragraphs: [
        "Hmanlai hian nula fel leh hmelṭha tak, Mauruangi an tih a awm a. A naupan laiin a nuin a boralsan a, a pa chuan nupui dang a nei leh ta a. A nuhrawn chuan fanu Bingtaii a rawn hruai lut a, chuta ṭang chuan Mauruangi tan hrehawm leh tuarna hun a inṭan ta a ni.",
        "A nuhrawn leh Bingtaii chuan Mauruangi chu an tiduhdah em em a; hna hahthlak ber ber—thing phurh, tui chawi leh buh den te an thawhtir vek a, chaw ei dawnin Bingtaii tan buh fai tuihnai an chhum sak laiin Mauruangi chu favai emaw chaw chhe ber ber an hrai ṭhin.",
        "Mahse Mauruangi chu a vui ngai lo va, a zaidamin a tuarchhel em em a. A lungngaih changin lui kamah emaw thingkung hnuaiah emaw kalin a ṭap ru ṭhin. Chutah chuan a nu thlarau chu sava mawi takah emaw sangha leh thil dangah changin a rawn pui ṭhin a, silhfen mawi tak leh chaw tuihnai tak tak a rawn pe ru ṭhin a ni.",
        "Tichuan hun a lo kal zel a, khaw dang lal fapa (Vai lal tiin thawnthu thenkhatah sawi a ni) chuan a pheikhawk emaw a samzai mawi tak aṭangin nula dik tak leh hmelṭha ber a zawng chhuak a. Nuhrawn leh Bingtaii ten bum tum mah se thudik a lo lang chhuak a, Mauruangi chu ropui takin lalin nupui atan a hawn ta a.",
        "Mauruangi chuan ropuina a chan hnuah pawh a zaidamna a hloh lo va, thawnthu hian tuarchhelna leh rilru thianghlimna rah chhuah ropuizia a tarlang chiang hle a ni.",
      ],
      moral:
        "Tuarna leh hmusitna karah pawh rilru ṭha leh taimakna vawng tlat te chu a hun takah chawimawiin an awm ngei ṭhin.",
      culturalNotes: [
        {
          term: "Favai",
          explanation:
            "Buh hernaa buh si (husk/bran) chhuak—mihmasaten ar leh vawk chaw atana an hman ṭhin.",
        },
        {
          term: "Nuhrawn",
          explanation:
            "Hmanlai thawnthu tam takah nuhrawn sual leh fa bik duhsakna hian fahrahte tuarna a tarlang ṭhin.",
        },
      ],
    },
    english: {
      title: "Mauruangi",
      subtitle: "Endurance in hardship, a mother's gentle spirit, and quiet grace rewarded",
      summary:
        "Often remembered as the Mizo Cinderella, gentle Mauruangi endures cruelty from her stepmother and stepsister Bingtaii until her mother's spirit and quiet goodness transform her fate.",
      pullQuote:
        "\"The finest white rice went to Bingtaii's bowl, while Mauruangi ate chaff beside the cold ashes—yet her heart never turned bitter.\"",
      paragraphs: [
        "Long ago there lived a kind-hearted girl named Mauruangi. After her beloved mother passed away, her father remarried a woman who brought her own daughter, Bingtaii, into the household. From that day onward, warmth vanished from the hearth for Mauruangi.",
        "Every dawn began with backbreaking chores: hauling bamboo water tubes up steep paths, gathering firewood in the mist, and pounding paddy until her palms blistered. At mealtime, while Bingtaii received steaming bowls of white rice, Mauruangi was given coarse chaff (*favai*) and leftovers.",
        "Yet Mauruangi bore every slight with quiet dignity. Whenever sorrow grew too heavy, she crept down to the clear forest stream beneath a flowering tree. There, according to the elders, her late mother's spirit watched over her—appearing as a bright songbird or gentle river creature to weave fine garments and bring comfort in secret.",
        "In time, a distant ruler seeking a bride of true virtue discovered a golden strand of hair—or, in other tellings, a delicate ornament—left behind by Mauruangi. Though her stepmother and Bingtaii plotted to claim the honor for themselves, truth surfaced as clearly as spring water, and Mauruangi was escorted in honor to the royal court.",
        "Across generations in Mizoram, Mauruangi has remained the most cherished moral story for children: proof that patience, humility, and an uncorrupted spirit outlast every cruelty.",
      ],
      moral:
        "Quiet integrity and perseverance through mistreatment carry a dignity that cruelty can never steal.",
      culturalNotes: [
        {
          term: "Favai",
          explanation:
            "Coarse rice husk and bran normally fed to village livestock, symbolizing Mauruangi's mistreatment.",
        },
        {
          term: "Bingtaii",
          explanation:
            "Mauruangi's pampered stepsister, whose vanity and impatience contrast sharply with Mauruangi's poise.",
        },
      ],
    },
  },
  {
    id: "liandova-te-unau",
    accessionNumber: "THW.04",
    theme: "resilience",
    readingMinutes: 5,
    originNote: {
      mz: "Unau Inhmangaihna Thawnthu",
      en: "Lushai Oral Heritage",
    },
    characters: ["Liandova", "Tuaisiala", "Lalfanu", "Khawtlang"],
    imageUrl: "/src/assets/images/tale_liandova_1794733238332.jpg",
    imageCaption: {
      mz: "Fig. 4 — Liandova leh a nau Tuaisiala tapchhak mei lum bula mim an inchhang lai.",
      en: "Fig. 4 — Liandova and his younger brother Tuaisiala sharing roasted grain beside their humble hearth.",
    },
    mizo: {
      title: "Liandova Te Unau",
      subtitle: "Fahrah retheihna, unau inhmangaihna leh malsawmna thleng ta",
      summary:
        "Nu leh pa nei tawh lo unau pahnih—Liandova leh Tuaisiala—te chu khawtlangin an hmusit hle chungin an inhmangaihna leh rinawmna avangin mi hausa leh zahawm berah an chhuak ta a ni.",
      pullQuote:
        "\"Ka nau, mim fang khat chauh pawh nei ila, a chanve hi chu i ta tur a ni zel ang.\"",
      paragraphs: [
        "Mizo khaw pakhatah hian unau fahrah pahnih, a upa zawk Liandova leh a nau Tuaisiala te an awm a. Nu leh pa an neih tawh loh avangin khaw hmawra in chhe teah an khawsa a, khawtlang mi hausate leh naupang dangte hmusit leh hnuai chhiah an hlawh nasa em em ṭhin.",
        "An eitur neih chhun chu mim tlem te leh hnah hring vel mai a ni. Mahse an retheih ber lai pawhin Liandova chuan a nau Tuaisiala chu a duat em em a, thil neih chhun apiang chu an insem tlang zel a; unau inhmangaihna dik takin an inchelh tlat a ni.",
        "Khawtlangin kut an hman ni pawhin an unau chu hmun hnung berah an hnawl a, sa hlawi emaw sa ruh chang emaw pawh an hmu ve pha meuh lo. Mahse chung thilte chuan an unau thinlungah itsikna a tuh lo va, taima takin hna an thawk zel zawk a.",
        "Nikhat chu thilmak tak a lo thleng ta: rul lian emaw khuavang malsawmna hmangin an hmuh chhuah rohlu leh lalfanu ngilneihna zarah an nun chu a inthlak hlawk mai a. Mi hmusit rawn ni ṭhin Liandova te unau chu khaw chhunga mi hausa leh zahawm berah an lo chhuak ta a ni.",
        "An hausak hnuah pawh Liandova te unau chuan hmana an retheih laia hmusittute chungah phuba an la lo va, mi rethei leh fahrahte ṭanpuitu ropui takah an chhuak zawk a ni.",
      ],
      moral:
        "Retheihna leh mi hmusitna hian mihring hlutna a tihniam lo; unau inhmangaihna leh thawhrimna hi hlawhtlinna kailawn a ni.",
      culturalNotes: [
        {
          term: "Mim",
          explanation:
            "Hmanlai Mizoten buh aiah emaw buh tlem laia an chin leh an ei ṭhin thlai chi (Job's tears / millet).",
        },
        {
          term: "Khaw Hmawr",
          explanation:
            "Khaw dai fem, fahrah leh mi retheiten in an sakna hmun; hmanlai khawtlang dinhmun tarlangtu.",
        },
      ],
    },
    english: {
      title: "Liandova and His Brother",
      subtitle: "Orphaned devotion, shared hunger, and triumph without bitterness",
      summary:
        "Orphaned and shunned at the edge of the village, Liandova and his younger brother Tuaisiala share every single grain of millet until unexpected fortune elevates them above those who mocked them.",
      pullQuote:
        "\"Even if only a single grain of millet remains in our pot, half of it belongs to my younger brother.\"",
      paragraphs: [
        "At the dusty fringe of an old hillside village lived two orphaned brothers, Liandova and his little brother Tuaisiala. Without parents to speak for them in the chief's courtyard, they sheltered in a leaky bamboo hut and endured the sneers of wealthier neighbors.",
        "Days often passed with little more than wild forest greens and a handful of millet (*mim*). Yet no hardship could divide the two boys. Whenever Liandova found a scrap of food, he broke it evenly in two, insisting Tuaisiala eat first while he tended the fire.",
        "During village feasts, when choice cuts of meat were distributed to prominent households, the brothers were brushed aside and handed barren scraps. Still, Liandova refused to let resentment root in Tuaisiala's heart, teaching him instead to work steadily and keep an honest name.",
        "Fortune finally turned when a wondrous discovery—a hidden treasure found within the belly of a great serpent, alongside the quiet grace of the chief's daughter—transformed their household overnight. The despised orphans became the most prosperous and respected hosts in the settlement.",
        "Yet their greatest victory came after prosperity arrived: instead of repaying scorn with cruelty, Liandova and Tuaisiala threw open their granary to widows and orphans, becoming living pillars of *Tlawmngaihna*.",
      ],
      moral:
        "True nobility is forged in solidarity during scarcity and proven through generosity when fortune arrives.",
      culturalNotes: [
        {
          term: "Mim",
          explanation:
            "Job's tears or hardy hill millet, a humble staple crop in old Lushai swidden agriculture.",
        },
        {
          term: "Tlawmngaihna",
          explanation:
            "The foundational Mizo moral ideal of selflessness, hospitality, and standing beside the vulnerable.",
        },
      ],
    },
  },
  {
    id: "tualvungi-leh-zawlpala",
    accessionNumber: "THW.05",
    theme: "love",
    readingMinutes: 6,
    originNote: {
      mz: "Mizo Hmangaihna Thawnthu Lungkuai Ber",
      en: "Mizo Tragic Romance",
    },
    characters: ["Tualvungi", "Zawlpala", "Phuntiha"],
    imageUrl: "/src/assets/images/tale_tualvungi_1794733238305.jpg",
    imageCaption: {
      mz: "Fig. 5 — Tlang dung thli fim karah Zawlpala leh Tualvungi inthlahlel takin an inthlir lai.",
      en: "Fig. 5 — Zawlpala and Tualvungi gazing across the misty valley under a crescent moon.",
    },
    mizo: {
      title: "Tualvungi leh Zawlpala",
      subtitle: "Lunglenna thuk tak, phal loh inthenna leh thihna piah lam hmangaihna",
      summary:
        "Inhmangaih em em Tualvungi leh Zawlpala te chu mi dang duhamna leh chanvo dang avangin an inṭhen a; mahse an hmangaihna thuk tak chu lungphun leh thlan khur thlengin a daih ta a ni.",
      pullQuote:
        "\"Ka thih hnuah pawh ka thlan sirah lo kal la, i mittui far khat chauh pawh chu ka thlarau tan damna a ni ang.\"",
      paragraphs: [
        "Tualvungi leh Zawlpala te hi Mizo thawnthua hmangaihna thuk leh lungkuai ber sawi apianga lam rik hmasak ber an ni. Khaw pakhatah inhmangaih takin an seilian a, nupa tuak mawi tak an lo ni ta a.",
        "Mahse khuarel leh mihring duhamna chuan an hlimna chu a rawn tibuai ta. Mi hausa leh thiltithei tak Phuntiha chuan Tualvungi hmelṭhatna chu a it tlat mai a, thilpek leh bumna tinreng hmangin Zawlpala nena an inkarah inthenna khirh tak a siam sak ta a.",
        "Hmun hrangah hruai hran an nih hnu pawhin Tualvungi thinlung chuan Zawlpala chauh a lam reng a, Zawlpala pawhin Tualvungi ngaiin ni leh thla a hmang ral ṭhin. Lunglenna nasa tak avangin Zawlpala chu a hriselna a tla hniam a, a boral hial ta mai a ni.",
        "Zawlpala thih thu a hriat veleh Tualvungi chu a tuar zo ngang lo va, a pasal hmangaih ber thlanah chuan kalin lungchhe takin a ṭap a. Thawnthu hlui sawi dan chuan, a thih ve hnuah an thlan piah ve ve aṭangin thingkung emaw pangpar mawi tak lo chawr chhuakin a inkuah chial e, an ti ṭhin.",
        "He thawnthu lungkuai tak hian Mizo hla hlui leh thu leh hlaah lunglenna leh hmangaihna rinawm entirna pawimawh tak a siam reng ta a ni.",
      ],
      moral:
        "Hmangaihna dik tak chu sum leh pai leh thiltihtheihnaa lei theih a ni lo va, hun leh hmunin a ṭhen hran zawh loh khawpa nghet a ni.",
      culturalNotes: [
        {
          term: "Pawndum",
          explanation:
            "Mizo puan dum leh a tlanga rawng sen leh pawl ze nei, hmangaihna leh sunna thiltea hman thin.",
        },
        {
          term: "Hla Hlui",
          explanation:
            "Tualvungi leh Zawlpala thawnthu behchhana phuah Mizo hla hluite, vawiin thlenga sak lar la ni rengte.",
        },
      ],
    },
    english: {
      title: "Tualvungi and Zawlpala",
      subtitle: "Forced separation, longing across the ridges, and love beyond the grave",
      summary:
        "Bound by deep affection, Tualvungi and Zawlpala are torn apart by a wealthy rival's schemes—giving rise to Mizoram's most poignant ballad of longing and enduring fidelity.",
      pullQuote:
        "\"Though valleys and chiefs stand between our hearths, no wealth can unweave the bond we pledged beneath the hills.\"",
      paragraphs: [
        "Among all Mizo legends, no romance stirs the heart as deeply as that of Tualvungi and Zawlpala. Raised beneath the same mountain sky, they wed in mutual devotion, content with the quiet rhythm of hillside harvests and evening hearth song.",
        "Their peace drew the covetous eye of Phuntiha, a wealthy suitor from afar who could not bear to see Tualvungi belong to a modest husband. Through relentless pressure, lavish bride-price maneuvering, and calculated deceit, Tualvungi was parted from Zawlpala and taken to a distant settlement.",
        "Separated by steep ridges and winding rivers, neither forgot the other. Zawlpala wasted away in silent grief, composing laments carried by travelers from ridge to ridge until his strength finally failed.",
        "When word of Zawlpala's death reached Tualvungi, she journeyed back to his hillside grave and wept beside the dark *Pawndum* cloth of mourning. Elders tell that after her own passing, two trees—or twining blossoms—sprang from their resting places and intertwined their branches above the slope.",
        "To this day, Mizo poetry and traditional songs invoke Tualvungi and Zawlpala whenever expressing love that outlives distance, wealth, and mortality.",
      ],
      moral:
        "True devotion cannot be purchased by status or broken by distance; it endures in memory long after power fades.",
      culturalNotes: [
        {
          term: "Pawndum",
          explanation:
            "A traditional dark indigo Mizo cloth banded with crimson and woven stripes, deeply tied to honor and mourning.",
        },
        {
          term: "Hla Hlui",
          explanation:
            "Ancient Mizo chants and poetic laments directly inspired by Tualvungi and Zawlpala's separation.",
        },
      ],
    },
  },
  {
    id: "chawngchilhi",
    accessionNumber: "THW.06",
    theme: "spirits",
    readingMinutes: 5,
    originNote: {
      mz: "Ramhnuaia Thlarau & Rulngan Thawnthu",
      en: "Mythic Spirit Lore",
    },
    characters: ["Chawngchilhi", "A Pa", "Rulngan"],
    imageUrl: "/src/assets/images/tale_chawngchilhi_1794733238782.jpg",
    imageCaption: {
      mz: "Fig. 6 — Ramhnuai thingbuk hnuai leh rulngan hmun thianghlim.",
      en: "Fig. 6 — The shadowed banyan shrine and coiled forest serpent of ancient Mizo lore.",
    },
    mizo: {
      title: "Chawngchilhi",
      subtitle: "Ramhnuai thuruk, mihring leh thlarau khawvel inzawmna mak",
      summary:
        "Nula Chawngchilhi leh ramhnuaia Rulngan mak tak inzawmna thuruk chu a pa leh khawtlangin an hriat chhuah hnuin lungchhiatthlak takin a tawp a, mihring leh ramhnuaia thlarau khawvel inkar a tarlang.",
      pullQuote:
        "\"Ramhnuai thim hnuaiah chuan mihring mit hmuh phak loh thuruk leh thu tiam nghet tak a awm ṭhin.\"",
      paragraphs: [
        "Hmanlai Mizo khaw pakhatah hian nula hmelṭha tak Chawngchilhi an tih a awm a. A chhungte rualin lo lamah hna thawk turin ramhnuaiah an kal fo ṭhin. Chawngchilhi chuan hnathawh karah hmun fal leh reh tak, thingbuk lian tak hnuaiah a chawl fo ṭhin a ni.",
        "Chu hmun reh takah chuan mihring ni lo, ramhnuai thlarau thiltihtheihna nei Rulngan lian tak nen mak tak maiin an lo intawng a. Chu rul chu thawnthua sawi danin mihring ṭawng thiam leh nula Chawngchilhi hmangaihtu mak danglam tak a ni a, thilpek tuihnai tak tak a pe ṭhin.",
        "Chawngchilhi chuan chu thuruk chu a zep tlat a, lo hnathawk zo an haw chang pawhin chaw a ei tlem tial tial a, mahse a hmel erawh a mawiin a hrisel tlat si. A pa chuan mak tiin a rukin a zui ta a, thingbuk hnuaia thil thleng chu a va hmu chhuak ta a ni.",
        "Mihring khawtlang tan chuan chu thil chu hlauhawm anga ngaih a nih avangin, a pa chuan bumna hmangin Chawngchilhi aw ang chhuahin chu Rulngan chu a bum chhuak a, a that ta mai a. Chawngchilhi lo kalin a hmuh chuan a rilru a na em em a.",
        "He thawnthu hi hmanlai Mizoten ramhnuai leh thlarau khawvel hlauhawmzia leh thuruk zahawmzia an sawifiahna thawnthu hlui pakhat a ni.",
      ],
      moral:
        "Mihringin kan hriat thiam phak loh khawvel leh ramhnuai nunphung chungah fimkhur leh zahna neih a pawimawh a, thuruk inthup chuan rah duhawm lo a chhuah duh ṭhin.",
      culturalNotes: [
        {
          term: "Rulngan",
          explanation:
            "Mizo thawnthua rul lian leh thlarau neia ngaih, ramhnuai thim leh puk lama cheng ṭhin.",
        },
        {
          term: "Lo (Jhum)",
          explanation:
            "Hmanlai Mizoten tlangrama thlai an chinna hmun, khaw chhung piah ramhnuaia awm.",
        },
      ],
    },
    english: {
      title: "Chawngchilhi",
      subtitle: "Secret pact in the deep bamboo grove between mortal and forest spirit",
      summary:
        "A mysterious bond between the maiden Chawngchilhi and an enchanted forest serpent unfolds in the shadowy groves beyond the village fields—revealing ancient Mizo reverence for unseen nature spirits.",
      pullQuote:
        "\"Beneath the tangled banyan roots, promises are spoken in a tongue older than the village drums.\"",
      paragraphs: [
        "In a bygone era when villages stood as islands of bamboo surrounded by vast untouched jungle, a young woman named Chawngchilhi walked daily with her family to tend the steep hill fields. While others rested beside the field hut, she often slipped away into a quiet, shaded grove of gnarled banyan roots.",
        "There, unseen by the villagers, she kept company with a great mystical forest serpent (*Rulngan*)—a spirit-touched guardian said to converse in human speech and offer rare forest delicacies. Bound by secrecy, Chawngchilhi returned home each dusk serene and radiant, yet untouched by hunger at the family meal.",
        "Suspicious of her quiet absences, her father followed her footsteps along the damp jungle trail and witnessed the strange companionship beneath the ancient shrine. Fearful of spirit taboos and misunderstanding the bond, he returned alone the next day and imitated his daughter's voice to ambush and slay the serpent.",
        "When Chawngchilhi discovered what had happened beneath the silent banyan canopy, sorrow overtook her heart, forever severing the fragile bridge between her household and the spirit of the woods.",
        "Preserved among Mizo mythic lore, the tale of Chawngchilhi reflects an older worldview where forests were alive with unseen guardians, and fear often shattered what wonder had built.",
      ],
      moral:
        "What lies beyond ordinary understanding often inspires fear; wisdom asks us to look deeply before striking what we do not comprehend.",
      culturalNotes: [
        {
          term: "Rulngan",
          explanation:
            "A mythical giant serpent or dragon-like forest spirit in Mizo lore, often associated with sacred groves and taboos.",
        },
        {
          term: "Lo (Jhum Field)",
          explanation:
            "Traditional hillside swidden cultivation fields located beyond the safety of the village fence.",
        },
      ],
    },
  },
  {
    id: "chemtatrawta",
    accessionNumber: "THW.07",
    theme: "wit",
    readingMinutes: 4,
    originNote: {
      mz: "Mizo Thawnthu Inzawm Zui (Chain Reaction)",
      en: "Classic Cumulative Folktale",
    },
    characters: ["Chemtatrawta", "Kaikuang", "Ramar", "Taivang", "Sanghal", "Bâk"],
    imageUrl: "/src/assets/images/tale_chemtatrawta_1794734006773.jpg",
    imageCaption: {
      mz: "Fig. 7 — Chemtatrawta luite kama chem a tah lai leh kaikuang a rawn chhuah lai.",
      en: "Fig. 7 — Chemtatrawta honing his machete by the hill stream as the crimson prawn approaches.",
    },
    mizo: {
      title: "Chemtatrawta",
      subtitle: "Thinrimna thil inzawm zui chho zel leh khawtlang buaina",
      summary:
        "Luite kama a chem tah laia kaikuangin a rawn cheh palh avangin Chemtatrawta a thinrim a, rawpui a sat thlu—chu chuan ramar, taivang, sanghal leh bâk thlengin inzawm zelin buaina a siam ta a ni.",
      pullQuote:
        "\"Engah nge ka tilah mi cheh? tia thinrimna pakhat hian tlang leh ram zawng zawng a tihbuai tak ni.\"",
      paragraphs: [
        "Tum khat chu pa pakhat Chemtatrawta an tih hi luite kamah a chem tat turin a kal a. Tui luang ri her her karah lung chungah ṭhuin a chem chu a tat mawlh mawlh mai a. Chutia tui taka a tah lai chuan, luia cheng kaikuang pakhatin a rawn cheh sak ta thut mai a!",
        "Chemtatrawta chu na ti leh thinrim lutukin a zuang tho va, kaikuang man tumin a chhuk a, mahse kaikuang chu lung karah a biru daih si. A thinrim hrikthlak nan a bula ding rawpui lian tak chu a chem hriam tak chuan a sat tlu ta pawp mai a.",
        "Rawpui tlu chuan a zar chunga ṭhu ramar no leh a nu chu a deng thla nawlh mai a. Ramar thinrim chuan 'Engah nge min den?' tiin a tlan phei a, leia taivang bu chu a phin darh ta vek mai. Taivang hote thinrim chuan bula kal sanghal chu an seh vak mai bawk.",
        "Sanghal na ti lutuk chu a tlan chiam a, bâk tam tak behna changel kung chu a tai tlu ta rum rum mai a. Bâk rual thlaphang chu an thlawk chhuak hum hum a, lal sahuai beng kuaah emaw sakawr chungah an fu khawm a—tichuan khaw chhung mite leh thil nung zawng zawng an buai zo ta vek mai a ni!",
        "Khawtlang upaten thil awmzia an chhui chhuah hnu chuan, buaina lian pui bul chu Chemtatrawta thinrim insum theih lohna te tak te aṭanga inṭan a lo ni reng mai. Mizo naupangte tana thawnthu ngaihnawm leh hriat awl ber pawl a ni.",
      ],
      moral:
        "Thinrimna te tak te leh insum theih lohna hian thil inzawm chho zelin mahni leh midang tan buaina lian zawk a thlen thei.",
      culturalNotes: [
        {
          term: "Chem",
          explanation:
            "Mizo hmanrua pawimawh ber—lo vah, thing eh leh ramvahna atana hman thin.",
        },
        {
          term: "Kaikuang & Taivang",
          explanation:
            "Luite kama kaikuang leh ramhnuaia taivang (red weaver ant) seh na tak te.",
        },
      ],
    },
    english: {
      title: "Chemtatrawta",
      subtitle: "A river prawn's pinch and the hilarious chain reaction through the forest",
      summary:
        "Mizoram's most famous cumulative folktale: when a stream prawn pinches Chemtatrawta while he sharpens his machete, his outburst sets off a domino cascade across bamboo, jungle fowl, weaver ants, wild boar, and village chiefs.",
      pullQuote:
        "\"One hasty swing at an innocent bamboo clump can rattle every nest and hearth down the valley.\"",
      paragraphs: [
        "One bright morning beside a clear mountain brook, a villager named Chemtatrawta knelt on a smooth boulder to sharpen his trusty *chem* (machete). Lost in the rhythm of steel against wet stone, he failed to notice a feisty red-clawed stream prawn creeping near—until *snap!*—the prawn pinched him sharply.",
        "Yelping in anger, Chemtatrawta lunged for the prawn, which darted safely beneath the pebbles. Frustrated and unwilling to let his temper cool, he vented his fury by hacking down a towering clump of bamboo beside the bank.",
        "As the bamboo crashed down, it startled a wild jungle fowl perched overhead. Angry and flustered, the fowl scrambled across the forest floor and kicked open a nest of fierce red weaver ants (*taivang*). Swarming out in rage, the ants stung a passing wild boar, which bolted blindly through the underbrush and knocked down a wild banana grove full of sleeping bats.",
        "Startled into daylight, the cloud of bats swooped straight toward the settlement, startling livestock and knocking over elders until the entire village stood in uproar.",
        "When the village council traced the chaos backward—from bats to boar, ants to fowl, bamboo to machete—everyone burst into laughter, discovering how a single moment of unchecked temper had shaken the entire hill.",
      ],
      moral:
        "Small flashes of unchecked anger ripple outward in unexpected ways; patience at the stream saves the whole village from turmoil.",
      culturalNotes: [
        {
          term: "Chem",
          explanation:
            "The traditional curved Mizo machete carried in a wooden scabbard for clearing bamboo, woodcraft, and daily hill work.",
        },
        {
          term: "Taivang",
          explanation:
            "Fierce red tree-dwelling weaver ants of the Lushai forests whose bite sends even wild boars running.",
        },
      ],
    },
  },
  {
    id: "kelchawngi",
    accessionNumber: "THW.08",
    theme: "spirits",
    readingMinutes: 5,
    originNote: {
      mz: "Van Lam Kaih Chhoh Thawnthu",
      en: "Celestial Ascent Folktale",
    },
    characters: ["Kelchawngi", "Pu Vana", "A Nu leh Pa"],
    imageUrl: "/src/assets/images/tale_kelchawngi_1794734005091.jpg",
    imageCaption: {
      mz: "Fig. 8 — Kelchawngi van lama hrualhrui hmanga a lawn chho lai.",
      en: "Fig. 8 — Kelchawngi ascending the golden sky creeper sent down by Pu Vana.",
    },
    mizo: {
      title: "Kelchawngi",
      subtitle: "Tihsual palh lungchhiatthlak, hlang chunga hnawl leh van lama hruai chhohna",
      summary:
        "In chhunga a nau awm leh eirawngbawlnaah Kelchawngin thil a tisual palh a, a nu leh pa thinrimin in chung hlangah an hnutchhiah; chutah Pu Vana hnenah a ṭap a, van hrui thlak thlaah a lawn chho ta a ni.",
      pullQuote:
        "\"Pu Van, min han khawngaih teh, i hrualhrui rawn thlak thla la, vanah min hruai chho rawh.\"",
      paragraphs: [
        "Hmanlaiin hmeichhe naupang pakhat, Kelchawngi an tih hi a nu leh pa leh a nau te nen an khawsa a. Nikhat chu a nu leh pate lo lama an kal dawnin, Kelchawngi hnenah chuan, 'Kelchawng, mai lo chhum la, i nau hi ṭha takin lo awm ang che,' tiin an chah a.",
        "Mahse thawnthua sawi danin, Kelchawngi chuan a nu thu chah chu a hre sual nge a buai palh tlat mai a; 'mai' (pumpkin) chhum tur kha a nau te zawk a lo tihlum palh ta mai a ni! Tlaia a nu leh pa lo haw ten bel chhung an han en chuan an rilru a na lutuk a, an thinrimin Kelchawngi chu nasa takin an hau va, an vaw hial ta a.",
        "Chumi hnu chuan vaihlo leh thlai pho na 'hlang' sang tak in chunga siamah Kelchawngi chu an chhoh tir a, chhuk leh theih loh nan kailawn an laksak daih mai. Kelchawngi chu hlau leh lungngaiin a ṭap hawm hawm a, lei lamah tumah tanpuitu a nei tawh si lo.",
        "Van lam thlirin, van Lal 'Pu Vana' hnenah chuan mittui tla zawih zawihin a au chho va. Pu Vana chuan a khawngaih em em a, van aṭangin hrualhrui mawi tak a rawn thlak thla ta a. Kelchawngi chuan chu hrui chu vuanin vanah a lawn chho ta daih mai a ni.",
        "Vanah chuan ropui leh nuam takin an lo enkawl a, rangkachak leh thil mawi tak takin a inchei a. Hun engemaw chen hnuah lei lamah a rawn lang leh a, a nu leh paten chhuk tura an ngen chiam chung pawhin van lamah a kir leh ta zawk a ni.",
      ],
      moral:
        "Thinrimna avanga mahni fate hnawl leh hrem lutukna chuan inlaichinna a tichhe thei a; ngaihdamna leh dawhtheihna hi chhungkua venghimtu a ni.",
      culturalNotes: [
        {
          term: "Pu Vana",
          explanation:
            "Mizo hmanlai thawnthua van lal leh thil siam chungnung bera ngaih.",
        },
        {
          term: "Hlang",
          explanation:
            "Hmanlai Mizo in chhung emaw bathlara vaihlo leh thlai pho nana siam dawhsan sang.",
        },
      ],
    },
    english: {
      title: "Kelchawngi",
      subtitle: "The girl stranded above the hearth who climbed a vine into the sky",
      summary:
        "After a tragic household blunder leaves young Kelchawngi banished atop a high drying rack, she cries out to Pu Vana, Lord of the Sky, who lowers a golden creeper vine to lift her into heaven.",
      pullQuote:
        "\"O Pu Vana above the clouds, send down a creeper vine, for the hearth below has grown too cold for me.\"",
      paragraphs: [
        "In an old hillside household, young Kelchawngi stayed behind to tend the hearth and mind her baby sibling while her parents climbed to the steep fields. Before leaving, her mother called out, 'Kelchawng, boil a pumpkin (*mai*) for supper!'",
        "In the tragic confusion at the heart of this ancient cautionary tale, Kelchawngi mistook her instructions and prepared the pot in horror. When her parents returned at dusk and uncovered the hearth, grief and fury overwhelmed them. Unforgiving in their shock, they banished Kelchawngi onto the high *hlang*—the tall bamboo drying platform suspended high above the eaves—and pulled away the ladder.",
        "Stranded beneath the open twilight sky, shivering and alone, Kelchawngi lifted her face toward the stars and sang out to *Pu Vana*, the Sovereign of Heaven, begging for mercy.",
        "Moved by her weeping, *Pu Vana* let down a luminous forest creeper (*hrualhrui*) twisting down from the clouds. Grasping the vine, Kelchawngi climbed steadily upward into the celestial realm, where she was welcomed with kindness and dressed in shimmering ornaments.",
        "Years later, when she descended briefly to visit the ridge, her parents heard the chime of her silver anklets and begged her to stay. Yet Kelchawngi gently shook her head and ascended back into the sky, leaving behind a solemn reminder about anger and forgiveness.",
      ],
      moral:
        "Harshness and unforgiving anger can drive loved ones beyond reach; compassion must temper grief within a home.",
      culturalNotes: [
        {
          term: "Pu Vana",
          explanation:
            "In pre-Christian Mizo cosmology, the sky sovereign dwelling above the clouds who watches over orphans and the distressed.",
        },
        {
          term: "Hlang",
          explanation:
            "A raised bamboo drying scaffold used for tobacco and harvests above traditional Mizo houses.",
        },
      ],
    },
  },
  {
    id: "lalruanga-leh-keichala",
    accessionNumber: "THW.09",
    theme: "heroic",
    readingMinutes: 6,
    originNote: {
      mz: "Mizo Dawithiam Ropui Ber Thawnthu",
      en: "Legendary Sorcerers' Duel",
    },
    characters: ["Lalruanga", "Keichala", "Hrangchhuana"],
    imageUrl: "/src/assets/images/tale_lalruanga_1794734006905.jpg",
    imageCaption: {
      mz: "Fig. 9 — Lalruanga leh a hmelma Keichala (sakei chang thei) an intawn lai.",
      en: "Fig. 9 — Wonder-worker Lalruanga facing the spectral tiger-form of Keichala in the mist.",
    },
    mizo: {
      title: "Lalruanga leh Keichala",
      subtitle: "Dawi thiltihtheihna inelna, finna leh Keimi thlemna hneh dan",
      summary:
        "Mizo thawnthua mi thiam ropui ber Lalruanga chuan sakei-ah chang thei leh dawithiam hlauhawm Keichala chu thilmak leh finthiamna hmangin a inelnaah a hneh ta a ni.",
      pullQuote:
        "\"Dawi thiltihtheihna ringawt hian mi a chhan zo lo; thinlung nghet leh finna dik chauh hi chakna tluantling a ni.\"",
      paragraphs: [
        "Mizo thawnthu hlui zawng zawngah thilmak tihtheihna (magic/dawi) lamah Lalruanga tluk zo an awm lo. A pian tirh aṭangin mi danglam bik a ni a, thli leh ruah koh te, inthlak danglam te leh ramhuai khawvel thilte a thunun thei hial a ni, tiin pi leh puten an sawi ṭhin.",
        "Amah elpui ber leh hmelma hlauhawm tak chu Keichala a ni. Keichala hi 'Keimi'—mihring leh sakei lian takah inthlak thei, dawi lam thiam leh rorum em em a ni a. Lalruanga leh Hrangchhuana te ang bawk khan thilmak tihtheihna lamah intihsiakna leh inbeihna nasa tak an nei fo ṭhin.",
        "Tum khat chu Keichala chuan sakei lian leh hlauhawm berah changin Lalruanga chu ramhnuaiah thah a tum ta a. Thingkung leh lungpui thlengin dawi thiltihtheihna hmanga inbeihna a thleng a, khawvel danglam tak ang maiin thli leh kawl a phe zawr zawr hial a ni.",
        "Mahse Lalruanga chuan Keichala chapona leh a rorumna ringawt chu a thluak fim hmangin a hneh ta. Thilmak siamchawp leh thang ruk hmangin Keichala tha leh thiltihtheihna chu a tihtawp sak a, amah leh a khaw mite a venghim ta a ni.",
        "Lalruanga chanchin leh Keichala nena an inbeihna hi Mizo thawnthu ngaihnawm leh phurawm berte zinga chhiar tel reng a ni.",
      ],
      moral:
        "Thiltihtheihna leh chapona ringawt aiin finna, dawhtheihna leh rilru fim hi hmelma hnehna ralthuam ṭha ber a ni.",
      culturalNotes: [
        {
          term: "Dawi",
          explanation:
            "Hmanlai Mizo thawnthua thilmak tihtheihna, ṭawngkam leh hnah/lung hmanga thil tihdanglamna.",
        },
        {
          term: "Keichala",
          explanation:
            "Lalruanga elpui ber, sakei hlauhawma inthlak thei dawithiam.",
        },
      ],
    },
    english: {
      title: "Lalruanga and Keichala",
      subtitle: "The legendary duel between Mizoram's wonder-magician and the tiger sorcerer",
      summary:
        "Famed across the hills as the greatest Mizo wonder-worker, Lalruanga matches wits and arcane mastery against Keichala—a feared shapeshifter who hunted in tiger form.",
      pullQuote:
        "\"Raw power strikes like sudden thunder, but calm foresight bends the storm to its will.\"",
      paragraphs: [
        "Across Mizo oral tradition, no name carries more awe in tales of wonder and hidden arts than Lalruanga. From youth, elders recount, he possessed rare command over wind, forest herbs, and unseen forces—able to outlast rivals such as Hrangchhuana and confound spirits of the ridges.",
        "Yet his fiercest adversary was Keichala, a dread *Keimi* sorcerer who walked by day as a calculating man and prowled by night in the form of a massive tiger. Driven by rivalry and pride, Keichala vowed to test Lalruanga's mastery in open forest combat.",
        "In the shadowy bamboo valleys between their settlements, the two clashed in legendary trials of illusion and endurance. Rocks shattered, sudden fog rolled across dry ridges, and beasts fell silent as Keichala leaped in his striped terror while Lalruanga countered with quiet enchantments.",
        "Rather than answering brute ferocity with blind rage, Lalruanga used Keichala's own arrogance against him—setting subtle counter-charms that trapped the shapeshifter's strength until Keichala had to yield.",
        "The cycle of Lalruanga and Keichala endures as Mizoram's quintessential legend of intellect and composure triumphing over intimidating force.",
      ],
      moral:
        "Strength driven by arrogance leaves blind spots; clear judgment and calm poise prevail against the fiercest rival.",
      culturalNotes: [
        {
          term: "Dawi",
          explanation:
            "Traditional Mizo term for mystical charms, incantations, and folkloric magic.",
        },
        {
          term: "Keichala",
          explanation:
            "Lalruanga's iconic shapeshifting adversary capable of assuming the form of a fierce tiger.",
        },
      ],
    },
  },
  {
    id: "rimenhawihi",
    accessionNumber: "THW.10",
    theme: "love",
    readingMinutes: 5,
    originNote: {
      mz: "Mamit Tlangram & Rimenhawihi Lungkulh",
      en: "Lushai Romantic Legend",
    },
    characters: ["Rimenhawihi", "Zawlthlia", "Tuihual"],
    imageUrl: "/src/assets/images/tale_rimenhawihi_1794734006196.jpg",
    imageCaption: {
      mz: "Fig. 10 — Rimenhawihi a tuikhur mawi leh a sam sei tak nen, Zawlthlia lo kal lai.",
      en: "Fig. 10 — Rimenhawihi beside her hillside spring as Zawlthlia approaches along the trail.",
    },
    mizo: {
      title: "Rimenhawihi leh Zawlthlia",
      subtitle: "Sam sei mawi tak, thir in leh Zawlthlia chhanchhuahna kawng",
      summary:
        "Nula hmelṭha leh sam sei mawi ber Rimenhawihi chu a samzai khat lek tuia a len bo aṭangin ral lianin an rawn zawng chhuak a; a pasal Zawlthlia chuan hmangaihna nen a rawn chhanchhuak leh ta a ni.",
      pullQuote:
        "\"A samzai mawi tak pakhat pawh lui tui luangah chuan thilmak leh hriatrengna kengtu a ni ṭhin.\"",
      paragraphs: [
        "Mizo thawnthua hmeichhe hmelṭha leh sam sei mawi bera sawi ṭhin chu Rimenhawihi a ni. A sam dum hlap, hniak leh ngum thleng rawk khawpa sei leh tle sar mai vang hian 'Rimenhawihi' tih hming pawh hi a pu hial a ni.",
        "A pasal hmangaih tak Zawlthlia nen in khawsa in, hmun fal leh him takah thir in anga nghetah an cheng dun a, tuikhur thianghlim tak a nei bawk. Mahse tum khat chu tuikhurah a inbual laiin a samzai pakhat a tla palh a, chu samzai chu luiah a luang thla ta zel a ni.",
        "Lui mawng lama khaw dang lal emaw thil tihtheihna nei Tuihual te chuan chu samzai sei leh mawi mak tak chu an lo chhar a, a neitu nula hmelṭhat turzia chu hriain an rawn zawng chhuak a, Rimenhawihi chu an hruai bo ta daih mai.",
        "Zawlthlia chuan a nupui bo thu a hriat veleh chawl lovin a zawng chhuak ve nghal a. Kawng khirh leh harsatna tam tak paltlangin, Rimenhawihi sam sei tak leh a chhinchhiahna hmangin a awmna hmun a thleng a, a nupui chu a rawn hruai haw leh ta a ni.",
        "Vawiin thleng hian Mizoram Mamit district chhungah 'Rimenhawihi Lungkulh' tih hmun te pawh hmuh tur leh sawi zui tur a la awm reng a ni.",
      ],
      moral:
        "Hmelṭhatna leh thil hlu tak te hi venhim uluk a ngai a, hmangaihna dik tak chuan harsatna paltlangin a zawng chhuak leh ngei ṭhin.",
      culturalNotes: [
        {
          term: "Rimenhawihi Lungkulh",
          explanation:
            "Mizoram Mamit district-a lungpui hmingthang, he thawnthu nena thlunzawm tlat hmun.",
        },
        {
          term: "Tuikhur",
          explanation:
            "Tlangrama tui chhunchhuahna hmun thianghlim leh khaw mite intawhkhawmna.",
        },
      ],
    },
    english: {
      title: "Rimenhawihi and Zawlthlia",
      subtitle: "The maiden of peerless hair, the iron dwelling, and a husband's pursuit",
      summary:
        "Often called the Mizo Rapunzel, Rimenhawihi was renowned across the hills for her lustrous, ankle-length hair—until a single floating strand betrayed her hidden spring to a distant abductor.",
      pullQuote:
        "\"A single strand drifting downstream carried her secret farther than any drumbeat across the hills.\"",
      paragraphs: [
        "Across Mizo lore, Rimenhawihi's name is inseparable from unmatched grace and extraordinary hair—thick, dark, and lustrous enough to shimmer like running stream water. She lived in quiet devotion with her husband Zawlthlia beside a clear forest spring and a dwelling remembered in legend as strong as iron.",
        "One morning while washing her hair beside the stone spring, a single long strand slipped away and floated downstream. Carried miles below to a distant settlement, the strand caught the eye of a covetous ruler, who reasoned that the woman bearing such hair must surpass all others in beauty.",
        "Tracing the river upstream to the hills, raiders seized Rimenhawihi while Zawlthlia was away, Spiriting her across rugged valleys. Returning to find the spring silent, Zawlthlia set out immediately along the trail.",
        "Guided by clues and Rimenhawihi's own resourcefulness, Zawlthlia reached the distant stronghold, outmaneuvered her captors, and brought his beloved back to the familiar spring.",
        "Even today, rocky landmarks in Mizoram—such as *Rimenhawihi Lungkulh* in Mamit district—preserve her memory in the living landscape.",
      ],
      moral:
        "True devotion refuses to abandon what is precious; constancy sees every search through to its end.",
      culturalNotes: [
        {
          term: "Rimenhawihi Lungkulh",
          explanation:
            "A well-known rock landmark in Mamit district, Mizoram, tied by local tradition to Rimenhawihi's legend.",
        },
        {
          term: "Tuikhur",
          explanation:
            "A natural hillside spring channeled with stone or bamboo, vital to every Mizo settlement.",
        },
      ],
    },
  },
  {
    id: "sichangneii",
    accessionNumber: "THW.11",
    theme: "spirits",
    readingMinutes: 5,
    originNote: {
      mz: "Van Nula leh Lei Tlangval Thawnthu",
      en: "Sky-Maiden Oral Legend",
    },
    characters: ["Sichangneii", "Lei Tlangval", "Van Lal"],
    imageUrl: "/src/assets/images/tale_sichangneii_1794734007021.jpg",
    imageCaption: {
      mz: "Fig. 11 — Sichangneii chhum zing aṭanga tui inbual tura rawn chhuk lai.",
      en: "Fig. 11 — Celestial maiden Sichangneii descending upon moonlit clouds to the emerald pool.",
    },
    mizo: {
      title: "Sichangneii",
      subtitle: "Van nula tlangram dila rawn chhuk leh lei leh van inkar thuruk",
      summary:
        "Van aṭanga nula hmelṭha Sichangneii chu ramhnuaia dil thianghlimah inbual turin a rawn chhuk ṭhin a; lei tlangval pakhatin a lo chan fuh hnuin van leh lei inkar hmangaihna thawnthu a lo chhuak ta a ni.",
      pullQuote:
        "\"Chhum kar aṭanga lo chhuk nula chu lei mite tan pawh a mawiin a thianghlim bik em em a ni.\"",
      paragraphs: [
        "Hmanlaiin van aṭangin nula hmelṭha tak, a hming Sichangneii an tih leh a ṭhiante hi tlangram ramhnuai reh taka dil thianghlimah inbual turin an rawn chhuk ṭhin a. An thlawh theihna kawr emaw puan mawi tak chu dil kam lung chungah an dah a, tui an cheng ṭhin a ni.",
        "Chu dil bula ram kal tlangval pakhat chuan mak ti takin a lo hmu fuh ta hlauh mai a. Sichangneii hmelṭhatna chuan a rilru a luah khat tlat mai a, a rukin dil kamah a chang a, Sichangneii thlawh theihna puan chu a thuhruk sak ta a.",
        "Tui an inbual zawh chuan a ṭhiante zawng zawng vanah an thlawk chho leh vek a, Sichangneii erawh chuan a puan a hmuh zawh tak loh avangin leiah a tang ta tlat mai. Tlangval chu lo chhuakin a khawngaih emaw a hmangaih thu hrilhin a inah a hruai haw ta a.",
        "Kum engemaw zat lei khawvelah hlim takin an cheng dun a, fa pawh an nei hial a. Mahse Sichangneii chuan van lam leh a chhungte a ngaihna a reh thei lo; tawpah chuan a puan thuhruk a hmu chhuak leh a, van lamah a kir chho leh ta a ni.",
        "He thawnthu hian mihringte leh thlarau khawvel inkar hmangaihna leh van lam ngaihna thuk tak a tarlang mawi hle a ni.",
      ],
      moral:
        "Thil hlu vawnhim tuma thuhruk leh phuar beh aiin, inzah tawnna leh diknaa inkungkaihna hian hlimna nghet zawk a siam.",
      culturalNotes: [
        {
          term: "Van Nula",
          explanation:
            "Mizo leh Asia chhak folklore tam taka van aṭanga rawn chhuk thlarau nula hmelṭhate.",
        },
        {
          term: "Dil Thianghlim",
          explanation:
            "Tlang sang leh ramhnuai chhunga lui emaw dil reh tak, thlarau chengna hmuna ngaih.",
        },
      ],
    },
    english: {
      title: "Sichangneii",
      subtitle: "The sky maiden at the hidden pool and the bridge between earth and heaven",
      summary:
        "Descending on clouds to bathe in a secluded Lushai mountain pool, celestial maiden Sichangneii is held on earth when a young hunter hides her winged robe—beginning a bittersweet tale of two worlds.",
      pullQuote:
        "\"A creature of the clouds may walk the mountain trails for a season, yet her eyes still turn upward at twilight.\"",
      paragraphs: [
        "Deep within an untouched mountain hollow lay an emerald pool known only to the birds and ferns. Elders tell that celestial maidens from the sky realm—among them the radiant Sichangneii—would descend on soft clouds to bathe in its cool waters, folding their sky-robes neatly upon the mossy stones.",
        "One afternoon, a solitary hunter chanced upon the pool and watched in breathless wonder. Enchanted by Sichangneii's grace, he crept forward while she swam and hid her shimmering sky-garment beneath a hollow tree root.",
        "When dusk arrived, her companions donned their robes and rose swiftly into the mist, leaving Sichangneii stranded on the shore. Stepping gently from the ferns, the hunter offered her shelter in his village hearth, and in time they built a home together.",
        "Though Sichangneii cared deeply for her earthly household and child, a quiet homesickness for the upper sky never left her gaze. Years later, she uncovered the hidden robe and ascended once more above the ridges, leaving behind a story remembered whenever mist rises off mountain lakes.",
        "Shared across generations, Sichangneii's legend weaves Mizo wonder at mountain skies with universal themes of longing and freedom.",
      ],
      moral:
        "Love cannot truly hold what must be kept by concealment; respect for another's true nature is the soul of devotion.",
      culturalNotes: [
        {
          term: "Sky Robe",
          explanation:
            "The woven celestial garment that grants Sichangneii flight between the mountain pools and the heavens.",
        },
        {
          term: "Mountain Dil",
          explanation:
            "Highland natural lakes and pools in Mizoram often regarded in folklore as spirit thresholds.",
        },
      ],
    },
  },
  {
    id: "nuchhimi",
    accessionNumber: "THW.12",
    theme: "heroic",
    readingMinutes: 5,
    originNote: {
      mz: "Hmuichukchuruduninu Thawnthu",
      en: "Classic Cautionary & Heroic Tale",
    },
    characters: ["Nuchhimi", "A Nau", "Hmuichukchuruduninu", "Sakei / Thian"],
    imageUrl: "/src/assets/images/tale_nuchhimi_1794734008193.jpg",
    imageCaption: {
      mz: "Fig. 12 — Nuchhimi kawngpui penga kal lai leh Hmuichukchuruduninu thla lang.",
      en: "Fig. 12 — Nuchhimi at the bamboo crossroads under the watchful eye of Hmuichukchuruduninu.",
    },
    mizo: {
      title: "Nuchhimi leh Hmuichukchuruduninu",
      subtitle: "Hmui zum hlauhawm bumna, phuba lakna leh unau hmangaihna",
      summary:
        "An nî sa pe tura kal Nuchhimi te unau chu ramhuai nu hlauhawm Hmuichukchuruduninu-in kawng a thlak sak avangin an kal sual a; Nuchhimi chuan a nau phuba la turin finthiamna hmangin a hneh ta a ni.",
      pullQuote:
        "\"I nau thluak i ei a ni maw? Ngawi tak rawh, ka finna hian i hmui zum chu ka tihtawp sak ngei ang.\"",
      paragraphs: [
        "Hmanlaiin nula fel tak Nuchhimi leh a nau te hi an awm a. Nikhat chu an nî hnenah sa pe turin ramhnuaiah kawng an zawh a. An kal hmain an chhungten, 'Kawng pengah khan hrui thlunna a awm ang a, chumi zawk chu zawh zel rawh u,' tiin an hrilh a.",
        "Mahse ramhnuaia cheng ramhuai nu rapthlak tak, hmui zum leh sei em em nei—'Hmuichukchuruduninu' an tih chuan a lo hre ru vek a. Nuchhimi te unau kawng thlak turin hrui thlunna chu a in lamah a sawn sak ta daih mai a!",
        "Unau pahnih chuan hre lovin Hmuichukchuruduninu in chu an thleng fuh palh ta a. Chu ramhuai nu chuan vervek takin a lo lawm der a, zanah chuan Nuchhimi nau muhil lai chu a hmui zum tak chuan a thluak a hip chhuah sak ta mai a ni.",
        "Nuchhimi chuan hlau viau mah se rilru fim a pu tlat a, in chhung aṭangin a tlan chhuak thei ta hram a. A hnuah ṭhian ṭha te leh ramsa finna puihna hmangin thang hlauhawm a kam a, Hmuichukchuruduninu chu a bum lut a, a nau phuba a la ta vek a ni.",
        "He thawnthu hian naupangte hnenah kalkawng fimkhur pawimawhzia leh harsatna hlauhawm ber karah pawh rilru fim put hlutna a zirtir ṭhin.",
      ],
      moral:
        "Hlauhawm leh bumna hmachhawn hunah chiai mai lovin, rilru fim leh finna hmangin harsatna a hneh theih a ni.",
      culturalNotes: [
        {
          term: "Hmuichukchuruduninu",
          explanation:
            "Mizo thawnthua hmui zum sei tak nei ramhuai nu hlauhawm, naupangte tana fimkhur zirtirna.",
        },
        {
          term: "Kawng Peng",
          explanation:
            "Ramhnuai kalkawng insualna, hmanlai zin mite tan hnah leh hruia chhinchhiahna siamna hmun.",
        },
      ],
    },
    english: {
      title: "Nuchhimi and Hmuichukchuruduninu",
      subtitle: "The switched forest trail and a brave sister's cunning triumph",
      summary:
        "When the feared sharp-beaked forest ogress Hmuichukchuruduninu alters a trail marker to lure Nuchhimi and her little sibling into her hut, Nuchhimi summons remarkable courage and wit to defeat the monster.",
      pullQuote:
        "\"Even the sharpest beak in the deep bamboo cannot outmatch a sister's steady resolve.\"",
      paragraphs: [
        "Set out on an errand to bring meat to their aunt across the hills, young Nuchhimi and her younger sibling followed careful directions given by their elders: 'At the forest fork, follow the path marked with freshly tied vines.'",
        "Unknown to them, *Hmuichukchuruduninu*—a terrifying forest ogress with a needle-sharp beak—overheard the instruction. Slipping quietly to the crossroads, the ogress moved the vine marker onto the trail leading straight to her own secluded hut.",
        "Misled by the altered sign, the siblings stepped into danger at twilight. Pretending hospitality, the ogress waited until nightfall and struck the younger child. Though grief and terror seized Nuchhimi, she refused to freeze; seizing a chance before dawn, she escaped back down the ridge.",
        "Determined to stop the monster from harming anyone else, Nuchhimi enlisted clever allies and devised an ingenious trap around the ogress's hearth, outsmarting *Hmuichukchuruduninu* and ending her reign of terror.",
        "For generations, elders told Nuchhimi's story beside evening fires—teaching children both vigilance on jungle trails and unbreakable presence of mind.",
      ],
      moral:
        "Courage is not the absence of fear, but keeping a clear head and finding strength to act when danger strikes.",
      culturalNotes: [
        {
          term: "Hmuichukchuruduninu",
          explanation:
            "One of Mizo folklore's most famous ogresses, known for her long, pointed beak and cunning disguises.",
        },
        {
          term: "Trail Markers",
          explanation:
            "Knotted reeds or bent twigs traditionally placed by Mizo travelers to guide kin safely through dense bamboo forests.",
        },
      ],
    },
  },
  {
    id: "tlingi-leh-ngama",
    accessionNumber: "THW.13",
    theme: "love",
    readingMinutes: 5,
    originNote: {
      mz: "Mizo Hmangaihna leh Mitthi Khua Thawnthu",
      en: "Mizo Ballad of Devotion",
    },
    characters: ["Tlingi", "Ngama"],
    imageUrl: "/src/assets/images/tale_tlingi_ngama_1794734008419.jpg",
    imageCaption: {
      mz: "Fig. 13 — Tlingi leh Ngama arsi eng hnuaia tlang dungah an kal dun lai.",
      en: "Fig. 13 — Tlingi and Ngama walking together in Pawndum shawls along the lantern-lit ridge.",
    },
    mizo: {
      title: "Tlingi leh Ngama",
      subtitle: "Lunglenna thuk tak leh thlarau khawvela intawhkhawm lehna",
      summary:
        "Indona leh harsatna avanga inhmu thei lo Tlingi leh Ngama te hmangaihna chu lei khawvel piah lam thlarau khua thlenga intawhkhawm lehna thawnthu lungkuai tak a ni.",
      pullQuote:
        "\"Lei hringnunah inthen rih mah ila, thlarau khawvel piah lamah chuan ka zui zel ang che.\"",
      paragraphs: [
        "Hmanlai Mizo khawtlangah Tlingi leh Ngama te hi nula leh tlangval inhmangaih em em an ni a. Khaw hrang ve ve emaw chhungkaw buaina avangin zalen takin an inhmu reng thei lo va, hmun biru leh tlang dung reh takah an intawng ru ṭhin.",
        "Tum khat chu an inhmuh tumna hmunah Ngama chu ral leh harsatna dang avangin a kal hlei thei ta lo va. Tlingi chuan ni tam tak beiseina nen a lo nghak reng a, a lunglen leh ngaih lutukna avangin a hriselna a tla hniam a, khawvel a chhuahsan hial ta mai a ni.",
        "Ngama'n Tlingi thih thu a hriat chuan a thinlung a keh sawm vek a. Tlingi thlan chu tlawh ziahin Pawndum nen a ṭap tlaivar fo va, Tlingi tel lova lei khawvela nun hman chu harsa a ti em em a ni.",
        "Mizo thawnthu hlui sawi dan chuan, thihna hian an hmangaihna a tihtawp sak thei lo va, mitthi khua (thlarau khawvel) lamah an intawng leh a, hmun nuam leh hlimawm takah an cheng dun leh ta e, an ti ṭhin.",
        "Tlingi leh Ngama thawnthu hi hmanlai Mizoten thlarau dam chhunzawm zel rinna leh hmangaihna tawp nei lo an ngaihsan zia tarlangtu ropui tak a ni.",
      ],
      moral:
        "Inhmangaihte inkar thu tiam leh inngaihsakna hi thil hlu ber a ni a; hmangaihna dik chuan hun leh hmun a pel ṭhin.",
      culturalNotes: [
        {
          term: "Mitthi Khua",
          explanation:
            "Hmanlai Mizo sakhua leh thawnthua mihring thlaraute kalna hmun (land of the departed).",
        },
        {
          term: "Lunglen Hla",
          explanation:
            "Inngaihna leh inṭhenna lungkuai tak puang chhuaktu Mizo hla hlui.",
        },
      ],
    },
    english: {
      title: "Tlingi and Ngama",
      subtitle: "Secret meetings on the ridge and devotion crossing into Mitthi Khua",
      summary:
        "Kept apart by village feuds and distance, lovers Tlingi and Ngama share a bond so deep that Ngama refuses to let even death divide them—seeking reunion beyond the threshold of Mitthi Khua.",
      pullQuote:
        "\"Even across the quiet ridge of the departed, a faithful heart remembers the path home.\"",
      paragraphs: [
        "In an age when neighboring hill settlements lived under constant watch for raids, young Tlingi and Ngama pledged their hearts in secret. Unable to court openly, they met beneath the shadow of tall ridges and slender mountain trails whenever duty allowed.",
        "One season, conflict and rugged distance delayed Ngama far longer than expected. Day after day, Tlingi waited at their quiet lookout, until sorrow and longing wore down her strength and she passed away before his return.",
        "When Ngama learned of her passing, grief darkened his days. Wearing a traditional *Pawndum* shawl, he lingered beside her hillside resting place, singing laments across the mist until he resolved to follow her spirit beyond the mortal world.",
        "In the tender telling of Mizo elders, their story does not end in darkness: across the threshold of *Mitthi Khua*, the realm of departed souls, Ngama sought out Tlingi once more, and the pair walked together beneath peaceful stars.",
        "Remembered alongside Tualvungi and Zawlpala, Tlingi and Ngama reflect ancient Mizo beliefs in an enduring spirit world shaped by memory and love.",
      ],
      moral:
        "True affection leaves an imprint deeper than fear or separation, remembered across generations in song.",
      culturalNotes: [
        {
          term: "Mitthi Khua",
          explanation:
            "In pre-Christian Mizo belief, the spirit village where departed souls journey after earthly life.",
        },
        {
          term: "Lunglen",
          explanation:
            "A distinctively deep Mizo word capturing bittersweet longing, homesickness, and tender sorrow.",
        },
      ],
    },
  },
  {
    id: "thlanrawkpa-khuangchawi",
    accessionNumber: "THW.14",
    theme: "spirits",
    readingMinutes: 5,
    originNote: {
      mz: "Nungcha leh Thil Pian Chhan Thawnthu",
      en: "Mizo Origin & Animal Fable",
    },
    characters: ["Thlanrawkpa", "Vahrit", "Zawng", "Sanghal", "Sazuk"],
    imageUrl: "/src/assets/images/tale_thlanrawkpa_1794734009003.jpg",
    imageCaption: {
      mz: "Fig. 14 — Thlanrawkpa Khuangchawi ruai ropuia nungcha zawng zawng an punkhawm lai.",
      en: "Fig. 14 — Forest creatures gathering around Thlanrawkpa's ceremonial Khuangchawi drum.",
    },
    mizo: {
      title: "Thlanrawkpa Khuangchawi",
      subtitle: "Ramsa leh sava zawng zawng intawhkhawmna ruai ropui leh an pian dan",
      summary:
        "Mi ropui Thlanrawkpan Khuangchawi ruai lian tak a buatsaihah ramsa leh sava tinreng an rawn tel a; chumi ni aṭanga ramsa leh savate chetzia leh hmel pian chhan thawnthu mak tak a lo piang ta a ni.",
      pullQuote:
        "\"Ruai ropui khuang riin tlang leh ruam a nghawr vel laiin, nungcha zawng zawngte chu inrem takin an lam ho va.\"",
      paragraphs: [
        "Hmanlai Mizo khawtlangah chuan 'Khuangchawi' hi mi hausa leh thilphal berte tih theih, ruai ropui leh chawimawina sang ber a ni. Thlanrawkpa hi mi hausa leh ropui tak a ni a, thil nung zawng zawng—mihring chauh ni lo, ramsa leh sava tinrengte pawh—a Khuangchawi ruaiah a sawm vek mai a ni.",
        "Chumi ni chuan tlangram aṭangin Sazuk, Sanghal, Zawng, Vahrit (hornbill), Sihal leh nungcha chi tinreng chu hlim takin Thlanrawkpa mualah an lo kalkhawm a. Khuang leh dar ri mawi tak karah an lam suau suau mai a ni.",
        "Thawnthu hlui sawi dan chuan, chumi ruai hlimawm tak karah chuan nungchate zingah thilmak leh fiamthu tam tak a lo thleng a—sava ṭhenkhat rawng mawi tak an neih dan te, zawng leh sanghalte chetzia mak danglam tak te chu he ni aṭanga inṭan anga sawi a ni fo.",
        "Mahse thilmak kalhmangah buaina emaw thim (eclipse / thim hlim) emaw thil danglam tak a lo thlen thut avangin ruai chu chawpchilh takin a tawp a, nungchate chu an hmanhmawh leh chiai lutukna lamah an hmel leh pianphung nghet an pu hlen ta e, an ti ṭhin.",
        "He thawnthu hian hmanlai Mizoten khawtlang ruai (Feasts of Merit) an hlutzia leh ramsa nungchate chanchin hmuhnawm taka an phuah chhuah thiamzia a tarlang chiang hle.",
      ],
      moral:
        "Ruai ṭheh leh thilphalna hian khawtlang leh nungcha zawng zawng inremna a siam a; thil nung tinreng hian nihphung leh hlutna hran ṭheuh kan nei.",
      culturalNotes: [
        {
          term: "Khuangchawi",
          explanation:
            "Hmanlai Mizote chawimawina sang ber (Feast of Merit), khuang nen mipui tam tak ruai buatsaih sakna.",
        },
        {
          term: "Thim",
          explanation:
            "Thawnthua thil nungte hmanhmawh taka an darh phahna khawthim mak tak (mythic darkness).",
        },
      ],
    },
    english: {
      title: "Thlanrawkpa's Khuangchawi",
      subtitle: "The grand Feast of Merit where all forest beasts danced beneath the pines",
      summary:
        "When the noble Thlanrawkpa hosted a legendary Khuangchawi festival open to every living creature, hornbills, monkeys, boars, and deer gathered in harmony—giving rise to classic Mizo origin stories of how animals gained their traits.",
      pullQuote:
        "\"When the ceremonial drum echoed across the courtyard, antlers, wings, and villagers stepped to a single joyful beat.\"",
      paragraphs: [
        "In old Mizo society, the *Khuangchawi* stood as the pinnacle of generosity—a grand Feast of Merit hosted by a wealthy benefactor who shared abundance with the entire community. Legend tells of Thlanrawkpa, whose feast was so vast that he invited not only villagers, but every bird and beast across the Lushai hills.",
        "From misty pine ridges and bamboo valleys they came: great hornbills gleaming in black and ivory, barking deer, chattering monkeys, and wild boars—all mingling peacefully around the ceremonial platform while gongs and drums rang out.",
        "During the celebration, playful contests and dances broke out among the creatures. Elders used this joyful gathering to explain why certain birds wore bright crests, why monkeys moved with restless curiosity, and how distinct markings appeared on forest animals.",
        "According to ancient lore, a sudden mythic darkness swept over the sky mid-feast; scrambling homeward in the unexpected gloom, each creature carried away the quirks and traits it wears to this very day.",
        "Thlanrawkpa's Khuangchawi remains one of the richest bridges between Mizo ceremonial heritage and playful ecological storytelling.",
      ],
      moral:
        "Generosity creates a table wide enough for every neighbor, and wonder at the natural world binds community and forest together.",
      culturalNotes: [
        {
          term: "Khuangchawi",
          explanation:
            "The highest traditional Mizo Feast of Merit, celebrating prosperity through open-handed hospitality and ceremonial drumming.",
        },
        {
          term: "Vahrit",
          explanation:
            "The majestic hornbill of Mizoram's forests, prized in oral tales and ceremonial regalia.",
        },
      ],
    },
  },
  {
    id: "chawngtinleri",
    accessionNumber: "THW.15",
    theme: "spirits",
    readingMinutes: 5,
    originNote: {
      mz: "Seipui, Tan Tlang leh Buannel Thawnthu",
      en: "Lasi Spirit Lore",
    },
    characters: ["Chawngtinleri", "Lalchungnunga (Lasi Lal)", "Liana"],
    imageUrl: "/src/assets/images/tale_chawngtinleri_1794734009287.jpg",
    imageCaption: {
      mz: "Fig. 15 — Chawngtinleri, Lasi Lalnu, Buannel hmunah ram sate nena an awm lai.",
      en: "Fig. 15 — Chawngtinleri, Queen of the Lasi, tending wild deer and mountain goats in Buannel.",
    },
    mizo: {
      title: "Chawngtinleri (Lasi Lalnu)",
      subtitle: "Seipui nula hmelṭha leh Tan Tlang & Buannel ram sa enkawltu Lasi Lalnu",
      summary:
        "Seipui khuaa nula hmelṭha Chawngtinleri chu Lasi lal Lalchungnunga'n Tan Tlang leh Buannel ram sa zawng zawng enkawltu Lasi Lalnu atan a hruai chho va; pasalthaten sa kah an dilna ber a lo ni ta a ni.",
      pullQuote:
        "\"Buannel phai zawla ram sa zawng zawngte hi Lasi Lalnu venhimna hnuaia khawsa an ni ṭhin.\"",
      paragraphs: [
        "Mizo sakhaw hlui leh thawnthua hming lar leh zahawm ber pawl chu Chawngtinleri—'Lasi Lalnu' tiin an ko ṭhin. A hming tak chuan Seipui khuaa mihring nula hmelṭha leh fel tak a ni a, unaupa Liana a nei bawk.",
        "A hmelṭhatna leh nungchang mawina chu ramhnuaia thlarau thianghlim Lasi lal, Lalchungnunga'n a hmu fuh a. Tichuan Tan Tlang leh Buannel ram mawi taka ram sa zawng zawngte vawngtu leh enkawltu Lasi Lalnu atan a hruai chho ta a ni.",
        "Chawngtinleri chu a tirah chuan a unaupa Liana leh mihring khawvel ngaiin a ṭap reng ṭhin. Chuvang chuan Lasi te chuan a mit chu mihring khawvel a ngaih tawh loh nan an tihdanglam sak e, tiin thawnthu hlui thenkhat chuan an sawi ṭhin.",
        "Chuta ṭang chuan Chawngtinleri chu ram sa tinreng—sazuk, sathar, sanghal leh sa chi tinreng—enkawltu leh venghimtu a lo ni ta a. Hmanlai Mizo pasaltha huaisenten ram an chhuah dawnin Lasi Lalnu khawngaihna leh phalna an dil hmasa ṭhin a ni.",
        "Chawngtinleri thawnthu hian hmanlai Mizoten ramngaw leh nungchate humhalh dan leh ram sa chungah zahna rilru an put nasatzia a tarlang mawi hle.",
      ],
      moral:
        "Ramngaw leh ram sate hi enkawl leh zah tur thil an ni a; khawvel nungchate nena inrem taka khawsak hi mihring mawhphurhna a ni.",
      culturalNotes: [
        {
          term: "Lasi",
          explanation:
            "Mizo thawnthua ramngaw leh ram sa zawng zawng vawngtu thlarau thianghlim.",
        },
        {
          term: "Tan Tlang & Buannel",
          explanation:
            "Mizoram hmar-chhak lama tlang leh phai hmingthang, Lasi hote chengna hmuna ngaih.",
        },
      ],
    },
    english: {
      title: "Chawngtinleri, Queen of the Lasi",
      subtitle: "From Seipui village to the misty meadows of Tan Tlang and Buannel",
      summary:
        "Once a mortal woman of Seipui village, Chawngtinleri was chosen by Lalchungnunga, King of the Lasi spirits, to rule over Tan Tlang and Buannel as guardian of all wild creatures.",
      pullQuote:
        "\"No hunter's arrow flies truly across Buannel unless the Queen of the Lasi smiles upon the ridge.\"",
      paragraphs: [
        "In pre-Christian Mizo lore, no guardian spirit commanded greater reverence among hunters than Chawngtinleri, the Queen of the *Lasi*—the benevolent spirits governing wild forests and mountain game. Yet elders recall that she began life as a mortal maiden of rare grace in the historic village of Seipui.",
        "Her gentle bearing drew the gaze of Lalchungnunga, King of the *Lasi*, who dwelled among the lofty cliffs of Tan Tlang. Chosen to become sovereign over the forest spirits, Chawngtinleri was led away to the verdant highland meadows of *Buannel*, the fabled sanctuary where wild deer, serow, and mountain beasts were born and sheltered.",
        "At first, Chawngtinleri wept continuously out of homesickness for her mortal brother Liana and the familiar smoke of Seipui hearths. Tradition tells that the spirits gently altered her sight so she could watch calmly over the endless flocks of the hills without aching for the valley below.",
        "From her misty throne in *Buannel*, Chawngtinleri tended every creature of the ridges, granting blessings to respectful *pasaltha* hunters who honored forest customs and punishing reckless greed.",
        "Her legend reveals how deeply ancestral Mizo culture wove conservation, awe of wild mountains, and spiritual stewardship into everyday life.",
      ],
      moral:
        "The wild forest is not merely timber and quarry—it is a living sanctuary deserving restraint and respect.",
      culturalNotes: [
        {
          term: "Lasi",
          explanation:
            "Benevolent forest spirits in Mizo mythology believed to shepherd and protect all wild animals.",
        },
        {
          term: "Buannel & Tan Tlang",
          explanation:
            "Sacred highlands in eastern Mizoram celebrated in folklore as the heartland of the Lasi.",
        },
      ],
    },
  },
  {
    id: "mualzavata",
    accessionNumber: "THW.16",
    theme: "heroic",
    readingMinutes: 4,
    originNote: {
      mz: "Mizo Mi Chak Ropui Thawnthu",
      en: "Heroic Strongman Legend",
    },
    characters: ["Mualzavata", "A Nupui", "Khaw Mite"],
    imageUrl: "/src/assets/images/tale_mualzavata_1794734010161.jpg",
    imageCaption: {
      mz: "Fig. 16 — Mualzavata thingtuai lian tak awlsam taka a pu lai.",
      en: "Fig. 16 — Legendary strongman Mualzavata carrying a massive jungle timber across the terraced hills.",
    },
    mizo: {
      title: "Mualzavata",
      subtitle: "Tlang za khat pawh hlo thlo fai thei chakna mak leh ropui",
      summary:
        "Mizo thawnthua mi chak ropui (pachak) Mualzavata leh a nupui te chanchin—ni khat thil thua tlang mual za hlo thlo fai thei khawpa thawhrimna leh chakna mak nei an ni.",
      pullQuote:
        "\"Mi dangin thla khat chhunga an thawh zawh loh kha, Mualzavata te chuan ni khat chhungin an zo der ṭhin.\"",
      paragraphs: [
        "Hmanlai Mizo thawnthua mi chak leh taima ber anga sawi ṭhin chu Mualzavata a ni. A hming pawh hi 'mual za vat'—tlang mual za khat pawh ni khat emaw hun tawi te chhunga vat fai vek thei—tih aṭanga lo chhuak a ni e, tiin upaten an hrilhfiah ṭhin.",
        "Mualzavata chauh ni lo, a nupui pawh chu mi chak leh taima danglam tak a ni ve bawk. Mi pangngai za rualin an vaha an thlawh zawh hlei theih loh lo zau pui puite chu, an nupa chuan thawk rim takin awlsam tein an thlo fai zung zung mai ṭhin a ni.",
        "Khawtlang mite tan chuan Mualzavata chakna leh hnathawh theihzia chu mak tih rawn leh ngaihsan rawn a ni a. Thingtuai lian pui pui, mi sawm rual pawhin an zawn zo loh turte kha dar khing khatin a pu nawlh nawlh mai ṭhin, tiin an sawi uar ṭhin.",
        "Mahse a chakna ropui tak karah pawh tlawmngaihna leh mi retheite ṭanpuina kawngah a hmang ṭangkai ṭhin a, khawtlang harsatna thlen changa hmahruaitu rintlak a ni.",
        "Mualzavata thawnthu hian hmanlai Mizoten kut hnathawh, thawhrimna leh taksa hrisel chakna an ngaihsan zia chiang takin a lantir a ni.",
      ],
      moral:
        "Chakna leh thawhrimna hi khawtlang leh chhungkaw tana thil ṭha thlen nana hman hian mihring a tiropui ber ṭhin.",
      culturalNotes: [
        {
          term: "Mualzavata Hming Awmzia",
          explanation:
            "'Mual' (tlang dung), 'Za' (hundred), 'Vat' (lo vah/clear)—mual za vat fai thei tihna.",
        },
        {
          term: "Pachak",
          explanation:
            "Mizo khawtlanga mi chak chungchuang leh taima bika hriat te.",
        },
      ],
    },
    english: {
      title: "Mualzavata",
      subtitle: "The legendary strongman whose labor spanned a hundred mountain ridges",
      summary:
        "Celebrated across Lushai lore as a titan of strength and diligence, Mualzavata—whose name means 'Clearer of a Hundred Ridges'—could lift giant timbers alone and clear vast hill fields with his equally formidable wife.",
      pullQuote:
        "\"Where twenty villagers strained beneath a fallen trunk, Mualzavata hoisted it lightly upon one shoulder at sunrise.\"",
      paragraphs: [
        "Among Mizo folk heroes remembered for sheer physical prowess, none stands taller than Mualzavata. His very name honors a feat of staggering energy: *mual* (ridge), *za* (a hundred), and *vat* (to clear the jungle slopes)—one capable of clearing a hundred hillsides.",
        "Tales describe how Mualzavata and his equally stout-hearted wife worked side by side at a pace that left entire settlements breathless. Fields that took dozens of neighbors weeks to weed were swept clean by the couple before evening mist settled into the valleys.",
        "When storm-felled giant trees blocked trails or massive house posts were needed for the chief's courtyard or *Zawlbuk*, villagers called upon Mualzavata, who shouldered immense trunks as effortlessly as dry bamboo.",
        "Yet elders tell that his strength earned admiration not through bullying, but because he turned mighty labor toward building, clearing, and steadying his village in times of toil.",
        "In Mizo oral memory, Mualzavata stands as a joyful tribute to endurance, rural pride, and strength placed in service of the community.",
      ],
      moral:
        "True strength shines brightest when paired with steady labor and used to lift the burden of one's neighbors.",
      culturalNotes: [
        {
          term: "Mualzavata",
          explanation:
            "Literally 'One who clears a hundred ridges'—an emblem of heroic swidden labor and mythic strength.",
        },
        {
          term: "Pachak",
          explanation:
            "A traditional Mizo title for an extraordinary strongman celebrated in village memory.",
        },
      ],
    },
  },
];

export const FOLKTALES: Folktale[] = [...BASE_FOLKTALES, ...MORE_FOLKTALES];

export const ORAL_PROMPT_SUGGESTIONS: OralPromptSuggestion[] = [
  {
    id: "all-tales",
    mizoTitle: "Mizo thawnthu i hre vek em?",
    englishTitle: "How vast are Mizo folktales?",
    mizoPrompt:
      "Mizo thawnthu hluite hi a tam hle a! Library-a thawnthu 42 te bakah hmanlai chanchin, hla phuahtu hmingthang (Saikuti, Lianchhiari, Darpawngi) leh khaw hrang hrang thawnthu dang engte nge la awm?",
    englishPrompt:
      "Beyond the 42 curated tales in this library, what other lesser-known Mizo village legends, ballads, and regional folk cycles exist?",
    category: { mz: "Hmelhriattirna", en: "Overview" },
  },
  {
    id: "saikuti",
    mizoTitle: "Saikuti hla leh thawnthu",
    englishTitle: "Poetess Saikuti & her ballads",
    mizoPrompt:
      "Hmanlai Mizo hla phuahtu ropui Saikuti chanchin leh a hla phuah thawnthu min hrilh thei em?",
    englishPrompt:
      "Tell me the story and poetic legacy of Saikuti, one of Mizoram's celebrated early oral poetesses.",
    category: { mz: "Hla Hlui", en: "Oral Poetry" },
  },
  {
    id: "thangzawra",
    mizoTitle: "Thangzawra thawnthu",
    englishTitle: "The folktale of Thangzawra",
    mizoPrompt:
      "Thangzawra thawnthu ngaihnawm tak leh a zirtirna kha a bul aṭangin min hrilh teh.",
    englishPrompt:
      "Recount the traditional Mizo folktale of Thangzawra and its moral lesson.",
    category: { mz: "Khawtlang Nun", en: "Village Lore" },
  },
  {
    id: "tumpangi",
    mizoTitle: "Tumpangi thawnthu",
    englishTitle: "The ballad of Tumpangi",
    mizoPrompt:
      "Hmanlai Mizo thawnthu lar Tumpangi chanchin lungkuai tak kha min hrilh teh.",
    englishPrompt:
      "Share the traditional Mizo story and song of Tumpangi.",
    category: { mz: "Hmangaihna", en: "Romance & Ballad" },
  },
  {
    id: "sakei-leh-hmeithai",
    mizoTitle: "Sakei leh Hmeithai",
    englishTitle: "The Tiger and the Widow",
    mizoPrompt:
      "Sakei leh Hmeithai thawnthu—finna leh huaisenna hmanga sakei a bum dan min hrilh rawh.",
    englishPrompt:
      "Tell the traditional fable of how a clever widow outwitted a prowling tiger.",
    category: { mz: "Ramsa & Finna", en: "Animal Fable" },
  },
  {
    id: "chapchar-mim-kut",
    mizoTitle: "Chapchar Kut & Mim Kut thawnthu",
    englishTitle: "Origins of Chapchar Kut & Mim Kut",
    mizoPrompt:
      "Mizo hmanlai kutpui—Chapchar Kut leh Mim Kut—lo chhuah dan chanchin leh thawnthu min hrilh teh.",
    englishPrompt:
      "Explain the oral legends and origins behind Mizoram's great traditional festivals, Chapchar Kut and Mim Kut.",
    category: { mz: "Hnam Nunphung", en: "Festival Lore" },
  },
];
