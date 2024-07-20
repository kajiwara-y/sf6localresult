import { Hono } from 'hono'
import { uuidv7 } from "uuidv7";
import { CharacterInfo,UserInfo,UserName,MatchInfo} from './types';
import {Top} from './top'
import { D1QB, FetchTypes } from "workers-qb";
import { oidcAuthMiddleware, getAuth } from '@hono/oidc-auth';
export interface Env {
  DB: D1Database;
}

function getWinnerId(a: string, b: string, c?: string): string {
  if (c !== undefined) {
      if (a === b || a === c) return a;
      if (b === c) return b;
  } else {
      if (a === b) return a;
  }
  return ""
}
const app = new Hono()

app.get('/', async (c) => {
  const qb = new D1QB(c.env.DB as D1QB);
  qb.setDebugger(true)
  const characterInfo = await qb
  .fetchAll<CharacterInfo>({
    tableName: 'CharacterInfo',
  })
  .execute()

  const auth = await getAuth(c)
  console.log(auth)
  const userInfo = await qb
  .fetchOne<UserInfo>({
    tableName: 'UserInfo',
    where: {
      conditions: "email = ?1",
      params: [auth?.email as string],
    },
  })
  .execute()

  const UserNames = await qb
  .raw<UserName>({
    query: '\
      SELECT \
        DISTINCT ui.nick_name,\
        ui.user_id \
      FROM \
        PlayerMatches pm \
        JOIN UserInfo ui ON ( \
          ( \
            pm.player1_id = $1 \
            AND pm.player2_id = ui.user_id \
          ) \
          OR ( \
            pm.player2_id = $1 \
            AND pm.player1_id = ui.user_id \
          ) \
        ) \
      WHERE \
        pm.player1_id = $1 \
        OR pm.player2_id = $1 \
      ORDER BY \
        match_date DESC;',
    args: [userInfo.results?.user_id as string],
    fetchType: FetchTypes.ALL,
  })
  .execute()

  return c.html(<Top characterArray={characterInfo.results} userInfo={userInfo.results} userNames={UserNames.results}/>)
})

app.post('/', async (c) => {
  const body = await c.req.parseBody()
  const is1P = body['playerSide'] == '1P'
  const oppoId = uuidv7()
  console.log(body)
  const qb = new D1QB(c.env.DB as D1QB);
  qb.setDebugger(true)
  const matchInfo: MatchInfo = {
    match_id: uuidv7(),
    player1_id: is1P ? body.myId as string : oppoId,
    player2_id: is1P ? oppoId : body.myId as string, 
    player1_character_id: Number(body.player1CharacterId),
    player2_character_id: Number(body.player2CharacterId),
    winner_id: getWinnerId(body.round1 as string, body.round2 as string,body.round3 as string) === "win" ? body.myId as string: oppoId,
    round1_winner: body.round1 === "win" ? body.myId as string: oppoId,
    round2_winner: body.round2 === "win" ? body.myId as string: oppoId,
    round3_winner: typeof(body.round3) === "undefined" ? null : body.round3 === "win" ? body.myId as string: oppoId
  };
  qb.insert({
    tableName: 'PlayerMatches',
    data: matchInfo as unknown as Record<string, any>,
  }).execute();
  console.log(matchInfo)
  return c.redirect('/')
})

// app.get('/api/opponent_name_list', async c =>{
  // const qb = new D1QB(c.env.DB as D1QB);
  // const auth = await getAuth(c)
  // const characterInfo = await qb
  // .fetchAll<CharacterInfo>({
    // tableName: 'UserInfo',
    // where: {
      // conditions: "user_id != ?1",
      // params: [auth?.email as string],
    // },
  // })

  // return c.json(fetched);
// })
app.use('*', oidcAuthMiddleware())
app.use('*', async (c, next) => {
  // Authorize user with email address
  const auth = await getAuth(c)
  await next()
})

app.get('*', async (c) => {
  const response = await c.env.ASSETS.fetch(c.req.raw);
  // clone the response to return a response with modifiable headers
  const newResponse = new Response(response.body, response)
  return newResponse
});

export default app
