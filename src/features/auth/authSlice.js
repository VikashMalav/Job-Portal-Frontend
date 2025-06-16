import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
export const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

export const verifyMe = createAsyncThunk('auth/me', async (_, { rejectWithValue }) => {
    try {
        const res = await API.get('/auth/profile');
        return res.data.user;
    } catch (err) {
        return rejectWithValue(err);
    }
});

export const loginUser = createAsyncThunk('auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/login', formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Login failed");
        }
    }
);


export const registerUser = createAsyncThunk('auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/register', formData);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Signup failed");
        }
    }
);
export const logoutUser = createAsyncThunk('auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await API.post('/auth/logout');
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Logout failed");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
    },
    reducers: {
      clearAuthError: (state) => {
      state.error = null;
    }
    },
    extraReducers: (builder) => {
        builder
          
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
               .addCase(verifyMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(verifyMe.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(verifyMe.rejected, (state) => {
                state.loading = false;
                state.user = null;
            })

            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
            });

},
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;
