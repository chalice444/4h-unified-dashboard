# 4H Dashboard

4H fitnessの月次KPIダッシュボードです。Claude Artifactsから移した元コードを、React/Viteで起動できる構成にしています。

## 起動方法

```bash
npm install
npm run dev
```

表示されたローカルURLをブラウザで開きます。

## ビルド

```bash
npm run build
npm run preview
```

GitHub Actionsでも `npm install` と `npm run build` を実行して、Viteビルドを確認します。

## デプロイ

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

GitHubリポジトリをNetlifyに接続し、上記設定でデプロイできます。

### Vercel

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

GitHubリポジトリをVercelに接続し、Viteとしてデプロイできます。

## 実装メモ

- 元コードの見た目、機能、数値ロジックは `claude-artifact-original.jsx` 側をそのまま使っています。
- Claude Artifacts固有の `window.storage` は、Vite/Netlify/Vercel上でも動くように `src/main.jsx` で `localStorage` 互換の簡易実装を用意しています。
- 共有ストレージの完全な代替ではないため、ブラウザごとのローカル保存になります。元コード内の数値ロジックは変更していません。
