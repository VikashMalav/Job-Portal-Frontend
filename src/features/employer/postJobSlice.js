import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/fetchApi';

export const postJob = createAsyncThunk('employer/postJob', async (jobData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post('/employer/jobs', jobData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const postJobSlice = createSlice({
  name: 'postJob',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetPostJob: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(postJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postJob.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(postJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetPostJob } = postJobSlice.actions;
export default postJobSlice.reducer;
