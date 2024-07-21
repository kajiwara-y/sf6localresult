import { Context } from 'hono'
import { createMatch } from '../services/matchService'
import { existsUser,createUser } from '../services/userService'
import { MatchSubmissionData, UserInfo } from '../types'
import { uuidv7 } from 'uuidv7'
import short from 'short-uuid'

export const matchSubmitPage = async (c: Context) => {
  const body = await c.req.parseBody()
  console.log(body)
  const opponentName = (body.player1Name ?? body.player2Name) as string;
  const parts = opponentName.split('@');
  const translator = short(); 
  let opponentId = null
  if (parts.length > 1) {
    const opponentIdShort = parts[1]
    if(translator.validate(opponentIdShort, true))
    {
      if(await existsUser(c, translator.toUUID(opponentIdShort)))
        opponentId = translator.toUUID(opponentIdShort)
    }else{
      const userInfo:UserInfo = {
        user_id : uuidv7(),
        nick_name: opponentName,
        email: ""
      }
      createUser(c,userInfo)
      opponentId = userInfo.user_id
    }
  }else{
    const userInfo:UserInfo = {
      user_id : uuidv7(),
      nick_name: opponentName,
      email: ""
    }
    createUser(c,userInfo)
    opponentId = userInfo.user_id
  }



  
  const matchData: MatchSubmissionData = {
    playerSide: body['playerSide'] as string,
    myId: body.myId as string,
    opponentId: opponentId as string,
    player1CharacterId: body.player1CharacterId as string,
    player2CharacterId: body.player2CharacterId as string,
    round1: body.round1 as string,
    round2: body.round2 as string,
    round3: body.round3 as string
  }

  await createMatch(c, matchData)
  return c.redirect('/')
}
