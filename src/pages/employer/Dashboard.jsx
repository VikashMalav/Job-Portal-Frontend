import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProLoader from "../../components/skeleton/ProLoader";
import { fetchEmployerStats } from "../../features/employer/employerDashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.employerDashboard);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerStats(user._id));
    }
  }, [dispatch, user?._id]);

  return (
    <div className="bg-white rounded-xl shadow max-w-4xl mx-auto w-full p-4 md:p-8 mt-4">
      <h2 className="text-2xl font-bold mb-4 text-blue-700 text-center">Employer Analytics</h2>
      {loading ? (
        <ProLoader text="Loading dashboard..." />
      ) : error ? (
        <div className="text-red-500 font-semibold text-center">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg p-4 md:p-6 shadow flex flex-col items-center">
            <div className="text-base md:text-lg font-semibold">Total Jobs</div>
            <div className="text-2xl md:text-3xl font-bold mt-2">{stats.totalJobs}</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-4 md:p-6 shadow flex flex-col items-center">
            <div className="text-base md:text-lg font-semibold">Active Jobs</div>
            <div className="text-2xl md:text-3xl font-bold mt-2">{stats.jobsActive}</div>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg p-4 md:p-6 shadow flex flex-col items-center">
            <div className="text-base md:text-lg font-semibold">Applicants</div>
            <div className="text-2xl md:text-3xl font-bold mt-2">{stats.totalApplicants}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
