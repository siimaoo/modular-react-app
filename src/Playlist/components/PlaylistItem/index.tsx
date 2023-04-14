import { PlaylistModel } from "../../models/PlaylistModel";

import "./style.scss";

type PlaylistItemProps = {
  playlist: PlaylistModel;
  onDelete: () => void;
  onEdit: () => void;
  onCopy: () => void;
};

export const PlaylistItem = ({
  playlist,
  onDelete,
  onEdit,
  onCopy,
}: PlaylistItemProps) => {
  return (
    <div className="playlist-item">
      <div className="playlist-item__info">
        <div className="playlist-item__info-name">{playlist.name}</div>
        <span className="playlist-item__info-tag">
          {playlist.musicCount} musics
        </span>
      </div>

      <div className="playlist-item__actions">
        <button className="playlist-item__actions-play">&#9658;</button>

        <button className="playlist-item__actions-action" onClick={onCopy}>
          Copy
        </button>

        <button className="playlist-item__actions-action" onClick={onEdit}>
          Edit
        </button>

        <button className="playlist-item__actions-action" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};
