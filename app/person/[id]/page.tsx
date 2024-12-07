import { fetchPerson, fetchFilm, fetchVehicle, fetchStarship, fetchPlanet } from "@/app/lib/api";
import Link from "next/link";
import type { Film, Vehicle, Starship } from "@/app/lib/types";

export default async function PersonPage({ params }: { params: { id: string } }) {
  try {
    const person = await fetchPerson(params.id);
    
    // Fetch all data in parallel
    const [films, vehicles, starships, homeworld] = await Promise.all([
      Promise.all(person.films.map(url => fetchFilm(url))),
      Promise.all(person.vehicles.map(url => fetchVehicle(url))),
      Promise.all(person.starships.map(url => fetchStarship(url))),
      fetchPlanet(person.homeworld)
    ]);

    // Fetch residents (neighbors) data
    const neighbors = await Promise.all(
      homeworld.residents
        .filter(url => url !== person.url) // Exclude current person
        .map(url => {
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
        
        <div className="space-y-8">
          {/* Personal Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
            <h1 className="text-3xl font-bold text-yellow-400 mb-2">{person.name}</h1>
            <p className="text-sm text-slate-400 mb-6">From {homeworld.name}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <InfoItem label="Birth Year" value={person.birth_year} />
                <InfoItem label="Height" value={`${person.height}cm`} />
                <InfoItem label="Mass" value={`${person.mass}kg`} />
                <InfoItem label="Gender" value={person.gender} />
              </div>
              <div className="space-y-3">
                <InfoItem label="Eye Color" value={person.eye_color} />
                <InfoItem label="Hair Color" value={person.hair_color} />
                <InfoItem label="Skin Color" value={person.skin_color} />
              </div>
            </div>
          </div>

          {/* Homeworld Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 space-y-6">
            <div className="flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold text-yellow-400">Homeworld</h2>
              <Link 
                href={`/planet/${homeworld.url.split('/').filter(Boolean).pop()}`}
                className="text-yellow-400 hover:text-yellow-300 text-sm"
              >
                View Planet →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <InfoItem label="Planet" value={homeworld.name} />
                <InfoItem label="Climate" value={homeworld.climate} />
                <InfoItem label="Terrain" value={homeworld.terrain} />
                <InfoItem label="Population" value={homeworld.population} />
              </div>
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-yellow-400 mb-4">Neighbors</h3>
              {neighbors.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {neighbors.map((neighbor) => {
                    const neighborId = neighbor.url.split('/').filter(Boolean).pop();
                    return (
                      <Link 
                        key={neighbor.url}
                        href={`/person/${neighborId}`}
                        className="block p-4 bg-slate-800/30 border border-slate-700 rounded-lg 
                                 hover:bg-slate-800/50 hover:border-yellow-500/50 transition-all"
                      >
                        <h3 className="text-yellow-400 font-semibold mb-2">{neighbor.name}</h3>
                        <div className="text-sm text-slate-400">
                          <p>Birth Year: {neighbor.birth_year}</p>
                          <p>Gender: {neighbor.gender}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              ) : (
                <p className="text-slate-400">No other residents found</p>
              )}
            </div>
          </div>

          {/* Related Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-yellow-400">Related Information</h2>
            <div className="space-y-8">
              <FilmsList 
                label="Films"
                films={films}
                emptyText="No films available"
              />
              <VehiclesList 
                label="Vehicles"
                vehicles={vehicles}
                emptyText="No vehicles"
              />
              <StarshipsList 
                label="Starships"
                starships={starships}
                emptyText="No starships"
              />
              <InfoList 
                label="Species"
                items={person.species}
                emptyText="Species unknown"
              />
            </div>
          </div>

          <div className="text-sm text-slate-400 pb-4">
            <p>Created: {new Date(person.created).toLocaleDateString()}</p>
            <p>Last modified: {new Date(person.edited).toLocaleDateString()}</p>
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
          <h1 className="text-xl text-red-400">Error loading character</h1>
          <p className="text-slate-400">The character you&apos;re looking for couldn&apos;t be found.</p>
        </div>
      </div>
    );
  }
}

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-lg text-white capitalize">{value}</dd>
  </div>
);

const InfoList = ({ label, items, emptyText }: { 
  label: string; 
  items: string[];
  emptyText: string;
}) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-white">
      {items.length > 0 ? (
        <ul className="list-disc list-inside space-y-1">
          {items.map((item, index) => (
            <li key={index} className="text-sm">
              {`Resource ${index + 1}`}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 italic">{emptyText}</p>
      )}
    </dd>
  </div>
); 

const FilmsList = ({ label, films, emptyText }: { 
  label: string; 
  films: Film[];
  emptyText: string;
}) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-white">
      {films.length > 0 ? (
        <ul className="space-y-2">
          {films.map((film) => {
            const filmId = film.url.split('/').filter(Boolean).pop();
            return (
              <li key={film.url} className="text-sm">
                <Link 
                  href={`/film/${filmId}`}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  Episode {film.episode_id}: {film.title}
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 italic">{emptyText}</p>
      )}
    </dd>
  </div>
); 

const VehiclesList = ({ label, vehicles, emptyText }: { 
  label: string; 
  vehicles: Vehicle[];
  emptyText: string;
}) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-white">
      {vehicles.length > 0 ? (
        <ul className="space-y-2">
          {vehicles.map((vehicle) => {
            const vehicleId = vehicle.url.split('/').filter(Boolean).pop();
            return (
              <li key={vehicle.url} className="text-sm">
                <Link 
                  href={`/vehicle/${vehicleId}`}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  {vehicle.name} ({vehicle.vehicle_class})
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 italic">{emptyText}</p>
      )}
    </dd>
  </div>
); 

const StarshipsList = ({ label, starships, emptyText }: { 
  label: string; 
  starships: Starship[];
  emptyText: string;
}) => (
  <div>
    <dt className="text-sm text-slate-400">{label}</dt>
    <dd className="text-white">
      {starships.length > 0 ? (
        <ul className="space-y-2">
          {starships.map((starship) => {
            const starshipId = starship.url.split('/').filter(Boolean).pop();
            return (
              <li key={starship.url} className="text-sm">
                <Link 
                  href={`/starship/${starshipId}`}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  {starship.name} ({starship.starship_class})
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-sm text-slate-500 italic">{emptyText}</p>
      )}
    </dd>
  </div>
); 