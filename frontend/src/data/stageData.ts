export type StageId = "sukoon" | "madd" | "shadda" | "tanween";

export interface StageQuizItem {
  prompt: string;
  options: string[];
  correct: number;
}

export interface StageDetectivePair {
  target: string;
  compare: string;
  hint: string;
}

export interface StageMissingItem {
  display: string;
  options: string[];
  correct: number;
}

export interface StageQuestionTool {
  icon: string;
  label: string;
  description: string;
  prompt: string;
  tip: string;
}

export interface StageData {
  id: StageId;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  symbol: string;
  rule: string;
  ruleEn: string;
  color: string;
  examples: string[];
  practiceWords: string[];
  reviewWords: string[];
  xoWords: string[];
  splitWords: string[];
  cardWords: string[];
  storyText: string;
  detectivePairs: StageDetectivePair[];
  missingItems: StageMissingItem[];
  quickQuiz: StageQuizItem[];
  questionTools: StageQuestionTool[];
}

export const STAGE_DATA: Record<StageId, StageData> = {
  sukoon: {
    id: "sukoon",
    title: "السكون",
    titleEn: "Sukoon",
    description: "السكون هو علامة تُوضع فوق الحرف لتدل على أنه ساكن ولا يُنطق بحركة جديدة.",
    descriptionEn: "Sukoon is a mark placed above a letter to show it is silent and has no vowel.",
    symbol: "بْ",
    rule: "الحرف الساكن يُقرأ من الحرف السابق فقط ولا يُنطق بحركة.",
    ruleEn: "A silent letter is read as part of the previous letter without a vowel.",
    color: "#6b7280",
    examples: ["أَبْ", "مِنْ", "قَلْب", "شَمْس", "بَيْت", "مَكْتَب"],
    practiceWords: ["أَبْ", "مِنْ", "قَلْب", "هَلْ", "شَمْس", "بَيْت"],
    reviewWords: ["أُمْ", "مَسْجِد", "بَحْر", "نَهْر", "صَبْر", "مَكْتَب"],
    xoWords: ["أَبْ", "مِنْ", "بَيْت", "شَمْس", "بَحْر", "صَبْر", "نَهْر", "مَكْتَب"],
    splitWords: ["مَ + كْتَب", "قَ + لْب", "أَ + بْ", "شَ + مْس"],
    cardWords: ["أَبْ", "مِنْ", "شَمْس", "بَيْت", "هَلْ", "نَهْر"],
    storyText: "السكون يخبرك أن الحرف وقف، وهذا يساعدك على قراءة الكلمات بدقة وسلاسة.",
    detectivePairs: [
      { target: "أَبْ", compare: "أَبَ", hint: "سكون بعد الباء" },
      { target: "قَلْب", compare: "قَلَب", hint: "حرف ساكن في الوسط" },
      { target: "شَمْس", compare: "شَمَس", hint: "سكون على الميم" },
    ],
    missingItems: [
      { display: "أ_ْ", options: ["ب", "ت", "د", "س"], correct: 0 },
      { display: "قَل_ب", options: ["س", "ب", "ل", "م"], correct: 1 },
      { display: "شَ_س", options: ["م", "ن", "ل", "ر"], correct: 0 },
    ],
    quickQuiz: [
      { prompt: "أي كلمة تحتوي على سكون؟", options: ["كَتَبَ", "مِنْ", "سَارَ", "قَالَ"], correct: 1 },
      { prompt: "السكون يظهر فوق الحرف في كلمة: ", options: ["أَبْ", "أَبَ", "أُبْ", "أَبِ"], correct: 0 },
    ],
    questionTools: [
      {
        icon: "🛡️",
        label: "خبير السكون",
        description: "هل تستطيع أن تكتشف الحرف الساكن؟",
        prompt: "ابحث عن الحرف الذي يحمل علامة السكون في الكلمة التالية.",
        tip: "الكلمة الساكنة لا تتلقى حركة صوتية إضافية.",
      },
      {
        icon: "🔍",
        label: "سؤال الصوت",
        description: "تدريب سريع على قراءة الكلمات المتوقفة.",
        prompt: "قل الكلمة بصوت مرتفع وحدد أين ينتهي الصوت.",
        tip: "ابدأ من الحرف السابق ثم اقرأ الحرف الساكن بهدوء.",
      },
    ],
  },
  shadda: {
    id: "shadda",
    title: "الشدة",
    titleEn: "Shadda",
    description: "الشدة تُظهر أن الحرف يتكرر ويُقرأ مرتين: مرة ساكنة ومرة متحركة.",
    descriptionEn: "Shadda shows a letter is doubled and read twice: once silent and once with a vowel.",
    symbol: "بَّ",
    rule: "حرف بالشدة = حرف ساكن + نفس الحرف متحرك.",
    ruleEn: "A shadda letter equals the consonant twice: one silent and one pronounced.",
    color: "#f59e0b",
    examples: ["شَدَّ", "مَدَّ", "رَدَّ", "كُلُّ", "أُمُّ", "إِنَّ"],
    practiceWords: ["شَدَّ", "مَدَّ", "رَدَّ", "كُلُّ", "أُمُّ", "إِنَّ"],
    reviewWords: ["حَبَّ", "لَكِنَّ", "مَدْرَسَة", "أَنَّ", "كَتَبَ", "سَمِعَ"],
    xoWords: ["شَدَّ", "مَدَّ", "رَدَّ", "كُلُّ", "أُمُّ", "إِنَّ", "حَبَّ", "أَنَّ"],
    splitWords: ["شَدْ + دَ", "مَدْ + دَ", "أَنْ + نَ", "كَلِ + نَّ"],
    cardWords: ["شَدَّ", "مَدَّ", "رَدَّ", "كُلُّ", "أُمُّ", "أَنَّ"],
    storyText: "الشدة تجعل الحرف أقوى، وتعلمك كيف تميّز بين القليل والكثير في النطق.",
    detectivePairs: [
      { target: "شَدَّ", compare: "شَدَ", hint: "الشدة تضاعف الشين" },
      { target: "كُلُّ", compare: "كُلُ", hint: "حرف مضعف في النهاية" },
      { target: "إِنَّ", compare: "إِنَ", hint: "الشدة في النون" },
    ],
    missingItems: [
      { display: "مَد_ّ", options: ["ا", "ش", "د", "ر"], correct: 2 },
      { display: "أُم_ّ", options: ["ّ", "َ", "ِ", "ُ"], correct: 0 },
      { display: "إِ_َّ", options: ["ن", "م", "ل", "ك"], correct: 0 },
    ],
    quickQuiz: [
      { prompt: "أي كلمة فيها شدة؟", options: ["كَتَبَ", "شَدَّ", "ذَهَبَ", "كَتَبُ"], correct: 1 },
      { prompt: "الشدة تُوضع فوق الحرف في كلمة: ", options: ["مَدَّ", "مَادَ", "مَادْ", "مَدَ"], correct: 0 },
    ],
    questionTools: [
      {
        icon: "🔥",
        label: "مستشار الشدة",
        description: "ما هو الحرف المكرر في الكلمة؟",
        prompt: "حدد الحرف الذي يحمل الشدة واقرأ الكلمة مرتين.",
        tip: "الشدة تعني حرفين في نفس الموضع: ساكن ومتحرك.",
      },
      {
        icon: "📘",
        label: "رحلة القراءة",
        description: "تركيز على النطق المزدوج الصحيح.",
        prompt: "قل الكلمة ببطء ثم أسرع لتسمع الفرق.",
        tip: "ابدأ بالحرف الأول ثم كُن دقيقاً في نهاية الشدة.",
      },
    ],
  },
  tanween: {
    id: "tanween",
    title: "التنوين",
    titleEn: "Tanween",
    description: "التنوين هو نون ساكنة تُضاف إلى نهاية الاسم وتُكتب كحركتين مزدوجتين.",
    descriptionEn: "Tanween is a silent nunation added to nouns and written with double vowel marks.",
    symbol: "بٌ بٍ بً",
    rule: "التنوين يظهر في نهاية الاسم ويعطيه حركة إضافية.",
    ruleEn: "Tanween appears at the end of nouns and gives them an extra vowel sound.",
    color: "#3b82f6",
    examples: ["كِتَابٌ", "بَيْتٍ", "كِتَابًا", "مَدْرَسَةٍ", "قَلَمٌ", "وَلَدًا"],
    practiceWords: ["كِتَابٌ", "بَيْتٍ", "كِتَابًا", "مَدْرَسَةٍ", "قَلَمٌ", "وَلَدًا"],
    reviewWords: ["كِتَابٍ", "وَلَدًا", "بَيْتٌ", "كِتَابًا", "مَدْرَسَةٍ", "قَلَمٌ"],
    xoWords: ["كِتَابٌ", "بَيْتٍ", "كِتَابًا", "وَلَدًا", "مَدْرَسَةٍ", "قَلَمٌ", "كِتَابٍ", "بَيْتٌ"],
    splitWords: ["كِتَاب + ٌ", "بَيْت +ٍ", "قَلَم +ًا", "مَدْرَسَة +ٍ"],
    cardWords: ["كِتَابٌ", "بَيْتٍ", "كِتَابًا", "قَلَمٌ", "وَلَدًا", "مَدْرَسَةٍ"],
    storyText: "التنوين يضيف صوت النون إلى نهاية الاسم ويجعله جاهزاً للإعراب والقراءة الصحيحة.",
    detectivePairs: [
      { target: "كِتَابٌ", compare: "كِتَابَ", hint: "هنا التنوين بالضم" },
      { target: "بَيْتٍ", compare: "بَيْتُ", hint: "هنا التنوين بالكسر" },
      { target: "كِتَابًا", compare: "كِتَابٌ", hint: "هنا التنوين بالفتح" },
    ],
    missingItems: [
      { display: "كِتَاب_", options: ["ٌ", "ٍ", "ً", "ُ"], correct: 0 },
      { display: "بَيْت_", options: ["ٌ", "ٍ", "ً", "َ"], correct: 1 },
      { display: "قَلَم_", options: ["ٌ", "ٍ", "ً", "ِ"], correct: 2 },
    ],
    quickQuiz: [
      { prompt: "أي كلمة فيها تنوين ضم؟", options: ["كِتَابٌ", "كِتَابٍ", "كِتَابًا", "الكِتَاب"], correct: 0 },
      { prompt: "التنوين يظهر في نهاية: ", options: ["الاسم", "الفعل", "الحرف", "الصفة"], correct: 0 },
    ],
    questionTools: [
      {
        icon: "📝",
        label: "دليل التنوين",
        description: "متى يظهر التنوين وكيف تقرأه؟",
        prompt: "حدد نوع التنوين في كل كلمة من هذه المجموعة.",
        tip: "التنوين يُكتب كحركتين متتاليتين في نهاية الاسم.",
      },
      {
        icon: "🧠",
        label: "سؤال التمييز",
        description: "تمييز التنوين عن الحركات العادية.",
        prompt: "اختر الكلمة التي تحتوي على تنوين فقط.",
        tip: "التنوين يظهر في الأسماء فقط وليس في الأفعال.",
      },
    ],
  },
  madd: {
    id: "madd",
    title: "المدود",
    titleEn: "Madd",
    description: "المدود تعني إطالة الصوت عند النطق عندما يأتي حرف متحرك يليه حرف طويل.",
    descriptionEn: "Madd means stretching the sound when a short vowel is followed by a long vowel letter.",
    symbol: "ا و ي",
    rule: "المد بالألف يأتي بعد الفتحة، والمد بالواو بعد الضمة، والمد بالياء بعد الكسرة.",
    ruleEn: "Madd with Alif follows Fatha, Waw follows Damma, and Ya follows Kasra.",
    color: "#10b981",
    examples: ["بَاب", "نُور", "كَبِير", "قَالَ", "صَعِيد", "وَعَدَ"],
    practiceWords: ["بَاب", "نُور", "كَبِير", "قَالَ", "صَعِيد", "وَعَدَ"],
    reviewWords: ["مَاء", "سُور", "جَمِيل", "قَال", "عُود", "زَيْت"],
    xoWords: ["بَاب", "نُور", "كَبِير", "قَالَ", "صَعِيد", "عُود", "زَيْت", "جَمِيل"],
    splitWords: ["بَ + اب", "نُ + ور", "كَ + بِير", "قَ + آل"],
    cardWords: ["بَاب", "نُور", "كَبِير", "قَالَ", "صَعِيد", "زَيْت"],
    storyText: "المدود تجعل الصوت أطول وتمنح الكلمات موسيقى خاصة عند قراءة القرآن واللغة العربية.",
    detectivePairs: [
      { target: "بَاب", compare: "بَب", hint: "المد بالألف بعد الفتحة" },
      { target: "نُور", compare: "نُر", hint: "المد بالواو بعد الضمة" },
      { target: "كَبِير", compare: "كْبِير", hint: "المد بالياء بعد الكسرة" },
    ],
    missingItems: [
      { display: "قَ_لَ", options: ["ا", "و", "ي", "ى"], correct: 0 },
      { display: "نُ_ر", options: ["و", "ا", "ي", "ُ"], correct: 0 },
      { display: "كَ_بِير", options: ["ا", "و", "ي", "إ"], correct: 2 },
    ],
    quickQuiz: [
      { prompt: "أي كلمة فيها مد بالألف؟", options: ["بَاب", "كِتَاب", "بَيْت", "مَسْجِد"], correct: 0 },
      { prompt: "مد بالواو يظهر في كلمة: ", options: ["نُور", "كَبِير", "مَدَّ", "قَالَ"], correct: 0 },
    ],
    questionTools: [
      {
        icon: "🎵",
        label: "مدّ الصوت",
        description: "تعرّف على طول الصوت وكيف يتغير في الكلمة.",
        prompt: "حدد حرف المد وقُل الكلمة بعد الإطالة.",
        tip: "المد بالألف بعد الفتحة، وبالواو بعد الضمة، وبالياء بعد الكسرة.",
      },
      {
        icon: "⚡",
        label: "اختبار المد",
        description: "مقارنة بين الكلمات القصيرة والطويلة.",
        prompt: "اختر الكلمة التي تحتوي على مد واضح.",
        tip: "الكلمة الممدودة تستمر في النطق أطول من الكلمة العادية.",
      },
    ],
  },
};
