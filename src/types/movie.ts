export type MediaType = 'movie' | 'series' | 'documentary';

export type GenreKey =
  | 'all'
  | 'action'
  | 'scifi'
  | 'drama'
  | 'mystery'
  | 'documentary';

export type NavSection =
  | 'home'
  | 'series'
  | 'movies'
  | 'trending'
  | 'mylist'
  | 'history';

export type ArtworkTheme =
  | 'eclipse-desert'
  | 'midnight-bridge'
  | 'orbital-ring'
  | 'noir-alley'
  | 'frozen-observatory'
  | 'ocean-abyss'
  | 'andalus-arch'
  | 'cyber-vault'
  | 'hardware-lab'
  | 'telemetry-grid'
  | 'command-bunker'
  | 'crimson-horizon'
  | 'neon-rain'
  | 'ancient-library';

export interface Episode {
  id: string;
  number: number;
  title: string;
  durationMinutes: number;
  durationLabel: string;
  synopsis: string;
  theme: ArtworkTheme;
}

export interface Season {
  number: number;
  title: string;
  episodes: Episode[];
}

export interface SubtitleCue {
  startSec: number;
  endSec: number;
  ar: string;
  en: string;
}

export interface Movie {
  id: string;
  title: string;
  originalTitle: string;
  type: MediaType;
  year: number;
  ageRating: string;
  durationLabel: string;
  durationSeconds: number;
  quality: '4K HDR' | '4K Dolby Vision' | 'Full HD';
  genres: Exclude<GenreKey, 'all'>[];
  genreLabel: string;
  matchScore: number;
  synopsis: string;
  director: string;
  cast: string[];
  isOriginal?: boolean;
  isTrending?: boolean;
  topRank?: number;
  isKidFriendly?: boolean;
  artworkTheme: ArtworkTheme;
  imageSrc?: string;
  accentColor: string;
  seasons?: Season[];
  subtitles: SubtitleCue[];
}

export interface UserProfile {
  id: string;
  name: string;
  initials: string;
  color: string;
  isKids: boolean;
}

export interface WatchProgressMap {
  [movieId: string]: {
    seconds: number;
    durationSeconds: number;
    episodeId?: string;
    updatedAt: number;
  };
}

export interface WatchHistoryEntry {
  movieId: string;
  completedAt: number;
  episodeId?: string;
}

export interface WatchHistoryMap {
  [movieId: string]: WatchHistoryEntry;
}

export interface PlayingSession {
  movie: Movie;
  episode?: Episode;
  startAtSeconds: number;
}
