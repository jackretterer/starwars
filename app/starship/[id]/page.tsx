import { fetchStarship } from "@/app/lib/api";
import Link from "next/link";

export default async function StarshipPage({ params }: { params: { id: string } }) {
  const starship = await fetchStarship(`https://swapi.dev/api/starships/${params.id}/`);

  return (
    <div className="space-y-8">
      <Link 
        href="/"
        className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
      >
        ← Back to list
      </Link>
      
      <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-yellow-400 mb-2">{starship.name}</h1>
        <p className="text-sm text-slate-400 mb-6">{starship.model}</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-400">Specifications</h2>
            <div className="space-y-3">
              <InfoItem label="Class" value={starship.starship_class} />
              <InfoItem label="Manufacturer" value={starship.manufacturer} />
              <InfoItem label="Length" value={`${starship.length} meters`} />
              <InfoItem label="Speed" value={`${starship.max_atmosphering_speed}`} />
              <InfoItem label="Hyperdrive Rating" value={starship.hyperdrive_rating} />
              <InfoItem label="MGLT" value={starship.MGLT} />
            </div>
          </section>
          
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-yellow-400">Capacity</h2>
            <div className="space-y-3">
              <InfoItem label="Crew" value={starship.crew} />
              <InfoItem label="Passengers" value={starship.passengers} />
              <InfoItem label="Cargo Capacity" value={`${starship.cargo_capacity} kg`} />
              <InfoItem label="Consumables" value={starship.consumables} />
            </div>
          </section>
          
          <section className="col-span-full">
            <h2 className="text-xl font-semibold text-yellow-400 mb-4">Additional Info</h2>
            <InfoItem label="Cost" value={`${starship.cost_in_credits} credits`} />
          </section>
        </div>
      </div>
    </div>
  );
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-lg text-white">{value}</dd>
  </div>
); 