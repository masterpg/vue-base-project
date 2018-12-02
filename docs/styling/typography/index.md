# Typography

本プロジェクトでは Material Design spec Roboto Font を使用し、以下の CSS クラスを定義しています。

## CSS クラス

`src/styles/_typography.pcss`には次の CSS クラスが定義されています。

| Scale Category                                                                    | Class               | Size  | Weight |
| :------------------------------------------------------------------------------   | :-----------------  | :---- | :----- |
| <div class="comm-font-display4" style="color: var(--comm-grey-600);">H1</div>     | .comm-font-display4 | 112px | 300    |
| <div class="comm-font-display3" style="color: var(--comm-grey-600);">H2</div>     | .comm-font-display3 | 56px  | 400    |
| <div class="comm-font-display2" style="color: var(--comm-grey-600);">H3</div>     | .comm-font-display2 | 45px  | 400    |
| <div class="comm-font-display1" style="color: var(--comm-grey-600);">H4</div>     | .comm-font-display1 | 34px  | 400    |
| <div class="comm-font-headline" style="color: var(--comm-grey-600);">H5</div>     | .comm-font-headline | 24px  | 400    |
| <div class="comm-font-title" style="color: var(--comm-grey-600);">H6</div>        | .comm-font-title    | 20px  | 500    |
| <div class="comm-font-subhead" style="color: var(--comm-grey-600);">Subhead</div> | .comm-font-subhead  | 16px  | 400    |
| <div class="comm-font-code2" style="color: var(--comm-grey-600);">Code 2</div>    | .comm-font-code2    | 14px  | 700    |
| <div class="comm-font-code1" style="color: var(--comm-grey-600);">Code 1</div>    | .comm-font-code1    | 14px  | 500    |
| <div class="comm-font-button" style="color: var(--comm-grey-600);">Button</div>   | .comm-font-button   | 14px  | 500    |
| <div class="comm-font-body2" style="color: var(--comm-grey-600);">Body 2</div>    | .comm-font-body2    | 14px  | 500    |
| <div class="comm-font-body1" style="color: var(--comm-grey-600);">Body 1</div>    | .comm-font-body1    | 14px  | 400    |
| <div class="comm-font-menu" style="color: var(--comm-grey-600);">Menu</div>       | .comm-font-menu     | 13px  | 500    |
| <div class="comm-font-caption" style="color: var(--comm-grey-600);">Caption</div> | .comm-font-caption  | 12px  | 400    |

## CSS クラス利用例

次は .vue ファイルの HTML 要素に直接フォントの CSS クラスを適用する例です。

```html
<template>
  <div>
    <p class="comm-font-body1">Hello</p>
  </div>
</template>
```

<br>

次は .vue ファイルで定義した CSS クラスにフォントのプレースホルダーを継承して利用する例です。

```html
<style lang="postcss" scoped>
  @import '../styles/typography.pcss';
  .title {
    @extend %comm-font-title;
    color: var(--comm-grey-600);
  }
</style>

<template>
  <div>
    <h6 class="title">Welcome</h6>
  </div>
</template>
```

ここでは PostCSS の機能を利用してフォントのプレースホルダーを継承しています。

まず`@import`で`typography.pcss`ファイルをインポートし、フォントのプレースホルダーを読み込みます。これにより`<style>`タグの中でフォントのプレースホルダーが利用できるようになるので、`@extend`で継承して定義されたフォントを利用しています。
