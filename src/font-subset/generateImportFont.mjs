import config from './config.mjs';
import fontData from './fontData.mjs';
import path from 'path';
import rmfr from 'rmfr';
import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const generateImportFont = async fontName => {
  await rmfr(`${__dirname}/${fontName}.js`);
  writeFile(
    `${__dirname}/${fontName}.js`,
    `
import HandleFontsLoad from './HandleFontsLoad';
import importAll from 'import-all.macro';

const development = process.env.NODE_ENV === 'development';

let FontsPathBase;

if (development) {
  FontsPathBase = importAll.sync(\`./fonts/${fontName}/*.?(woff|woff2)\`);
} else {
  FontsPathBase = importAll.sync(\`./fonts/${fontName}/**/*.?(woff|woff2)\`);
}
HandleFontsLoad('${fontName}', FontsPathBase);
`
  );
};

Object.keys(fontData).forEach(fontName => {
  generateImportFont(fontName);
});
