export interface HarakaEntry {
  sym: string
  label: string
  color: string
}

export const HARAKAT: HarakaEntry[] = [
  { sym: 'َ', label: 'فتحة',    color: '#ef4444' },
  { sym: 'ِ', label: 'كسرة',    color: '#3b82f6' },
  { sym: 'ُ', label: 'ضمة',     color: '#10b981' },
  { sym: 'ْ', label: 'سكون',    color: '#6b7280' },
  { sym: 'ّ', label: 'شدة',     color: '#f59e0b' },
  { sym: 'ً', label: 'فتحتان',  color: '#ef4444' },
  { sym: 'ٍ', label: 'كسرتان',  color: '#3b82f6' },
  { sym: 'ٌ', label: 'ضمتان',   color: '#10b981' },
]

export const KEYBOARD_ROWS: string[][] = [
  ['ض', 'ص', 'ث', 'ق', 'ف', 'غ', 'ع', 'ه', 'خ', 'ح', 'ج', 'د'],
  ['ش', 'س', 'ي', 'ب', 'ل', 'ا', 'ت', 'ن', 'م', 'ك', 'ط'],
  ['ئ', 'ء', 'ؤ', 'ر', 'ى', 'ة', 'و', 'ز', 'ظ', 'ذ'],
]
