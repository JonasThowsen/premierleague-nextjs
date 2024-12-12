"use client";

import { useState, useEffect } from "react";

export function useTeamPreferences() {
  const [preferences, setPreferences] = useState<
    Record<
      number,
      {
        favorite: boolean;
        customName?: string;
      }
    >
  >({});

  useEffect(() => {
    // Load both preferences and team names
    const storedPrefs = JSON.parse(
      localStorage.getItem("teamPreferences") || "{}",
    );
    const storedNames = JSON.parse(localStorage.getItem("teamNames") || "{}");

    // Merge stored names into preferences
    const mergedPrefs = { ...storedPrefs };
    Object.entries(storedNames).forEach(([id, name]) => {
      const numId = Number(id);
      mergedPrefs[numId] = {
        ...mergedPrefs[numId],
        customName: name as string,
      };
    });

    setPreferences(mergedPrefs);
  }, []);

  const updateCustomName = (teamId: number, name: string) => {
    // Update preferences
    setPreferences((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        customName: name,
      },
    }));

    // Update teamNames for TeamName component
    const storedNames = JSON.parse(localStorage.getItem("teamNames") || "{}");
    storedNames[teamId] = name;
    localStorage.setItem("teamNames", JSON.stringify(storedNames));

    // Save preferences
    localStorage.setItem("teamPreferences", JSON.stringify(preferences));

    // Dispatch storage event for other components
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "teamNames",
        newValue: JSON.stringify(storedNames),
      }),
    );
  };

  const toggleFavorite = (teamId: number) => {
    setPreferences((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        favorite: !prev[teamId]?.favorite,
      },
    }));
  };

  return { preferences, toggleFavorite, updateCustomName };
}
