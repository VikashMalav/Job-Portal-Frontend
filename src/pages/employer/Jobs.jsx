
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployerJobs } from "../../features/employer/employerJobsSlice";
import ProLoader from "../../components/skeleton/ProLoader";
import { Link } from "react-router-dom";


export const Jobs = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.employerJobs.jobs) || [];
  const { loading, error } = useSelector((state) => state.employerJobs);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log(user._id);
    if (user?._id) {
      dispatch(fetchEmployerJobs(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="relative min-h-[80vh]">
    
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-bold text-blue-800 mb-1">My Jobs</h2>
          <p className="text-gray-500 text-sm">
            You have posted <span className="font-semibold text-blue-600">{jobs.length}</span>{" "}
            job{jobs.length !== 1 ? "s" : ""}.
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search jobs..."
            className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 text-sm w-48"
          />
          <Link
            to="/employer/post-job"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium"
          >
            <span className="text-lg font-bold">+</span> Post New Job
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center min-h-[40vh]">
          <ProLoader text="Loading your jobs..." />
        </div>
      ) : error ? (
        <div className="text-red-500 font-semibold text-center py-8">{error}</div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-400">
          <svg
            width="64"
            height="64"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="mb-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-lg font-semibold mb-2">No jobs posted yet.</div>
          <Link
            to="/employer/post-job"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition font-medium"
          >
            Post your first job
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <JobCardCustom key={job._id} job={job} />
          ))}
        </div>
      )}

      
      <Link
        to="/employer/post-job"
        className="fixed bottom-8 right-8 z-50 bg-blue-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-blue-700 transition md:hidden"
        title="Post New Job"
      >
        <span className="text-2xl font-bold">+</span>
      </Link>
    </div>
  );
};



const JobCardCustom = ({ job }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col">
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-800">{job.title}</span>
            <span
              className={`ml-2 px-2 py-0.5 rounded text-xs font-semibold ${
                job.status === "active"
                  ? "bg-green-100 text-green-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {job.status}
            </span>
          </div>
          <span className="text-xs text-gray-400">{job._id?.slice(-6)}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-2 text-sm text-gray-500">
          <span className="inline-flex items-center gap-1">
            📍 {job.location}
          </span>
          <span className="inline-flex items-center gap-1">
            📅 {new Date(job.createdAt).toLocaleDateString()}
          </span>
          <span className="inline-flex items-center gap-1">
            👥 {job.applicants?.length || 0} Applicants
          </span>
        </div>

        <div className="flex flex-wrap gap-2 mb-2">
          <span className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-md">
            {job.jobType || "Full-time"}
          </span>
          {job.salary && (
            <span className="bg-green-50 text-green-700 text-xs font-medium px-2 py-1 rounded-md">
              ₹{job.salary.toLocaleString()} /yr
            </span>
          )}
        </div>

        {job.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {job.skills.slice(0, 5).map((skill, i) => (
              <span key={i} className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded">
                {skill}
              </span>
            ))}
            {job.skills.length > 5 && (
              <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded">
                +{job.skills.length - 5} more
              </span>
            )}
          </div>
        )}

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-blue-600 text-xs mt-2 mb-1 self-start hover:underline focus:outline-none"
        >
          {expanded ? "Hide Description" : "Show Description"}
        </button>

        {expanded && (
          <div className="text-gray-700 text-sm bg-gray-50 rounded p-3 mb-2 border border-gray-100">
            {job.description}
          </div>
        )}

        <div className="flex gap-2 mt-auto pt-4 border-t border-gray-100">
          <Link
            to={`/jobs/${job._id}`}
            className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 rounded hover:bg-blue-100 transition"
          >
            View
          </Link>
          <Link
            to={`/employer/edit-job/${job._id}`}
            className="px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 rounded hover:bg-yellow-100 transition"
          >
            Edit
          </Link>
          <button
            className="px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded hover:bg-red-100 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};



