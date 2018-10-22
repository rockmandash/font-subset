import fs from 'fs';
import { promisify } from 'util';
import path from 'path';
import map from 'lodash/map';
import fontData from '../fontData.mjs';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
(async () => {
  const rawText = await readFile(path.resolve(__dirname, './base.md'), 'utf8');
  const newText = rawText
    .replace(
      '<!-- import statements -->',
      Object.keys(fontData)
        .map(fontName => `import './font-subset/${fontName}';`)
        .join('\n')
    )
    .replace(
      '<!-- config.mjs -->',
      `
    const config = {
      usedFonts: ${JSON.stringify(Object.keys(fontData))}
    };
    
    export default config;
    `
    )
    .replace(
      '<!-- css -->',
      map(fontData, (value, key) => {
        const { fonts, name } = value;
        return `
##### ${name}
\`\`\`css
      p {
        font-family: ${key};
        /* available font weights */
        ${fonts
          .map(font => {
            const { fontWeight } = font;
            return `font-weight: ${fontWeight};`;
          })
          .join('\n')}
      }
      input {
        /* For uncontroled text, this will triger browser download the full font! */
        font-family: ${key}, ${key} Full;
      }
\`\`\`
      `;
      }).join('\n')
    );

  await writeFile(path.resolve(__dirname, '../../../README.md'), newText);

  console.log('README.md 更新');
})();
