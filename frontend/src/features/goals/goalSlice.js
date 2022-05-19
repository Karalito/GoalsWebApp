import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

// Setting initial state
const initialState = {
  goals: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

/**
 * Get all User Goals, underscore _ means that nothing is passed, it is sent
 * because access to thunkAPI is needed.
 * @returns Response data from API
 */
export const getGoals = createAsyncThunk(
  'goals/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.getGoals(token);
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

/**
 * Create new Goal for User
 * @param {*} goalData
 * @returns Response data from API
 */
export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      // Get User token from state
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
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

/**
 * Update existing User goal
 * @param {*} goalData Id and Text
 * @returns Response data from API
 */
export const updateGoal = createAsyncThunk(
  'goals/update',
  async (goalData, thunkAPI) => {

    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.updateGoal(goalData, token);
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

/**
 * Delete existing User goal
 * @param {*} id
 * @returns Response data from API
 */
export const deleteGoal = createAsyncThunk(
  'goals/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await goalService.deleteGoal(id, token);
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

/**
 * Export Goal slice
 * name of the slice = goal
 * reducers defined object
 * extra reducers - asyncThunk functions
 */
export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.map((goal) =>
          goal._id === action.payload._id
            ? { ...goal, text: action.payload.text }
            : goal
        );
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

// Export reducer actions
export const { reset } = goalSlice.actions;

// Export default goalSlice reducer
export default goalSlice.reducer;
