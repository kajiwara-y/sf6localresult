import { html } from "hono/html";
import { WinRate as winRateResult } from "../../types";

export const WinRate = (props: {
  winRateArray: winRateResult[] | undefined;
}) => {
  interface WinRateStyle {
    width: string;
  }
  const createWinRateStyle = (winRate: number): WinRateStyle => {
    return {
      width: `${winRate}%`,
    };
  };

  return html`<!DOCTYPE html>
    <!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">勝率</h1>
    <!-- ナビゲーションボタン -->
    <div class="mb-6 flex justify-center space-x-4">
      <a href="/match-history" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        対戦履歴
      </a>
      <a href="/character-matchcount" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        キャラクター別対戦数
      </a>
    </div>
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">キャラクター別勝率</h1>
      <div class="overflow-x-auto">
        <table class="min-w-full bg-white">
          <thead>
            <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th class="py-3 px-4 text-left">キャラクター</th>
              <th class="py-3 px-3 text-center">戦績</th>
              <th class="py-3 px-11 text-center">グラフ</th>
            </tr>
          </thead>
          <tbody class="text-gray-600 text-sm font-light">
            <!-- 各キャラクターの行（繰り返し） -->
            ${props.winRateArray?.map((item) => (
              <tr class="border-b border-gray-200 hover:bg-gray-100">
                <td class="py-3 px-4 text-left whitespace-nowrap">
                  <div class="flex items-center">
                    <img
                      src={item.character_icon}
                      alt={item.character_name}
                      class="w-10 h-10 rounded-full mr-3"
                    />
                    <span class="font-medium">{item.character_name}</span>
                  </div>
                </td>
                <td class="py-3 px-3 text-center">{item.wins}勝/{item.total_matches}戦</td>
                <td class="py-3 px-11">
                  <div class="flex flex-col items-start">
                    <div class="flex items-center mb-2">
                        <span class="text-gray-700 font-medium">{item.win_rate}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2.5">
                      <div class="bg-blue-600 h-2.5 rounded-full" style={createWinRateStyle(item.win_rate)}></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
            <!-- 他のキャラクターも同様に -->
          </tbody>
        </table>
      </div>
    
      <div class="mt-6 text-center">
        <a href="/" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
         勝敗登録にもどる
        </a>
      </div>
    </div>
  </div>
</body>
</html>

    `;
};
