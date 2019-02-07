# Vue + TypeScript

本プロジェクトでは [vue-class-component](https://github.com/vuejs/vue-class-component) と [vue-property-decorator](https://github.com/kaorun343/vue-property-decorator) を利用しています。これらのライブラリを利用して Vue を TypeScript で記述することにより、JavaScript にくらべて簡潔で綺麗にコーディングすることができます。

## Data

TypeScript でインスタンス変数を定義すると、その変数は HTML でバインディング可能になります。

```html
<template>
  <div>{{ m_message }}</div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'
  …

  @Component
  export default class ExampleView extends mixins(BaseComponent) {
    m_message: string = ''
  }
</script>
```

インスタンス変数の値が変わると HTML でバインドされた箇所も自動で更新されます。

インスタンス変数にはオブジェクトも設定できます。

```html
<template>
  <div>{{ m_post.message }}</div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'

  @Component
  export default class ExampleView extends mixins(BaseComponent) {
    m_post: Post = {
      title: '',
      message: '',
    }
  }

  m_postButtonOnClick() {
    this.m_post.message = 'something'
  }
</script>
```

注意点として、インスタンス変数は必ず定義時に初期化してください。初期化しないとバインディングが機能しません。

次はバインディングが機能しない例です。

```ts
@Component
export default class ExampleView extends mixins(BaseComponent) {
  // 変数を初期化していないのでバインディングが機能しない
  m_message: string
}
```

## Props

`@Prop`を指定した変数は HTML 属性として外部に公開され、その属性を経由して外部から値を受け取ることができます。

```ts
import {Component, Props} from 'vue-property-decorator'

@Component
export default class BlogPost extends mixins(BaseComponent) {
  // 変数名はキャメルケース
  @Prop()
  postTitle: string
}
```

```html
<!-- HTMLの属性名はケバブケース -->
<blog-post post-title="hello!"></blog-post>
```

Props は Data と同様に HTML にもバインディング可能です。

```html
<template>
  <div>{{ postTitle }}</div>
</template>

<script lang="ts">
  import {Component, Props} from 'vue-property-decorator'

  @Component
  export default class BlogPost extends mixins(BaseComponent) {
    @Prop()
    postTitle: string
  }
</script>
```

注意点として、変数に直接値を設定することはできません。

```ts
// Vueでエラーが起こる
@Prop()
postTitle: string = 'hello!'
```

初期値は`@Prop`の`default`オプションで設定できます。

```ts
@Prop({default: 'hello!'})
postTitle: string
```

## Computed

算出プロパティは getter になります。getter の中で Data または Props の変数を参照すると、変数の値変更を感知し、算出プロパティが自動で再実行されます。これにより HTML でバインドしている箇所も自動で更新されます。

```html
<template>
  <div>{{ m_reversedMessage }}</div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'

  @Component()
  export default class ExampleView extends mixins(BaseComponent) {
    m_message: string = ''

    // 算出プロパティ
    get m_reversedMessage() {
      return this.m_message
        .split('')
        .reverse()
        .join('')
    }
  }
</script>
```

算出プロパティは他の算出プロパティを参照することもできます。

```ts
get m_doubleReversedMessage() {
  // 算出プロパティの中で他の算出プロパティを参照
  return this.m_reversedMessage.split('').reverse().join('')
}
```

## Watch

`@Watch`に**変数パス**を指定することで変数、算出プロパティ、オブジェクトのいずれかのプロパティまたは特定プロパティの変更、を監視することができます。

次はインスタンス変数の変更を監視しています。

```ts
import {Component, Watch} from 'vue-property-decorator'

@Component()
export default class ExampleView extends mixins(BaseComponent) {
  m_message: string = ''

  @Watch('m_message')
  m_messageOnChange(newValue: string, oldValue: string): void {
    …
  }
}
```

次は算出プロパティの変更を監視しています。

```ts
@Component()
export default class ExampleView extends mixins(BaseComponent) {
  get m_reversedMessage() {
    …
  }

  @Watch('m_reversedMessage')
  m_reversedMessageOnChange(newValue: string, oldValue: string): void {
    …
  }
}
```

次はオブジェクトのいずれかのプロパティ変更(`title`、`message`など)を監視しています。この場合はオプションの`deep`に`true`を指定します。

```ts
@Component()
export default class ExampleView extends mixins(BaseComponent) {
  m_post: Post = {
    title: '',
    message: '',
  }

  @Watch('m_post', {deep: true})
  m_postOnChange(newValue: Post, oldValue: Post): void {
    …
  }
}
```

次はオブジェクトの特定のプロパティ変更(`m_post.message`)を監視しています。

```ts
@Component()
export default class ExampleView extends mixins(BaseComponent) {
  m_post: Post = {
    title: '',
    message: '',
  }

  @Watch('m_post.message')
  m_postMessageOnChange(newValue: string, oldValue: string): void {
    …
  }
}
```

## Event handlers

イベントハンドラは普通のメソッドになります。

```html
<template>
  <button v-on:click="m_sendButtonOnClick">Send</button>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'

  @Component()
  export default class ExampleView extends mixins(BaseComponent) {
    get m_sendButtonOnClick(event) {
      console.log(event.target.tagName)
    }
  }
</script>
```

以下は`v-on`の省略記法`@`で上記と同じ意味になります。

```html
<button @click="m_sendButtonOnClick">Send</button>
```

イベントハンドラには引数をわたすことができます。

```html
<template>
  <template v-for="(product, index) in products">
    <button @click="m_addButonOnClick(product)">Add</button>
  </template>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'

  @Component()
  export default class ExampleView extends mixins(BaseComponent) {
    get m_addButonOnClick(product: Product) {
      …
    }
  }
</script>
```

引数に加え、イベントオブジェクトである`$event`もわたすこともできます。

```html
<template>
  <template v-for="(product, index) in products">
    <button @click="m_addButonOnClick(product, $event)">Add</button>
  </template>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'

  @Component()
  export default class ExampleView extends mixins(BaseComponent) {
    get m_addButonOnClick(product: Product, event: Event) {
      …
    }
  }
</script>
```

## Lifecycle hooks

Vue には`created`、`mounted`、`updated`、…といったライフサイクルがあり、これらのサイクルをフックできます。フックするにはこれらの名前のメソッドを定義します。

```ts
@Component()
export default class ExampleView extends mixins(BaseComponent) {
  created() {
    …
  }
}
```

## 他のコンポーネントを使用する

他で作成されたコンポーネントを使用する方法を次に示します。

1.  他のコンポーネントをインポート
2.  インポートしたコンポーネントを HTML 上でなんというタグ名前で使用するかを設定
3.  ｢2｣で設定したタグ名を HTML 上で使用する

```html
<template>
  <div>
    <!-- 3. ｢2｣で設定したタグ名でインポートしたコンポーネントを使用 -->
    <greet-message ref="greetMessage"></greet-message>
  </div>
</template>

<script lang="ts">
  import {Component} from 'vue-property-decorator'

  // 1. 他のコンポーネントをインポート
  import GreetMessage from './greet-message.vue'

  @Component({
    components: {
      // 2. インポートしたコンポーネントをHTML上でなんというタグ名前で使用するかを設定
      'greet-message': GreetMessage,
    },
  })
  export default class ExampleView extends mixins(BaseComponent) {
    get m_greetMessage(): GreetMessage {
      return this.$refs.greetMessage as GreetMessage
    }

    created() {
      // インポートしたコンポーネントのメソッドやプロパティは
      // コード補完で表示され、アクセスすることができる。
      this.m_greetMessage.greet()
    }
  }
</script>
```
