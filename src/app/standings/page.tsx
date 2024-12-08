import NavBar from "@/components/NavBar";
import { StandingsResponse } from "@/types/football";

export default async function Standings() {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/standings",
      {
        headers: {
          "X-Auth-Token": "9b71f705c2a14ffbb9c8c3806d531bcf",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: StandingsResponse = await response.json();

    return (
      <div>
        <NavBar />
        <div className="p-4">
          <h1 className="text-2xl font-bold mb-4">
            {data.competition.name} Standings
          </h1>
          <table className="w-full">
            <thead>
              <tr className="border-b-2">
                <th className="text-left">Position</th>
                <th className="text-left">Team</th>
                <th className="text-right">Played</th>
                <th className="text-right">Won</th>
                <th className="text-right">Draw</th>
                <th className="text-right">Lost</th>
                <th className="text-right">GF</th>
                <th className="text-right">GA</th>
                <th className="text-right">GD</th>
                <th className="text-right">Points</th>
              </tr>
            </thead>
            <tbody>
              {data.standings[0].table.map((team) => (
                <tr key={team.team.id} className="border-b">
                  <td className="py-2">{team.position}</td>
                  <td>{team.team.name}</td>
                  <td className="text-right">{team.playedGames}</td>
                  <td className="text-right">{team.won}</td>
                  <td className="text-right">{team.draw}</td>
                  <td className="text-right">{team.lost}</td>
                  <td className="text-right">{team.goalsFor}</td>
                  <td className="text-right">{team.goalsAgainst}</td>
                  <td className="text-right">{team.goalDifference}</td>
                  <td className="text-right font-bold">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      return <div>Error fetching data: {error.message}</div>;
    }
    return <div>An unknown error occurred</div>;
  }
}
