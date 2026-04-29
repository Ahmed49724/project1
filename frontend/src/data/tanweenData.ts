/* ============================================================
   TANWEEN LESSON DATA
   ============================================================ */
export const TANWEEN_INTRO = {
  title: "التنوين", titleEn: "Tanween (Nunation)", symbol: "بٌ بٍ بً",
  description: "التنوين نون ساكنة تُضاف في نهاية الاسم — تُكتب كحركتين مزدوجتين",
  descriptionEn: "Tanween is an extra 'n' sound added to the end of a noun — written as double vowel marks",
  types: [
    { sym: "\u064B", name: "فتحتان (تنوين فتح)", nameEn: "Tanween Fath (-an)", example: "كِتَابًا", color: "#ef4444" },
    { sym: "\u064D", name: "كسرتان (تنوين كسر)", nameEn: "Tanween Kasr (-in)", example: "كِتَابٍ", color: "#3b82f6" },
    { sym: "\u064C", name: "ضمتان (تنوين ضم)", nameEn: "Tanween Damm (-un)", example: "كِتَابٌ", color: "#10b981" },
  ],
};

export const TANWEEN_LESSONS = [
  {
    id: "tan-1", title: "تنوين الفتح", titleEn: "Tanween Fath (-an)", color: "#ef4444", sym: "\u064B",
    examples: [
      { word: "كِتَابًا", meaning: "كتابًا", meaningEn: "a book (accusative)" },
      { word: "وَلَدًا", meaning: "ولدًا", meaningEn: "a boy (accusative)" },
      { word: "بَيْتًا", meaning: "بيتًا", meaningEn: "a house (accusative)" },
      { word: "قَلَمًا", meaning: "قلمًا", meaningEn: "a pen (accusative)" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها تنوين فتح؟", promptEn: "Which has Tanween Fath?", options: ["كِتَابٌ","كِتَابًا","كِتَابٍ","الكِتَاب"], correct: 1 },
    ],
  },
  {
    id: "tan-2", title: "تنوين الكسر", titleEn: "Tanween Kasr (-in)", color: "#3b82f6", sym: "\u064D",
    examples: [
      { word: "كِتَابٍ", meaning: "كتابٍ", meaningEn: "a book (genitive)" },
      { word: "وَلَدٍ", meaning: "ولدٍ", meaningEn: "a boy (genitive)" },
      { word: "مَدْرَسَةٍ", meaning: "مدرسةٍ", meaningEn: "a school (genitive)" },
      { word: "بَيْتٍ", meaning: "بيتٍ", meaningEn: "a house (genitive)" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها تنوين كسر؟", promptEn: "Which has Tanween Kasr?", options: ["كِتَابٌ","كِتَابًا","كِتَابٍ","الكِتَاب"], correct: 2 },
    ],
  },
  {
    id: "tan-3", title: "تنوين الضم", titleEn: "Tanween Damm (-un)", color: "#10b981", sym: "\u064C",
    examples: [
      { word: "كِتَابٌ", meaning: "كتابٌ", meaningEn: "a book (nominative)" },
      { word: "وَلَدٌ", meaning: "ولدٌ", meaningEn: "a boy (nominative)" },
      { word: "بَيْتٌ", meaning: "بيتٌ", meaningEn: "a house (nominative)" },
      { word: "قَلَمٌ", meaning: "قلمٌ", meaningEn: "a pen (nominative)" },
    ],
    exercises: [
      { prompt: "أي كلمة فيها تنوين ضم؟", promptEn: "Which has Tanween Damm?", options: ["كِتَابٌ","كِتَابًا","كِتَابٍ","الكِتَاب"], correct: 0 },
    ],
  },
];
