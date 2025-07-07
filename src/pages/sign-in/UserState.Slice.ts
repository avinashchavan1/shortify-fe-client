import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { HttpUrlLinks } from '../../components/core/http-client/HttpClient.constants';
import HttpClient from '../../components/core/http-client/HttpClient';

interface UserType {
  id: string;
  name: string;
  userName: string;
  status: string;
  email: string;
  roles: string[];
}

interface UserState {
  user: UserType;
  loading: boolean;
  error: string | null;
  isAuth: boolean;
}

const userInitialState: UserType = {
  id: '',
  name: '',
  userName: '',
  status: '',
  email: '',
  roles: [],
};

const initialState: UserState = {
  user: userInitialState,
  loading: false,
  error: null,
  isAuth: false,
};

// const enum UserActionStateActions {
//   fetchUser
// },

export const statusStates = {
  pending: 'pending',
  fulfilled: 'fulfilled',
  rejected: 'rejected',
};

export const fetchUser = createAsyncThunk(HttpUrlLinks.me, async () => {
  const meResponse = await HttpClient.GET(HttpUrlLinks.me);
  return meResponse;
});

const userStateSlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isAuth = true;
    },
    clearUser: state => {
      state.user = userInitialState;
      state.isAuth = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = true;
      // state.isAuth = action.payload ? false : state.isAuth; // Keep isAuth unchanged if loading is false
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchUser.pending, state => {
      state.loading = true;
      state.error = null;
      state.isAuth = false; // Reset isAuth when fetching user data
    });
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload as any;
      state.error = null;
      state.isAuth = true; // Set isAuth to true when user data is fetched successfully
    });
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch user data';
      state.isAuth = false; // Set isAuth to false when fetching user data fails
    });
    // Add any async thunks or additional reducers here if needed
  },
});

export default userStateSlice.reducer;
export const { setUser, clearUser, setLoading, setError } = userStateSlice.actions;
