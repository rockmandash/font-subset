import path from 'path';
import glob from 'glob';
import { promisify } from 'util';
import { execFile } from 'child_process';
import rmfr from 'rmfr';
import getFileInfoFromPath from './utility/getFileInfoFromPath';

const _execFile = promisify(execFile);

const targetDir = process.argv[2];

glob(path.resolve(targetDir, '*.?(ttf|otf)'), (er, files) => {
  files.forEach(filepath => {
    generateWebFonts(targetDir, filepath);
  });
});

const generateWebFonts = async (targetDir, filepath) => {
  const { filename } = getFileInfoFromPath(filepath);
  console.log(`generating TTX: ${filename}`);
  await _execFile('ttx', [filepath]);
  console.log(`generating WOFF & WOFF2: ${filename}`);
  const woffPromise = _execFile('ttx', [
    `--flavor=woff`,
    `${targetDir}/${filename}.ttx`
  ]);
  const woff2Promise = _execFile('ttx', [
    `--flavor=woff2`,
    `${targetDir}/${filename}.ttx`
  ]);
  await Promise.all([woffPromise, woff2Promise]);
  console.log(`remove TTX: ${filename}`);
  rmfr(`${targetDir}/${filename}.ttx`);
};
