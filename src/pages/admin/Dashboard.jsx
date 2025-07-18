import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminStats } from "../../features/admin/adminDashboardSlice";
import ProLoader from "../../components/skeleton/ProLoader";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.adminDashboard);

  useEffect(() => {
    dispatch(fetchAdminStats());
  }, [dispatch]);

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h2 className="text-2xl font-bold mb-4 text-indigo-700">Admin Analytics</h2>
      {loading ? (
        <ProLoader text="Loading dashboard..." />
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6 shadow">
            <div className="text-lg font-semibold">Total Users</div>
            <div className="text-3xl font-bold mt-2">{stats.totalUsers}</div>
          </div>
          <div className="bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-lg p-6 shadow">
            <div className="text-lg font-semibold">Active Jobs</div>
            <div className="text-3xl font-bold mt-2">{stats.activeJobs}</div>
          </div>
          <div className="bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-lg p-6 shadow">
            <div className="text-lg font-semibold">Applications</div>
            <div className="text-3xl font-bold mt-2">{stats.totalApplications}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
