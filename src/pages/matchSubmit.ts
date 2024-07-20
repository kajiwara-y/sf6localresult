import { Context } from 'hono'
import { createMatch } from '../services/matchService'
import { MatchSubmissionData } from '../types'

export const matchSubmitPage = async (c: Context) => {
  const body = await c.req.parseBody()
  const matchData: MatchSubmissionData = {
    playerSide: body['playerSide'] as string,
    myId: body.myId as string,
    player1CharacterId: body.player1CharacterId as string,
    player2CharacterId: body.player2CharacterId as string,
    round1: body.round1 as string,
    round2: body.round2 as string,
    round3: body.round3 as string
  }

  await createMatch(c, matchData)
  return c.redirect('/')
}
