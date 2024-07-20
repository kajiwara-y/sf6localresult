export type MatchInfo = {
  match_id: string;
  player1_id: string;
  player2_id: string;
  player1_character_id: number;
  player2_character_id: number;
  winner_id: string;
  round1_winner: string;
  round2_winner: string;
  round3_winner: string | null;
  match_date: string;
};
