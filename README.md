# vue-base-project

## 環境構築

yarn をインストールします。

```console
$ npm install -g yarn
```

yarn でプロジェクトの依存パッケージをインストールします。

```console
$ yarn install
```

## 開発サーバー

開発サーバーを起動します。

```console
$ yarn dev
```

起動したらブラウザで下記 URL にアクセスすることで各画面を確認できます。

- アプリケーション画面: http://localhost:5000
- 単体テスト実行画面: http://localhost:5000/test.html

## プロジェクトビルド

次のコマンドで本番環境を想定したプロジェクトをビルドすることができます。

```console
$ yarn build
```

本番環境用のビルド結果を開発サーバーで確認するには次のコマンドを実行します。

```console
$ yarn stg
```

起動したらブラウザで http://localhost:5000 にアクセスすることで画面が表示されます。

## GitBook

GitBook のサーバーを起動します。

```console
$ yarn docs
```

起動したらブラウザで下記 URL にアクセスすることで各画面を確認できます。

- GitBook 画面: http://localhost:4000
