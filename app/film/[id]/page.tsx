import { fetchFilm, fetchPerson, fetchPlanetById, fetchStarship, fetchVehicle } from "@/app/lib/api";
import Link from "next/link";
import type { Person, Planet, Starship, Vehicle } from "@/app/lib/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function FilmPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const film = await fetchFilm(`https://swapi.dev/api/films/${resolvedParams.id}/`);

    // Fetch all related data in parallel
    const [characters, planets, starships, vehicles] = await Promise.all([
      Promise.all(film.characters.map(url => {
        const id = url.split('/').filter(Boolean).pop() || '';
        return fetchPerson(id);
      })),
      Promise.all(film.planets.map(url => {
        const id = url.split('/').filter(Boolean).pop() || '';
        return fetchPlanetById(id);
      })),
      Promise.all(film.starships.map(url => {
        const id = url.split('/').filter(Boolean).pop() || '';
        return fetchStarship(url);
      })),
      Promise.all(film.vehicles.map(url => {
        const id = url.split('/').filter(Boolean).pop() || '';
        return fetchVehicle(url);
      }))
    ]);

    return (
      <div className="space-y-8 pb-8">
        <Link 
          href="/"
          className="text-sm text-yellow-400 hover:text-yellow-300 flex items-center gap-2"
        >
          ← Back to list
        </Link>
        
        <div className="space-y-8">
          {/* Main Film Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-yellow-400 mb-2">
                  Episode {film.episode_id}: {film.title}
                </h1>
                <p className="text-sm text-slate-400">
                  Released: {new Date(film.release_date).toLocaleDateString()}
                </p>
              </div>

              <div className="prose prose-invert max-w-none">
                <div className="p-6 bg-slate-800/30 rounded-lg border border-slate-700">
                  <p className="text-lg text-slate-300 whitespace-pre-line leading-relaxed">
                    {film.opening_crawl}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Production Info Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-yellow-400 mb-6">Production Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <InfoItem label="Director" value={film.director} />
                <InfoItem label="Producer" value={film.producer} />
                <InfoItem label="Release Date" value={new Date(film.release_date).toLocaleDateString()} />
              </div>
              <div className="space-y-3">
                <InfoItem label="Episode" value={`Episode ${film.episode_id}`} />
                <InfoItem 
                  label="Created" 
                  value={new Date(film.created).toLocaleDateString()} 
                />
                <InfoItem 
                  label="Last Modified" 
                  value={new Date(film.edited).toLocaleDateString()} 
                />
              </div>
            </div>
          </div>

          {/* Characters Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-yellow-400">Featured Characters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character: Person) => {
                const characterId = character.url.split('/').filter(Boolean).pop();
                return (
                  <Link 
                    key={character.url}
                    href={`/person/${characterId}`}
                    className="block p-4 bg-slate-800/30 border border-slate-700 rounded-lg 
                             hover:bg-slate-800/50 hover:border-yellow-500/50 transition-all"
                  >
                    <h3 className="text-yellow-400 font-semibold mb-2">{character.name}</h3>
                    <div className="text-sm text-slate-400">
                      <p>Birth Year: {character.birth_year}</p>
                      <p>Gender: {character.gender}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Related Content Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-8 space-y-6">
            <h2 className="text-2xl font-semibold text-yellow-400">Related Content</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Planets</h3>
                <div className="space-y-2">
                  {planets.map((planet: Planet) => {
                    const planetId = planet.url.split('/').filter(Boolean).pop();
                    return (
                      <Link 
                        key={planet.url}
                        href={`/planet/${planetId}`}
                        className="block text-yellow-400 hover:text-yellow-300 text-sm"
                      >
                        {planet.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Starships</h3>
                <div className="space-y-2">
                  {starships.map((starship: Starship) => {
                    const starshipId = starship.url.split('/').filter(Boolean).pop();
                    return (
                      <Link 
                        key={starship.url}
                        href={`/starship/${starshipId}`}
                        className="block text-yellow-400 hover:text-yellow-300 text-sm"
                      >
                        {starship.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-yellow-400">Vehicles</h3>
                <div className="space-y-2">
                  {vehicles.map((vehicle: Vehicle) => {
                    const vehicleId = vehicle.url.split('/').filter(Boolean).pop();
                    return (
                      <Link 
                        key={vehicle.url}
                        href={`/vehicle/${vehicleId}`}
                        className="block text-yellow-400 hover:text-yellow-300 text-sm"
                      >
                        {vehicle.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
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
          <h1 className="text-xl text-red-400">Error loading film</h1>
          <p className="text-slate-400">The film you&apos;re looking for couldn&apos;t be found.</p>
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