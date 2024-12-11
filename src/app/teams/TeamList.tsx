import { TeamsResponse } from "@/types/team";

async function getTeams() {
  const response = await fetch(
    "https://api.football-data.org/v4/competitions/PL/teams",
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_API_KEY || "",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch teams`);
  }

  const data: TeamsResponse = await response.json();
  return data.teams;
}

export default async function TeamList() {
  const teams = await getTeams();

  return { teams };
}
