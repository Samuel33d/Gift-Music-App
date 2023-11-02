import { useEffect, useState } from "react";
import PrincipalLayout from "../layouts/PrincipalLayout";
import { SearchIcon } from "../svg/Svgs";
import { axiosMusic } from "../utils/configAxios";
import PlaylistList from "../playlists/PlaylistList";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistName, setPlaylistName] = useState("");

  const playlistByName = playlists.filter((playlist) =>
    playlist.title.toLowerCase().includes(playlistName)
  );

  useEffect(() => {
    axiosMusic
      .get("/api/playlists/me")
      .then(({ data }) => setPlaylists(data))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const playlistName = e.target.playlistName.value;
    setPlaylistName(playlistName.toLowerCase());
  };
  return (
    <PrincipalLayout>
      <Link
        className="top-8 left-20 sm:absolute hover:text-secondary transition-all sm:left-10"
        to={"/"}
      >
        {"< Atrás"}
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-white/5 p-3 px-4 rounded-lg flex gap-2 sm:gap-4 items-center justify-between transition-all shadow-md mt-8"
      >
        <SearchIcon />
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          placeholder="Buscar playlist"
          name="playlistName"
          size={10}
          autoComplete="off"
        />
      </form>

      {playlists.length === 0 ? (
        <div className="w-full mx-auto text-center mt-10">
          <span className="text-lg">Aún no hay playlists creadas</span>
        </div>
      ) : (
        <PlaylistList
          playlists={playlistByName === 0 ? playlists : playlistByName}
        />
      )}
    </PrincipalLayout>
  );
};
export default Playlists;
