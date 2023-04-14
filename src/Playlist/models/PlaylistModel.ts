import { Playlist } from "../domains/Playlist";

export class PlaylistModel {
  private playlist: Playlist;

  constructor(playlist: Playlist) {
    this.playlist = playlist;
  }

  get id() {
    return this.playlist.id;
  }

  get name() {
    return this.playlist.name;
  }

  get description() {
    return this.playlist.description;
  }

  get transitionTime() {
    return 31 - this.playlist.transitionTime;
  }

  get musicCount() {
    return this.playlist.musics.length;
  }

  get musics() {
    return this.playlist.musics.sort((a, b) => a.order - b.order);
  }
}
