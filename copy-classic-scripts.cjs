const fs = require('fs');
const path = require('path');

const root = __dirname;

function copyFiles(sourceDir, targetDir, files) {
  fs.mkdirSync(targetDir, { recursive: true });
  for (const file of files) {
    const source = path.join(sourceDir, file);
    if (fs.existsSync(source)) {
      fs.copyFileSync(source, path.join(targetDir, file));
    }
  }
}

copyFiles(
  path.join(root, 'src', 'scripts'),
  path.join(root, 'dist', 'src', 'scripts'),
  ['i18n.js', 'auth-session.js', 'main.js', 'space-bg.js', 'verb-lab.js'],
);

copyFiles(
  path.join(root, 'src', 'styles'),
  path.join(root, 'dist', 'src', 'styles'),
  ['main.css', 'space-bg.css', 'verb-lab.css'],
);

console.log('Copied classic browser assets to dist/src');
