import NavBar from "@/components/NavBar";

import TeamList from "./TeamList";
import TeamCard from "@/components/TeamCard";

export default async function Teams() {
  const { teams } = await TeamList();

  return (
    <div>
      <NavBar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Premier League Teams</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}
