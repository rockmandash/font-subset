import mapValues from 'lodash/mapValues';

const fontDataBase = {
  NotoSansTC: {
    name: 'Google 思源黑體繁體版',
    sourceType: 'otf',
    fonts: [
      { fontWeight: '100', fontWeightName: 'Thin' },
      {
        fontWeight: '300',
        fontWeightName: 'Light'
      },
      {
        fontWeight: '400',
        fontWeightName: 'Regular'
      },
      {
        fontWeight: '500',
        fontWeightName: 'Medium'
      },
      { fontWeight: '700', fontWeightName: 'Bold' },
      { fontWeight: '900', fontWeightName: 'Black' }
    ]
  },
  GenJyuuGothicX: {
    name: '思源柔黑體 X',
    sourceType: 'ttf',
    fonts: [
      { fontWeight: '100', fontWeightName: 'ExtraLight' },
      {
        fontWeight: '200',
        fontWeightName: 'Light'
      },
      {
        fontWeight: '300',
        fontWeightName: 'Normal'
      },
      {
        fontWeight: '400',
        fontWeightName: 'Regular'
      },
      { fontWeight: '500', fontWeightName: 'Medium' },
      { fontWeight: '700', fontWeightName: 'Bold' },
      { fontWeight: '900', fontWeightName: 'Heavy' }
    ]
  },
  NotoSerifTC: {
    name: 'Google 思源宋體繁體版',
    sourceType: 'otf',
    fonts: [
      { fontWeight: '100', fontWeightName: 'ExtraLight' },
      {
        fontWeight: '200',
        fontWeightName: 'Light'
      },
      {
        fontWeight: '400',
        fontWeightName: 'Regular'
      },
      {
        fontWeight: '500',
        fontWeightName: 'Medium'
      },
      { fontWeight: '600', fontWeightName: 'SemiBold' },
      { fontWeight: '700', fontWeightName: 'Bold' },
      { fontWeight: '900', fontWeightName: 'Black' }
    ]
  },
  HanaMinA: {
    name: '花園明朝 A',
    sourceType: 'ttf',
    fonts: [
      {
        fontWeight: '400',
        fontWeightName: 'Regular'
      }
    ]
  },
  HanaMinB: {
    name: '花園明朝 B',
    sourceType: 'ttf',
    fonts: [
      {
        fontWeight: '400',
        fontWeightName: 'Regular'
      }
    ]
  }
};

const fontData = mapValues(fontDataBase, (value, key) => {
  const { fonts, ...rest } = value;
  return {
    ...rest,
    fonts: fonts.map(font => ({
      ...font,
      fontName: `${key}-${font.fontWeightName}`
    }))
  };
});

export default fontData;
