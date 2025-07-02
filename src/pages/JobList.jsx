import { Briefcase } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getJobs } from "../features/Job/jobSlice";
import JobCard from "../components/JobCard";
import PaginationBar from "../components/Pagination";
import React from "react";
import AwesomeLoader from "../components/skeleton/Loader";

const JobList = () => {
  const [savedJobs, setSavedJobs] = useState(new Set());
  const [limit, setLimit] = useState(5);

  const dispatch = useDispatch();
  const { jobList, totalJobs, totalPages, page, loading } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(getJobs({ page, limit }));
  }, [dispatch, page, limit]);

  const handleSaveJob = (jobId) => {
    setSavedJobs((prev) => {
      const newSaved = new Set(prev);
      newSaved.has(jobId) ? newSaved.delete(jobId) : newSaved.add(jobId);
      return newSaved;
    });
  };

  const handleApplyJob = (jobId) => {
    console.log("Applying to job:", jobId);
  };

  const handleChange = (newPage) => {
    dispatch(changePage(newPage));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Opportunities</h1>
        <p className="text-gray-600">
          {totalJobs} job{totalJobs !== 1 ? "s" : ""} available
        </p>
      </div>

      {jobList.length === 0 ? (
        <div className="text-center py-12">
          <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No jobs found</h3>
          <p className="text-gray-600">Check back later for new opportunities</p>
        </div>
      )
        : loading ?
          (<div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
            <span className="ml-4 text-blue-500 font-semibold text-lg">Loading jobs...</span>
          </div>)
          : (
            <>
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

              <div className="flex justify-center py-8 border-t border-gray-200">
                <PaginationBar
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={handleChange}
                />
              </div>
            </>
          )
      }
    </div>
  );
};

export default JobList;
