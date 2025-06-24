import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getJobs } from "../features/Job/jobSlice";
import JobCard from "../components/JobCard";

const JobList = () => {
  const [savedJobs, setSavedJobs] = useState(new Set());

  const dispatch = useDispatch()
  const { jobList } = useSelector(state => state.jobs)
  console.log(jobList)

  useEffect(() => {
    const jobs = async () => {
      try {
       dispatch(getJobs())
      } catch (error) {
        console.log(error)
      }

    }
    jobs()

  }, [dispatch])


  const handleSaveJob = (jobId) => {
    setSavedJobs(prev => {
      const newSaved = new Set(prev);
      if (newSaved.has(jobId)) {
        newSaved.delete(jobId);
      } else {
        newSaved.add(jobId);
      }
      return newSaved;
    });
  };

  const handleApplyJob = (jobId) => {
    console.log('Applying to job:', jobId);

  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
        <p className="text-gray-600">
          {jobList.length} job{jobList.length !== 1 ? 's' : ''} available
        </p>
      </div>


      <div className="space-y-6">
        {jobList.map((job) => (
          <JobCard
            key={job._id}
            job={job}
            onSave={handleSaveJob}
            isSaved={savedJobs.has(job._id)}
            onApply={handleApplyJob}
          />
        ))}
      </div>

   
      {jobList.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Check back later for new opportunities</p>
        </div>
      )}
    </div>
  );
};

export default JobList;