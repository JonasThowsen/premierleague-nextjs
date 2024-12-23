// Add these exports at the top of your file
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Optional: revalidate every hour

import NavBar from "@/components/NavBar";
import TeamCard from "@/components/TeamCard";
import { TeamsResponse } from "@/types/team";
import { Team } from "@/types/team";

async function getTeams() {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/teams",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY || "",
        },
        cache: "no-store", // Disable caching for this request
      },
    );

    if (!response.ok) {
      console.error(`API responded with status: ${response.status}`);
      throw new Error(`Failed to fetch teams: ${response.status}`);
    }

    const data = (await response.json()) as TeamsResponse;
    return data.teams;
  } catch (error) {
    console.error("Error fetching teams:", error);
    throw error;
  }
}

export default async function Teams() {
  let teams = [] as Team[];
  let error = null;

  try {
    teams = await getTeams();
  } catch (e) {
    error = e;
  }

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Premier League Teams</h1>
        {error ? (
          <div className="text-red-500">
            Failed to load teams. Please try again later.
          </div>
        ) : teams.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        ) : (
          <div className="text-gray-600">No teams available at the moment.</div>
        )}
      </div>
    </div>
  );
}
