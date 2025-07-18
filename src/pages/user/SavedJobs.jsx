import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSavedJobs, saveJob } from "../../features/Job/jobSlice";
import JobCard from "../../components/JobCard";
import { toast } from "react-toastify";
import ProLoader from "../../components/skeleton/ProLoader";

const SavedJobs = () => {
  const dispatch = useDispatch();
  const { savedJobs = [], loading } = useSelector((state) => state.jobs);
  const { user } = useSelector((state) => state.auth);

useEffect(() => {
    if (user?._id) {
      dispatch(getSavedJobs(user._id));
    }
  }, [dispatch, user?._id]);

  const handleRemove = async (jobId) => {
    try {
      await dispatch(saveJob({ jobId, userId: user._id })); // toggle unsave
      await dispatch(getSavedJobs(user._id));
      toast.success("Job removed from saved jobs");

    } catch (error) {
      console.error("Error removing saved job:", error);
      toast.error("Failed to remove saved job");
    }
  };

  if (loading) {
    return <ProLoader text="Loading saved jobs..." />;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Saved Jobs</h1>
        <p className="text-gray-600">
          {savedJobs.length} saved job{savedJobs.length !== 1 ? "s" : ""}
        </p>
      </div>

      {savedJobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <svg
            className="w-16 h-16 text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5.121 17.804A3 3 0 0112 15a3 3 0 016.879 2.804M15 10a3 3 0 10-6 0v1m0 4v1m0-1h6"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800 mb-2">
            No saved jobs found
          </h2>
          <p className="text-gray-500 text-center">
            Start saving jobs you’re interested in and they’ll appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
          {savedJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white shadow rounded-lg p-5 hover:shadow-md transition-shadow duration-200 relative"
            >
              <JobCard
                job={job}
                isSaved={true}
                onSave={() => handleRemove(job._id)}
              />
            
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedJobs;
