/* ============================================================
   MADD LESSON DATA — بيانات دروس المدود
   ============================================================ */

export interface MaddWord {
  word: string;
  meaning: string;
  meaningEn: string;
}

export interface MaddLesson {
  id: string;
  title: string;
  titleEn: string;
  type: "alif" | "waw" | "ya";
  symbol: string;
  description: string;
  descriptionEn: string;
  rule: string;
  ruleEn: string;
  color: string;
  examples: MaddWord[];
  exercises: { prompt: string; promptEn: string; options: string[]; correct: number }[];
}

export const MADD_INTRO = {
  title: "المدود",
  titleEn: "Madd (Long Vowels)",
  description: "المدود هي إطالة الصوت عند النطق. هناك ثلاثة أنواع من المدود",
  descriptionEn: "Madd means stretching the vowel sound when reading. There are 3 types of Madd",
  types: [
    { symbol: "ا", name: "مد بالألف", nameEn: "Madd with Alif", color: "#ef4444", combo: "فتحة + ألف = آ" },
    { symbol: "و", name: "مد بالواو", nameEn: "Madd with Waw", color: "#3b82f6", combo: "ضمة + واو = ـُو" },
    { symbol: "ي", name: "مد بالياء", nameEn: "Madd with Ya", color: "#10b981", combo: "كسرة + ياء = ـِي" },
  ],
};

export const MADD_LESSONS: MaddLesson[] = [
  {
    id: "madd-alif",
    title: "مد بالألف",
    titleEn: "Madd with Alif (aa)",
    type: "alif",
    symbol: "ا",
    description: "عندما يأتي حرف مفتوح (عليه فتحة) وبعده ألف، نمدّ الصوت",
    descriptionEn: "When a letter with Fatha is followed by Alif, we stretch the 'aa' sound",
    rule: "فتحة + ألف = مد بالألف (آ)",
    ruleEn: "Fatha + Alif = Long 'aa' sound",
    color: "#ef4444",
    examples: [
      { word: "بَاب", meaning: "باب", meaningEn: "Door" },
      { word: "كِتَاب", meaning: "كتاب", meaningEn: "Book" },
      { word: "مَاء", meaning: "ماء", meaningEn: "Water" },
      { word: "سَمَاء", meaning: "سماء", meaningEn: "Sky" },
      { word: "نَام", meaning: "نام", meaningEn: "Slept" },
      { word: "قَال", meaning: "قال", meaningEn: "Said" },
      { word: "جَاء", meaning: "جاء", meaningEn: "Came" },
      { word: "دَار", meaning: "دار", meaningEn: "House" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها مد بالألف؟", promptEn: "Which word has Madd with Alif?", options: ["كَتَبَ", "كِتَاب", "كُتُب", "كَاتِب"], correct: 1 },
      { prompt: "ما نوع المد في كلمة بَاب؟", promptEn: "What type of Madd is in بَاب?", options: ["مد بالألف", "مد بالواو", "مد بالياء", "لا يوجد مد"], correct: 0 },
      { prompt: "أي كلمة ليس فيها مد؟", promptEn: "Which word has NO Madd?", options: ["مَاء", "سَمَاء", "شَمْس", "نَام"], correct: 2 },
    ],
  },
  {
    id: "madd-waw",
    title: "مد بالواو",
    titleEn: "Madd with Waw (oo)",
    type: "waw",
    symbol: "و",
    description: "عندما يأتي حرف مضموم (عليه ضمة) وبعده واو ساكنة، نمدّ الصوت",
    descriptionEn: "When a letter with Damma is followed by a silent Waw, we stretch the 'oo' sound",
    rule: "ضمة + واو = مد بالواو (ـُو)",
    ruleEn: "Damma + Waw = Long 'oo' sound",
    color: "#3b82f6",
    examples: [
      { word: "نُور", meaning: "نور", meaningEn: "Light" },
      { word: "سُور", meaning: "سور", meaningEn: "Wall/Fence" },
      { word: "عُود", meaning: "عود", meaningEn: "Stick/Oud" },
      { word: "يَقُول", meaning: "يقول", meaningEn: "He says" },
      { word: "رَسُول", meaning: "رسول", meaningEn: "Messenger" },
      { word: "دُرُوس", meaning: "دروس", meaningEn: "Lessons" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها مد بالواو؟", promptEn: "Which word has Madd with Waw?", options: ["وَلَد", "نُور", "كَوْكَب", "وَعْد"], correct: 1 },
      { prompt: "ما نوع المد في كلمة رَسُول؟", promptEn: "What type of Madd is in رَسُول?", options: ["مد بالألف", "مد بالواو", "مد بالياء", "لا يوجد مد"], correct: 1 },
      { prompt: "أي كلمة ليس فيها مد بالواو؟", promptEn: "Which word has NO Madd with Waw?", options: ["نُور", "سُور", "وَلَد", "عُود"], correct: 2 },
    ],
  },
  {
    id: "madd-ya",
    title: "مد بالياء",
    titleEn: "Madd with Ya (ee)",
    type: "ya",
    symbol: "ي",
    description: "عندما يأتي حرف مكسور (عليه كسرة) وبعده ياء ساكنة، نمدّ الصوت",
    descriptionEn: "When a letter with Kasra is followed by a silent Ya, we stretch the 'ee' sound",
    rule: "كسرة + ياء = مد بالياء (ـِي)",
    ruleEn: "Kasra + Ya = Long 'ee' sound",
    color: "#10b981",
    examples: [
      { word: "كَبِير", meaning: "كبير", meaningEn: "Big" },
      { word: "صَغِير", meaning: "صغير", meaningEn: "Small" },
      { word: "جَمِيل", meaning: "جميل", meaningEn: "Beautiful" },
      { word: "طَرِيق", meaning: "طريق", meaningEn: "Road" },
      { word: "سَعِيد", meaning: "سعيد", meaningEn: "Happy" },
      { word: "كَرِيم", meaning: "كريم", meaningEn: "Generous" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها مد بالياء؟", promptEn: "Which word has Madd with Ya?", options: ["يَد", "كَبِير", "بَيْت", "زَيْت"], correct: 1 },
      { prompt: "ما نوع المد في كلمة جَمِيل؟", promptEn: "What type of Madd is in جَمِيل?", options: ["مد بالألف", "مد بالواو", "مد بالياء", "لا يوجد مد"], correct: 2 },
      { prompt: "أي كلمة ليس فيها مد بالياء؟", promptEn: "Which word has NO Madd with Ya?", options: ["كَبِير", "صَغِير", "بَيْت", "كَرِيم"], correct: 2 },
    ],
  },
];
