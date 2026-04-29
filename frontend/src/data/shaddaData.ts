/* ============================================================
   SHADDA LESSON DATA
   ============================================================ */
export const SHADDA_INTRO = {
  title: "الشدة", titleEn: "Shadda (Doubling)", symbol: "بَّ",
  description: "الشدة علامة تدل على أن الحرف مُشدَّد — يُنطق مرتين",
  descriptionEn: "Shadda shows a letter is doubled — pronounced twice",
  rule: "حرف بشدة = حرف ساكن + نفس الحرف متحرك",
  ruleEn: "Letter with Shadda = silent letter + same letter with vowel",
};

export const SHADDA_LESSONS = [
  {
    id: "shd-1", title: "الشدة مع الفتحة", titleEn: "Shadda with Fatha", color: "#ef4444",
    examples: [
      { word: "شَدَّ", meaning: "شدّ", meaningEn: "Pulled", breakdown: "شَدْ+دَ" },
      { word: "مَدَّ", meaning: "مدّ", meaningEn: "Stretched", breakdown: "مَدْ+دَ" },
      { word: "رَدَّ", meaning: "ردّ", meaningEn: "Replied", breakdown: "رَدْ+دَ" },
      { word: "حَبَّ", meaning: "حبّ", meaningEn: "Loved", breakdown: "حَبْ+بَ" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها شدة؟", promptEn: "Which has Shadda?", options: ["كَتَبَ","مَدَّ","ذَهَبَ","سَمِعَ"], correct: 1 },
    ],
  },
  {
    id: "shd-2", title: "الشدة مع الكسرة", titleEn: "Shadda with Kasra", color: "#3b82f6",
    examples: [
      { word: "إِنَّ", meaning: "إنّ", meaningEn: "Indeed", breakdown: "إِنْ+نَ" },
      { word: "أَنَّ", meaning: "أنّ", meaningEn: "That", breakdown: "أَنْ+نَ" },
      { word: "لَكِنَّ", meaning: "لكنّ", meaningEn: "But", breakdown: "لَكِنْ+نَ" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها شدة؟", promptEn: "Which has Shadda?", options: ["مِنْ","إِنَّ","عَنْ","فِي"], correct: 1 },
    ],
  },
  {
    id: "shd-3", title: "الشدة مع الضمة", titleEn: "Shadda with Damma", color: "#10b981",
    examples: [
      { word: "كُلُّ", meaning: "كلّ", meaningEn: "All/Every", breakdown: "كُلْ+لُ" },
      { word: "أُمُّ", meaning: "أمّ", meaningEn: "Mother", breakdown: "أُمْ+مُ" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها شدة مع ضمة؟", promptEn: "Which has Shadda+Damma?", options: ["كَتَبَ","كُلُّ","كِتَاب","كَلَّ"], correct: 1 },
    ],
  },
];
