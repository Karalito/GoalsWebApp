import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Get User from localStorage
const user = JSON.parse(localStorage.getItem('user'));

// Setting initial state
const initialState = {
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * Export authentication slice
 * name of the slice = auth
 * reducers defined object
 * extra reducers - asyncThunk functions
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

// Register User
export const register = createAsyncThunk(
  'auth/register',
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        error.response && error.response.data && error.response.data.message
          ? error.message
          : error.toString();

      // Reject and send an error message payload
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login USer
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      error.response && error.response.data && error.response.data.message
        ? error.message
        : error.toString();

    // Reject and send an error message payload
    return thunkAPI.rejectWithValue(message);
  }
});

// Logout User
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout();
});

// Export reducer actions
export const { reset } = authSlice.actions;

// Export default authSlice reducer
export default authSlice.reducer;
