'use client';

import { createContext, useContext, useCallback, ReactNode } from 'react';
import { Person } from '../lib/types';

interface Cache {
  people: Record<string, Person>;
  searchResults: Record<string, Person[]>;
}

interface CacheContextType {
  cache: Cache;
  setPerson: (person: Person) => void;
  setSearchResults: (query: string, results: Person[]) => void;
  getPerson: (id: string) => Person | undefined;
  getSearchResults: (query: string) => Person[] | undefined;
}

const CacheContext = createContext<CacheContextType | null>(null);

const initialCache: Cache = {
  people: {},
  searchResults: {},
};

export function CacheProvider({ children }: { children: ReactNode }) {
  const cache = initialCache;

  const setPerson = useCallback((person: Person) => {
    const id = person.url.split('/').filter(Boolean).pop();
    if (id) {
      cache.people[id] = person;
    }
  }, []);

  const setSearchResults = useCallback((query: string, results: Person[]) => {
    cache.searchResults[query] = results;
    // Also cache individual people
    results.forEach(person => {
      const id = person.url.split('/').filter(Boolean).pop();
      if (id) {
        cache.people[id] = person;
      }
    });
  }, []);

  const getPerson = useCallback((id: string) => {
    return cache.people[id];
  }, []);

  const getSearchResults = useCallback((query: string) => {
    return cache.searchResults[query];
  }, []);

  return (
    <CacheContext.Provider 
      value={{ 
        cache, 
        setPerson, 
        setSearchResults, 
        getPerson, 
        getSearchResults 
      }}
    >
      {children}
    </CacheContext.Provider>
  );
}

export function useCache() {
  const context = useContext(CacheContext);
  if (!context) {
    throw new Error('useCache must be used within a CacheProvider');
  }
  return context;
} 