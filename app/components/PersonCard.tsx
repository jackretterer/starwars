import Link from "next/link";
import type { Person } from "../lib/types";

interface PersonCardProps {
  person: Person;
}

const PersonCard = ({ person }: PersonCardProps) => {
  // Extract ID from URL
  const id = person.url.split("/").filter(Boolean).pop();

  return (
    <Link 
      href={`/person/${id}`}
      className="block group"
    >
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 transition-all duration-200 hover:border-yellow-500/50 hover:bg-slate-800/80">
        <h3 className="text-lg font-semibold text-yellow-400 mb-2">{person.name}</h3>
        <div className="space-y-2 text-sm text-slate-300">
          <p>Birth Year: {person.birth_year}</p>
          <p>Gender: {person.gender}</p>
        </div>
      </div>
    </Link>
  );
}

export default PersonCard; 