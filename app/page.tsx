import { fetchPeople, searchPeople } from "./lib/api";
import PersonCard from "./components/PersonCard";
import SearchInput from "./components/SearchInput";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  const query = typeof resolvedSearchParams.search === 'string' ? resolvedSearchParams.search : '';
  const data = query ? await searchPeople(query) : await fetchPeople();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
          Star Wars Characters
        </h1>
        <SearchInput />
      </div>

      <section className="space-y-4">
        {data.results.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold">
              {query ? `Search Results for "${query}"` : 'All Characters'}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data.results.map((person) => (
                <PersonCard key={person.url} person={person} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-slate-400">No characters found</p>
          </div>
        )}
      </section>
    </div>
  );
}