"use client";

import { useState, useEffect } from "react";

interface TeamPreference {
  favorite: boolean;
  customName?: string;
}

export function useTeamPreferences() {
  const [preferences, setPreferences] = useState<
    Record<number, TeamPreference>
  >({});

  useEffect(() => {
    const storedPrefs = JSON.parse(
      localStorage.getItem("teamPreferences") || "{}",
    );
    console.log("Initial load preferences:", storedPrefs);
    setPreferences(storedPrefs);
  }, []);

  const toggleFavorite = (teamId: number) => {
    const currentStoredPrefs = JSON.parse(
      localStorage.getItem("teamPreferences") || "{}",
    );
    console.log("Current stored prefs before toggle:", currentStoredPrefs);

    const newPrefs = {
      ...currentStoredPrefs,
      [teamId]: {
        ...currentStoredPrefs[teamId],
        favorite: !currentStoredPrefs[teamId]?.favorite,
      },
    };

    console.log("New prefs after toggle:", newPrefs);

    localStorage.setItem("teamPreferences", JSON.stringify(newPrefs));

    setPreferences(newPrefs);
  };

  const updateCustomName = (teamId: number, name: string) => {
    const currentStoredPrefs = JSON.parse(
      localStorage.getItem("teamPreferences") || "{}",
    );

    const newPrefs = {
      ...currentStoredPrefs,
      [teamId]: {
        ...currentStoredPrefs[teamId],
        customName: name,
      },
    };

    localStorage.setItem("teamPreferences", JSON.stringify(newPrefs));
    localStorage.setItem(
      "teamNames",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("teamNames") || "{}"),
        [teamId]: name,
      }),
    );

    setPreferences(newPrefs);
  };

  return { preferences, toggleFavorite, updateCustomName };
}
