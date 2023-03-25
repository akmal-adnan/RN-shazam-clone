import {configureStore} from '@reduxjs/toolkit';
import {ShazamCoreApi} from './services/ShazamCore';
import counterReducer from './features/counterSlices';
import playerReducer from './features/playerSlices';

const store = configureStore({
  reducer: {
    [ShazamCoreApi.reducerPath]: ShazamCoreApi.reducer,
    counter: counterReducer,
    player: playerReducer,
  },

  // prettier-ignore
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ShazamCoreApi.middleware),
});

export default store;
