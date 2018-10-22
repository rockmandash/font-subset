# font-subset

Faster font load time by subsetting fonts.
(This project will only contain free & open source fonts)

# description

## 「前端開源分享 font-subset」

「中文字型縮減」，變成只有包含我網頁專案有用到的文字，解決中文字太龐大、無法放在網頁上的問題。
python 有個 「fontTools」，可以 subset 文字檔，因此我進而將這個工具整合到我的前端開發環境，變成只要我每次一 build 整個網站，我寫的腳本會「蒐集整個 src/ 資料夾唯一出現過的中文字」，然後丟進 「fontTools」產生 subset 文字檔，並且產生 css 的 font-face 注入到 global 裡面，並且透過 service worker 快取這些文字檔，使用者第二次造訪不必在讀取。

面對像是 input 欄位，不可預期的文字，也提供完整文字檔 fallback。

！！重要：這個專案只會內建免費可商用字型！！

目前內建文字檔案的 (ttf, otf), woff, woff2

只有當你在 css 指定你要什麼字重，瀏覽器才會真的下載那個 subset

## 目前支援字體

1. 思源系列

   1. Google 思源黑體繁體版 (NotoSansTC) [link](https://fonts.google.com/earlyaccess#Noto+Sans+TC)

   2. 思源柔黑體 X (GenJyuuGothicX) [link](http://jikasei.me/font/genjyuu/)

   3. Google 思源宋體繁體版 (NotoSerifTC) [link](https://github.com/googlei18n/noto-cjk)

2. 花園明朝 (HanaMin) [link](http://fonts.jp/hanazono/)

## 待製作

2. 瀨戶字體 (seto) [link](http://setofont.sourceforge.jp/)

## Requirement

Need create-react-app v2!
Latest Node and python

Install dependencies

```
yarn add react-emotion emotion glob import-all.macro lodash rmfr
```

If you already have fonttools & Brotli installed, you don't need to install again.

```
pip install fonttools
pip install Brotli
```

## Usage

First, Copy whole font-subset directory (the one inside src) in your src directory

then modify npm scrips

```json
{
  "build": "node src/font-subset/subset.mjs && react-scripts build"
}
```

then you add this line on top of index.js

```javascript
import './font-subset/NotoSansTC';
import './font-subset/GenJyuuGothicX';
import './font-subset/NotoSerifTC';
import './font-subset/HanaMinA';
import './font-subset/HanaMinB';
```

then inside font-subset directory, specify your used fonts

```javascript
// config.mjs

const config = {
  usedFonts: [
    'NotoSansTC',
    'GenJyuuGothicX',
    'NotoSerifTC',
    'HanaMinA',
    'HanaMinB'
  ]
};

export default config;
```

## css

##### Google 思源黑體繁體版

```css
p {
  font-family: NotoSansTC;
  /* available font weights */
  font-weight: 100;
  font-weight: 300;
  font-weight: 400;
  font-weight: 500;
  font-weight: 700;
  font-weight: 900;
}
input {
  /* For uncontroled text, this will triger browser download the full font! */
  font-family: NotoSansTC, NotoSansTC Full;
}
```

##### 思源柔黑體 X

```css
p {
  font-family: GenJyuuGothicX;
  /* available font weights */
  font-weight: 100;
  font-weight: 200;
  font-weight: 300;
  font-weight: 400;
  font-weight: 500;
  font-weight: 700;
  font-weight: 900;
}
input {
  /* For uncontroled text, this will triger browser download the full font! */
  font-family: GenJyuuGothicX, GenJyuuGothicX Full;
}
```

##### Google 思源宋體繁體版

```css
p {
  font-family: NotoSerifTC;
  /* available font weights */
  font-weight: 100;
  font-weight: 200;
  font-weight: 400;
  font-weight: 500;
  font-weight: 600;
  font-weight: 700;
  font-weight: 900;
}
input {
  /* For uncontroled text, this will triger browser download the full font! */
  font-family: NotoSerifTC, NotoSerifTC Full;
}
```

##### 花園明朝 A

```css
p {
  font-family: HanaMinA;
  /* available font weights */
  font-weight: 400;
}
input {
  /* For uncontroled text, this will triger browser download the full font! */
  font-family: HanaMinA, HanaMinA Full;
}
```

##### 花園明朝 B

```css
p {
  font-family: HanaMinB;
  /* available font weights */
  font-weight: 400;
}
input {
  /* For uncontroled text, this will triger browser download the full font! */
  font-family: HanaMinB, HanaMinB Full;
}
```

## production

font-subset will search all js/css/html files in src/ directory, retrieve all unique chinese words, and create new subset fonts.
If you turn on service worker in index.js, it will later being cached in cache-storage.

## development

font-subset will serve whole fonts.

## Windows python 教學

安裝 python
https://www.python.org/downloads/

安裝完後需要設定兩個 env

```
C:\Python34
C:\Python34\Scripts
```
