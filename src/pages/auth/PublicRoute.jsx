import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import  Loader from '../../components/skeleton/Loader';
function PublicRoute({ children }) {
  const { user, loading } = useSelector(state => state.auth);
  if (loading) {
    return (
     <Loader/>
    );
  }
  return (!user) ? children : <Navigate to='/' replace />
}
export default PublicRoute