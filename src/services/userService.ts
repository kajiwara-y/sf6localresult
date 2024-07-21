import { Context } from "hono";
import { D1QB, FetchTypes } from "workers-qb";
import { CharacterInfo, UserInfo, UserName } from "../types";

export const getCharacterInfo = async (c: Context) => {
  const qb = new D1QB(c.env.DB as D1QB);
  qb.setDebugger(true);
  const result = await qb
    .fetchAll<CharacterInfo>({
      tableName: "CharacterInfo",
    })
    .execute();
  return result.results;
};

export const getUserInfo = async (c: Context, email: string | undefined) => {
  const qb = new D1QB(c.env.DB as D1QB);
  const result = await qb
    .fetchOne<UserInfo>({
      tableName: "UserInfo",
      where: {
        conditions: "email = ?1",
        params: [email as string],
      },
    })
    .execute();
  return result.results;
};

export const getUserNames = async (c: Context, userId: string | undefined) => {
  const qb = new D1QB(c.env.DB as D1QB);
  const result = await qb
    .raw<UserName>({
      query: `
        SELECT 
          DISTINCT ui.nick_name,
          ui.user_id 
        FROM 
          PlayerMatches pm 
          JOIN UserInfo ui ON ( 
            ( 
              pm.player1_id = $1 
              AND pm.player2_id = ui.user_id 
            ) 
            OR ( 
              pm.player2_id = $1 
              AND pm.player1_id = ui.user_id 
            ) 
          ) 
        WHERE 
          pm.player1_id = $1 
          OR pm.player2_id = $1 
        ORDER BY 
          match_date DESC;`,
      args: [userId as string],
      fetchType: FetchTypes.ALL,
    })
    .execute();
  return result.results;
};
