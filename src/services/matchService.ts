import { Context } from 'hono'
import { D1QB, FetchTypes } from 'workers-qb'
import { uuidv7 } from 'uuidv7'
import { MatchInfo, MatchSubmissionData, MatchResult } from '../types'
import { getWinnerId } from '../utils/match'

export const createMatch = async (c: Context, data: MatchSubmissionData) => {
  const qb = new D1QB(c.env.DB as D1QB)
  qb.setDebugger(true)

  const is1P = data.playerSide === '1P'
  const matchInfo: MatchInfo = {
    match_id: uuidv7(),
    player1_id: is1P ? data.myId : data.opponentId,
    player2_id: is1P ? data.opponentId : data.myId,
    player1_character_id: Number(data.player1CharacterId),
    player2_character_id: Number(data.player2CharacterId),
    winner_id: getWinnerId(data.round1, data.round2, data.round3) === "win" ? data.myId : data.opponentId,
    round1_winner: data.round1 === "win" ? data.myId : data.opponentId,
    round2_winner: data.round2 === "win" ? data.myId : data.opponentId,
    round3_winner: typeof(data.round3) === "undefined" ? null : data.round3 === "win" ? data.myId : data.opponentId,
    match_date: new Date().toISOString() // 試合日時を追加
  }

  await qb.insert({
    tableName: 'PlayerMatches',
    data: matchInfo as unknown as Record<string, any>,
  }).execute()

  console.log(matchInfo)
}

export const getMatchResult = async (c: Context, userId: string | undefined, itemPerPage:number, offset:number) => {
  const qb = new D1QB(c.env.DB as D1QB);
  qb.setDebugger(true);
  const result = await qb
  .raw<MatchResult>({
    query: `
      SELECT
        pm.match_id,
        pm.player1_id,
        uc1.nick_name AS player1_nick_name,
        pm.player2_id,
        uc2.nick_name AS player2_nick_name,
        pm.player1_character_id,
        pm.player2_character_id,
        pm.winner_id,
        pm.match_date
      FROM
        PlayerMatches pm
        JOIN UserInfo uc1 ON pm.player1_id = uc1.user_id
        JOIN UserInfo uc2 ON pm.player2_id = uc2.user_id
      WHERE
        pm.player1_id = $1 OR pm.player2_id = $1
      ORDER BY
        pm.match_date DESC
      LIMIT $2 OFFSET $3;`,
      args: [userId as string,itemPerPage,offset],
      fetchType: FetchTypes.ALL,
    })
    .execute();
  return result.results;
};


export const getTotalMatchCount = async (c: Context, userId: string | undefined) => {
  const qb = new D1QB(c.env.DB as D1QB);
  qb.setDebugger(true);
  const result = await qb
  .fetchOne({
    tableName: 'PlayerMatches',
    fields: 'count(*) as count',
    where: {
      conditions: 'player1_id = ?1 or player2_id = ?1',
      params: [userId as string],
    },
  })
  .execute()
  return result?.results?.count as number;
};
