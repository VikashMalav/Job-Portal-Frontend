import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { verifyMe } from './features/auth/authSlice';



const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./pages/user/Dashboard'));
const ProtectedRoute = lazy(() => import('./pages/auth/ProtectedRoute'));
const PublicRoute = lazy(() => import('./pages/auth/PublicRoute'));
const JobList = lazy(() => import('./pages/user/JobList'));
const JobDetails = lazy(() => import('./pages/user/JobDetails'));
const About = lazy(() => import('./pages/user/About'))
const MyJob = lazy(() => import('./pages/user/MyApplications'))
const Settings = lazy(() => import('./components/Settings'));
const ChangePassword = lazy(() => import('./components/changePasswordForm'));
const Loader = lazy(() => import('./components/skeleton/Loader'));
const AdminLayout = lazy(() => import('./pages/admin/AdminLayout'));
const EmployerLayout = lazy(() => import('./pages/employer/employerLayout'));
const SavedJobs = lazy(() => import('./pages/user/SavedJobs'));

const App = () => {
  const dispatch = useDispatch();
  console.log("App component rendered");
  useEffect(() => {
    dispatch(verifyMe());
  }, [dispatch]);




  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute allowedRoles={['user']}><Dashboard /></ProtectedRoute>}>
              <Route index element={<JobList />} />
              <Route path="/applied-jobs" element={<MyJob />} />
              <Route path="/saved-jobs" element={<SavedJobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="change-password" element={<ChangePassword />} />
            </Route>
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employer"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerLayout />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
