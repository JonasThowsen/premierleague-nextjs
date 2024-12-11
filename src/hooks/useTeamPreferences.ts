import { useState, useEffect } from "react";
import { TeamPreferencesMap } from "@/types/team";

export function useTeamPreferences() {
  const [preferences, setPreferences] = useState<TeamPreferencesMap>({});

  useEffect(() => {
    // Load preferences from localStorage on mount
    const stored = localStorage.getItem("teamPreferences");
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  const updatePreferences = (
    teamId: number,
    updates: Partial<TeamPreferencesMap[number]>,
  ) => {
    const newPreferences = {
      ...preferences,
      [teamId]: {
        ...preferences[teamId],
        ...updates,
      },
    };
    setPreferences(newPreferences);
    localStorage.setItem("teamPreferences", JSON.stringify(newPreferences));
  };

  const toggleFavorite = (teamId: number) => {
    const current = preferences[teamId]?.favorite || false;
    updatePreferences(teamId, { favorite: !current });
  };

  const updateCustomName = (teamId: number, customName: string) => {
    updatePreferences(teamId, { customName });
  };

  return {
    preferences,
    toggleFavorite,
    updateCustomName,
  };
}
