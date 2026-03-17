# 表札シミュレーター

指定したデザイン・フォント・刻印内容から、表札の完成イメージをリアルタイムに確認できる Web アプリです。

## 起動方法

```bash
npm install
npm run dev
```

ブラウザで以下を開いてください。

```text
http://localhost:3000
```

## GitHub Pages へのデプロイ

このプロジェクトは GitHub Actions で GitHub Pages に自動デプロイできます。

### 1. リポジトリ設定

GitHub のリポジトリ設定で以下を確認してください。

- Settings > Pages > Build and deployment
- Source: GitHub Actions

### 2. デプロイ方法

`main` ブランチへ push すると、ワークフロー `Deploy to GitHub Pages` が実行されて公開されます。

手動実行したい場合は、Actions タブから `Deploy to GitHub Pages` の `Run workflow` を実行してください。

### 3. ローカルで静的ビルド確認

```bash
npm run build
```

`out/` が生成されれば、Pages 用の静的ファイル出力は成功です。
