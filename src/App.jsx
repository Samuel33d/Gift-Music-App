import "./App.css";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./auth/PrivateRoutes";
import ArtistDetail from "./pages/ArtistDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Page404 from "./pages/Page404";
import PlaylistDetail from "./pages/PlaylistDetail";
import PlaylistPublic from "./pages/PlaylistPublic";
import Playlists from "./pages/Playlists";
import Register from "./pages/Register";
import TrackDetails from "./pages/TrackDetails";
import { useEffect, useState } from "react";
import { axiosMusic } from "./utils/configAxios";

function App() {
  const [tracksRecommendations, setTracksRecommendations] = useState([]);

  useEffect(() => {
    axiosMusic
      .get("/api/tracks/recommendations?seed_genres=reggaeton,salsa,latino")
      .then(({ data }) => setTracksRecommendations(data.tracks))
      .catch((err) => console.log(err));
  }, []);

  return (
    <main>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/playlist/public/:id" element={<PlaylistPublic />} />

        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={<Home tracksRecommendations={tracksRecommendations} />}
          />
          <Route path="/tracks/:id" element={<TrackDetails />} />
          <Route path="/artists/:id" element={<ArtistDetail />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/playlists/:id" element={<PlaylistDetail />} />
        </Route>

        <Route path="*" element={<Page404 />} />
      </Routes>
    </main>
  );
}

export default App;
