import { html } from "hono/html";
import { CharacterInfo, UserInfo, UserName } from "../../types";
import short from "short-uuid";

export const Top = (props: {
  characterArray: CharacterInfo[] | undefined;
  userInfo: UserInfo | undefined;
  userNames: UserName[] | undefined;
}) => {
  const translator = short();
  console.log(props.userNames);
  const formattedNames = props.userNames?.map(
    (user) => `${user.nick_name}@${translator.fromUUID(user.user_id)}`
  );
  return html`<!DOCTYPE html>
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>ストリートファイター6 勝敗登録</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* カスタムCSS */
          select:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            background-color: #f3f4f6;
          }
          select:not(:disabled) {
            opacity: 1;
            cursor: pointer;
            background-color: white;
          }
        </style>
      </head>
      <body class="bg-gray-100">
        <div class="container mx-auto p-4">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">
              ストリートファイター6 勝敗登録
            </h1>
              <!-- ナビゲーションボタン -->
            <div class="mb-6 flex justify-center space-x-4">
              <a href="/match-history" class="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                対戦履歴
              </a>
              <a href="/win-rate" class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                勝率
              </a>
              <a href="/character-matchcount" class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                キャラクター別対戦数
              </a>
            </div>
            <form id="resultForm" name="resultForm" class="space-y-4" action="/" method="POST">
              <input
                type="hidden"
                id="myId"
                name="myId"
                value=${props.userInfo?.user_id}
              />
              <!-- 自キャラの位置選択 -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >自キャラの位置:</label
                >
                <div class="flex space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      name="playerSide"
                      value="1P"
                      class="form-radio"
                      checked
                    />
                    <span class="ml-2">1P側</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="radio"
                      name="playerSide"
                      value="2P"
                      class="form-radio"
                    />
                    <span class="ml-2">2P側</span>
                  </label>
                </div>
              </div>
              <!-- 1P サイド -->
              <div id="1pSide" class="bg-blue-100 p-4 rounded-lg">
                <h2 class="text-lg font-semibold text-blue-800 mb-3">
                  1P サイド
                </h2>
                <div class="space-y-4">
                  <div>
                    <label
                      for="player1Character"
                      class="block text-sm font-medium text-gray-700"
                      >キャラクター:</label
                    >
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <div class="flex-shrink-0">
                        <svg
                          id="player1CharacterPlaceholder"
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
                          id="player1CharacterIcon"
                          src=""
                          alt="キャラクターアイコン"
                          class="w-10 h-10 rounded-l-md hidden"
                        />
                      </div>
                      <input
                        type="text"
                        id="player1Character"
                        name="player1Character"
                        readonly
                        required
                        class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="hidden"
                        id="player1CharacterId"
                        name="player1CharacterId"
                      />
                      <button
                        type="button"
                        onclick="openModal('player1Character')"
                        class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
                      >
                        選択
                      </button>
                    </div>
                  </div>
                  <div id="player1NameContainer" class="hidden">
                    <label
                      for="player1Name"
                      class="block text-sm font-medium text-gray-700"
                      >対戦相手のプレイヤー名:</label
                    >
                    <input
                      type="text"
                      id="player1Name"
                      list="playerList"
                      name="player1Name"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <!-- 2P サイド -->
              <div id="2pSide" class="bg-red-100 p-4 rounded-lg">
                <h2 class="text-lg font-semibold text-red-800 mb-3">
                  2P サイド
                </h2>
                <div class="space-y-4">
                  <div>
                    <label
                      for="player2Character"
                      class="block text-sm font-medium text-gray-700"
                      >キャラクター:</label
                    >
                    <div class="mt-1 flex rounded-md shadow-sm">
                      <div class="flex-shrink-0">
                        <svg
                          id="player2CharacterPlaceholder"
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
                          id="player2CharacterIcon"
                          src=""
                          alt="キャラクターアイコン"
                          class="w-10 h-10 rounded-l-md hidden"
                        />
                      </div>
                      <input
                        type="text"
                        id="player2Character"
                        name="player2Character"
                        readonly
                        required
                        class="flex-1 min-w-0 block w-full px-3 py-2 rounded-none border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                      <input
                        type="hidden"
                        id="player2CharacterId"
                        name="player2CharacterId"
                      />
                      <button
                        type="button"
                        onclick="openModal('player2Character')"
                        class="inline-flex items-center px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50 text-gray-500 text-sm"
                      >
                        選択
                      </button>
                    </div>
                  </div>
                  <div id="player2NameContainer" class="hidden">
                    <label
                      for="player2Name"
                      class="block text-sm font-medium text-gray-700"
                      >対戦相手のプレイヤー名:</label
                    >
                    <input
                      type="text"
                      id="player2Name"
                      list="playerList"
                      name="player2Name"
                      class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <input type="hidden" id="round1" name="round1" value="" />
              <input type="hidden" id="round2" name="round2" value="" />
              <input type="hidden" id="round3" name="round3" value="" />
              
              <div>
                <h2 class="text-lg font-semibold mb-2">対戦結果登録</h2>
                <div class="grid grid-cols-3 gap-4">
                    <button type="button" onclick="resultSubmit()" class="result-btn p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" data-result="win,win">勝 勝</button>
                    <button type="button" onclick="resultSubmit()" class="result-btn p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" data-result="win,lose,win">勝 負 勝</button>
                    <button type="button" onclick="resultSubmit()" class="result-btn p-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2" data-result="lose,win,win">負 勝 勝</button>
                    <button type="button" onclick="resultSubmit()" class="result-btn p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" data-result="lose,lose">負 負</button>
                    <button type="button" onclick="resultSubmit()" class="result-btn p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" data-result="lose,win,lose">負 勝 負</button>
                    <button type="button" onclick="resultSubmit()" class="result-btn p-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2" data-result="win,lose,lose">勝 負 負</button>
                </div>
            </div>

              <div>
                <label
                  for="notes"
                  class="block text-sm font-medium text-gray-700"
                  >メモ:</label
                >
                <textarea
                  id="notes"
                  name="notes"
                  rows="3"
                  class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  disabled
                >まだ未実装です・・・</textarea>
              </div>

            </form>
          </div>
        </div>
        <datalist id="playerList" ]>
          ${formattedNames?.map((item) => <option value={item}></option>)}
        </datalist>

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
              <div class="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-2 px-4 py-3">
                ${props.characterArray?.map((item) => (
                  <button
                    onclick={`selectCharacter('${item.id}','${item.name}', '${item.filePath}')`}
                    class="character-icon"
                  >
                    <img
                      src={item.filePath}
                      alt={item.name}
                      class="w-16 h-16 mx-auto"
                    />
                    <span class="text-sm">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <script>
          let init = true;
          let currentField;
          const modal = document.getElementById("characterModal");
          const player1Side = document.getElementById("1pSide");
          const player2Side = document.getElementById("2pSide");
          const player1NameContainer = document.getElementById(
            "player1NameContainer"
          );
          const player1Name = document.getElementById("player1Name");
          const player2NameContainer = document.getElementById(
            "player2NameContainer"
          );
          const player2Name = document.getElementById("player2Name");

          const player1Character = document.getElementById("player1Character");
          const player1CharacterId =
            document.getElementById("player1CharacterId");
          const player1CharacterIcon = document.getElementById(
            "player1CharacterIcon"
          );
          const player1CharacterPlaceholder = document.getElementById(
            "player1CharacterPlaceholder"
          );
          const player2Character = document.getElementById("player2Character");
          const player2CharacterId =
            document.getElementById("player2CharacterId");
          const player2CharacterIcon = document.getElementById(
            "player2CharacterIcon"
          );
          const player2CharacterPlaceholder = document.getElementById(
            "player2CharacterPlaceholder"
          );

          function openModal(field) {
            currentField = field;
            modal.classList.remove("hidden");
          }

          function closeModal() {
            modal.classList.add("hidden");
          }

          function selectCharacter(characterId, characterName, iconSrc) {
            document.getElementById(currentField).value = characterName;
            document.getElementById(currentField + "Id").value = characterId;
            document.getElementById(currentField + "Icon").src = iconSrc;
            document
              .getElementById(currentField + "Icon")
              .classList.remove("hidden");
            document
              .getElementById(currentField + "Placeholder")
              .classList.add("hidden");
            closeModal();
          }

          const resultSubmit = () =>{
            // クリックされたボタンの data-result 属性の値を取得
            const result = event.target.getAttribute('data-result');

            // result の値を分割して、round1 ~ round3 に代入
            const [round1, round2, round3] = result.split(',');
            // round1 ~ round3 の hidden input 要素を取得
            const round1Input = document.getElementById('round1');
            const round2Input = document.getElementById('round2');
            const round3Input = document.getElementById('round3');

            // それぞれの input 要素に値をセット
            round1Input.value = round1;
            round2Input.value = round2;
            if(round3){
              round3Input.value = round3;
            }else{
              round3Input.value = "";
            }
            // キャラクターが選択されているかチェック
            const player1CharacterInput = document.querySelector('#player1Character');
            const player2CharacterInput = document.querySelector('#player2Character');

            // プレイヤー名が入力されているかチェック
            const player1NameContainer = document.querySelector('#player1NameContainer');
            const player1NameInput = document.querySelector('#player1Name');
            const player2NameContainer = document.querySelector('#player2NameContainer');
            const player2NameInput = document.querySelector('#player2Name');

            let hasError = false;
            if (player1CharacterInput.value.trim() === '') {
              // キャラクターが選択されていない場合
              player1CharacterInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500'); // エラー時の外枠スタイル
              hasError = true;
            }else{
              player1CharacterInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            }
            if (player2CharacterInput.value.trim() === '') {
              // キャラクターが選択されていない場合
              player2CharacterInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500'); // エラー時の外枠スタイル
              hasError = true;
            }else{
              player2CharacterInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            }

            // プレイヤー名の入力チェック
            if (!player1NameContainer.classList.contains('hidden') && player1NameInput.value.trim() === '') {
              player1NameInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
              hasError = true;
            } else {
              player1NameInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            }

            if (!player2NameContainer.classList.contains('hidden') && player2NameInput.value.trim() === '') {
              player2NameInput.classList.add('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
              hasError = true;
            } else {
              player2NameInput.classList.remove('border-red-500', 'focus:ring-red-500', 'focus:border-red-500');
            }

            if(hasError){
              return;
            }
            document.getElementById("resultForm").submit()

          }

          // フォーム送信時の処理
          document.getElementById("resultForm").onsubmit = function (e) {
            // e.preventDefault();
            // ここに送信処理を追加
            console.log("フォームが送信されました");

            // フォームデータの収集
            const formData = new FormData(this);
            for (let [key, value] of formData.entries()) {
              console.log(key, value);
            }
          };

          window.onclick = function (event) {
            if (event.target == modal) {
              closeModal();
            }
          };
          // 自キャラの位置に応じてUIを更新する関数
          function updatePlayerSide() {
            console.log("Fire");
            const playerSide = document.querySelector(
              'input[name="playerSide"]:checked'
            ).value;
            const pastPlayer1Character = player1Character.value;
            const pastPlayer1CharacterId = player1CharacterId.value;
            const pastPlayer1CharacterIcon = player1CharacterIcon.src;
            const pastPlayer2Character = player2Character.value;
            const pastPlayer2CharacterId = player2CharacterId.value;
            const pastPlayer2CharacterIcon = player2CharacterIcon.src;
            const pastPlayer1Name = player1Name.value;
            const pastPlayer2Name = player2Name.value;
            player1Character.value = pastPlayer2Character;
            player1CharacterId.value = pastPlayer2CharacterId;
            player2Character.value = pastPlayer1Character;
            player2CharacterId.value = pastPlayer1CharacterId;
            let changedPayer1SideUnselect = false;
            if (pastPlayer1CharacterId == "") {
              //プレイヤー1が未選択
              player2CharacterIcon.classList.add("hidden");
              if (!init) {
                //非初期化
                player2CharacterPlaceholder.classList.remove("hidden");
              }
            } else {
              //プレイヤー1が選択
              player2CharacterIcon.src = pastPlayer1CharacterIcon;
              player2CharacterPlaceholder.classList.add("hidden");
              player2CharacterIcon.classList.remove("hidden");
            }
            if (pastPlayer2CharacterId == "") {
              //プレイヤー2が未選択
              player1CharacterIcon.classList.add("hidden");
              if (!init) {
                player1CharacterPlaceholder.classList.remove("hidden");
              }
            } else {
              //プレイヤー2が選択
              player1CharacterIcon.src = pastPlayer2CharacterIcon;
              player1CharacterPlaceholder.classList.add("hidden");
              player1CharacterIcon.classList.remove("hidden");
            }

            if (playerSide === "1P") {
              player1Side.classList.add("bg-blue-100");
              player1Side.classList.remove("bg-red-100");
              player2Side.classList.remove("bg-blue-100");
              player2Side.classList.add("bg-red-100");
              player1Name.value = "";
              player2Name.value = pastPlayer1Name;
              player1NameContainer.classList.add("hidden");
              player2NameContainer.classList.remove("hidden");
            } else {
              player2Side.classList.add("bg-blue-100");
              player2Side.classList.remove("bg-red-100");
              player1Side.classList.remove("bg-blue-100");
              player1Side.classList.add("bg-red-100");
              player1Name.value = pastPlayer2Name;
              player2Name.value = "";
              player1NameContainer.classList.remove("hidden");
              player2NameContainer.classList.add("hidden");
            }
          }

          // ラウンド結果の制御
          function updateRoundResults() {
            const round1 = document.getElementById("round1").value;
            const round2 = document.getElementById("round2").value;
            const round3 = document.getElementById("round3");

            if (round1 && round2 && round1 !== round2) {
              round3.disabled = false;
              round3.required = true;
              round3.classList.remove("bg-gray-100");
              round3.classList.add("bg-white");
            } else {
              round3.disabled = true;
              round3.required = false;
              round3.value = "";
              round3.value = "";
              round3.classList.remove("bg-white");
              round3.classList.add("bg-gray-100");
            }
          }
          function getCharacterInfo(characterId, side) {
            fetch("/api/character?characterId=" + characterId)
              .then((response) => response.json())
              .then((data) => {
                currentField = side;
                selectCharacter(data.id, data.name, data.filePath);
              });
          }
          document.addEventListener("DOMContentLoaded", function () {
            // URLからGETパラメータを取得する関数
            function getParameterByName(name, url = window.location.href) {
              name = name.replace(/[[]]/g, "\\$&");
              var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
              if (!results) return null;
              if (!results[2]) return "";
              return decodeURIComponent(results[2].replace(/\\+/g, " "));
            }
            //playerSide
            const playerSide = getParameterByName("playerSide");
            if (playerSide && playerSide !== "1P") {
              document.resultForm.playerSide[1].checked = true;
              updatePlayerSide();
            }
            //player1CharacterId
            const player1CharacterId = getParameterByName("player1CharacterId");
            if (player1CharacterId) {
              const OnePlayerCharacterInfo = getCharacterInfo(
                player1CharacterId,
                "player1Character"
              );
            }
            //player2CharacterId
            const player2CharacterId = getParameterByName("player2CharacterId");
            if (player1CharacterId) {
              const OnePlayerCharacterInfo = getCharacterInfo(
                player2CharacterId,
                "player2Character"
              );
            }
            //opponentName
            const opponentName = getParameterByName("opponentName");
            if (playerSide !== "1P") {
              player1Name.value = opponentName;
            } else {
              player2Name.value = opponentName;
            }
          });

          // ラジオボタンの変更を監視
          document
            .querySelectorAll('input[name="playerSide"]')
            .forEach((radio) => {
              radio.addEventListener("change", updatePlayerSide);
            });

          // 初期化時にも実行
          updatePlayerSide();
          init = false;
        </script>
      </body>
    </html>`;
};
