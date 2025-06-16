import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/fetchApi";
export const getJobs = createAsyncThunk("/jobs/jobList", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/jobs')
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})
export const getJobById = createAsyncThunk("/jobs/getJobId", async (id, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/jobs/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error)
    }
})

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobList: [],
        selectedJob: null,
        loading: false,
        error: null
    },
    reducers: {
        clearSelectedJob: (state) => {
            state.selectedJob = null
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getJobs.fulfilled, (state, action) => {
                state.loading = false
                state.jobList = action.payload.jobs
            })
            .addCase(getJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(getJobById.pending, (state) => {
                state.loading = true
            })
            .addCase(getJobById.fulfilled, (state, action) => {
                state.loading = false
                state.selectedJob = action.payload.job
            })
            .addCase(getJobById.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export const { clearSelectedJob } = jobSlice.actions
export default jobSlice.reducer