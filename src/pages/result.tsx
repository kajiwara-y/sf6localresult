import { Context } from 'hono'
import { Result } from '../components/pages/Result'
import { getUserInfo, getUserNames } from '../services/userService'
import { getAllCharacters } from '../services/characterService'
import { getMatchResult } from '../services/matchService'
import { getAuth } from '@hono/oidc-auth';

export const resultPage = async (c: Context) => {
  const auth = await getAuth(c)
  const characterInfo = await getAllCharacters(c)
  let userInfo = await getUserInfo(c, auth?.email)
  if(userInfo?.user_id === undefined)
    userInfo = await getUserInfo(c,"dummy@example.com")
  const matchResultInfo = await getMatchResult(c,userInfo?.user_id)

  return c.html(<Result characterArray={characterInfo} matchResultArray={matchResultInfo}/>)
}
