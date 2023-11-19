export type Artwork = {
  artist_title?: string;
  date_end?: string;
  medium_display?: string;
  _score: number;
  thumbnail: {
    alt_text?: string;
    width: number | null;
    lqip: string;
    height: number | null;
  };
  api_model: string;
  is_boosted: boolean;
  api_link: string;
  id: number;
  title: string;
  timestamp: string;
  image_id: string;
};
