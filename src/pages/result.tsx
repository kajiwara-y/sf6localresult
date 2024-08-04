import { Context } from 'hono'
import { Result } from '../components/pages/Result'
import { getUserInfo, getUserNames } from '../services/userService'
import { getAllCharacters } from '../services/characterService'
import { getMatchResult,getTotalMatchCount } from '../services/matchService'
import { getAuth } from '@hono/oidc-auth';

export const resultPage = async (c: Context) => {
  const auth = await getAuth(c)
  const characterInfo = await getAllCharacters(c)
  let userInfo = await getUserInfo(c, auth?.email)
  if(userInfo?.user_id === undefined)
    userInfo = await getUserInfo(c,"dummy@example.com")
  const page = parseInt(c.req.query('page') as string) || 1;
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;
  const matchResultInfo = await getMatchResult(c,userInfo?.user_id,itemsPerPage,offset)
  const matchTotalCount = await getTotalMatchCount(c, userInfo?.user_id)
  console.log(matchTotalCount)

  return c.html(<Result characterArray={characterInfo} matchResultArray={matchResultInfo} page={page} totalPages={matchTotalCount}/>)
}
