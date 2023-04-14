import { Playlist } from "../domains/Playlist";

export class PlaylistRepository {
  private playlists: Playlist[] = [
    {
      id: "playlist-1",
      name: "Playlist 1",
      description: "Playlist 1 description",
      transitionTime: 1,
      musics: [
        {
          id: "music-1",
          order: 1,
        },
        {
          id: "music-2",
          order: 2,
        },
      ],
    },
  ];

  static fetchPlaylists = async () => {
    return { error: null, playlists: new PlaylistRepository().playlists };
  };

  static updatePlaylist = async (playlist: Playlist) => {
    const playlistRepository = new PlaylistRepository();

    playlistRepository.playlists = playlistRepository.playlists.map((p) =>
      p.id === playlist.id ? playlist : p
    );

    return { error: null, playlist };
  };

  static createPlaylist = async (playlist: Omit<Playlist, "id">) => {
    const playlistRepository = new PlaylistRepository();

    const newPlaylist = {
      ...playlist,
      id: `playlist-${playlistRepository.playlists.length + 1}`,
    };

    playlistRepository.playlists = [
      ...playlistRepository.playlists,
      newPlaylist,
    ];

    return {
      error: null,
      playlist: newPlaylist,
    };
  };

  static deletePlaylist = async (playlist: Playlist) => {
    const playlistRepository = new PlaylistRepository();

    playlistRepository.playlists = playlistRepository.playlists.filter(
      (p) => p.id !== playlist.id
    );

    return { error: null, playlist };
  };
}
