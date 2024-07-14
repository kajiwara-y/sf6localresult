import { html } from "hono/html";
import { CharacterInfo } from "./types";

export const Top = (props: { characterArray: CharacterInfo[] | undefined }) => {
  return html`<!DOCTYPE html>
    <!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ストリートファイター6 勝敗登録</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body class="bg-gray-100">
        <div class="container mx-auto p-4">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
              ストリートファイター6 勝敗登録
            </h1>
            <form id="resultForm" class="space-y-4">
              <div>
                <label
                  for="myCharacter"
                  class="block text-sm font-medium text-gray-700"
                  >自分のキャラクター:</label
                >
                <div class="mt-1 flex rounded-md shadow-sm">
                  <div class="flex-shrink-0">
                    <svg
                      id="myCharacterPlaceholder"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                      style="margin-top: 6pt;"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <img
                      id="myCharacterIcon"
                      src=""
                      alt="キャラクターアイコン"
                      class="w-10 h-10 rounded-l-md hidden"
                    />
                  </div>
                  <input
                    type="text"
                    id="myCharacter"
                    name="myCharacter"
                    readonly
                    required
                    class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onclick="openModal('myCharacter')"
                    class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
                  >
                    選択
                  </button>
                </div>
              </div>

              <div>
                <label
                  for="opponent"
                  class="block text-sm font-medium text-gray-700"
                  >対戦相手:</label
                >
                <input
                  type="text"
                  id="opponent"
                  name="opponent"
                  list="opponentList"
                  required
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <datalist id="opponentList">
                  <option value="プレイヤー1"></option>
                  <option value="プレイヤー2"></option>
                  <option value="プレイヤー3"></option>
                </datalist>
              </div>

              <div>
                <label
                  for="opponentCharacter"
                  class="block text-sm font-medium text-gray-700"
                  >対戦相手のキャラクター:</label
                >
                <div class="mt-1 flex rounded-md shadow-sm">
                  <div class="flex-shrink-0">
                    <svg
                      id="opponentCharacterPlaceholder"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                      style="margin-top: 6pt;"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <img
                      id="opponentCharacterIcon"
                      src=""
                      alt="キャラクターアイコン"
                      class="w-10 h-10 rounded-l-md hidden"
                    />
                  </div>
                  <input
                    type="text"
                    id="opponentCharacter"
                    name="opponentCharacter"
                    readonly
                    required
                    class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <button
                    type="button"
                    onclick="openModal('opponentCharacter')"
                    class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
                  >
                    選択
                  </button>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700"
                  >ラウンド結果:</label
                >
                <div class="mt-1 grid grid-cols-3 gap-4">
                  <select
                    id="round1"
                    name="round1"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">1R</option>
                    <option value="win">勝ち</option>
                    <option value="lose">負け</option>
                  </select>
                  <select
                    id="round2"
                    name="round2"
                    required
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">2R</option>
                    <option value="win">勝ち</option>
                    <option value="lose">負け</option>
                  </select>
                  <select
                    id="round3"
                    name="round3"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="">3R</option>
                    <option value="win">勝ち</option>
                    <option value="lose">負け</option>
                    <option value="not_played">未実施</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  for="notes"
                  class="block text-sm font-medium text-gray-700"
                  >メモ:</label
                >
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <button
                type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                登録
              </button>
            </form>
          </div>
        </div>

        <div
          id="characterModal"
          class="hidden fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        >
          <div
            class="relative top-20 mx-auto p-5 border w-auto max-w-3xl shadow-lg rounded-md bg-white"
          >
            <div class="mt-3 text-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900 mb-4">
                キャラクター選択
              </h3>
              <div class="grid grid-cols-5 gap-4 mt-2 px-4 py-3">
                ${props.characterArray?.map(item => 
                  <button
                    onclick={`selectCharacter('${item.name}', '${item.filePath}')`}
                    class="character-icon"
                  >
                    <img
                      src={item.filePath}
                      alt={item.name}
                      class="w-16 h-16 mx-auto"
                    />
                    <span class="text-sm">{item.name}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <script>
          let currentField;
          const modal = document.getElementById("characterModal");

          function openModal(field) {
            currentField = field;
            modal.classList.remove("hidden");
          }

          function closeModal() {
            modal.classList.add("hidden");
          }

          function selectCharacter(characterName, iconSrc) {
            document.getElementById(currentField).value = characterName;
            document.getElementById(currentField + "Icon").src = iconSrc;
            document
              .getElementById(currentField + "Icon")
              .classList.remove("hidden");
            document
              .getElementById(currentField + "Placeholder")
              .classList.add("hidden");
            closeModal();
          }

          document.getElementById("resultForm").onsubmit = function (e) {
            e.preventDefault();
            // ここに送信処理を追加
            console.log("フォームが送信されました");
          };

          window.onclick = function (event) {
            if (event.target == modal) {
              closeModal();
            }
          };
        </script>
      </body>
    </html>`;
};
