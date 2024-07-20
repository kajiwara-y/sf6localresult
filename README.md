# pages-workerjs

* Creating `_worker.js` from `_worker.ts`.
* `index.ts` is a normal workers app.
* Put your static files on `pages/static/*`.

## Usage

Install:

```
npm install
```

Dev:

```
npm run dev
```

Deploy:

```
npm run deploy
```

## フォルダ構成案

```
/project-root
│
├── src/
│   ├── components/           # JSXコンポーネント
│   │   ├── common/           # 共通のコンポーネント
│   │   └── pages/            # ページ固有のコンポーネント
│   │
│   ├── pages/                # Pageオブジェクト
│   │   ├── index.tsx
│   │   └── ...
│   │
│   ├── models/               # データモデルとDB操作
│   │   ├── user.ts
│   │   └── ...
│   │
│   ├── services/             # ビジネスロジック
│   │   ├── userService.ts
│   │   └── ...
│   │
│   ├── types/                # 型定義
│   │   ├── index.ts          # 型定義のエクスポート
│   │   ├── user.ts
│   │   └── ...
│   │
│   ├── middleware/           # カスタムミドルウェア
│   │   ├── auth.ts
│   │   └── ...
│   │
│   ├── utils/                # ユーティリティ関数
│   │   ├── database.ts       # DB接続ヘルパー
│   │   └── ...
│   │
│   ├── config/               # 設定ファイル
│   │   ├── database.ts
│   │   └── ...
│   │
│   └── app.ts                # メインのアプリケーションファイル
│
├── public/                   # 静的ファイル
│   ├── images/
│   ├── styles/
│   └── ...
│
├── tests/                    # テストファイル
│
├── package.json
├── tsconfig.json
└── README.md
```

## Author

Yusuke Wada

## License

MIT
