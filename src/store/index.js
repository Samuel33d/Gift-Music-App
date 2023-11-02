import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import playlistCartSlice from "./slices/playlistCart.slice";

export default configureStore({
    reducer: {
        user: userSlice,
        playlist: playlistCartSlice,
    }
})