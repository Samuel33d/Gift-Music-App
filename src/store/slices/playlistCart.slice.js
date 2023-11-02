import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";


const playlistCartSlice = createSlice({
    name: "playlistCart",
    initialState: {
        tracks: []
    },
    reducers: {
        addTrack: (state, action) => {
            const newTrack = action.payload
            const findTrack = state.tracks.findIndex((track) => track.id === newTrack.id)

            if (findTrack === -1) {
                state.tracks.push(newTrack)
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La canción ya existe en la playlist!',
                })
                return state
            }
        },
        removeTrack: (state, action) => {
            const idTrackToDelete = action.payload
            const newTracks = state.tracks.filter((track) => track.id !== idTrackToDelete)
            state.tracks = newTracks
        },
        clearTracks: (state) => {
            state.tracks = []
        }
    }
})
export const { addTrack, removeTrack, clearTracks } = playlistCartSlice.actions


export default playlistCartSlice.reducer