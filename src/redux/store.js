import {configureStore} from '@reduxjs/toolkit';
import {ShazamCoreApi} from './services/ShazamCore';
import counterReducer from './features/counterSlices';

const store = configureStore({
  reducer: {
    [ShazamCoreApi.reducerPath]: ShazamCoreApi.reducer,
    counter: counterReducer,
  },

  // prettier-ignore
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(ShazamCoreApi.middleware),
});

export default store;
