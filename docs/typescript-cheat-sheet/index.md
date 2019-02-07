
# TypeScript チートシート

```js
// 変数はJavaScriptと同じですが、型を付けて定義することができます。
const myString: string
const myNumber: number
const myWhatever: any

// この型は`x`と`y`の`number`型をもつオブジェクトリテラルです。
const myComplexObject: {x: number; y: number} = {x: 0, y: 0}

// (rad: number) => number はこれ自体が型で、この型の変数が`rad2deg`です。
// `rad2deg`にはこの型に合致した関数の実装が設定されています。
const rad2deg: (rad: number) => number = (radians) => {
  return radians * (180 / Math.PI)
}

// () => void はこれ自体が型で、この型の変数がnopです。
// `nop`にはこの型に合致した何もしない関数が設定されています。
const nop: () => void = () => {}

// `number`型の配列です。
const myNumberArray: number[] = [0, 1, 2, 3]

// この配列には上記で定義した`myComplexObject`の型と同じ型のオブジェクトが格納されなければなりません。
const myAnonymousComplexArray: Array<typeof myComplexObject> = [
  myComplexObject,
  {x: 0, y: 0},
]

// `number`型配列の配列です。
const myNestedNumberArray: number[][] = [
  [1, 2, 3],
  [0, 1, 2],
]

// 関数には引数の型と戻り値の型を指定できます:
// function <functionName>(<argumentName>: <argumentType>): <returnType>
// 戻り値を返さない場合はvoidを指定します。
// 任意の引数を指定するには`?`を付与します。デフォルト値を指定した引数も任意の引数と判断されます。
// 任意の引数は通常の引数より後に定義する必要があります(つまりarg3はarg2より前に定義できません)。
// `arg3`は任意の引数です。`arg3`に値が設定されない場合は`undefined`になります。
// `arg4`は常に値をもちます(ただし`undefined`または`null`が指定された場合はその限りではありません)
function functionName(arg1: string, arg2: number, arg3?: any[], arg4 = 'default value'): void {
  if (typeof(arg3) !== 'undefined') {
    console.log(arg3.length)
  }
}

// 関数も型であり、変数の型として使用できます。
// 以下の`functionTypeDef`は引数を4つもち、戻り値が`void`の関数型です。
// 丸括弧は関数であることを示し、`=>`は戻り値の型を示します。
let functionTypeDef: (arg1: string, arg2: number, arg3?: any[], arg4?: string) => void

functionTypeDef = (a, b, c?, d?) => { /* do work */ }

// `c`と`d`は任意の引数なので、これらがなくても`functionTypeDef`変数に以下の関数を設定できます。
functionTypeDef = (a, b) => {}

// `functionTypeDef`変数の型と`functionName`関数はシグネチャが同じです。
// このため`functionTypeDef`に`functionName`を代入できます。
functionTypeDef = functionName
```

## インタフェースとクラス

```ts

// TypeScriptにはインタフェースとクラスがあります。

interface MyInterface {
  property1: string
  doSomething(arg1: string, arg2: number): number
}

class BaseClass {
  // クラスには、静的メソッドまたは静的プロパティをもつことができます。
  static getVersion(): string { return 'v.1.0'; }

  // クラスはコンストラクタメソッドをもつことができます。
  // `publicProp`と`privateProp`はインスタンス変数の省略記法です。
  constructor(public publicProp: string, private privateProp: string[]) {}
}

// クラスは、クラスとインタフェースを継承できます。
class SubClass extends BaseClass implements MyInterface {
  // TypeScriptでは静的メソッドもオーバーライドでき、さらにスーパークラスの静的メソッドにもアクセスできます。
  static getVersion(): string {
    return super.getVersion() + ' beta'
  }

  // プロパティまたはメソッドのデフォルトのアクセス修飾子は`public`です。
  initialized: boolean

  // インタフェースで定義されたメソッドのオーバーライドは必須で、メソッド名とシグネチャは一致しなくてはなりません。
  // ただし引数の名前は一致していなくてもかまいません。
  doSomething(f: string, f2: number) { return 0; }

  // サブクラスのコンストラクタではスーパークラスのコンストラクタの呼び出しは必須です。
  constructor(public property1: string) {
    super(property1, ['private property'])
    this.initialized = true
  }
}

// 静的メソッドの呼び出し
const classVersion = SubClass.getVersion()

// クラスのインスタンス化
const subClass: SubClass = new SubClass('property1Value')

// インスタンスメソッドの呼び出し
subClass.doSomething('do', 1)

// インタフェースとクラスのキャスト
(subClass as MyInterface).property1 = 'set new value'
(subClass as BaseClass).publicProp = 'set new value'

// `MyInterface`を継承した匿名オブジェクト
const anonymousMyInterfaceObject: MyInterface = {
  property1: 'Test',
  doSomething: (arg1: string, arg2: number): number => {
    return arg2 + arg2
  },
}

// `subClass`と`anonymousMyInterfaceObject`は両方とも
// `MyInterface`インタフェースを実装しているため、`MyInterface`型の配列へ一緒に格納することができます。
const myInterfaceArray: MyInterface[] = [
  subClass,
  anonymousMyInterfaceObject,
]

// 上記のような型付けされた配列も`any[]`配列へダウンキャスとできます。
const anyArray: any[] = myInterfaceArray

// 連想配列の`key`の型は`string`または`number`になります。
// `key`の部分は分かりやすい任意の名前をつけてください。
// ここでのキーは`key`という名前で`string`型です。格納される値は`MyInterface`型のオブジェクトです。
const stringKeyDictionary: {[key: string]: MyInterface} = {}
stringKeyDictionary['FirstKey'] = subClass
stringKeyDictionary['SecondKey'] = anonymousMyInterfaceObject
console.log(stringKeyDictionary)

// ここでのキーは`index`という名前で`string`型です。格納される値は`MyInterface`型のオブジェクトです。
const numberKeyDictionary: {[index: number]: MyInterface} = {}
numberKeyDictionary[4] = subClass
numberKeyDictionary[10000] = anonymousMyInterfaceObject
console.log(numberKeyDictionary)

// クラス定義でのコンストラクタ定義は任意です。
class Foo {
  prop: string = 'Hello'
}

let foobar: Foo = new Foo()

// 変数に「型自体」を格納することができます。
const FooBuilder: typeof Foo = Foo

// `FooBuilder`は`Foo`の別名です。
// 以下は`new Foo()`と同じ意味になります。
foobar = new FooBuilder()
console.log(foobar.prop)
```

