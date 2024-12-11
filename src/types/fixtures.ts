export interface MatchesResponse {
  matches: Match[];
  competition: Competition;
  area: Area;
  season: Season;
}

export interface Area {
  id: number;
  name: string;
  code: string;
  flag?: string;
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem?: string;
}

export interface Season {
  id: number;
  startDate: string;
  endDate: string;
  currentMatchday: number;
  winner?: null;
}

export interface Match {
  id: number;
  utcDate: string;
  status: "FINISHED" | "SCHEDULED" | "POSTPONED" | "CANCELLED";
  matchday: number;
  stage: "REGULAR_SEASON" | string;
  group: string | null;
  lastUpdated: string;
  homeTeam: Team;
  awayTeam: Team;
  score: Score;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
}

export interface Score {
  winner: "HOME_TEAM" | "AWAY_TEAM" | "DRAW" | null;
  duration: "REGULAR" | "EXTRA_TIME" | "PENALTIES";
  fullTime: ScoreDetails;
  halfTime: ScoreDetails;
}

export interface ScoreDetails {
  home: number;
  away: number;
}
