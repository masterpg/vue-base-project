# Shadows

## CSS クラス

`src/styles/_shadow.pcss`には次の CSS クラスが定義されています。

##### .comm-shadow-elevation-2dp

<div class="shadow-tag comm-shadow-elevation-2dp"></div>

##### .comm-shadow-elevation-3dp

<div class="shadow-tag comm-shadow-elevation-3dp"></div>

##### .comm-shadow-elevation-4dp

<div class="shadow-tag comm-shadow-elevation-4dp"></div>

##### .comm-shadow-elevation-6dp

<div class="shadow-tag comm-shadow-elevation-6dp"></div>

##### .comm-shadow-elevation-8dp

<div class="shadow-tag comm-shadow-elevation-8dp"></div>

##### .comm-shadow-elevation-12dp

<div class="shadow-tag comm-shadow-elevation-12dp"></div>

##### .comm-shadow-elevation-16dp

<div class="shadow-tag comm-shadow-elevation-16dp"></div>

##### .comm-shadow-elevation-24dp

<div class="shadow-tag comm-shadow-elevation-24dp"></div>

<br>

## CSS クラス利用例

次は .vue ファイルで定義した CSS クラスにシャドウのプレースホルダーを継承して利用する例です。

```html
<style scoped>
  @import '../styles/shadows.pcss';
  .container {
    @extend %comm-shadow-elevation-3dp;
  }
</style>

<template>
  <div class="container">…</div>
</template>
```

ここでは PostCSS の機能を利用してプレースホルダーを継承しています。

まず`@import`で`shadow.pcss`ファイルをインポートし、シャドウのプレースホルダーを読み込みます。これにより`<style>`タグの中でシャドウのプレースホルダーが利用できるようになるので、`@extend`で継承して定義されたシャドウを利用しています。
