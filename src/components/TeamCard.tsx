"use client";

import { Team } from "@/types/team";
import { useTeamPreferences } from "@/hooks/useTeamPreferences";
import Image from "next/image";

interface TeamCardProps {
  team: Team;
}

export default function TeamCard({ team }: TeamCardProps) {
  const { preferences, toggleFavorite, updateCustomName } =
    useTeamPreferences();

  return (
    <div className="border p-4 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <Image
          src={team.crest}
          alt={`${team.name} crest`}
          width={48}
          height={48}
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
  );
}
