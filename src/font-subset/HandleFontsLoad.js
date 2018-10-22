import fontData from './fontData';
import { css, cx } from 'react-emotion/macro';
import getFileInfoFromPath from './utility/getFileInfoFromPath';
import mapKeys from 'lodash/mapKeys';
import flatMap from 'lodash/flatMap';
import { injectGlobal } from 'react-emotion/macro';

const development = process.env.NODE_ENV === 'development';

const HandleFontsLoad = (usedFont, FontsPathBase) => {
  const FontsPathBase_fixKey = mapKeys(FontsPathBase, (value, key) => {
    const { filename, extension } = getFileInfoFromPath(key);
    return `${filename}.${extension}`;
  });

  const FontData = {
    fontFamily: usedFont,
    fonts: fontData[usedFont].fonts.map(font => {
      const { fontName } = font;
      return {
        ...font,
        original: {
          woff: FontsPathBase_fixKey[`${fontName}.woff`],
          woff2: FontsPathBase_fixKey[`${fontName}.woff2`]
        },

        subset: development
          ? null
          : {
              woff: FontsPathBase_fixKey[`${fontName}-subset.woff`],
              woff2: FontsPathBase_fixKey[`${fontName}-subset.woff2`]
            }
      };
    })
  };

  const FontFacesClassname = flatMap(FontData.fonts, font => {
    const { fontWeight, original, subset } = font;
    if (development) {
      return [
        css`
          @font-face {
            font-family: ${usedFont};
            font-style: normal;
            font-weight: ${fontWeight};
            src: url(${original.woff2}) format('woff2'),
              url(${original.woff}) format('woff');
          }
        `
      ];
    } else {
      return [
        css`
          @font-face {
            font-family: ${usedFont} Full;
            font-style: normal;
            font-weight: ${fontWeight};
            src: url(${original.woff2}) format('woff2'),
              url(${original.woff}) format('woff');
          }
        `,
        css`
          @font-face {
            font-family: ${usedFont};
            font-style: normal;
            font-weight: ${fontWeight};
            src: url(${subset.woff2}) format('woff2'),
              url(${subset.woff}) format('woff');
          }
        `
      ];
    }
  });

  injectGlobal`
    ${cx(...FontFacesClassname)};
  `;
};

export default HandleFontsLoad;
