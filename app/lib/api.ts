import type { Person, PeopleResponse, Film, Vehicle, Starship, Planet } from './types';

const BASE_URL = 'https://swapi.dev/api';

// Cache duration in seconds
const CACHE_DURATION = 60 * 60; // 1 hour

export const fetchPeople = async (page = 1) => {
  const response = await fetch(
    `${BASE_URL}/people/?page=${page}`,
    {
      next: {
        revalidate: CACHE_DURATION,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch people');
  }
  
  return response.json() as Promise<PeopleResponse>;
};

export const fetchPerson = async (id: string) => {
  // Clean the ID - remove any non-numeric characters
  const cleanId = id.replace(/\D/g, '');
  
  const response = await fetch(
    `${BASE_URL}/people/${cleanId}/`,
    {
      next: {
        revalidate: CACHE_DURATION,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch person');
  }
  
  return response.json() as Promise<Person>;
};

export const fetchFilm = async (url: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: CACHE_DURATION,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch film');
  }
  
  return response.json() as Promise<Film>;
};

export const fetchVehicle = async (url: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: CACHE_DURATION,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle');
  }
  
  return response.json() as Promise<Vehicle>;
};

export const fetchStarship = async (url: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: CACHE_DURATION,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch starship');
  }
  
  return response.json() as Promise<Starship>;
};

export const fetchPlanet = async (url: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: CACHE_DURATION,
    },
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch planet');
  }
  
  return response.json() as Promise<Planet>;
};

export const fetchPlanetById = async (id: string) => {
  const cleanId = id.replace(/\D/g, '');
  const response = await fetch(`${BASE_URL}/planets/${cleanId}/`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch planet');
  }
  
  return response.json() as Promise<Planet>;
};

export const searchPeople = async (query: string) => {
  const response = await fetch(
    `${BASE_URL}/people/?search=${encodeURIComponent(query)}`,
    {
      next: {
        revalidate: CACHE_DURATION,
      },
    }
  );
  
  if (!response.ok) {
    throw new Error('Failed to search people');
  }
  
  return response.json() as Promise<PeopleResponse>;
}; 