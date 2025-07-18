import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/fetchApi';

export const fetchEmployerStats = createAsyncThunk('employerDashboard/fetchStats', async (employerId, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get(`/employer/dashboard-stats?employerId=${employerId}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const employerDashboardSlice = createSlice({
  name: 'employerDashboard',
  initialState: {
    stats: {
      totalJobs: 0,
      jobsActive: 0,
      totalApplicants: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployerStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployerStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchEmployerStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employerDashboardSlice.reducer;
