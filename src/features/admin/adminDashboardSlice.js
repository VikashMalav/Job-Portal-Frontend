import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { axiosInstance } from '../../services/fetchApi';

export const fetchAdminStats = createAsyncThunk('adminDashboard/fetchStats', async (_, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.get('/admin/dashboard-stats');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || error.message);
  }
});

const adminDashboardSlice = createSlice({
  name: 'adminDashboard',
  initialState: {
    stats: {
      totalUsers: 0,
      activeJobs: 0,
      totalApplications: 0,
    },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAdminStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchAdminStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default adminDashboardSlice.reducer;
