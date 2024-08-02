import { Context } from 'hono'
import { createMatch } from '../services/matchService'
import { existsUser,createUser } from '../services/userService'
import { MatchSubmissionData, UserInfo } from '../types'
import { uuidv7 } from 'uuidv7'
import short from 'short-uuid'

export const matchSubmitPage = async (c: Context) => {
  const body = await c.req.parseBody()
  console.log(body)
  const opponentName = body.player1Name || body.player2Name as string;
  const parts = opponentName.split('@');
  const translator = short(); 
  let opponentId = null
  const urlParams = new URLSearchParams();
  if (parts.length > 1) {
    const opponentIdShort = parts[1]
    //UUIDの変換チェック
    if(translator.validate(opponentIdShort))
    {
      //ユーザー存在チェック
      if(await existsUser(c, translator.toUUID(opponentIdShort)))
      {
        //ユーザーが存在している
        opponentId = translator.toUUID(opponentIdShort)
        urlParams.append("opponentName",opponentName as string)
      }
      else
      {
        //ユーザーが存在していないので登録を実施
        const userInfo:UserInfo = {
          user_id : uuidv7(),
          nick_name: parts[0] as string,
          email: ""
        }
        //ユーザー登録を実施
        createUser(c,userInfo)
        opponentId = userInfo.user_id
        urlParams.append("opponentName",parts[0] + "@" + translator.fromUUID(userInfo.user_id) as string)
      }
    }else{
      //変換失敗
      //@を文字列として使っているケースを想定
      const userInfo:UserInfo = {
        user_id : uuidv7(),
        nick_name: opponentName as string,
        email: ""
      }
      createUser(c,userInfo)
      //ユーザー登録を実施
      opponentId = userInfo.user_id
      urlParams.append("opponentName",opponentName + "@" + translator.fromUUID(userInfo.user_id) as string)
    }
  }else{
    //対戦相手未登録
    const userInfo:UserInfo = {
      user_id : uuidv7(),
      nick_name: opponentName as string,
      email: ""
    }
    //ユーザー登録を実施
    createUser(c,userInfo)
    opponentId = userInfo.user_id
    urlParams.append("opponentName",opponentName + "@" + translator.fromUUID(userInfo.user_id) as string)
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
  const redirectParamTargets = ["playerSide","player1CharacterId","player2CharacterId"]
  for (const [key, value] of Object.entries(matchData)) {
    if (redirectParamTargets.includes(key) && value !== undefined) {
      urlParams.append(key, value.toString());
    }
  }

  return c.redirect('/?' + urlParams)
}
