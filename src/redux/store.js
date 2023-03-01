import {configureStore} from '@reduxjs/toolkit';
import {ShazamCoreApi} from './services/ShazamCore';

const store = configureStore({
  reducer: {
    [ShazamCoreApi.reducerPath]: ShazamCoreApi.reducer,
  },

  // prettier-ignore
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ShazamCoreApi.middleware),
});

export default store;
