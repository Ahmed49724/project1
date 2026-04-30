const fs = require('fs');
const path = 'src/scripts/main.js';
const data = fs.readFileSync(path, 'utf8');
const regex = /missingWords:\s*\[([\s\S]*?)\]\s*\}/g;
let match;
let idx = 0;
const results = [];
while ((match = regex.exec(data)) !== null) {
  const before = data.slice(0, match.index);
  const letterMatch = before.match(/\n\s*'([^']+)':\s*\{[^\n]*$/);
  const letterName = letterMatch ? letterMatch[1] : `?${idx}`;
  const block = match[1];
  const lines = block.split(/\n/);
  lines.forEach((line, i) => {
    const m = line.match(/correctShape:\s*(\d+)/);
    if (m) {
      const shape = Number(m[1]);
      let displayLine = null;
      for (let j = i; j >= 0; j--) {
        if (/display:\s*`/.test(lines[j])) {
          displayLine = lines[j];
          break;
        }
      }
      if (displayLine) {
        const displayMatch = displayLine.match(/display:\s*`([\s\S]*)`/);
        if (displayMatch) {
          const display = displayMatch[1];
          const parts = display.split('<span class="missing-gap"></span>');
          if (parts.length === 2) {
            const start = parts[0].trim();
            const end = parts[1].trim();
            const expected = end === '' ? 3 : start === '' ? 0 : 2;
            if (shape !== expected) {
              results.push({ letter: letterName, display, correctShape: shape, expected });
            }
          }
        }
      }
    }
  });
  idx++;
}
console.log(JSON.stringify(results, null, 2));
