import { Hono } from 'hono'
import { html } from 'hono/html'
import { CharacterInfo,UserInfo } from './types';
import {Top} from './top'
import { D1QB } from "workers-qb";
import { oidcAuthMiddleware, getAuth } from '@hono/oidc-auth';
const app = new Hono()

app.get('/', async (c) => {
  const qb = new D1QB(c.env.DB);
  qb.setDebugger(true)
  const characterInfo = await qb
  .fetchAll<CharacterInfo>({
    tableName: 'CharacterInfo',
  })
  .execute()

  const auth = await getAuth(c)
  const userInfo = await qb
  .fetchOne<UserInfo>({
    tableName: 'UserInfo',
    where: {
      conditions: "email = ?1",
      params: [auth?.email as string],
    },
  })
  .execute()


  return c.html(<Top characterArray={characterInfo.results} userInfo={userInfo.results}/>)
})
app.use('*', oidcAuthMiddleware())
app.use('*', async (c, next) => {
  // Authorize user with email address
  const auth = await getAuth(c)
  await next()
})

app.get('*', async (c) => {
  const response = await c.env.ASSETS.fetch(c.req.raw);
  // clone the response to return a response with modifiable headers
  const newResponse = new Response(response.body, response)
  return newResponse
});

export default app
