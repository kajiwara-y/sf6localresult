export const getWinnerId = (round1: string, round2: string, round3: string | undefined): string => {
    // ここにgetWinnerIdの実装を記述
    // 例: 2ラウンド先取で勝利を判定
    let wins = 0
    if (round1 === "win") wins++
    if (round2 === "win") wins++
    if (round3 === "win") wins++
    return wins >= 2 ? "win" : "lose"
  }
