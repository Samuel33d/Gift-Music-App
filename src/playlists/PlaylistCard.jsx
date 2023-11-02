import { IconPencil } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const PlaylistCard = ({ playlist, index }) => {
  const positionTop = `${index * 48}px`;
  return (
    <li
      style={{ top: positionTop }}
      className="absolute hover:-translate-y-4 transition-all hover:rotate-3"
    >
      <Link to={`/playlists/${playlist.id}`} className="relative cassette">
        <img src="/cassette.png" alt="" />
        <div className="text-black bg-white rounded-md flex p-1 items-center absolute top-[15px] left-[20px] w-[198px] gap-1 text-sm font-semibold px-2">
          <h4 className="flex-1">{playlist.title}</h4>
          <IconPencil />
        </div>
      </Link>
    </li>
  );
};
export default PlaylistCard;
