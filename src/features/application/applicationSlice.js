import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/fetchApi";

export const applyToJob = createAsyncThunk("/applicant/applyToJob", async ({jobId,formData}, { rejectWithValue }) => {
    try {
     
        const res = await axiosInstance.post(`/apply/${jobId}`,formData,{withCredentials:true})
        return res.data
    } catch (error) {
        return rejectWithValue( error.response.data.message || 'Failed To Applied')
    }
})
export const myAppliedJobs = createAsyncThunk("/applications/myAppliedJobs", async (userId, { rejectWithValue }) => {
    try {
     
        const res = await axiosInstance.get(`/applications/user/${userId}`,{withCredentials:true})
        return res.data
    } catch (error) {
        return rejectWithValue( error.response.data.message || 'Failed To Fetch Applied Jobs')
    }
})

const applicationSlice = createSlice({
    name: "applicant",
    initialState: {
        applicant:null,
        myApplications:null,
        loading: false,
        error: null
    },
    reducers: {
        clearApplicant:(state)=>{
            state.applicant=null
            state.error =null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(applyToJob.pending, (state) => {
                state.loading = true
            })
            .addCase(applyToJob.fulfilled, (state, action) => {
                state.loading = false
                state.applicant = action.payload
            })
            .addCase(applyToJob.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(myAppliedJobs.pending, (state) => {
                state.loading = true
            })
            .addCase(myAppliedJobs.fulfilled, (state, action) => {
                state.loading = false
                state.myApplications = action.payload.data.appliedJobs
            })
            .addCase(myAppliedJobs.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

           
    }
})
export const {  } = applicationSlice.actions
export default applicationSlice.reducer