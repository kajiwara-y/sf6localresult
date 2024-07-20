import { Hono } from 'hono'
import { indexPage } from './pages'
import { matchSubmitPage } from './pages/matchSubmit'
import { oidcAuthMiddleware, getAuth } from '@hono/oidc-auth';

const app = new Hono()
app.get('/', indexPage)
app.post('/', matchSubmitPage)
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
