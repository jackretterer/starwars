import { fetchPlanetById, fetchPerson } from "@/app/lib/api";
import Link from "next/link";
import type { Person } from "@/app/lib/types";

export default async function PlanetPage({ params }: { params: { id: string } }) {
  try {
    const planet = await fetchPlanetById(params.id);
    
    // Fetch all residents in parallel
    const residents = await Promise.all(
      planet.residents.map(url => {
        const id = url.split('/').filter(Boolean).pop() || '';
        return fetchPerson(id);
      })
    );

    return (
      <div className="space-y-8">
        <Link 
          href="/"
          className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
        >
          ← Back to list
        </Link>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
          <h1 className="text-3xl font-bold text-yellow-400 mb-6">{planet.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-yellow-400">Planet Info</h2>
              <div className="space-y-3">
                <InfoItem label="Climate" value={planet.climate} />
                <InfoItem label="Terrain" value={planet.terrain} />
                <InfoItem label="Surface Water" value={`${planet.surface_water}%`} />
                <InfoItem label="Population" value={planet.population} />
              </div>
            </section>
            
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-yellow-400">Orbital Data</h2>
              <div className="space-y-3">
                <InfoItem label="Rotation Period" value={`${planet.rotation_period} hours`} />
                <InfoItem label="Orbital Period" value={`${planet.orbital_period} days`} />
                <InfoItem label="Diameter" value={`${planet.diameter} km`} />
                <InfoItem label="Gravity" value={planet.gravity} />
              </div>
            </section>

            <section className="col-span-full space-y-4">
              <h2 className="text-xl font-semibold text-yellow-400">Residents</h2>
              {residents.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {residents.map((resident) => {
                    const residentId = resident.url.split('/').filter(Boolean).pop();
                    return (
                      <Link 
                        key={resident.url}
                        href={`/person/${residentId}`}
                        className="block p-4 bg-slate-800/30 border border-slate-700 rounded-lg 
                                 hover:bg-slate-800/50 hover:border-yellow-500/50 transition-all"
                      >
                        <h3 className="text-yellow-400 font-semibold mb-2">{resident.name}</h3>
                        <div className="text-sm text-slate-400">
                          <p>Birth Year: {resident.birth_year}</p>
                          <p>Gender: {resident.gender}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-400">No known residents</p>
              )}
            </section>

            <section className="col-span-full text-sm text-slate-400">
              <p>Created: {new Date(planet.created).toLocaleDateString()}</p>
              <p>Last modified: {new Date(planet.edited).toLocaleDateString()}</p>
            </section>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="space-y-8">
        <Link 
          href="/"
          className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
        >
          ← Back to list
        </Link>
        
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
          <h1 className="text-xl text-red-400">Error loading planet</h1>
          <p className="text-slate-400">The planet you're looking for couldn't be found.</p>
        </div>
      </div>
    );
  }
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-lg text-white">{value}</dd>
  </div>
); 