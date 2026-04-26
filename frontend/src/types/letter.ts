export interface MissingWord {
  display: string;
  correctShape: number;
}

export interface LetterEntry {
  shapes: string[];
  jollyStory: string;
  jollyAction: string;
  jollyRawSound: string;
  jollyArabic: boolean;
  storyIcon: string;
  storyText: string;
  cardWords: string[];
  splitWords: string[];
  xoWords: string[];
  missingWords: MissingWord[];
  detective?: {
    target: string;
    compareWith: string;
    type: "visual" | "sound";
    dots?: { target: string; compare: string };
    weight?: { heavy: string; light: string };
    spyPool: string[];
  };
}

export interface SectionProps {
  letterId: string;
  letterData: LetterEntry;
  onComplete: () => void;
}
