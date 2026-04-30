const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..', '..', 'frontend', 'src', 'data');
const files = ['sukoonData.ts', 'shaddaData.ts', 'tanweenData.ts', 'maddData.ts'];
const report = [];

function load(file) {
  let source = fs.readFileSync(path.join(root, file), 'utf8');
  source = source.replace(/export interface[\s\S]*?\n\}/g, '');
  source = source.replace(/export const\s+([A-Za-z0-9_]+)(:\s*[^=]+)?=\s*/g, 'exports.$1 = ');
  const module = { exports: {} };
  const requireShim = (id) => {
    if (id === 'path') return require('path');
    throw new Error('unsupported require ' + id);
  };
  const fn = new Function('exports', 'require', 'module', '__filename', '__dirname', source);
  fn(module.exports, requireShim, module, file, root);
  return module.exports;
}

function add(message) {
  report.push(message);
}

function getBaseLetterIndex(word, letterIndex) {
  const diacritics = /[ًٌٍَُِّْ]/g;
  let count = 0;
  let pos = 0;
  while (pos < word.length) {
    const ch = word[pos];
    if (!diacritics.test(ch)) {
      if (count === letterIndex) return pos;
      count += 1;
    }
    pos += 1;
  }
  return -1;
}

function validateSukoon() {
  const { SUKOON_LESSONS } = load('sukoonData.ts');
  SUKOON_LESSONS.forEach((lesson) => {
    lesson.examples.forEach((ex, idx) => {
      const word = ex.word;
      const expectedIndex = ex.sukoonPosition;
      const realPos = getBaseLetterIndex(word, expectedIndex);
      if (realPos === -1) {
        add(`Sukoon example base-letter out of range: ${lesson.id} ${word} position=${expectedIndex}`);
        return;
      }
      const diacritic = word[realPos + 1];
      if (diacritic !== 'ْ') {
        add(`Sukoon example missing diacritic after base letter: ${lesson.id} ${word} letterIndex=${expectedIndex} char=${word[realPos]} next=${diacritic || 'EOF'}`);
      }
    });
    lesson.exercises.forEach((exercise, i) => {
      if (exercise.correct < 0 || exercise.correct >= exercise.options.length) {
        add(`Sukoon exercise invalid correct index: ${lesson.id} exercise=${i} correct=${exercise.correct}`);
      }
    });
  });
}

function validateShadda() {
  const { SHADDA_LESSONS } = load('shaddaData.ts');
  SHADDA_LESSONS.forEach((lesson) => {
    lesson.examples.forEach((ex) => {
      if (!ex.word.includes('ّ')) {
        add(`Shadda example missing shadda char: ${lesson.id} ${ex.word}`);
      }
      if (!ex.breakdown || !ex.breakdown.includes('ْ+') || !ex.breakdown.includes('َ')) {
        add(`Shadda example breakdown format suspicious: ${lesson.id} ${ex.word} breakdown=${ex.breakdown}`);
      }
    });
    lesson.exercises.forEach((exercise, i) => {
      if (exercise.correct < 0 || exercise.correct >= exercise.options.length) {
        add(`Shadda exercise invalid correct index: ${lesson.id} exercise=${i} correct=${exercise.correct}`);
      }
    });
  });
}

function validateTanween() {
  const { TANWEEN_LESSONS } = load('tanweenData.ts');
  const types = { '\u064B': 'tan-1', '\u064D': 'tan-2', '\u064C': 'tan-3' };
  TANWEEN_LESSONS.forEach((lesson) => {
    lesson.examples.forEach((ex) => {
      if (!ex.word.endsWith('ً') && !ex.word.endsWith('ٍ') && !ex.word.endsWith('ٌ')) {
        add(`Tanween example missing tanween mark at end: ${lesson.id} ${ex.word}`);
      }
      const lastChar = ex.word[ex.word.length - 1];
      if (lesson.sym !== lastChar) {
        add(`Tanween example symbol mismatch: ${lesson.id} ${ex.word} sym=${lesson.sym} last=${lastChar}`);
      }
    });
    lesson.exercises.forEach((exercise, i) => {
      if (exercise.correct < 0 || exercise.correct >= exercise.options.length) {
        add(`Tanween exercise invalid correct index: ${lesson.id} exercise=${i} correct=${exercise.correct}`);
      }
    });
  });
}

function validateMadd() {
  const { MADD_LESSONS } = load('maddData.ts');
  MADD_LESSONS.forEach((lesson) => {
    lesson.examples.forEach((ex) => {
      const { word, meaning } = ex;
      if (lesson.type === 'alif') {
        if (!/(أ|ا)$/.test(word) && !word.includes('ا')) {
          add(`Madd-alif example maybe missing alif: ${lesson.id} ${word}`);
        }
      }
      if (lesson.type === 'waw') {
        if (!word.includes('و')) {
          add(`Madd-waw example maybe missing waw: ${lesson.id} ${word}`);
        }
      }
      if (lesson.type === 'ya') {
        if (!word.includes('ي')) {
          add(`Madd-ya example maybe missing ya: ${lesson.id} ${word}`);
        }
      }
    });
    lesson.exercises.forEach((exercise, i) => {
      if (exercise.correct < 0 || exercise.correct >= exercise.options.length) {
        add(`Madd exercise invalid correct index: ${lesson.id} exercise=${i} correct=${exercise.correct}`);
      }
    });
  });
}

validateSukoon();
validateShadda();
validateTanween();
validateMadd();

if (report.length === 0) {
  console.log('PASS: All stage data validated successfully');
  process.exit(0);
}
console.log('FAIL: Stage data issues detected');
report.forEach((line) => console.log('- ' + line));
process.exit(1);
