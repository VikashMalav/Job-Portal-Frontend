import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/fetchApi";
import { toast } from "react-toastify";


export const getJobs = createAsyncThunk("/jobs/jobList", async ({ limit, page }, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.get(`/jobs?limit=${limit}&page=${page}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed To Fetch Jobs')
    }
})


export const getJobById = createAsyncThunk("/jobs/getJobId", async (id, { rejectWithValue }) => {
    try {

        const res = await axiosInstance.get(`/jobs/${id}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed To Fetch Job')
    }
})


export const jobSearch = createAsyncThunk(`/jobs/jobSearch`, async (q, { rejectWithValue }) => {
    try {
        console.log("calling search : ", q)
        const res = await axiosInstance.get(`/jobs/search?q=${q}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message || 'Search failed')
    }
})

export const saveJob = createAsyncThunk("/jobs/saveJob", async ({ jobId, userId }, { rejectWithValue }) => {
    try {
        const res = await axiosInstance.post(`users/${userId}/save/${jobId}`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed To Save Job')
    }
})

export const getSavedJobs = createAsyncThunk("/jobs/getSavedJobs", async (userId, { rejectWithValue }) => {
    try {
        console.log("Fetching saved jobs for user:", userId);
        const res = await axiosInstance.get(`/users/${userId}/saved`)
        return res.data
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || 'Failed To Fetch Saved Jobs')
    }
})

const jobSlice = createSlice({
    name: "jobs",
    initialState: {
        jobList: [],
        selectedJob: null,
        searchList: [],
        page: 1,
        totalJobs: null,
        savedJobs: [],
        totalPages: null,
        loading: false,
        error: null,
        toastMessage: null
    },
    reducers: {
        clearSelectedJob: (state) => {
            state.selectedJob = null
            state.error = null
        },
        changePage: (state, action) => {
            state.page = action.payload
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
                state.totalPages = action.payload.totalPages
                state.page = action.payload.page
                state.totalJobs = action.payload.totalJobs

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
            .addCase(saveJob.pending, (state) => {
                state.loading = true
            })
            .addCase(saveJob.fulfilled, (state, action) => {
                state.loading = false
                state.toastMessage = action.payload.message 
               
                // state.savedJobs = action.payload.savedJobs
            })
            .addCase(saveJob.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(getSavedJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(getSavedJobs.fulfilled, (state, action) => {
                state.loading = false
                state.savedJobs = action.payload.savedJobs
            })
            .addCase(getSavedJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})
export const { clearSelectedJob, changePage ,toggleSavedJob} = jobSlice.actions
export default jobSlice.reducer