import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import TrackCard from "../components/shared/TrackCard";
import PrincipalLayout from "../layouts/PrincipalLayout";
import { axiosMusic } from "../utils/configAxios";
import PlaySpotify from "../components/shared/PlaySpotify";
import { PlayIcon, PlusIcon } from "../svg/Svgs";
import { addTrack } from "../store/slices/playlistCart.slice";
import { useDispatch } from "react-redux";

const TrackDetails = () => {
  const [track, setTrack] = useState(null);
  const { id } = useParams();
  const [trackToPlay, setTrackToPlay] = useState("");
  const dispatch = useDispatch();
  const relatedSongs = track?.relatedSongs;

  const handleAddTrack = () => {
    dispatch(addTrack(track));
  };

  useEffect(() => {
    axiosMusic
      .get(`/api/tracks/${id}`)
      .then(({ data }) => setTrack(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <PrincipalLayout>
      <section className="py-2 sm:py-10 transition-all">
        <div
          className="px-5 sm:px-0 grid  sm:grid-cols-2 
        gap-3 sm:gap-4 transition-all max-w-[300px] mx-auto sm:max-w-none"
        >
          <Link
            className="top-8 left-20 sm:absolute hover:text-secondary transition-all sm:left-10"
            to={-1}
          >
            {"< Atrás"}
          </Link>

          <div className="link  h-full w-full flex items-center  justify-center mx-auto relative">
            <img
              className=" rounded-lg overflow-hidden 
              shadow-md shadow-black hover:scale-105 hover:grayscale transition-all"
              src={track?.album.images[0].url}
              alt=""
            />
          </div>

          <div className="flex flex-col gap-1 sm:gap-2 p-2 sm:p-5  sm:text-sm ">
            <h4 className=" line-clamp-1  font-semibold  ">{track?.name}</h4>
            <h5 className="text-[#CCCC]">
              <ul className="flex sm:flex-col gap-2">
                {track?.artists.slice(0, 2).map((artist, index, array) => (
                  <li key={artist.id}>
                    <Link
                      className="hover:text-secondary transition-colors flex line-clamp-1 sm:line-clamp-none text-[#CCCC]"
                      to={`/artists/${artist.id}`}
                    >
                      {artist.name} {array.length - 1 !== index && ", "}
                    </Link>
                  </li>
                ))}
              </ul>
            </h5>
            <h6 className="grid  gap-1">
              Album:
              <span className="text-[#CCCC]">{track?.album.name}</span>
            </h6>
            <h6 className="grid  gap-1">
              Fecha de salida:{" "}
              <span className="text-[#CCCC]">{track?.album.release_date}</span>
            </h6>
            <div className="flex gap-1">
              <button
                onClick={() => setTrackToPlay(track.id)}
                className="w-fit group"
              >
                <PlayIcon />
              </button>
              <button onClick={handleAddTrack} className="w-fit group">
                <PlusIcon />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5">
        {trackToPlay && <PlaySpotify idTrackToPlay={trackToPlay} />}
        <h3 className="my-5 font-semibold sm:text-base tracking-wider uppercase">
          Recomendaciones:
        </h3>
        {track &&
          relatedSongs.map((relatedSong) => (
            <TrackCard
              key={relatedSong.id}
              track={relatedSong}
              showBtnAdd
              showBtnPlay
              setTrackToPlay={setTrackToPlay}
            />
          ))}
      </section>
    </PrincipalLayout>
  );
};
export default TrackDetails;
