import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import ProLoader from '../../components/skeleton/ProLoader';
function PublicRoute({ children }) {
  const { user, loading } = useSelector(state => state.auth);
  if (loading) {
    return <ProLoader text="Checking authentication..." />;
  }
  return (!user) ? children : <Navigate to='/' replace />
}
export default PublicRoute