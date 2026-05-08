export type StageType = 1 | 2 | 3

export interface SectionDef {
  id: string
  title: string
  icon: string
  stage: StageType
}

export const SECTIONS: SectionDef[] = [
  { id: 'hero',      title: 'الاستكشاف',      icon: 'fa-eye',          stage: 1 },
  { id: 'motors',    title: 'الحركات',         icon: 'fa-music',        stage: 1 },
  { id: 'shapes',    title: 'أشكال الحرف',     icon: 'fa-shapes',       stage: 1 },
  { id: 'detective', title: 'المحقق',          icon: 'fa-search',       stage: 1 },
  { id: 'xo2',       title: 'المقاطع',         icon: 'fa-puzzle-piece', stage: 1 },
  { id: 'xo3',       title: 'الكلمات',         icon: 'fa-spell-check',  stage: 1 },
  { id: 'missing',   title: 'الكلمة الناقصة',  icon: 'fa-question',     stage: 1 },
  { id: 'split',     title: 'التركيب',         icon: 'fa-link',         stage: 1 },
  { id: 'spin',      title: 'Spin & Read',     icon: 'fa-rotate',       stage: 2 },
  { id: 'colors',    title: 'مزج الألوان',     icon: 'fa-palette',      stage: 2 },
  { id: 'cups',      title: 'Tricky Cups',     icon: 'fa-cup',          stage: 2 },
  { id: 'memory',    title: 'الذاكرة',         icon: 'fa-brain',        stage: 3 },
  { id: 'speed',     title: 'السرعة',          icon: 'fa-bolt',         stage: 3 },
  { id: 'story',     title: 'قصة الحرف',       icon: 'fa-book-open',    stage: 1 },
]

export const SHAPE_LABELS: string[] = [
  'في البداية',
  'في الوسط',
  'في النهاية',
  'منفصل',
]
