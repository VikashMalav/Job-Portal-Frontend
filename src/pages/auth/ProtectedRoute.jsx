import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProLoader from '../../components/skeleton/ProLoader';

function ProtectedRoute({ children, allowedRoles }) {
  console.log("ProtectedRoute rendered");
  const { user, loading } = useSelector(state => state.auth);
  console.log(user?.role, loading);
  console.log("Allowed roles:", allowedRoles, "User role:", user?.role);
  console.log("Role match:", allowedRoles?.includes(user?.role));

  if (loading) {
    return <ProLoader text="Checking authentication..." />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    // Role mismatch: redirect to correct dashboard
    if (user?.role === 'admin') return <Navigate to="/admin" replace />;
    if (user?.role === 'employer') return <Navigate to="/employer" replace />;
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
