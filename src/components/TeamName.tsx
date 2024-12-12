"use client";

import { useEffect, useState } from "react";

interface TeamNameProps {
  teamId: number;
  originalName: string;
}

export function TeamName({ teamId, originalName }: TeamNameProps) {
  const [displayName, setDisplayName] = useState(originalName);

  useEffect(() => {
    const storedNames = JSON.parse(localStorage.getItem("teamNames") || "{}");
    if (storedNames[teamId]) {
      setDisplayName(storedNames[teamId]);
    }
  }, [teamId]);

  return <td>{displayName}</td>;
}
