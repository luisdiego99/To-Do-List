import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGoals, addGoal, deleteGoal } from '../services/api';

// Async thunks
export const fetchGoalsAsync = createAsyncThunk(
  'todos/fetchGoals',
  async () => {
    const response = await fetchGoals();
    return response;
  }
);

export const addGoalAsync = createAsyncThunk(
  'todos/addGoal',
  async (goalData) => {
    const response = await addGoal(goalData);
    return response;
  }
);

export const deleteGoalAsync = createAsyncThunk(
  'todos/deleteGoal',
  async (id) => {
    await deleteGoal(id);
    return id;
  }
);

const initialState = {
  items: [],
  status: 'idle',
  error: null
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    initAddTodo: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoalsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGoalsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGoalsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addGoalAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteGoalAsync.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item._id !== action.payload);
        state.status = 'succeeded';
      });
  }
});

export const { initAddTodo } = todoSlice.actions;
export default todoSlice.reducer;
