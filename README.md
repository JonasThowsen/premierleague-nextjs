## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How It Works

This Premier League application allows you to track your favorite teams and view league information. Here's how it works:

### Data Flow

1. The app fetches official Premier League data from the football-data.org API, including:

   - Current league standings
   - Match fixtures
   - Team information

2. Users can:

   - View all Premier League teams
   - Mark teams as favorites (star icon)
   - Customize team names
   - View upcoming fixtures
   - Check current league standings

3. User Preferences:
   - All favorites and custom names are saved locally in your browser

### Page Structure

- **Home Page**: Shows the Premier League standings
- **Teams Page**: Shows all Premier League teams with options to:
  - Star teams as favorites
  - Customize team names
  - View team details
- **Fixtures Page**: Lists upcoming and past matches

### Technical Implementation

- Built with Next.js and TypeScript
- Uses client-side storage for user preferences
- Fetches real-time data from the football-data.org API
