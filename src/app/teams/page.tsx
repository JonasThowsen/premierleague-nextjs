import NavBar from "@/components/NavBar";
import TeamCard from "@/components/TeamCard";
import { TeamsResponse } from "@/types/team";

async function getTeams() {
  const response = await fetch(
    "https://api.football-data.org/v4/competitions/PL/teams",
    {
      headers: {
        "X-Auth-Token": process.env.FOOTBALL_API_KEY || "",
      },
      next: {
        revalidate: 3600, // Revalidate every hour
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch teams`);
  }

  const data = (await response.json()) as TeamsResponse;
  return data.teams;
}

export default async function Teams() {
  const teams = await getTeams();

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Premier League Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
