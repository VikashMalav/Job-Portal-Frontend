import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../services/fetchApi";

export const applyToJob = createAsyncThunk("/applicant/applyToJob", async ({jobId,formData}, { rejectWithValue }) => {
    try {
        console.log(jobId)
        console.log(formData)
        console.log("calling inside applyJob>>>>>>>")
        const res = await axiosInstance.post(`/apply/${jobId}`,formData)
        return res.data
    } catch (error) {
        return rejectWithValue( error || 'Failed To Applied')
    }
})

const applicationSlice = createSlice({
    name: "applicant",
    initialState: {
        applicant:null,
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

           
    }
})
export const {  } = applicationSlice.actions
export default applicationSlice.reducer