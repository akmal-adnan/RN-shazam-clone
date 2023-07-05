import {createSlice} from '@reduxjs/toolkit';

const playerSlice = createSlice({
  name: 'player',

  initialState: {
    tracks: [],
    currentTrack: [],
    playbackState: false,
    isPlaying: false,
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
    setPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {setTracks, setCurrentTrack, setPlaybackState, setPlaying} =
  playerSlice.actions;

export default playerSlice.reducer;
