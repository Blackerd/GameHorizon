export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  features: string[];
  direct: string;
  coverImage: string;
  bannerImage?: string;
  rating: number;
  systemRequirements: string;
  multiplayer: boolean;
  featured: boolean;
}