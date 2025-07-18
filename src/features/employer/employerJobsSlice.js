import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/fetchApi';

export const fetchEmployerJobs = createAsyncThunk('employerJobs/fetchJobs', async (employerId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/employer/jobs?employerId=${employerId}`);
    return response.data.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const employerJobsSlice = createSlice({
  name: 'employerJobs',
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload;
      })
      .addCase(fetchEmployerJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerJobsSlice.reducer;
