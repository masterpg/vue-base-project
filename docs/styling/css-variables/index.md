# CSS 変数

本プロジェクトでは CSS で共通的に使用する値を [CSS 変数](https://developer.mozilla.org/ja/docs/Web/CSS/Using_CSS_variables)として定義しています。ここでは CSS 変数の定義と使用方法について説明していきます。

## CSS 変数の定義と使用方法

`src/styles/variables/colors.css`にはさまざまな色が CSS 変数として定義されています。

```css
:root {
  --comm-red-50: #ffebee;
}
```

ここでは CSS 変数`--comm-red-50`に`#ffebee`という色が設定されています。

CSS 変数は接頭辞に`--`を付ける決まりがあります。

`:root`に CSS 変数を定義するとグローバルに CSS 変数が定義されることになり、プロジェクトのどこでもこの CSS 変数を利用することができます。

CSS 変数は`.vue`、`.css`、`.css`、`.styl`、`.scss`などさまざまファイルで利用することができます。

以下は CSS 変数を利用する例です。

```html
<style scoped>
  div {
    color: var(--comm-red-50);
  }
</style>
```

定義した CSS 変数を適用するには`var()`関数を使用します。

上記では`div`の`color`に CSS 変数`--comm-red-50`で設定された値が適用されます。

また上記では postcss を使用していますが、sass のような他のプリプロセッサやプレーンな css でも CSS 変数を使用することができます。

## CSS 変数のスコープ

上記では`:root`に CSS 変数を定義したことでプロジェクトのどこでも使用できる CSS 変数になりましたが、このスコープを狭めることもできます。

次は`a`要素に CSS 変数を定義することで、`a`要素以外には CSS 変数が適用されないことを示しています。

```html
<style>
  a {
    --blue-text: blue;
  }
  .blue {
    color: var(--blue-text);
  }
</style>

<!-- テキストが青色になる -->
<a class="blue" href="#">hello</a>

<!-- テキストが青色にならない -->
<div class="blue">hello</div>
```
