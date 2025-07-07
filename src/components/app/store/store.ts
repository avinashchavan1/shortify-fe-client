import { configureStore } from '@reduxjs/toolkit';

import userStateSlice from '../../../pages/sign-in/UserState.Slice';

// Example usage of userStateSlice to avoid unused variable error
const store = configureStore({
  reducer: {
    userState: userStateSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
