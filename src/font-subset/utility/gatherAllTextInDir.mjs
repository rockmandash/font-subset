import path from 'path';
import glob from 'glob';
import fs from 'fs';
import { promisify } from 'util';
import flattenDeep from 'lodash/flattenDeep';
import uniq from 'lodash/uniq';

const readFile = promisify(fs.readFile);
const chineseRegex = /[\u4e00-\u9fa5|\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/g;

const gatherAllTextInDir = dirPath => {
  return new Promise((resolve, reject) => {
    glob(
      path.resolve(dirPath, '**/*.?(js|css|html)'),
      {
        ignore: '**/node_modules/**'
      },
      async (er, files) => {
        const allPromises = files.map(filepath => readFile(filepath, 'utf8'));
        const allTexts = await Promise.all(allPromises);

        let allUniqueChineseArr = [];
        allTexts.forEach(text => {
          const usedChinese = text.match(chineseRegex);
          if (usedChinese) {
            allUniqueChineseArr.push(usedChinese);
          }
        });
        const allUniqueChinese = uniq(flattenDeep(allUniqueChineseArr)).join(
          ''
        );
        console.log(`All Chinese Text：${allUniqueChinese}`);

        resolve(allUniqueChinese);
      }
    );
  });
};

export default gatherAllTextInDir;
