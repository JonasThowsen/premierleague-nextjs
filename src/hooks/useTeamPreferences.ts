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

  // Load preferences when component mounts
  useEffect(() => {
    const storedPrefs = JSON.parse(
      localStorage.getItem("teamPreferences") || "{}",
    );
    setPreferences(storedPrefs);
  }, []);

  const toggleFavorite = (teamId: number) => {
    // Use callback form of setState to ensure we have latest state
    setPreferences((prev) => {
      // Create new preferences object
      const newPrefs = {
        ...prev,
        [teamId]: {
          ...prev[teamId],
          favorite: !prev[teamId]?.favorite,
        },
      };

      // Save to localStorage
      localStorage.setItem("teamPreferences", JSON.stringify(newPrefs));

      // Log for debugging
      console.log("Toggling favorite for team:", teamId);
      console.log("New preferences:", newPrefs);

      return newPrefs;
    });
  };

  const updateCustomName = (teamId: number, name: string) => {
    setPreferences((prev) => {
      const newPrefs = {
        ...prev,
        [teamId]: {
          ...prev[teamId],
          customName: name,
        },
      };

      // Save both preferences and team names
      localStorage.setItem("teamPreferences", JSON.stringify(newPrefs));
      localStorage.setItem(
        "teamNames",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("teamNames") || "{}"),
          [teamId]: name,
        }),
      );

      return newPrefs;
    });
  };

  return { preferences, toggleFavorite, updateCustomName };
}
