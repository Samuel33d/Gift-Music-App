import PlaylistCard from "./PlaylistCard";

const PlaylistList = ({ playlists }) => {
  const CASSETTE_HEIGHT = 180;
  const DELTA = 48;
  const PLAYLISTS_LENGTH = playlists.length;

  const heightTotal = `${CASSETTE_HEIGHT + DELTA * PLAYLISTS_LENGTH}px`;

  return (
    <ul
      style={{ height: heightTotal }}
      className="w-full grid place-items-center relative my-5 "
    >
      {playlists.map((playlist, index) => (
        <PlaylistCard key={playlist.id} playlist={playlist} index={index} />
      ))}
    </ul>
  );
};
export default PlaylistList;
