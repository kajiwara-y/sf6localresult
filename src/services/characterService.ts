
import { Context } from "hono";
import { D1QB} from "workers-qb";
import { CharacterInfo, } from "../types";

export const getAllCharacters = async (c: Context) => {
  const qb = new D1QB(c.env.DB as D1QB);
  const result = await qb
    .fetchAll<CharacterInfo>({
      tableName: "CharacterInfo",
    })
    .execute();
  return result.results;
};


export const getCharacter = async (c: Context, characterId : number) => {
  const qb = new D1QB(c.env.DB as D1QB);
  qb.setDebugger(true);
  const result = await qb
    .fetchOne<CharacterInfo>({
      tableName: "CharacterInfo",
      where: {
        conditions: "id = ?1",
        params: [characterId],
      },
    })
    .execute();
  return result.results;
};
