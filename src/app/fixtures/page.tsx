import NavBar from "@/components/NavBar";
import { MatchesResponse } from "@/types/fixtures";

export default async function Fixtures() {
  try {
    const response = await fetch(
      "https://api.football-data.org/v4/competitions/PL/matches?season=2024",
      {
        headers: {
          "X-Auth-Token": process.env.FOOTBALL_API_KEY || "",
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: MatchesResponse = await response.json();

    return (
      <div className="p-4">
        <NavBar />
        <h1 className="text-2xl font-bold mb-4">Fixtures</h1>
        <table className="w-full">
          <thead>
            <tr className="border-b-2">
              <th className="text-left">Date</th>
              <th className="text-left">Home Team</th>
              <th className="text-left">Score</th>
              <th className="text-left">Away Team</th>
              <th className="text-right">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.matches.map((match) => (
              <tr key={match.id} className="border-b">
                <td className="py-2">
                  {new Date(match.utcDate).toLocaleDateString()}
                </td>
                <td className="py-2">{match.homeTeam.name}</td>
                <td>
                  {match.status === "FINISHED"
                    ? `${match.score.fullTime.home} - ${match.score.fullTime.away}`
                    : "vs"}
                </td>
                <td className="py-2">{match.awayTeam.name}</td>
                <td className="text-right">{match.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    if (error instanceof Error) {
      return <div>Error fetching data: {error.message}</div>;
    }
    return <div>An unknown error occurred</div>;
  }
}
