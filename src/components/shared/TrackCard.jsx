import { IconMinus } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addTrack, removeTrack } from "../../store/slices/playlistCart.slice";
import { PlayIcon, PlusIcon } from "../../svg/Svgs";
import { IconX } from "@tabler/icons-react";

const TrackCard = ({
  track,
  showBtnAdd,
  showBtnPlay,
  showBtnDelete,
  showBtnX,
  deleteTrack,
  setTrackToPlay,
  artistQuantity = 2,
  artistFontSize = "text-base",
  trackImgSize = "w-[54px] h-[54px]",
  trackScale = "sm:hover:scale-105",
}) => {
  const dispatch = useDispatch();
  const handleAddTrack = () => {
    dispatch(addTrack(track));
  };
  const handleRemoveTrack = () => {
    dispatch(removeTrack(track.id));
  };

  return (
    <>
      {track && (
        <article
          className={` sm:text-base flex gap-3  justify-between items-center w-full text-[0.8rem] sm:hover:bg-white/10 transition-all   p-1 rounded-md ${trackScale} sm:hover:shadow-md px-2`}
        >
          <div className={`rounded-lg overflow-hidden ${trackImgSize}`}>
            <img src={track?.album.images[2].url} alt="" />
          </div>
          <div className="flex-1 grid gap-0 sm:gap-1">
            <Link
              to={`/tracks/${track?.id}`}
              className={` line-clamp-1 font-semibold hover:text-secondary transition-colors sm:${artistFontSize} `}
            >
              {track?.name}
            </Link>

            <ul className="flex flex-col sm:flex-row sm:text-base sm:gap-1">
              {track?.artists
                .slice(0, artistQuantity)
                .map((artist, index, array) => (
                  <li key={artist.id}>
                    <Link
                      className="hover:text-secondary transition-colors flex  line-clamp-1 text-[#CCCC] 
sm:text-sm"
                      to={`/artists/${artist.id}`}
                    >
                      {artist.name} {array.length - 1 !== index && ", "}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex items-center  gap-2  mr-2 ">
            {showBtnPlay && (
              <button onClick={() => setTrackToPlay(track?.spotifyId)}>
                <PlayIcon />
              </button>
            )}
            {showBtnAdd && (
              <button onClick={handleAddTrack}>
                <PlusIcon />
              </button>
            )}
            {showBtnDelete && (
              <button
                className="p-[1px] rounded-full border-2 hover:text-secondary hover:border-secondary transition-colors"
                onClick={handleRemoveTrack}
              >
                <IconMinus size={13} />
              </button>
            )}
            {showBtnX && (
              <button
                className="p-[1px] rounded-full border-2 hover:text-secondary hover:border-secondary transition-colors"
                onClick={() => deleteTrack(track.id)}
              >
                <IconX size={15} />
              </button>
            )}
          </div>
        </article>
      )}
    </>
  );
};
export default TrackCard;
