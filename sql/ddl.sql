CREATE TABLE if not exists CharacterInfo (
    id INTEGER PRIMARY KEY , 
    name TEXT NOT NULL,
    filePath TEXT NOT NULL
);

CREATE TABLE if not exists UserInfo (
    user_id TEXT PRIMARY KEY,
    email TEXT,
    nick_name TEXT
);
CREATE TABLE if not exists PlayerMatches (
    match_id TEXT PRIMARY KEY,
    player1_id TEXT,
    player2_id TEXT,
    player1_character_id INT,
    player2_character_id INT,
    winner_id TEXT,
    match_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    round1_winner TEXT,
    round2_winner TEXT,
    round3_winner TEXT
);
CREATE TABLE if not exists PlayMatchMemo (
    memo_id TEXT PRIMARY KEY,
    memo_owner_id TEXT,
    memo TEXT
)
