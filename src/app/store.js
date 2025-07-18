import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import jobReducer from '../features/Job/jobSlice';
import applicationReducer from "../features/application/applicationSlice"
import adminReducer from '../features/admin/adminSlice';
import adminDashboardReducer from '../features/admin/adminDashboardSlice';
import employerDashboardReducer from '../features/employer/employerDashboardSlice';
import employerJobsReducer from '../features/employer/employerJobsSlice';
import postJobReducer from '../features/employer/postJobSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    applicant: applicationReducer,
    admin: adminReducer,
    adminDashboard: adminDashboardReducer,
    employerDashboard: employerDashboardReducer,
    employerJobs: employerJobsReducer,
    postJob: postJobReducer,
  },
});
