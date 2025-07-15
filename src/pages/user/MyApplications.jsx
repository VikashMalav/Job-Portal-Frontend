import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JobCard from '../../components/JobCard'
import { myAppliedJobs } from '../../features/application/applicationSlice'
import { Link } from 'react-router-dom'

function MyApplications() {
  const dispatch = useDispatch()
  const { myApplications = [] } = useSelector(state => state.applicant)
  const { user } = useSelector(state => state.auth)
  const [loading, setLoading] = useState(true)

  console.log(user)

  useEffect(() => {
    const getJobs = async () => {
      try {
        setLoading(true)
        await dispatch(myAppliedJobs(user._id))
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    
    if (user?._id) {
      getJobs()
    }
  }, [dispatch, user?._id])

 
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your applications...</p>
        </div>
      </div>
    )
  }

 
  if (!myApplications || myApplications.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        
          <div className="w-24 h-24 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          
         
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Applications Yet
          </h2>
          
      
          <p className="text-gray-600 mb-6 leading-relaxed">
            You haven't applied to any jobs yet. Start exploring opportunities and take the next step in your career journey!
          </p>
          
          
          <Link to='/' 
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
            
          >
            Browse Jobs
          </Link>
          
        
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              💡 Tip: Create a compelling profile to attract recruiters
            </p>
          </div>
        </div>
      </div>
    )
  }

  
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
     
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Applied Jobs</h1>
          <p className="text-gray-600">
            You have applied to {myApplications.length} job{myApplications.length !== 1 ? 's' : ''}
          </p>
        </div>
        
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {myApplications.map((job) => (
            <JobCard key={job._id} job={job} isApplied={true} />
          ))}
        </div>

    
      </div>
    </div>
  )
}

export default MyApplications