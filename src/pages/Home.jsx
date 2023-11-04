import { useEffect, useState } from "react";
import TrackList from "../components/shared/TrackList";
import PrincipalLayout from "../layouts/PrincipalLayout";
import { SearchIcon } from "../svg/Svgs";
import { axiosMusic } from "../utils/configAxios";
import { IconLoader2 } from "@tabler/icons-react";

const Home = () => {
  const [searchTrack, setSearchTrack] = useState([]);
  const [tracksRecommendations, setTracksRecommendations] = useState([]);

  useEffect(() => {
    axiosMusic
      .get("/api/tracks/recommendations?seed_genres=reggaeton,salsa,latino")
      .then(({ data }) => setTracksRecommendations(data.tracks))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = e.target.query.value;
    const limit = e.target.limit.value;

    axiosMusic
      .get(`/api/tracks?limit=${limit}&q=${query}`)
      .then(({ data }) => setSearchTrack(data.tracks.items))
      .catch((err) => console.log(err));
  };

  return (
    <PrincipalLayout>
      <form
        onSubmit={handleSubmit}
        className=" bg-white/5 p-3 px-4 rounded-lg flex gap-2 sm:gap-4 items-center justify-between transition-all shadow-md"
      >
        {tracksRecommendations.length === 0 ? (
          <IconLoader2 className="absolute animate-spin  " />
        ) : (
          <button type="submit">
            <SearchIcon />
          </button>
        )}
        <input
          className="flex-1 bg-transparent outline-none"
          type="text"
          name="query"
          size={10}
          required
          autoComplete="off"
          placeholder="Search song or artist"
        />
        <select
          name="limit"
          required
          className="bg-transparent outline-none [&>option]:text-black"
        >
          <option value="10">Songs</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="10">10</option>
          <option value="12">12</option>
        </select>
      </form>

      <TrackList
        tracks={searchTrack.length === 0 ? tracksRecommendations : searchTrack}
      />
    </PrincipalLayout>
  );
};
export default Home;
