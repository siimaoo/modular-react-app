import { useEffect, useState } from "react";
import { Playlist } from "./domains/Playlist";
import { PlaylistModel } from "./models/PlaylistModel";
import { PlaylistRepository } from "./repositories/PlaylistRepository";

export const usePlaylists = () => {
  const [playlists, setPlaylists] = useState<PlaylistModel[]>([]);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchPlaylists()
      .then((playlists) => setPlaylists(playlists))
      .catch((error) => setError(error));
  }, []);

  const convertPlaylist = (playlists: Playlist[]) => {
    if (!playlists?.length) return [];

    return playlists.map((playlist) => new PlaylistModel(playlist));
  };

  const fetchPlaylists = async () => {
    const response = await PlaylistRepository.fetchPlaylists();
    if (response.error) throw response.error;

    return convertPlaylist(response.playlists);
  };

  const addPlaylist = async (playlist: Omit<Playlist, "id">) => {
    const response = await PlaylistRepository.createPlaylist(playlist);
    if (response.error) return response.error;

    setPlaylists([...playlists, new PlaylistModel(response.playlist)]);
  };

  const deletePlaylist = async (playlist: Playlist) => {
    const response = await PlaylistRepository.deletePlaylist(playlist);
    if (response.error) return response.error;

    setPlaylists(playlists.filter((p) => p.id !== playlist.id));
  };

  const getPlaylist = (id: string) => {
    return playlists.find((playlist) => playlist.id === id);
  };

  const updatePlaylist = async (playlist: Playlist) => {
    const response = await PlaylistRepository.updatePlaylist(playlist);
    if (response.error) return response.error;

    setPlaylists(
      playlists.map((p) => {
        if (p.id === playlist.id) return new PlaylistModel(response.playlist);
        return p;
      })
    );
  };

  return {
    playlists,
    error,
    addPlaylist,
    deletePlaylist,
    getPlaylist,
    updatePlaylist,
  };
};
