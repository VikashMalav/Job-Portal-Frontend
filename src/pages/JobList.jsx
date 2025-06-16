import React, { useEffect } from 'react'
import JobBox from '../components/JobCardList';
import { useDispatch, useSelector } from 'react-redux';
import { getJobs } from '../features/Job/jobSlice';

function JobList() {
    const {jobList}=useSelector(state=>state.jobs)
   const dispatch =useDispatch()
useEffect( ()=>{
    try {
        const jobs = dispatch(getJobs())
    } catch (error) {
        console.log(error)
    }
     
},[])
  return (
   <>
  
    <JobBox jobs={jobList} />
  
   
   </>
  )
}

export default JobList