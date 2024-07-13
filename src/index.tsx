import { Hono } from 'hono'
import { html } from 'hono/html'
import { CharacterInfo } from './types';
import {Top} from './top'
const app = new Hono()


// 配列の定義
const CharacterInfoArray: CharacterInfo[] = [];

// 値を追加する
CharacterInfoArray.push({ name: "リュウ", filePath: "/static/icon/iconA01.png" });
CharacterInfoArray.push({ name: "ルーク", filePath: "/static/icon/iconA02.png" });
CharacterInfoArray.push({ name: "ジェイミー", filePath: "/static/icon/iconA03.png" });
app.get('/', (c) => {
  return c.html(<Top characterArray={CharacterInfoArray} />)
})

export default app
