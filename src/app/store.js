import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/Job/jobSlice';
import applicationReducer from "../features/application/applicationSlice"
export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs:jobReducer,
    applicant:applicationReducer
  },
});
