import { useState } from "react";
import { PlaylistItem } from "./components/PlaylistItem";
import { usePlaylists } from "./usePlaylists";
import Modal from "react-modal";
import { UpsertPlaylist } from "./UpsertPlaylist";

Modal.setAppElement("#modals");

const Error = () => <div>Something went wrong</div>;

export const Playlists = () => {
  const {
    error,
    playlists,
    addPlaylist,
    deletePlaylist,
    updatePlaylist,
    getPlaylist,
  } = usePlaylists();

  const [modal, setModal] = useState(false);
  const [edit, setEdit] = useState("");
  const [copy, setCopy] = useState("");

  const closeModal = () => {
    setModal(false);
    setEdit("");
    setCopy("");
  };

  return (
    <section
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Modal isOpen={modal} onRequestClose={closeModal}>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "30%",
            }}
          >
            {playlists.map((playlist) => (
              <PlaylistItem
                key={playlist.id}
                playlist={playlist}
                onDelete={() => deletePlaylist(playlist)}
                onCopy={() => {
                  setCopy(playlist.id);
                  setModal(true);
                }}
                onEdit={() => {
                  setEdit(playlist.id);
                  setModal(true);
                }}
              />
            ))}
          </div>

          <UpsertPlaylist
            edit={getPlaylist(edit)}
            copy={getPlaylist(copy)}
            onFinish={(data) => {
              if (edit) {
                updatePlaylist({
                  id: edit,
                  ...data,
                });
              } else {
                addPlaylist(data);
              }

              closeModal();
            }}
          />
        </div>
      </Modal>

      <div style={{ width: "100%", padding: "0.5rem 1rem" }}>
        <button
          style={{
            border: "none",
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            cursor: "pointer",
          }}
          onClick={() => setModal(true)}
        >
          Add playlist
        </button>
      </div>

      {error ? <Error /> : null}

      {playlists.map((playlist) => (
        <PlaylistItem
          key={playlist.id}
          playlist={playlist}
          onDelete={() => deletePlaylist(playlist)}
          onCopy={() => {
            setCopy(playlist.id);
            setModal(true);
          }}
          onEdit={() => {
            setEdit(playlist.id);
            setModal(true);
          }}
        />
      ))}
    </section>
  );
};
