export interface MissingWord {
  display: string;
  correctShape: number;
}

// Minimal shape shared by LetterEntry and StageData — used by word games
export interface WordGameData {
  xoWords: string[];
  cardWords: string[];
  splitWords: string[];
}

export interface LetterEntry extends WordGameData {
  shapes: string[];
  jollyStory: string;
  jollyAction: string;
  jollyRawSound: string;
  jollyArabic: boolean;
  storyIcon: string;
  storyText: string;
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

// Prop type for word games that work with both LetterEntry and StageData
export interface WordGameProps {
  letterData: WordGameData;
  onComplete: () => void;
}
