import { Suspense, lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { verifyMe } from './features/auth/authSlice';

// Lazy-loaded pages
const Login = lazy(() => import('./pages/auth/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProtectedRoute = lazy(() => import('./pages/auth/ProtectedRoute'));
const PublicRoute = lazy(() => import('./pages/auth/PublicRoute'));
const JobList = lazy(() => import('./pages/JobList'));
const JobDetails = lazy(() => import('./pages/JobDetails'));
const About = lazy(() => import('./pages/About'))
const MyJob =lazy(()=>import('./pages/MyApplications'))
// Custom loader
import Loader from './components/skeleton/Loader';


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyMe());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
              <Route index element={<JobList />} />
              <Route path="/my-jobs" element={<MyJob />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/about" element={<About />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
