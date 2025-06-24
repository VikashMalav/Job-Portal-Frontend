import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import JobCard from '../components/JobCard'
import { myAppliedJobs } from '../features/application/applicationSlice'

function MyApplications() {

  const dispatch = useDispatch()
  const { myApplications=[] } = useSelector(state => state.applicant)
  const { user } = useSelector(state => state.auth)

  console.log(myApplications)

  useEffect(() => {
    const getJobs = async () => {
      try {
        dispatch(myAppliedJobs(user.id))
      } catch (error) {
        console.log(error)
      }
    }
    getJobs()

  }, [dispatch])

  return (
    <>
      {myApplications && myApplications.length > 0 && myApplications.map((job) => {
        return <JobCard key={job._id} job={job} />
      })}
    </>
  )
}

export default MyApplications