export interface ReadingItem {
  id: string;
  ar: string;
  en: string;
  image?: string;
  audio?: string;
}

export interface ReadingLesson {
  id: string;
  title: string;
  titleEn: string;
  type: "syllables" | "words" | "sentences";
  items: ReadingItem[];
}

export const READING_DATA: ReadingLesson[] = [
  {
    id: "syl-1",
    title: "مقاطع ثنائية بالفتحة",
    titleEn: "2-Letter Syllables with Fatha",
    type: "syllables",
    items: [
      { id: "s1", ar: "بَـتَ", en: "Ba-Ta" },
      { id: "s2", ar: "دَارَ", en: "Da-Ra" },
      { id: "s3", ar: "زَرَا", en: "Za-Ra" },
      { id: "s4", ar: "سَمَا", en: "Sa-Ma" },
    ],
  },
  {
    id: "word-1",
    title: "كلمات ثلاثية بالفتحة",
    titleEn: "3-Letter Words with Fatha",
    type: "words",
    items: [
      { id: "w1", ar: "كَتَبَ", en: "Wrote", image: "✍️" },
      { id: "w2", ar: "دَرَسَ", en: "Studied", image: "📚" },
      { id: "w3", ar: "رَسَمَ", en: "Drew", image: "🎨" },
      { id: "w4", ar: "قَرَأَ", en: "Read", image: "📖" },
    ],
  },
  {
    id: "sent-1",
    title: "جمل بسيطة",
    titleEn: "Simple Sentences",
    type: "sentences",
    items: [
      { id: "sn1", ar: "ذَهَبَ أَحْمَدُ", en: "Ahmad went" },
      { id: "sn2", ar: "أَكَلَ الطِّفْلُ", en: "The child ate" },
      { id: "sn3", ar: "شَرِبَ عُمَرُ", en: "Omar drank" },
      { id: "sn4", ar: "كَتَبَتْ سَمَرُ", en: "Samar wrote" },
    ],
  },
];
