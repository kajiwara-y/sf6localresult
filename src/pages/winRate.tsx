import { Context } from 'hono'
import { WinRate } from '../components/pages/WinRate'
import { getAuth } from '@hono/oidc-auth'
import { getUserInfo } from '../services/userService'
import { getWinRate } from '../services/matchService'

export const winRatePage = async (c: Context) => {
  const auth = await getAuth(c)
  let userInfo = await getUserInfo(c, auth?.email)
  if(userInfo?.user_id === undefined)
    userInfo = await getUserInfo(c,"dummy@example.com")
  const winRate = await getWinRate(c, userInfo?.user_id)
  console.log(winRate)
  return c.html(<WinRate winRateArray={winRate} />)
}
