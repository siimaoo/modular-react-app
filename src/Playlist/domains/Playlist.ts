export type Playlist = {
  id: string;
  name: string;
  description?: string;
  transitionTime: number;
  musics: Array<{
    id: string;
    order: number;
  }>;
};
