import { Hono } from 'hono'
import { indexPage } from './pages'
import { matchSubmitPage } from './pages/matchSubmit'
import { getCharacterInfo } from './api/character'
import { oidcAuthMiddleware, getAuth } from '@hono/oidc-auth';

const app = new Hono()
app.use('*', oidcAuthMiddleware())
app.use('*', async (c, next) => {
  // Authorize user with email address
  const auth = await getAuth(c)
  if (!auth?.email.endsWith('@gmail.com')) {
    return c.text('Unauthorized', 401)
  }
  await next()
})
app.get('/', indexPage)
app.post('/', matchSubmitPage)
app.get('/api/character', getCharacterInfo)
export default app
