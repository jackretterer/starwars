'use client';

import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isSearching, setIsSearching] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
 
      return params.toString();
    },
    [searchParams]
  );

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSearching(true);
    const query = e.target.value;
    
    router.push(pathname + '?' + createQueryString('search', query));
  };

  return (
    <div className="relative w-full max-w-xl">
      <input
        type="text"
        placeholder="Search characters..."
        onChange={handleSearch}
        defaultValue={searchParams.get('search')?.toString()}
        className="w-full px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg 
                 text-white placeholder-slate-400 focus:outline-none focus:ring-2 
                 focus:ring-yellow-500/50 focus:border-transparent"
      />
      {isSearching && (
        <div className="absolute right-3 top-2.5">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-400 border-t-transparent" />
        </div>
      )}
    </div>
  );
} 