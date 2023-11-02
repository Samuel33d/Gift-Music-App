import { IconPencil } from "@tabler/icons-react";
import { useState } from "react";
import "./PopUpPlaylist.css";
import { useDispatch, useSelector } from "react-redux";
import TrackCard from "./TrackCard";
import { axiosMusic } from "../../utils/configAxios";
import { clearTracks } from "../../store/slices/playlistCart.slice";
import Swal from "sweetalert2";

const PopUpPlaylist = ({ isPopUpPlaylistShow, setIsPopUpPlaylistShow }) => {
  const dispatch = useDispatch();
  const tracks = useSelector((store) => store.playlist.tracks);
  const [isShowFront, setIsShowFront] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      message: e.target.message.value,
      to: e.target.to.value,
      tracks: tracks,
    };

    axiosMusic
      .post("/api/playlists", data)
      .then(() => {
        e.target.reset();
        dispatch(clearTracks());
        Swal.fire({
          icon: "success",
          title: "Playlist creada éxitosamente!",
          html: '<a class="underline" href="/#/playlists" >Ir a mis playlists<a/>',
          showCloseButton: true,
          focusConfirm: false,
          timer: 3000,
        });
        setIsPopUpPlaylistShow(false);
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Ooops!",
          text: "No puedes crear una playlist sin canciones!",
        });
        console.log(err);
      });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className={`z-50 fixed bg-primary-light grid gap-2 p-4 rounded-md border border-secondary top-20  ${
        isPopUpPlaylistShow
          ? "sm:right-32 right-6"
          : "-right-full sm:-right-full"
      } transition-all duration-200`}
    >
      <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
        <div className="front ">
          <img src="/cassette.png" alt="" />
          <div className="text-black bg-white rounded-md flex p-1 items-center absolute top-[15px] left-[20px] w-[198px] gap-1 text-sm font-semibold">
            <input
              type="text"
              placeholder="Título"
              id="title"
              size={15}
              className="outline-none bg-transparent flex-1 px-2"
              required
              maxLength="50"
            />

            <label htmlFor="title">
              <IconPencil />
            </label>
          </div>
        </div>

        <div className="absolute top-0 back">
          <img src="/cassette.png" alt="" />
          <div className="text-black bg-white rounded-md flex p-1 items-center absolute top-[15px] left-[20px] w-[198px] gap-1 text-sm font-semibold">
            <input
              type="text"
              placeholder="Destinatario"
              id="to"
              size={15}
              className="outline-none bg-transparent flex-1 px-2"
              required
              maxLength="50"
            />
            <label htmlFor="to">
              <IconPencil />
            </label>
            <textarea
              className={`${
                isShowFront ? "opacity-0" : "opacity-100"
              } absolute top-10 resize-none rounded-md p-1 outline-none w-full left-0 px-2  transition-all delay-200`}
              placeholder="Mensaje"
              rows={4}
              id="message"
              required
              maxLength="200"
            />
          </div>
        </div>
      </div>

      <button
        onClick={() => setIsShowFront(!isShowFront)}
        type="button"
        className="uppercase rounded-full border-2 px-8 py-1 hover:border-secondary hover:text-secondary
        max-w-max mx-auto
        transition-all flex gap-2 items-center 
      "
      >
        {isShowFront ? "Lado B" : "Lado A"}
      </button>
      <section
        className={`text-sm max-w-[238px] overflow-y-auto overflow-x-hidden  ${
          tracks.length > 0 && "max-h-[160px]"
        }`}
      >
        {tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            showBtnDelete
            artistQuantity={1}
            artistFontSize={"text-sm"}
            trackImgSize={"w-[42px] h-[42px]"}
            trackScale=""
          />
        ))}
      </section>
      <button
        type="submit"
        className="uppercase rounded-full border-2 px-8 py-1 hover:border-secondary hover:text-secondary
        max-w-max mx-auto
        transition-all
      "
      >
        Crear
      </button>
    </form>
  );
};
export default PopUpPlaylist;
