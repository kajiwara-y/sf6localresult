import { Hono } from 'hono'
import { html } from 'hono/html'
import { CharacterInfo } from './types';
import {Top} from './top'
import { D1QB } from "workers-qb";
const app = new Hono()

app.get('/', async (c) => {
  const qb = new D1QB(c.env.DB);
  const characterInfo = await qb
  .fetchAll<CharacterInfo>({
    tableName: 'CharacterInfo',
  })
  .execute()
  return c.html(<Top characterArray={characterInfo.results} />)
})

export default app
