import { useRef } from "react";
import { Playlist } from "./domains/Playlist";
import { PlaylistModel } from "./models/PlaylistModel";

type AddPlaylistProps = {
  onFinish: (value: Omit<Playlist, "id">) => void;
  edit?: PlaylistModel;
  copy?: PlaylistModel;
};

export const UpsertPlaylist = ({ onFinish, edit, copy }: AddPlaylistProps) => {
  const form = useRef<HTMLFormElement>(null);

  if (edit || copy) {
    const { name, description, transitionTime } = (edit ??
      copy) as PlaylistModel;

    setTimeout(() => {
      if (form.current) {
        (form.current.elements.namedItem("name") as Element)?.setAttribute(
          "value",
          name
        );
        (
          form.current.elements.namedItem("description") as Element
        )?.setAttribute("value", description ?? "");
        (
          form.current.elements.namedItem("transitionTime") as Element
        )?.setAttribute("value", transitionTime.toString());
      }
    }, 0);
  }

  return (
    <form
      ref={form}
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get("name") as string;
        const description = formData.get("description") as string;
        const transitionTime = formData.get("transitionTime") as string;

        onFinish({
          name,
          description,
          transitionTime: Number(transitionTime),
          musics: [],
        });
      }}
    >
      <input type="text" name="name" placeholder="Playlist name" />
      <input
        type="text"
        name="description"
        placeholder="Playlist description"
      />
      <label htmlFor="transitionTime">
        Transition time
        <input
          type="range"
          name="transitionTime"
          id="transitionTime"
          min={1}
          max={10}
        />
      </label>
      <button type="submit">{edit ? "Update" : "Create"}</button>
    </form>
  );
};
