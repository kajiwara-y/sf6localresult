export type CharacterInfo = {
  id: number;
  name: string;
  filePath: string;
};


export type UserInfo = {
  user_id: string;
  email: string;
  nick_name: string;
};

export type UserName = {
  nick_name: string;
  user_id: string;
};

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
};
