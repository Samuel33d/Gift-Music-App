import { Link, useNavigate, useParams } from "react-router-dom";
import PrincipalLayout from "../layouts/PrincipalLayout";
import { axiosMusic } from "../utils/configAxios";
import { useEffect, useRef, useState } from "react";
import { Icon360, IconPencil, IconShare, IconTrash } from "@tabler/icons-react";
import { IconDeviceFloppy } from "@tabler/icons-react";
import TrackCard from "../components/shared/TrackCard";
import Swal from "sweetalert2";

const PlaylistDetail = () => {
  const [playlist, setPlaylist] = useState(null);
  const { id } = useParams();
  const [isShowFront, setIsShowFront] = useState(true);
  const formRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axiosMusic
      .get(`/api/playlists/${id}`)
      .then(({ data }) => {
        formRef.current.title.value = data.title;
        formRef.current.to.value = data.to;
        formRef.current.message.value = data.message;
        setPlaylist(data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      to: e.target.to.value,
      message: e.target.message.value,
    };

    axiosMusic
      .patch(`/api/playlists/${id}`, data)
      .then(() =>
        Swal.fire({
          icon: "success",
          title: "Playlist actualizada!",
        })
      )
      .catch((err) => console.log(err));
  };

  const deletePlaylist = (id) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Esta acción no podrá ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminar la playlist",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosMusic
          .delete(`/api/playlists/${id}`)
          .then(
            () => navigate("/playlists"),

            Swal.fire(
              "Proceso realizado!",
              "Tu playlist fue eliminada!",
              "success"
            )
          )
          .catch((err) => console.log(err));
      }
    });
  };

  const deleteTrack = (idTrack) => {
    Swal.fire({
      title: "Estás seguro?",
      text: "Esta acción no podrá ser revertida",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminar la canción",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosMusic
          .delete(`/api/playlists/${playlist.id}/tracks/${idTrack}`)
          .then(() => {
            const playlistCopy = structuredClone(playlist);
            playlistCopy.tracks = playlistCopy.tracks.filter(
              (track) => track.id !== idTrack
            );
            setPlaylist(playlistCopy);
          })
          .catch((err) => console.log(err));

        Swal.fire(
          "Proceso realizado!",
          "La canción fue eliminada de la playlist!",
          "success"
        );
      }
    });
  };

  return (
    <PrincipalLayout>
      <Link
        className="top-8 left-20 sm:absolute hover:text-secondary transition-all sm:left-10"
        to={"/"}
      >
        {"< Atrás"}
      </Link>
      <h2 className="text-center text-lg font-semibold">Editar Playlist</h2>
      <form
        onSubmit={handleSubmit}
        ref={formRef}
        className={` grid gap-2 p-4 rounded-md  
        transition-all duration-200 place-items-center`}
      >
        <div className={`relative cassette ${isShowFront ? "front" : "back"}`}>
          <div className="front">
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
            <button
              type="submit"
              className="p-1 rounded-full border-2 absolute bottom-4 left-4 hover:border-secondary hover:text-secondary"
            >
              <IconDeviceFloppy size={20} />
            </button>
            <button
              onClick={() => deletePlaylist(playlist?.id)}
              type="button"
              className="p-1 rounded-full border-2 absolute bottom-4 left-14 hover:border-secondary hover:text-secondary"
            >
              <IconTrash size={20} />
            </button>
            <Link
              to={`/playlist/public/${playlist?.id}`}
              className="p-1 rounded-full border-2 absolute bottom-4 right-4 hover:border-secondary hover:text-secondary"
            >
              <IconShare size={20} />
            </Link>
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
                }  absolute top-10 resize-none rounded-md p-1 outline-none w-full left-0 px-2 transition-all delay-200`}
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
          {isShowFront ? "Lado B" : "Lado A"} <Icon360 />
        </button>
      </form>
      {playlist &&
        playlist.tracks.map((track) => (
          <TrackCard
            key={track.id}
            track={track}
            showBtnX
            deleteTrack={deleteTrack}
          />
        ))}
    </PrincipalLayout>
  );
};
export default PlaylistDetail;
