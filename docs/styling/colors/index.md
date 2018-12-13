# Colors

本プロジェクトでは [Material Design spec](https://material.io/guidelines/style/color.html) にしたがって CSS 変数で色を定義しており、この変数を利用して色を設定することができます。

## 色を設定する

本プロジェクトでは[カラーパレット](#color-palettes)で示す色を CSS 変数で定義しています。

以下は .vue ファイルで色指定する例です。

```html
<style scoped>
  div {
    color: var(--comm-red-50);
  }
</style>
```

## <div id="color-palettes">カラーパレット</div>

`src/styles/_colors.css`には次の色が CSS 変数で定義されています。

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag red-50-background"><div>--comm-red-50</div></div>
    <div class="color-tag red-100-background"><div>--comm-red-100</div></div>
    <div class="color-tag red-200-background"><div>--comm-red-200</div></div>
    <div class="color-tag red-300-background"><div>--comm-red-300</div></div>
    <div class="color-tag red-400-background"><div>--comm-red-400</div></div>
    <div class="color-tag red-500-background"><div>--comm-red-500</div></div>
    <div class="color-tag red-600-background"><div>--comm-red-600</div></div>
    <div class="color-tag red-700-background"><div>--comm-red-700</div></div>
    <div class="color-tag red-800-background"><div>--comm-red-800</div></div>
    <div class="color-tag red-900-background"><div>--comm-red-900</div></div>
    <div class="color-tag red-a100-background"><div>--comm-red-a100</div></div>
    <div class="color-tag red-a200-background"><div>--comm-red-a200</div></div>
    <div class="color-tag red-a400-background"><div>--comm-red-a400</div></div>
    <div class="color-tag red-a700-background"><div>--comm-red-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag pink-50-background"><div>--comm-pink-50</div></div>
    <div class="color-tag pink-100-background"><div>--comm-pink-100</div></div>
    <div class="color-tag pink-200-background"><div>--comm-pink-200</div></div>
    <div class="color-tag pink-300-background"><div>--comm-pink-300</div></div>
    <div class="color-tag pink-400-background"><div>--comm-pink-400</div></div>
    <div class="color-tag pink-500-background"><div>--comm-pink-500</div></div>
    <div class="color-tag pink-600-background"><div>--comm-pink-600</div></div>
    <div class="color-tag pink-700-background"><div>--comm-pink-700</div></div>
    <div class="color-tag pink-800-background"><div>--comm-pink-800</div></div>
    <div class="color-tag pink-900-background"><div>--comm-pink-900</div></div>
    <div class="color-tag pink-a100-background"><div>--comm-pink-a100</div></div>
    <div class="color-tag pink-a200-background"><div>--comm-pink-a200</div></div>
    <div class="color-tag pink-a400-background"><div>--comm-pink-a400</div></div>
    <div class="color-tag pink-a700-background"><div>--comm-pink-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag purple-50-background"><div>--comm-purple-50</div></div>
    <div class="color-tag purple-100-background"><div>--comm-purple-100</div></div>
    <div class="color-tag purple-200-background"><div>--comm-purple-200</div></div>
    <div class="color-tag purple-300-background"><div>--comm-purple-300</div></div>
    <div class="color-tag purple-400-background"><div>--comm-purple-400</div></div>
    <div class="color-tag purple-500-background"><div>--comm-purple-500</div></div>
    <div class="color-tag purple-600-background"><div>--comm-purple-600</div></div>
    <div class="color-tag purple-700-background"><div>--comm-purple-700</div></div>
    <div class="color-tag purple-800-background"><div>--comm-purple-800</div></div>
    <div class="color-tag purple-900-background"><div>--comm-purple-900</div></div>
    <div class="color-tag purple-a100-background"><div>--comm-purple-a100</div></div>
    <div class="color-tag purple-a200-background"><div>--comm-purple-a200</div></div>
    <div class="color-tag purple-a400-background"><div>--comm-purple-a400</div></div>
    <div class="color-tag purple-a700-background"><div>--comm-purple-a700</div></div>
  </div>
</div>

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag deep-purple-50-background"><div>--comm-deep-purple-50</div></div>
    <div class="color-tag deep-purple-100-background"><div>--comm-deep-purple-100</div></div>
    <div class="color-tag deep-purple-200-background"><div>--comm-deep-purple-200</div></div>
    <div class="color-tag deep-purple-300-background"><div>--comm-deep-purple-300</div></div>
    <div class="color-tag deep-purple-400-background"><div>--comm-deep-purple-400</div></div>
    <div class="color-tag deep-purple-500-background"><div>--comm-deep-purple-500</div></div>
    <div class="color-tag deep-purple-600-background"><div>--comm-deep-purple-600</div></div>
    <div class="color-tag deep-purple-700-background"><div>--comm-deep-purple-700</div></div>
    <div class="color-tag deep-purple-800-background"><div>--comm-deep-purple-800</div></div>
    <div class="color-tag deep-purple-900-background"><div>--comm-deep-purple-900</div></div>
    <div class="color-tag deep-purple-a100-background"><div>--comm-deep-purple-a100</div></div>
    <div class="color-tag deep-purple-a200-background"><div>--comm-deep-purple-a200</div></div>
    <div class="color-tag deep-purple-a400-background"><div>--comm-deep-purple-a400</div></div>
    <div class="color-tag deep-purple-a700-background"><div>--comm-deep-purple-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag indigo-50-background"><div>--comm-indigo-50</div></div>
    <div class="color-tag indigo-100-background"><div>--comm-indigo-100</div></div>
    <div class="color-tag indigo-200-background"><div>--comm-indigo-200</div></div>
    <div class="color-tag indigo-300-background"><div>--comm-indigo-300</div></div>
    <div class="color-tag indigo-400-background"><div>--comm-indigo-400</div></div>
    <div class="color-tag indigo-500-background"><div>--comm-indigo-500</div></div>
    <div class="color-tag indigo-600-background"><div>--comm-indigo-600</div></div>
    <div class="color-tag indigo-700-background"><div>--comm-indigo-700</div></div>
    <div class="color-tag indigo-800-background"><div>--comm-indigo-800</div></div>
    <div class="color-tag indigo-900-background"><div>--comm-indigo-900</div></div>
    <div class="color-tag indigo-a100-background"><div>--comm-indigo-a100</div></div>
    <div class="color-tag indigo-a200-background"><div>--comm-indigo-a200</div></div>
    <div class="color-tag indigo-a400-background"><div>--comm-indigo-a400</div></div>
    <div class="color-tag indigo-a700-background"><div>--comm-indigo-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag blue-50-background"><div>--comm-blue-50</div></div>
    <div class="color-tag blue-100-background"><div>--comm-blue-100</div></div>
    <div class="color-tag blue-200-background"><div>--comm-blue-200</div></div>
    <div class="color-tag blue-300-background"><div>--comm-blue-300</div></div>
    <div class="color-tag blue-400-background"><div>--comm-blue-400</div></div>
    <div class="color-tag blue-500-background"><div>--comm-blue-500</div></div>
    <div class="color-tag blue-600-background"><div>--comm-blue-600</div></div>
    <div class="color-tag blue-700-background"><div>--comm-blue-700</div></div>
    <div class="color-tag blue-800-background"><div>--comm-blue-800</div></div>
    <div class="color-tag blue-900-background"><div>--comm-blue-900</div></div>
    <div class="color-tag blue-a100-background"><div>--comm-blue-a100</div></div>
    <div class="color-tag blue-a200-background"><div>--comm-blue-a200</div></div>
    <div class="color-tag blue-a400-background"><div>--comm-blue-a400</div></div>
    <div class="color-tag blue-a700-background"><div>--comm-blue-a700</div></div>
  </div>
</div>

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag light-blue-50-background"><div>--comm-light-blue-50</div></div>
    <div class="color-tag light-blue-100-background"><div>--comm-light-blue-100</div></div>
    <div class="color-tag light-blue-200-background"><div>--comm-light-blue-200</div></div>
    <div class="color-tag light-blue-300-background"><div>--comm-light-blue-300</div></div>
    <div class="color-tag light-blue-400-background"><div>--comm-light-blue-400</div></div>
    <div class="color-tag light-blue-500-background"><div>--comm-light-blue-500</div></div>
    <div class="color-tag light-blue-600-background"><div>--comm-light-blue-600</div></div>
    <div class="color-tag light-blue-700-background"><div>--comm-light-blue-700</div></div>
    <div class="color-tag light-blue-800-background"><div>--comm-light-blue-800</div></div>
    <div class="color-tag light-blue-900-background"><div>--comm-light-blue-900</div></div>
    <div class="color-tag light-blue-a100-background"><div>--comm-light-blue-a100</div></div>
    <div class="color-tag light-blue-a200-background"><div>--comm-light-blue-a200</div></div>
    <div class="color-tag light-blue-a400-background"><div>--comm-light-blue-a400</div></div>
    <div class="color-tag light-blue-a700-background"><div>--comm-light-blue-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag cyan-50-background"><div>--comm-cyan-50</div></div>
    <div class="color-tag cyan-100-background"><div>--comm-cyan-100</div></div>
    <div class="color-tag cyan-200-background"><div>--comm-cyan-200</div></div>
    <div class="color-tag cyan-300-background"><div>--comm-cyan-300</div></div>
    <div class="color-tag cyan-400-background"><div>--comm-cyan-400</div></div>
    <div class="color-tag cyan-500-background"><div>--comm-cyan-500</div></div>
    <div class="color-tag cyan-600-background"><div>--comm-cyan-600</div></div>
    <div class="color-tag cyan-700-background"><div>--comm-cyan-700</div></div>
    <div class="color-tag cyan-800-background"><div>--comm-cyan-800</div></div>
    <div class="color-tag cyan-900-background"><div>--comm-cyan-900</div></div>
    <div class="color-tag cyan-a100-background"><div>--comm-cyan-a100</div></div>
    <div class="color-tag cyan-a200-background"><div>--comm-cyan-a200</div></div>
    <div class="color-tag cyan-a400-background"><div>--comm-cyan-a400</div></div>
    <div class="color-tag cyan-a700-background"><div>--comm-cyan-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag teal-50-background"><div>--comm-teal-50</div></div>
    <div class="color-tag teal-100-background"><div>--comm-teal-100</div></div>
    <div class="color-tag teal-200-background"><div>--comm-teal-200</div></div>
    <div class="color-tag teal-300-background"><div>--comm-teal-300</div></div>
    <div class="color-tag teal-400-background"><div>--comm-teal-400</div></div>
    <div class="color-tag teal-500-background"><div>--comm-teal-500</div></div>
    <div class="color-tag teal-600-background"><div>--comm-teal-600</div></div>
    <div class="color-tag teal-700-background"><div>--comm-teal-700</div></div>
    <div class="color-tag teal-800-background"><div>--comm-teal-800</div></div>
    <div class="color-tag teal-900-background"><div>--comm-teal-900</div></div>
    <div class="color-tag teal-a100-background"><div>--comm-teal-a100</div></div>
    <div class="color-tag teal-a200-background"><div>--comm-teal-a200</div></div>
    <div class="color-tag teal-a400-background"><div>--comm-teal-a400</div></div>
    <div class="color-tag teal-a700-background"><div>--comm-teal-a700</div></div>
  </div>
</div>

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag green-50-background"><div>--comm-green-50</div></div>
    <div class="color-tag green-100-background"><div>--comm-green-100</div></div>
    <div class="color-tag green-200-background"><div>--comm-green-200</div></div>
    <div class="color-tag green-300-background"><div>--comm-green-300</div></div>
    <div class="color-tag green-400-background"><div>--comm-green-400</div></div>
    <div class="color-tag green-500-background"><div>--comm-green-500</div></div>
    <div class="color-tag green-600-background"><div>--comm-green-600</div></div>
    <div class="color-tag green-700-background"><div>--comm-green-700</div></div>
    <div class="color-tag green-800-background"><div>--comm-green-800</div></div>
    <div class="color-tag green-900-background"><div>--comm-green-900</div></div>
    <div class="color-tag green-a100-background"><div>--comm-green-a100</div></div>
    <div class="color-tag green-a200-background"><div>--comm-green-a200</div></div>
    <div class="color-tag green-a400-background"><div>--comm-green-a400</div></div>
    <div class="color-tag green-a700-background"><div>--comm-green-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag light-green-50-background"><div>--comm-light-green-50</div></div>
    <div class="color-tag light-green-100-background"><div>--comm-light-green-100</div></div>
    <div class="color-tag light-green-200-background"><div>--comm-light-green-200</div></div>
    <div class="color-tag light-green-300-background"><div>--comm-light-green-300</div></div>
    <div class="color-tag light-green-400-background"><div>--comm-light-green-400</div></div>
    <div class="color-tag light-green-500-background"><div>--comm-light-green-500</div></div>
    <div class="color-tag light-green-600-background"><div>--comm-light-green-600</div></div>
    <div class="color-tag light-green-700-background"><div>--comm-light-green-700</div></div>
    <div class="color-tag light-green-800-background"><div>--comm-light-green-800</div></div>
    <div class="color-tag light-green-900-background"><div>--comm-light-green-900</div></div>
    <div class="color-tag light-green-a100-background"><div>--comm-light-green-a100</div></div>
    <div class="color-tag light-green-a200-background"><div>--comm-light-green-a200</div></div>
    <div class="color-tag light-green-a400-background"><div>--comm-light-green-a400</div></div>
    <div class="color-tag light-green-a700-background"><div>--comm-light-green-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag lime-50-background"><div>--comm-lime-50</div></div>
    <div class="color-tag lime-100-background"><div>--comm-lime-100</div></div>
    <div class="color-tag lime-200-background"><div>--comm-lime-200</div></div>
    <div class="color-tag lime-300-background"><div>--comm-lime-300</div></div>
    <div class="color-tag lime-400-background"><div>--comm-lime-400</div></div>
    <div class="color-tag lime-500-background"><div>--comm-lime-500</div></div>
    <div class="color-tag lime-600-background"><div>--comm-lime-600</div></div>
    <div class="color-tag lime-700-background"><div>--comm-lime-700</div></div>
    <div class="color-tag lime-800-background"><div>--comm-lime-800</div></div>
    <div class="color-tag lime-900-background"><div>--comm-lime-900</div></div>
    <div class="color-tag lime-a100-background"><div>--comm-lime-a100</div></div>
    <div class="color-tag lime-a200-background"><div>--comm-lime-a200</div></div>
    <div class="color-tag lime-a400-background"><div>--comm-lime-a400</div></div>
    <div class="color-tag lime-a700-background"><div>--comm-lime-a700</div></div>
  </div>
</div>

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag yellow-50-background"><div>--comm-yellow-50</div></div>
    <div class="color-tag yellow-100-background"><div>--comm-yellow-100</div></div>
    <div class="color-tag yellow-200-background"><div>--comm-yellow-200</div></div>
    <div class="color-tag yellow-300-background"><div>--comm-yellow-300</div></div>
    <div class="color-tag yellow-400-background"><div>--comm-yellow-400</div></div>
    <div class="color-tag yellow-500-background"><div>--comm-yellow-500</div></div>
    <div class="color-tag yellow-600-background"><div>--comm-yellow-600</div></div>
    <div class="color-tag yellow-700-background"><div>--comm-yellow-700</div></div>
    <div class="color-tag yellow-800-background"><div>--comm-yellow-800</div></div>
    <div class="color-tag yellow-900-background"><div>--comm-yellow-900</div></div>
    <div class="color-tag yellow-a100-background"><div>--comm-yellow-a100</div></div>
    <div class="color-tag yellow-a200-background"><div>--comm-yellow-a200</div></div>
    <div class="color-tag yellow-a400-background"><div>--comm-yellow-a400</div></div>
    <div class="color-tag yellow-a700-background"><div>--comm-yellow-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag amber-50-background"><div>--comm-amber-50</div></div>
    <div class="color-tag amber-100-background"><div>--comm-amber-100</div></div>
    <div class="color-tag amber-200-background"><div>--comm-amber-200</div></div>
    <div class="color-tag amber-300-background"><div>--comm-amber-300</div></div>
    <div class="color-tag amber-400-background"><div>--comm-amber-400</div></div>
    <div class="color-tag amber-500-background"><div>--comm-amber-500</div></div>
    <div class="color-tag amber-600-background"><div>--comm-amber-600</div></div>
    <div class="color-tag amber-700-background"><div>--comm-amber-700</div></div>
    <div class="color-tag amber-800-background"><div>--comm-amber-800</div></div>
    <div class="color-tag amber-900-background"><div>--comm-amber-900</div></div>
    <div class="color-tag amber-a100-background"><div>--comm-amber-a100</div></div>
    <div class="color-tag amber-a200-background"><div>--comm-amber-a200</div></div>
    <div class="color-tag amber-a400-background"><div>--comm-amber-a400</div></div>
    <div class="color-tag amber-a700-background"><div>--comm-amber-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag orange-50-background"><div>--comm-orange-50</div></div>
    <div class="color-tag orange-100-background"><div>--comm-orange-100</div></div>
    <div class="color-tag orange-200-background"><div>--comm-orange-200</div></div>
    <div class="color-tag orange-300-background"><div>--comm-orange-300</div></div>
    <div class="color-tag orange-400-background"><div>--comm-orange-400</div></div>
    <div class="color-tag orange-500-background"><div>--comm-orange-500</div></div>
    <div class="color-tag orange-600-background"><div>--comm-orange-600</div></div>
    <div class="color-tag orange-700-background"><div>--comm-orange-700</div></div>
    <div class="color-tag orange-800-background"><div>--comm-orange-800</div></div>
    <div class="color-tag orange-900-background"><div>--comm-orange-900</div></div>
    <div class="color-tag orange-a100-background"><div>--comm-orange-a100</div></div>
    <div class="color-tag orange-a200-background"><div>--comm-orange-a200</div></div>
    <div class="color-tag orange-a400-background"><div>--comm-orange-a400</div></div>
    <div class="color-tag orange-a700-background"><div>--comm-orange-a700</div></div>
  </div>
</div>

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag deep-orange-50-background"><div>--comm-deep-orange-50</div></div>
    <div class="color-tag deep-orange-100-background"><div>--comm-deep-orange-100</div></div>
    <div class="color-tag deep-orange-200-background"><div>--comm-deep-orange-200</div></div>
    <div class="color-tag deep-orange-300-background"><div>--comm-deep-orange-300</div></div>
    <div class="color-tag deep-orange-400-background"><div>--comm-deep-orange-400</div></div>
    <div class="color-tag deep-orange-500-background"><div>--comm-deep-orange-500</div></div>
    <div class="color-tag deep-orange-600-background"><div>--comm-deep-orange-600</div></div>
    <div class="color-tag deep-orange-700-background"><div>--comm-deep-orange-700</div></div>
    <div class="color-tag deep-orange-800-background"><div>--comm-deep-orange-800</div></div>
    <div class="color-tag deep-orange-900-background"><div>--comm-deep-orange-900</div></div>
    <div class="color-tag deep-orange-a100-background"><div>--comm-deep-orange-a100</div></div>
    <div class="color-tag deep-orange-a200-background"><div>--comm-deep-orange-a200</div></div>
    <div class="color-tag deep-orange-a400-background"><div>--comm-deep-orange-a400</div></div>
    <div class="color-tag deep-orange-a700-background"><div>--comm-deep-orange-a700</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag brown-50-background"><div>--comm-brown-50</div></div>
    <div class="color-tag brown-100-background"><div>--comm-brown-100</div></div>
    <div class="color-tag brown-200-background"><div>--comm-brown-200</div></div>
    <div class="color-tag brown-300-background"><div>--comm-brown-300</div></div>
    <div class="color-tag brown-400-background"><div>--comm-brown-400</div></div>
    <div class="color-tag brown-500-background"><div>--comm-brown-500</div></div>
    <div class="color-tag brown-600-background"><div>--comm-brown-600</div></div>
    <div class="color-tag brown-700-background"><div>--comm-brown-700</div></div>
    <div class="color-tag brown-800-background"><div>--comm-brown-800</div></div>
    <div class="color-tag brown-900-background"><div>--comm-brown-900</div></div>
  </div>
  <div style="margin-left: 40px;">
    <div class="color-tag grey-50-background"><div>--comm-grey-50</div></div>
    <div class="color-tag grey-100-background"><div>--comm-grey-100</div></div>
    <div class="color-tag grey-200-background"><div>--comm-grey-200</div></div>
    <div class="color-tag grey-300-background"><div>--comm-grey-300</div></div>
    <div class="color-tag grey-400-background"><div>--comm-grey-400</div></div>
    <div class="color-tag grey-500-background"><div>--comm-grey-500</div></div>
    <div class="color-tag grey-600-background"><div>--comm-grey-600</div></div>
    <div class="color-tag grey-700-background"><div>--comm-grey-700</div></div>
    <div class="color-tag grey-800-background"><div>--comm-grey-800</div></div>
    <div class="color-tag grey-900-background"><div>--comm-grey-900</div></div>
  </div>
</div>

<div class="layout horizontal start" style="margin-top: 40px;">
  <div>
    <div class="color-tag blue-grey-50-background"><div>--comm-blue-grey-50</div></div>
    <div class="color-tag blue-grey-100-background"><div>--comm-blue-grey-100</div></div>
    <div class="color-tag blue-grey-200-background"><div>--comm-blue-grey-200</div></div>
    <div class="color-tag blue-grey-300-background"><div>--comm-blue-grey-300</div></div>
    <div class="color-tag blue-grey-400-background"><div>--comm-blue-grey-400</div></div>
    <div class="color-tag blue-grey-500-background"><div>--comm-blue-grey-500</div></div>
    <div class="color-tag blue-grey-600-background"><div>--comm-blue-grey-600</div></div>
    <div class="color-tag blue-grey-700-background"><div>--comm-blue-grey-700</div></div>
    <div class="color-tag blue-grey-800-background"><div>--comm-blue-grey-800</div></div>
    <div class="color-tag blue-grey-900-background"><div>--comm-blue-grey-900</div></div>
  </div>
</div>
