import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProLoader from "../../components/skeleton/ProLoader";
import { fetchEmployerStats } from "../../features/employer/employerDashboardSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useSelector((state) => state.employerDashboard);
  const { user } = useSelector((state) => state.auth);
  const [timeFilter, setTimeFilter] = useState("7d");

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchEmployerStats(user._id));
    }
  }, [dispatch, user?._id]);

  // Mock data for demonstration - replace with actual data from your API
  const mockData = {
    recentApplications: [
      { id: 1, candidate: "John Doe", position: "Frontend Developer", appliedAt: "2 hours ago", status: "new" },
      { id: 2, candidate: "Jane Smith", position: "Backend Developer", appliedAt: "5 hours ago", status: "reviewed" },
      { id: 3, candidate: "Mike Johnson", position: "UI/UX Designer", appliedAt: "1 day ago", status: "shortlisted" },
      { id: 4, candidate: "Sarah Wilson", position: "Project Manager", appliedAt: "2 days ago", status: "interviewed" },
    ],
    topPerformingJobs: [
      { title: "Senior React Developer", applications: 45, views: 230, posted: "5 days ago" },
      { title: "Product Manager", applications: 38, views: 180, posted: "1 week ago" },
      { title: "DevOps Engineer", applications: 25, views: 120, posted: "3 days ago" },
    ],
    chartData: [
      { name: "Mon", applications: 12, views: 45 },
      { name: "Tue", applications: 19, views: 52 },
      { name: "Wed", applications: 8, views: 38 },
      { name: "Thu", applications: 25, views: 68 },
      { name: "Fri", applications: 22, views: 59 },
      { name: "Sat", applications: 15, views: 41 },
      { name: "Sun", applications: 10, views: 33 },
    ]
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <ProLoader text="Loading dashboard..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-2xl p-8 max-w-md text-center">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.companyName || user?.name || 'Employer'}! 👋
            </h1>
            <p className="text-gray-600">Here's what's happening with your job postings today.</p>
          </div>
          
          <div className="flex items-center gap-4 mt-4 lg:mt-0">
            <select 
              value={timeFilter} 
              onChange={(e) => setTimeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
            
            <Link
              to="/employer/post-job"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Post New Job
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 rounded-xl">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-medium">+12%</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalJobs || 0}</p>
              <p className="text-gray-600 text-sm">Total Jobs Posted</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 rounded-xl">
                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-medium">+8%</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.jobsActive || 0}</p>
              <p className="text-gray-600 text-sm">Active Job Listings</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 rounded-xl">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-medium">+23%</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">{stats?.totalApplicants || 0}</p>
              <p className="text-gray-600 text-sm">Total Applicants</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 rounded-xl">
                <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-green-500 text-sm font-medium">+15%</span>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 mb-1">2,847</p>
              <p className="text-gray-600 text-sm">Profile Views</p>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-6">
            {/* Application Trends Chart */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Application Trends</h3>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600">Applications</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                    <span className="text-gray-600">Views</span>
                  </div>
                </div>
              </div>
              
              {/* Simple Chart Visualization */}
              <div className="h-64 flex items-end justify-between gap-2 px-4">
                {mockData.chartData.map((day, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className="w-full flex flex-col justify-end h-40 gap-1">
                      <div 
                        className="w-full bg-blue-500 rounded-t-sm transition-all duration-300 hover:bg-blue-600"
                        style={{ height: `${(day.applications / 30) * 100}%` }}
                        title={`${day.applications} applications`}
                      ></div>
                      <div 
                        className="w-full bg-emerald-500 rounded-t-sm transition-all duration-300 hover:bg-emerald-600"
                        style={{ height: `${(day.views / 80) * 100}%` }}
                        title={`${day.views} views`}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-2">{day.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Performing Jobs */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Top Performing Jobs</h3>
                <Link to="/employer/jobs" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-4">
                {mockData.topPerformingJobs.map((job, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 mb-1">{job.title}</h4>
                      <p className="text-sm text-gray-600">Posted {job.posted}</p>
                    </div>
                    <div className="flex items-center gap-6 text-sm">
                      <div className="text-center">
                        <p className="font-semibold text-blue-600">{job.applications}</p>
                        <p className="text-gray-600">Applications</p>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-emerald-600">{job.views}</p>
                        <p className="text-gray-600">Views</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Activity & Quick Actions */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link
                  to="/employer/post-job"
                  className="flex items-center gap-3 w-full p-3 text-left bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200"
                >
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Post New Job</p>
                    <p className="text-sm text-gray-600">Create a new job listing</p>
                  </div>
                </Link>

                <Link
                  to="/employer/applications"
                  className="flex items-center gap-3 w-full p-3 text-left bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors duration-200"
                >
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Review Applications</p>
                    <p className="text-sm text-gray-600">Manage job applications</p>
                  </div>
                </Link>

                <Link
                  to="/employer/profile"
                  className="flex items-center gap-3 w-full p-3 text-left bg-purple-50 hover:bg-purple-100 rounded-xl transition-colors duration-200"
                >
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Company Profile</p>
                    <p className="text-sm text-gray-600">Update company info</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Applications */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Applications</h3>
                <Link to="/employer/applications" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                  View All →
                </Link>
              </div>
              
              <div className="space-y-3">
                {mockData.recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {app.candidate.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm truncate">{app.candidate}</p>
                      <p className="text-xs text-gray-600 truncate">{app.position}</p>
                      <p className="text-xs text-gray-500">{app.appliedAt}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      app.status === 'new' ? 'bg-blue-100 text-blue-700' :
                      app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' :
                      app.status === 'shortlisted' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {app.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips & Insights */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                <h3 className="text-lg font-semibold text-blue-900">💡 Hiring Tip</h3>
              </div>
              <p className="text-blue-800 text-sm leading-relaxed">
                Jobs with detailed descriptions and clear requirements receive 40% more qualified applications. 
                Make sure to highlight your company culture and benefits!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;