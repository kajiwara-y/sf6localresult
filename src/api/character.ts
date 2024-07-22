import { Context } from 'hono'
import { getCharacter } from "../services/characterService";
export const getCharacterInfo = async (c: Context) => {
  const characterId = Number(await c.req.query('characterId'))
  const userInfo = await getCharacter(c,characterId)

  return c.json(userInfo)
};
