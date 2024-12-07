# Star Wars Explorer

A modern, responsive web application that provides an interactive interface for exploring the Star Wars universe using the SWAPI (Star Wars API).

![Star Wars Explorer Screenshot]
[Consider adding a screenshot of your app here]

## Features

- **Character Directory**: Browse and search through Star Wars characters
- **Detailed Character Profiles**: View comprehensive information about each character including:
  - Personal details (birth year, physical characteristics)
  - Home planet information
  - Associated vehicles and starships
  - Film appearances
  - Planet neighbors
- **Film Details**: Explore Star Wars films with:
  - Opening crawl
  - Production details
  - Complete cast and locations
  - Related vehicles and starships
- **Interconnected Data**: Navigate between related characters, planets, vehicles, and starships
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Modern UI**: Space-themed, minimalistic design with smooth transitions

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Data**: SWAPI (Star Wars API)
- **Fonts**: Geist Font Family

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jackretterer/starwars.git
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

This project uses the [SWAPI](https://swapi.dev/) (Star Wars API) to fetch data. The API provides information about:
- Characters
- Films
- Planets
- Starships
- Vehicles

## Project Structure

```
app/
├── components/        # Reusable UI components
├── lib/              # API utilities and TypeScript types
├── person/           # Character detail pages
├── film/             # Film detail pages
├── planet/           # Planet detail pages
├── vehicle/          # Vehicle detail pages
├── starship/         # Starship detail pages
└── page.tsx          # Home page with character listing
```
