import { Context } from 'hono'
import { Top } from '../components/pages/Top'
import { getUserInfo, getUserNames } from '../services/userService'
import { getAllCharacters } from '../services/characterService'
import { getAuth } from '@hono/oidc-auth';

export const indexPage = async (c: Context) => {
  const auth = await getAuth(c)
  const characterInfo = await getAllCharacters(c)
  const userInfo = await getUserInfo(c, auth?.email)
  const userNames = await getUserNames(c, userInfo?.user_id)

  return c.html(<Top characterArray={characterInfo} userInfo={userInfo} userNames={userNames} />)
}
