import { Hono } from 'hono'
import { indexPage } from './pages'
import { matchSubmitPage } from './pages/matchSubmit'
import { getCharacterInfo } from './api/character'
import { oidcAuthMiddleware, getAuth, revokeSession } from '@hono/oidc-auth';
import {serveStatic} from './middleware/serveStatic'

const app = new Hono()
app.get('/logout', async (c) => {
  await revokeSession(c)
  return c.text('You have been successfully logged out!')
})
app.get('/favicon.ico', serveStatic())
app.get('/static/*', serveStatic())
app.use('*', oidcAuthMiddleware())
app.use('*', async (c, next) => {
  // Authorize user with email address
  const auth = await getAuth(c)
  await next()
})
app.get('/', indexPage)
app.post('/', matchSubmitPage)
app.get('/api/character', getCharacterInfo)
export default app
