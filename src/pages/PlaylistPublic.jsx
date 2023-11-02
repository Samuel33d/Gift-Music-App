import { Icon360, IconPlus, IconShare } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Toaster, toast } from "sonner";
import PlaySpotify from "../components/shared/PlaySpotify";
import TrackCard from "../components/shared/TrackCard";
import PublicLayout from "../layouts/PublicLayout";
import { axiosMusic } from "../utils/configAxios";

const PlaylistPublic = () => {
  const [playlist, setPlaylist] = useState(null);
  const [isShowFront, setIsShowFront] = useState(true);
  const [trackToPlay, setTrackToPlay] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => setPlaylist(data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleShared = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      toast("Copiado en el portapapeles");
    });
  };

  return (
    <PublicLayout>
      <article
        className={` grid gap-2 p-4 rounded-md  
        transition-all duration-200 place-items-center`}
      >
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          <div className="front">
            <img src="/cassette.png" alt="" />
            <div className="text-black bg-white rounded-md flex p-1 items-center absolute top-[15px] left-[20px] w-[198px] gap-1 text-sm font-bold">
              <h4>{playlist?.title}</h4>
            </div>

            <button
              type="button"
              onClick={handleShared}
              className="p-1 rounded-full border-2 absolute bottom-4 right-14 hover:border-secondary hover:text-secondary"
            >
              <IconShare size={20} />
            </button>
            <button
              onClick={() => setIsShowModal(true)}
              className="p-1 rounded-full border-2 absolute bottom-4 right-4 hover:border-secondary hover:text-secondary"
            >
              <IconPlus size={20} />
            </button>
          </div>

          <div className="absolute top-0 back">
            <img src="/cassette.png" alt="" />
            <div className="text-black bg-white rounded-md flex p-1 items-center absolute top-[15px] left-[20px] w-[198px] gap-1 text-sm font-bold">
              <span>{playlist?.to}</span>
              <p className="absolute top-10 resize-none rounded-md p-1 outline-none w-full left-0 px-2 h-[100px] bg-white overflow-y-auto">
                {playlist?.message}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsShowFront(!isShowFront)}
          type="button"
          className="uppercase rounded-full border-2 px-8 py-1 hover:border-secondary hover:text-secondary
        max-w-max mx-auto font-semibold
        transition-all flex gap-2 items-center 
      "
        >
          {isShowFront ? "Lado B" : "Lado A"} <Icon360 />
        </button>
        {trackToPlay && (
          <section className="w-full my-5 ">
            <PlaySpotify idTrackToPlay={trackToPlay} />
          </section>
        )}
      </article>
      {playlist?.tracks.map((track) => (
        <TrackCard
          key={track.id}
          track={track}
          showBtnPlay
          setTrackToPlay={setTrackToPlay}
        />
      ))}
      <Toaster position="top-center" />
      <div
        className={`${
          isShowModal ? "fixed" : "hidden"
        } bg-black/30 w-full h-full top-0 left-0 grid place-items-center  `}
        onClick={() => setIsShowModal(false)}
      >
        <div className="fixed bg-primary-light grid p-6 rounded-lg border border-secondary w-[315px] h-[186px] place-items-center uppercase">
          <span className="font-semibold text-,d  text-center ">
            ¿Quieres crear una playlist para compartir?
          </span>
          <div className="flex  gap-5 w-full justify-center">
            <button
              onClick={() => setIsShowModal(false)}
              className="font-semibold text-md uppercase px-5 rounded-[33px] border-2 items-end hover:text-secondary hover:border-secondary transition-all"
            >
              No
            </button>
            <Link
              to={"/register"}
              target="_blank"
              className="font-semibold text-md uppercase py-2 px-3 rounded-full border-2 hover:text-secondary hover:border-secondary transition-all "
            >
              Sí, crear cuenta
            </Link>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
};
export default PlaylistPublic;
