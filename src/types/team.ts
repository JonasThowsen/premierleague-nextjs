export interface TeamsResponse {
  count: number;
  filters: Record<string, unknown>;
  competition: Competition;
  season: Season;
  teams: Team[];
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  lastUpdated: string;
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

export interface TeamPreferences {
  favorite: boolean;
  customName?: string;
}

export interface TeamPreferencesMap {
  [teamId: number]: TeamPreferences;
}
