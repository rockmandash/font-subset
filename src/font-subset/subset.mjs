import gatherAllTextInDir from './utility/gatherAllTextInDir.mjs';
import generateSubset from './utility/generateSubset.mjs';
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

const targetDir = path.resolve(__dirname, '../../');

(async () => {
  const allUniqueChinese = await gatherAllTextInDir(targetDir);
  generateSubset(allUniqueChinese);
})();
