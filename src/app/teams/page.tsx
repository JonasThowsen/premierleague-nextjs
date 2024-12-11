"use client";

import { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { TeamsResponse, Team } from "@/types/team";
import { useTeamPreferences } from "@/hooks/useTeamPreferences";

async function getTeams() {
  const response = await fetch(
    "https://api.football-data.org/v4/competitions/PL/teams",
    {
      headers: {
        "X-Auth-Token": "9b71f705c2a14ffbb9c8c3806d531bcf",
      },
    },
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { preferences, toggleFavorite, updateCustomName } =
    useTeamPreferences();

  // Fetch teams on component mount
  useEffect(() => {
    getTeams()
      .then((data: TeamsResponse) => setTeams(data.teams))
      .catch((err) => setError(err.message));
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Premier League Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <div key={team.id} className="border p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <img
                  src={team.crest}
                  alt={`${team.name} crest`}
                  className="w-12 h-12 object-contain"
                />
                <button
                  onClick={() => toggleFavorite(team.id)}
                  className={`px-3 py-1 rounded ${
                    preferences[team.id]?.favorite
                      ? "bg-yellow-400 text-black"
                      : "bg-gray-200"
                  }`}
                >
                  {preferences[team.id]?.favorite ? "★" : "☆"}
                </button>
              </div>

              <div className="mt-2">
                <input
                  type="text"
                  value={preferences[team.id]?.customName || team.name}
                  onChange={(e) => updateCustomName(team.id, e.target.value)}
                  className="w-full px-2 py-1 border rounded"
                />
              </div>

              <div className="mt-2 text-sm text-gray-600">
                <p>Founded: {team.founded}</p>
                <p>Venue: {team.venue}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
