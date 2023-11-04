import { Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import TrackCard from "../components/shared/TrackCard";
import PrincipalLayout from "../layouts/PrincipalLayout";
import { HeartEmpty, HeartFill } from "../svg/Svgs";
import { axiosMusic } from "../utils/configAxios";
import { Pagination } from "swiper/modules";
import PlaySpotify from "../components/shared/PlaySpotify";

const ArtistDetail = () => {
  const [artist, setArtist] = useState(null);
  const [trackToPlay, setTrackToPlay] = useState("");
  const { id } = useParams();

  const topSongs = artist?.songsTop;
  const popularityStat = Math.round(artist?.popularity / 25);

  useEffect(() => {
    axiosMusic
      .get(`/api/artists/${id}`)
      .then(({ data }) => setArtist(data))
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
            className="top-8 left-20 sm:absolute  hover:text-secondary transition-all sm:left-10"
            to={-1}
          >
            {"< Atrás"}
          </Link>
          <div className="link   flex items-center  justify-center mx-auto relative ">
            <img
              className=" rounded-[100%] overflow-hidden 
              shadow-full h-[192px] w-[192px] sm:h-[200px] sm:w-[200px] object-cover shadow-black hover:scale-105 hover:grayscale transition-all"
              src={
                artist?.images.length === 0
                  ? "https://thumbs.dreamstime.com/t/cantante-cl%C3%A1sico-desconocido-que-canta-en-estudio-117106986.jpg"
                  : artist?.images[2].url
              }
              alt=""
            />
          </div>

          <div className="flex flex-col gap-2 sm:gap-3 p-2 sm:justify-center sm:text-sm transition-all">
            <h4 className="line-clamp-1  font-semibold sm:text-xl">
              {artist?.name}
            </h4>
            <h5 className="font-semibold">
              {artist?.followers.total}{" "}
              <span className="font-normal">oyentes mensuales</span>
            </h5>
            <h5 className="flex items-center gap-1 font-semibold">
              Popularidad:
              <Rating
                className="flex items-center"
                emptyIcon={<HeartEmpty />}
                icon={<HeartFill />}
                name="read-only"
                value={popularityStat}
                readOnly
              />
            </h5>
            <div className="grid">
              <h5 className="font-semibold">Géneros:</h5>
              <ul className="mt-2 flex gap-2 justify-start uppercase font-semibold sm:gap-3 flex-wrap">
                {artist?.genres.map((genre) => (
                  <li className="hover:scale-110 transition-all " key={genre}>
                    <span
                      className={`hover:hover:bg-[#886AE2] py-1 transition-all  ${
                        genre.length > 2 ? "text-[11px]" : "text-sm"
                      } px-2 rounded-full border-secondary border`}
                    >
                      {genre}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <section className="mt-5 w-full">
          <h3 className="mb-3 font-semibold sm:text-base tracking-wider uppercase w-full">
            Otros discos del artista:
          </h3>
          <Swiper
            spaceBetween={10}
            slidesPerView={3.5}
            pagination={true}
            modules={[Pagination]}
          >
            {artist &&
              artist?.albums.slice(0.5).map((album) => (
                <SwiperSlide key={album.id}>
                  <article className="h-[250px] overflow-hidden">
                    <div className="rounded-lg overflow-hidden shadow-lg">
                      <img
                        className="object-cover h-[146px]"
                        src={album?.images[1].url}
                        alt=""
                      />
                    </div>
                    <div className="my-1 grid">
                      {album?.artists.map((artist) => (
                        <Link
                          to={`/artists/${artist.id}`}
                          className="text-sm hover:text-secondary h-[20px] overflow-hidden"
                          key={artist.id}
                        >
                          {artist.name}
                        </Link>
                      ))}
                      <h4 className="text-sm text-[#CCCC] ">{album?.name}</h4>
                    </div>
                  </article>
                </SwiperSlide>
              ))}
          </Swiper>
          {trackToPlay && <PlaySpotify idTrackToPlay={trackToPlay} />}
        </section>
      </section>
      <section className=" ">
        <h3 className="mb-5  font-semibold sm:text-base tracking-wider uppercase">
          Recomendaciones:
        </h3>
        {artist &&
          topSongs.map((topSong) => (
            <TrackCard
              track={topSong}
              key={topSong.id}
              showBtnAdd
              showBtnPlay
              setTrackToPlay={setTrackToPlay}
            />
          ))}
      </section>
    </PrincipalLayout>
  );
};
export default ArtistDetail;
