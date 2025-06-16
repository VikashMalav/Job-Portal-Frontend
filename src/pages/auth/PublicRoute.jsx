import React from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

function PublicRoute({ children }) {
  const { user, loading } = useSelector(state => state.auth);
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  return (!user) ? children : <Navigate to='/' replace />
}
export default PublicRoute