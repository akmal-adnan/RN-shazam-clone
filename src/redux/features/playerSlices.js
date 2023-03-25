import {createSlice} from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',
  initialState: {
    tracks: [],
    currentTrack: [],
    playbackState: false,
  },
  reducers: {
    setTracks: (state, action) => {
      state.tracks = action.payload;
    },
    setCurrentTrack: (state, action) => {
      state.currentTrack = action.payload;
    },
    setPlaybackState: (state, action) => {
      state.playbackState = action.payload;
    },
  },
});

export const {setTracks, setCurrentTrack, setPlaybackState} =
  playerSlice.actions;

export default playerSlice.reducer;
