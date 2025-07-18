import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const AdminUsers = lazy(() => import('./pages/admin/Users'));
const AdminSettings = lazy(() => import('./pages/admin/Settings'));
const EmployerLayout = lazy(() => import('./pages/employer/EmployerLayout'));
const SavedJobs = lazy(() => import('./pages/user/SavedJobs'));
const Unauthorized = lazy(() => import('./pages/Unauthorized'));
const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  console.log("App component rendered",user);

  useEffect(() => {
    console.log("verifyMe dispatching...");
    dispatch(verifyMe());
  }, [dispatch]);




  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute allowedRoles={['user']} />}> 
              <Route element={<Dashboard />}>
                <Route index element={<JobList />} />
                <Route path="applied-jobs" element={<MyJob />} />
                <Route path="saved-jobs" element={<SavedJobs />} />
                <Route path="jobs/:id" element={<JobDetails />} />
                <Route path="about" element={<About />} />
                <Route path="settings" element={<Settings />} />
                <Route path="change-password" element={<ChangePassword />} />
              </Route>
            </Route>
            <Route
              path="/admin/*"
              element={<ProtectedRoute allowedRoles={['admin']} />}
            >
              <Route element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="users" element={<AdminUsers />} />
                <Route path="settings" element={<AdminSettings />} />
                <Route path="*" element={<Navigate to="dashboard" />} />
              </Route>
            </Route>

            <Route
              path="/employer"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerLayout />
                </ProtectedRoute>
              }
            />
           <Route path="/unauthorized" element={<Unauthorized />} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
