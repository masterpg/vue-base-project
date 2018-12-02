# コンポーネント

Vue で作成したコンポーネントはパブリックなプロパティやメソッドを提供することで外部とコミュニケーションする経路を限定し、自身をカプセル化します。

スタイリングも同様に、コンポーネントの見た目をカスタマイズできる部分のみ公開するよう経路を限定し、カプセル化しましょう。経路を限定することで外部から意図しないスタイル変更が行われなくなります。

この機能を実現するには [CSS 変数](/styling/css-variables/index.md) を利用します。

## CSS 変数をコンポーネントに適用する

CSS 変数をコンポーネントに適用する例を見てみましょう。

`src/views/abc-view/greet-message.vue`

```html
<style lang="postcss" scoped>
  div {
    color: var(--greet-message-color, #f44336);
  }
</style>
```

CSS 変数を適用するには`var()`関数を使用します。

上記では`div`の`color`に CSS 変数`--greet-message-color`で設定された値が適用されます。第 2 引数で指定された値はデフォルト値で、第 1 引数の`--greet-message-color`に値が設定されていなかった場合に使用されます。

また上記では postcss が使用されていますが、sass のような他のプリプロセッサやプレーンな css でも CSS 変数を使用することができます。

名前の付け方ですが、`--<コンポーネント名>-<スタイル名>`とするのがよいでしょう。上記の例でいうと、`greet-message`がコンポーネント名で、`color`がスタイル名となります。この名前からは`GreetMessage`コンポーネントの文字色を設定するといった内容が推測できるでしょう。

## CSS 変数の値を設定する

上記ではコンポーネントの外部からスタイルを設定できるよう`--greet-message-color`という CSS 変数が公開されました。ここではこの CSS 変数に値を設定する方法を示します。

以下のケースでは CSS 変数に設定する値を状況によって切り替えています。通常の文字色は青色を、エラーが発生した場合は赤色を設定しています。

```html
<style lang="postcss" scoped>
  .normal {
    --greet-message-color: blue;
  }
  .error {
    --greet-message-color: red;
  }
</style>

<template>
  <greet-message class="normal" :class="{ error: isError }"></greet-message>
</template>
```

通常は`class`に`normal`が適用されますが、エラーが発生して`isError`が`true`になると`error`クラスが適用されるよう実装されています。
