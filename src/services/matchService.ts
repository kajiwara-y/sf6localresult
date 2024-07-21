import { Context } from 'hono'
import { D1QB } from 'workers-qb'
import { uuidv7 } from 'uuidv7'
import { MatchInfo, MatchSubmissionData } from '../types'
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
