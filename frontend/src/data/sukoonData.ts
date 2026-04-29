/* ============================================================
   SUKOON LESSON DATA — بيانات دروس السكون
   ============================================================ */

export interface SukoonWord {
  word: string;
  meaning: string;
  meaningEn: string;
  sukoonPosition: number; // index of the letter with sukoon
}

export interface SukoonLesson {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  examples: SukoonWord[];
  exercises: {
    type: "pick-sukoon" | "read-aloud";
    prompt: string;
    promptEn: string;
    options: string[];
    correct: number;
  }[];
}

export const SUKOON_INTRO = {
  title: "السكون",
  titleEn: "Sukoon",
  symbol: "بْ",
  description: "السكون هو علامة تُوضع فوق الحرف لتدل على أنه ساكن (لا حركة عليه). شكله دائرة صغيرة ْ",
  descriptionEn: "Sukoon is a diacritical mark placed above a letter to indicate it has no vowel sound. It looks like a small circle ْ",
  rule: "الحرف الساكن لا يُنطق بمفرده، بل يُنطق مع الحرف الذي قبله",
  ruleEn: "A letter with sukoon is not pronounced alone — it joins the sound of the letter before it",
};

export const SUKOON_LESSONS: SukoonLesson[] = [
  {
    id: "suk-1",
    title: "السكون مع الحركات الأساسية",
    titleEn: "Sukoon with Basic Vowels",
    description: "تعلّم نطق الحرف الساكن بعد حرف متحرك",
    descriptionEn: "Learn to pronounce a silent letter after a voweled letter",
    examples: [
      { word: "أَبْ", meaning: "أب", meaningEn: "Father", sukoonPosition: 1 },
      { word: "أُمْ", meaning: "أم", meaningEn: "Mother", sukoonPosition: 1 },
      { word: "مِنْ", meaning: "من", meaningEn: "From", sukoonPosition: 1 },
      { word: "قَدْ", meaning: "قد", meaningEn: "Indeed", sukoonPosition: 1 },
      { word: "هَلْ", meaning: "هل", meaningEn: "Is/Are (question)", sukoonPosition: 1 },
      { word: "كَمْ", meaning: "كم", meaningEn: "How many", sukoonPosition: 1 },
    ],
    exercises: [
      { type: "pick-sukoon", prompt: "أي كلمة فيها سكون؟", promptEn: "Which word has sukoon?", options: ["كَتَبَ", "مِنْ", "عَلَى", "فِي"], correct: 1 },
      { type: "pick-sukoon", prompt: "أي كلمة فيها سكون؟", promptEn: "Which word has sukoon?", options: ["ذَهَبَ", "بَيْت", "هُوَ", "لَكَ"], correct: 1 },
      { type: "pick-sukoon", prompt: "أي كلمة فيها سكون؟", promptEn: "Which word has sukoon?", options: ["أَنَا", "قَلْب", "عَلَا", "كَبُرَ"], correct: 1 },
    ],
  },
  {
    id: "suk-2",
    title: "كلمات ثلاثية بالسكون",
    titleEn: "3-Letter Words with Sukoon",
    description: "كلمات من ثلاثة حروف يكون أحدها ساكناً",
    descriptionEn: "Three-letter words where one letter has sukoon",
    examples: [
      { word: "بَيْت", meaning: "بيت", meaningEn: "House", sukoonPosition: 1 },
      { word: "قَلْب", meaning: "قلب", meaningEn: "Heart", sukoonPosition: 1 },
      { word: "شَمْس", meaning: "شمس", meaningEn: "Sun", sukoonPosition: 1 },
      { word: "نَهْر", meaning: "نهر", meaningEn: "River", sukoonPosition: 1 },
      { word: "بَحْر", meaning: "بحر", meaningEn: "Sea", sukoonPosition: 1 },
      { word: "صَبْر", meaning: "صبر", meaningEn: "Patience", sukoonPosition: 1 },
    ],
    exercises: [
      { type: "pick-sukoon", prompt: "أين السكون في كلمة بَيْت؟", promptEn: "Where is the sukoon in بَيْت?", options: ["على الباء", "على الياء", "على التاء", "لا يوجد"], correct: 1 },
      { type: "pick-sukoon", prompt: "أي كلمة تبدأ بحرف ساكن؟", promptEn: "Which word starts with a silent letter?", options: ["لا توجد كلمة", "بَيْت", "شَمْس", "كلها"], correct: 0 },
      { type: "pick-sukoon", prompt: "كم حرف ساكن في كلمة شَمْس؟", promptEn: "How many sukoon letters in شَمْس?", options: ["0", "1", "2", "3"], correct: 1 },
    ],
  },
  {
    id: "suk-3",
    title: "السكون في كلمات شائعة",
    titleEn: "Sukoon in Common Words",
    description: "تدرّب على قراءة كلمات شائعة بالسكون",
    descriptionEn: "Practice reading common words with sukoon",
    examples: [
      { word: "مَدْرَسَة", meaning: "مدرسة", meaningEn: "School", sukoonPosition: 1 },
      { word: "مَكْتَب", meaning: "مكتب", meaningEn: "Desk/Office", sukoonPosition: 1 },
      { word: "مَسْجِد", meaning: "مسجد", meaningEn: "Mosque", sukoonPosition: 1 },
      { word: "أَحْمَد", meaning: "أحمد", meaningEn: "Ahmad", sukoonPosition: 1 },
      { word: "يَكْتُب", meaning: "يكتب", meaningEn: "He writes", sukoonPosition: 1 },
      { word: "يَسْمَع", meaning: "يسمع", meaningEn: "He hears", sukoonPosition: 1 },
    ],
    exercises: [
      { type: "pick-sukoon", prompt: "أي كلمة فيها سكون؟", promptEn: "Which word has sukoon?", options: ["كَتَبَ", "مَكْتَب", "عَلِمَ", "فَهِمَ"], correct: 1 },
      { type: "pick-sukoon", prompt: "كلمة مَسْجِد — الحرف الساكن هو:", promptEn: "In مَسْجِد — the sukoon letter is:", options: ["الميم", "السين", "الجيم", "الدال"], correct: 1 },
      { type: "pick-sukoon", prompt: "أي فعل فيه سكون؟", promptEn: "Which verb has sukoon?", options: ["كَتَبَ", "يَكْتُب", "كُتُب", "كَاتِب"], correct: 1 },
    ],
  },
];
