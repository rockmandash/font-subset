import config from '../config.mjs';
import fontData from '../fontData.mjs';
import { execFile } from 'child_process';
import path from 'path';
import checkDirectorySync from './checkDirectorySync.mjs';
import rmfr from 'rmfr';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const fontTypes = ['woff', 'woff2'];

const generateSubset = async allUniqueChinese => {
  const allPromises = config.usedFonts.map(usedFont =>
    rmfr(path.resolve(__dirname, `../fonts/${usedFont}/subset`))
  );
  await Promise.all(allPromises);
  config.usedFonts.forEach(usedFont => {
    checkDirectorySync(path.resolve(__dirname, `../fonts/${usedFont}/subset`));

    fontData[usedFont].fonts.forEach(item => {
      const { fontWeightName } = item;
      fontTypes.forEach(fontType => {
        execFile(
          'pyftsubset',
          [
            path.resolve(
              __dirname,
              `../fonts/${usedFont}/${usedFont}-${fontWeightName}.${
                fontData[usedFont].sourceType
              }`
            ),
            `--text=${allUniqueChinese}`,
            `--flavor=${fontType}`,
            `--output-file=${path.resolve(
              __dirname,
              `../fonts/${usedFont}/subset/${usedFont}-${fontWeightName}-subset.${fontType}`
            )}`
          ],
          (error, stdout, stderr) => {
            if (error) {
              throw error;
            }
            // console.log(stdout);
          }
        );
      });
    });
  });
};

export default generateSubset;
