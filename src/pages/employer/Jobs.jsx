import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerJobs } from "../../features/employer/employerJobsSlice";
import ProLoader from "../../components/skeleton/ProLoader";

const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.employerJobs.jobs) || [];
  const { loading, error } = useSelector((state) => state.employerJobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerJobs(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">My Jobs</h2>
      {loading ? (
        <ProLoader text="Loading your jobs..." />
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : jobs.length === 0 ? (
        <div className="text-gray-500">No jobs posted yet.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <li key={job._id} className="py-4">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-lg font-semibold text-blue-800">{job.title}</div>
                  <div className="text-sm text-gray-500">{job.location}</div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold 
                  ${job.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{job.status}</span>
              </div>
              <div className="mt-2 text-gray-600 text-sm">{job.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Jobs;
