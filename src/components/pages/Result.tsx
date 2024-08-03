import { html } from "hono/html";
import { CharacterInfo, MatchResult} from "../../types"

export const Result = (props: {
  characterArray: CharacterInfo[] | undefined;
  matchResultArray: MatchResult[] | undefined;
}) => {
  const getCharacter = (id : number) =>{
    return props.characterArray?.find((character) => character.id === id)
  }
  const getResultClass = (playerId :string, winnerId :string) =>{
    return playerId === winnerId ? "bg-green-500" : "bg-red-500"
  }
  const getResult = (playerId :string, winnerId :string) =>{
    return playerId === winnerId ? "Win" : "Lose"
  }
  const getGrayScale = (playerId :string, winnerId :string) =>{
    return playerId === winnerId ? " " : "grayscale"
  }
  const convertJST = (datetime: string) =>{
    const date = new Date(datetime)
    return date.toLocaleString('ja-JP',{timeZone: 'Asia/Tokyo'})
  }
  return html`<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Document</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <div class="container mx-auto p-4">
          <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
            対戦履歴
          </h1>

          <div class="space-y-4">
            ${props.matchResultArray?.map((item) => (
            <div class="bg-white shadow rounded-lg p-4">
              <div class="flex flex-col">
                <div class="flex items-center justify-center space-x-8 mb-4">
                  <div class="flex flex-col items-center">
                    <div class="relative">
                      <img
                        src={getCharacter(item.player1_character_id)?.filePath}
                        class={`w-16 h-16 rounded-full filter ${getGrayScale(item.player1_id,item.winner_id)}`}
                      />
                      <span
                        class={`absolute -top-2 -right-2 px-2 py-1 text-white rounded-full text-xs font-bold ${getResultClass(item.player1_id,item.winner_id)}`}
                        >{getResult(item.player1_id,item.winner_id)}</span
                      >
                    </div>
                    <span class="font-semibold mt-2">{getCharacter(item.player1_character_id)?.name}</span>
                    <span class="text-sm text-gray-600">{item.player1_nick_name}</span>
                  </div>

                  <span class="text-2xl font-bold text-gray-400">VS</span>

                  <div class="flex flex-col items-center">
                    <div class="relative">
                      <img
                        src={getCharacter(item.player2_character_id)?.filePath}
                        class={`w-16 h-16 rounded-full filter ${getGrayScale(item.player2_id,item.winner_id)}`}
                      />
                      <span
                        class={`absolute -top-2 -right-2 px-2 py-1 text-white rounded-full text-xs font-bold ${getResultClass(item.player2_id,item.winner_id)}`}
                        >{getResult(item.player2_id,item.winner_id)}</span
                      >
                    </div>
                    <span class="font-semibold mt-2">{getCharacter(item.player2_character_id)?.name}</span>
                    <span class="text-sm text-gray-600">{item.player2_nick_name}</span>
                  </div>
                </div>

                <hr class="border-t border-gray-200 my-2" />

                <div class="text-right">
                  <p class="text-xs text-gray-500">{convertJST(item.match_date)}</p>
                </div>
              </div>
            </div>
            ))}

            </div>
          </div>
        </div>
      </body>
    </html>`;
};
