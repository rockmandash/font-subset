
import HandleFontsLoad from './HandleFontsLoad';
import importAll from 'import-all.macro';

const development = process.env.NODE_ENV === 'development';

let FontsPathBase;

if (development) {
  FontsPathBase = importAll.sync(`./fonts/NotoSansTC/*.?(woff|woff2)`);
} else {
  FontsPathBase = importAll.sync(`./fonts/NotoSansTC/**/*.?(woff|woff2)`);
}
HandleFontsLoad('NotoSansTC', FontsPathBase);
