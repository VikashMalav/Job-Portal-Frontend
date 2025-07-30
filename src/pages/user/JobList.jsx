import { Briefcase } from "lucide-react";
import ProLoader from "../../components/skeleton/ProLoader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePage, getJobs, getSavedJobs, saveJob } from "../../features/Job/jobSlice";
import JobCard from "../../components/JobCard";
import PaginationBar from "../../components/Pagination";

import { toast } from "react-toastify";

const JobList = () => {
  const [limit, setLimit] = useState(5);

  const dispatch = useDispatch();
  const { jobList, totalJobs, totalPages, page, loading, savedJobs, toastMessage } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getJobs({ page, limit }));
  }, [dispatch, page, limit]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getSavedJobs(user._id));
    }
  }, [dispatch, user?._id]);

  const handleSaveJob = async (jobId) => {
    try {
      await dispatch(saveJob({ jobId, userId: user._id }));
      await dispatch(getSavedJobs(user._id));
      toast.success(toastMessage)
    }
    catch (error) {
      toast.error("Failed to save job");
      console.error("Save job error:", error);
    }
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
          (<ProLoader text="Loading jobs..." />)
          : (
            <>
              <div className="space-y-6">
                {jobList.map((job) => {
                  // Check if user has applied to this job
                  const appliedJobs = user?.appliedJobs || [];
                  const isApplied = appliedJobs.includes(job._id);
                  return (
                    <JobCard
                      key={job._id}
                      job={job}
                      onSave={() => handleSaveJob(job._id)}
                      isSaved={savedJobs?.map(job => job._id).includes(job._id)}
                      onApply={handleApplyJob}
                      isApplied={isApplied}
                    />
                  );
                })}
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
