import { useEffect, useState } from "react";
import PopUpMenu from "../components/shared/PopUpMenu";
import PopUpPlaylist from "../components/shared/PopUpPlaylist";
import { PlaylistIcon } from "../svg/Svgs";
import { useSelector } from "react-redux";
import { useSEO } from "../hooks/useSEO";
import { Link } from "react-router-dom";

const PrincipalLayout = ({ children }) => {
  const tracks = useSelector((store) => store.playlist.tracks);
  const [isPopUpMenuShow, setIsPopUpMenuShow] = useState(false);
  const [isPopUpPlaylistShow, setIsPopUpPlaylistShow] = useState(false);

  useSEO(`[${tracks?.length}] Gift Music`, "Crear playlists para regalar");

  useEffect(() => {
    if (isPopUpMenuShow) {
      if (isPopUpPlaylistShow) setIsPopUpPlaylistShow(false);
    }
  }, [isPopUpMenuShow]);

  useEffect(() => {
    if (isPopUpPlaylistShow) {
      if (isPopUpMenuShow) setIsPopUpMenuShow(false);
    }
  }, [isPopUpPlaylistShow]);

  return (
    <section className="bg-dark h-screen grid grid-rows-[auto,1fr] bg-[url('/bgImg/bgMobile.png')] sm:bg-[url('/bgImg/bgDesktop.png')] bg-no-repeat bg-right-bottom transition-all font-urbanist text-white overflow-hidden">
      <header className=" flex justify-between py-4 px-3  uppercase bg-primary-dark items-center font-semibold sm:px- md:px-20 transition-all">
        <Link to={"/"}>
          <h1 className="font-semibold sm:text-xl hover:text-secondary transition-all">
            Gift Music
          </h1>
        </Link>

        <div className="flex gap-3 relative">
          <button
            onClick={() => setIsPopUpMenuShow(!isPopUpMenuShow)}
            className="relative uppercase rounded-full border-secondary border py-1 px-3 hover:bg-[#886AE2] transition-all"
          >
            Mi cuenta
          </button>
          <button
            onClick={() => setIsPopUpPlaylistShow(!isPopUpPlaylistShow)}
            className="uppercase rounded-full border-secondary border py-1 px-3 flex items-center gap-1 hover:bg-[#886AE2] transition-all sm:gap-2 "
          >
            <PlaylistIcon />
            <span className="hidden sm:inline">Grabando</span>
            <span>{tracks.length}</span>
          </button>
        </div>
      </header>

      <section className="py-14 px-2 overflow-y-auto">
        <main className="relative mx-auto bg-primary-dark py-8 sm:px-10 px-3 rounded-[30px] max-w-[560px] transition-all ">
          {children}
        </main>
        <PopUpMenu isPopUpMenuShow={isPopUpMenuShow} />
        <PopUpPlaylist
          isPopUpPlaylistShow={isPopUpPlaylistShow}
          setIsPopUpPlaylistShow={setIsPopUpPlaylistShow}
        />
      </section>
    </section>
  );
};
export default PrincipalLayout;
