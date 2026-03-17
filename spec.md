# 表札デザインシミュレーター

- 表札デザインは `src/components/designs/design-options.ts` から選択
  - id に応じた `Design{id}.tsx` が表示される
- 背景色、塗りつぶし色は `src/color-options.ts` から選択
  - `Design{id}.tsx` の `fill` に ColorOption の `textColor` が渡される
  - src に値がある項目は `public/` にある背景画像が表示される
  - src が空文字の場合は `backgroundColor` で背景が塗りつぶされる

## 参考商品ページ

https://www.amazon.co.jp/Amazon%E9%99%90%E5%AE%9A%E5%93%81-%E4%B8%A1%E9%9D%A2%E3%82%B7%E3%83%BC%E3%83%AB%E4%BB%98%E3%81%8D-%E8%A1%A8%E6%9C%AD%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88-2%EF%BC%9A%E3%83%81%E3%83%BC%E3%82%AF%E3%82%A6%E3%83%83%E3%83%89%C3%97%E6%96%87%E5%AD%97%E8%89%B2%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%A0-S%E3%82%B5%E3%82%A4%E3%82%BA%EF%BC%9A80mm%C3%9740mm/dp/B0F3NF7BLL/
