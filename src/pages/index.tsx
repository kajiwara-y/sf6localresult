import { Context } from 'hono'
import { Top } from '../components/pages/Top'
import { getUserInfo, getUserNames } from '../services/userService'
import { getAllCharacters } from '../services/characterService'
import { getAuth } from '@hono/oidc-auth';

export const indexPage = async (c: Context) => {
  const auth = await getAuth(c)
  const characterInfo = await getAllCharacters(c)
  let userInfo = await getUserInfo(c, auth?.email)
  if(userInfo?.user_id === undefined)
    userInfo = await getUserInfo(c,"dummy@example.com")
  const userNames = await getUserNames(c, userInfo?.user_id)

  return c.html(<Top characterArray={characterInfo} userInfo={userInfo} userNames={userNames} />)
}
