import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/fetchApi";


export const getJobs = createAsyncThunk("/jobs/jobList", async (_, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get('/jobs',{withCredentials:true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed To Fetch Jobs')
    }
})


export const getJobById = createAsyncThunk("/jobs/getJobId", async (id, { rejectWithValue }) => {
    try {

        const res = await axiosInstance.get(`/jobs/${id}`,{withCredentials:true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed To Fetch Job')
    }
})


export const jobSearch = createAsyncThunk(`/jobs/jobSearch`, async (q, { rejectWithValue }) => {
    try {
        console.log("calling search : ", q)
        const res = await axiosInstance.get(`/jobs/search?q=${q}`,{withCredentials:true})
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Search failed')
    }
})

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobList: [],
        selectedJob: null,
        searchList: [],
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
            //getting All Jobs

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

            //Getting Job By ID

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

            //Search Jobs

            .addCase(jobSearch.fulfilled, (state, action) => {
                state.loading = false
                state.searchList = action.payload?.searchResult || []
            })
            .addCase(jobSearch.rejected, (state, action) => {
                state.loading = false
                state.searchList = []
                state.error = action.payload
            })
    }
})
export const { clearSelectedJob } = jobSlice.actions
export default jobSlice.reducer