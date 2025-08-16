import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Applicants = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [selectedJob, setSelectedJob] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [selectedApplicants, setSelectedApplicants] = useState([]);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const { user } = useSelector((state) => state.auth);

  // Mock data - replace with actual API data
  const mockApplicants = [
    {
      id: 1,
      name: "Arjun Sharma",
      email: "arjun.sharma@email.com",
      phone: "+91 98765 43210",
      position: "Senior React Developer",
      jobId: "job1",
      experience: "5 years",
      location: "Bangalore, Karnataka",
      currentCompany: "Tech Innovators Pvt Ltd",
      expectedSalary: "₹12-15 LPA",
      noticePeriod: "30 days",
      skills: ["React", "Node.js", "TypeScript", "AWS", "MongoDB"],
      education: "B.Tech Computer Science",
      appliedDate: "2024-08-07T10:30:00Z",
      status: "new",
      matchScore: 92,
      resumeUrl: "/resumes/arjun-sharma.pdf",
      profileImage: null,
      summary: "Experienced React developer with 5+ years in building scalable web applications. Led multiple projects and teams.",
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      name: "Priya Patel",
      email: "priya.patel@email.com",
      phone: "+91 87654 32109",
      position: "UI/UX Designer",
      jobId: "job2",
      experience: "3 years",
      location: "Mumbai, Maharashtra",
      currentCompany: "Design Studio Inc",
      expectedSalary: "₹8-10 LPA",
      noticePeriod: "15 days",
      skills: ["Figma", "Adobe XD", "Sketch", "Prototyping", "User Research"],
      education: "Master in Design",
      appliedDate: "2024-08-07T08:15:00Z",
      status: "reviewed",
      matchScore: 88,
      resumeUrl: "/resumes/priya-patel.pdf",
      profileImage: null,
      summary: "Creative UI/UX designer passionate about user-centered design and creating intuitive digital experiences.",
      lastActive: "1 day ago"
    },
    {
      id: 3,
      name: "Rahul Gupta",
      email: "rahul.gupta@email.com",
      phone: "+91 76543 21098",
      position: "Backend Developer",
      jobId: "job1",
      experience: "4 years",
      location: "Delhi, NCR",
      currentCompany: "Enterprise Solutions Ltd",
      expectedSalary: "₹10-12 LPA",
      noticePeriod: "60 days",
      skills: ["Python", "Django", "PostgreSQL", "Docker", "Redis"],
      education: "B.Tech Information Technology",
      appliedDate: "2024-08-06T16:45:00Z",
      status: "shortlisted",
      matchScore: 85,
      resumeUrl: "/resumes/rahul-gupta.pdf",
      profileImage: null,
      summary: "Backend developer specializing in Python and scalable architecture. Experience with microservices and cloud platforms.",
      lastActive: "3 hours ago"
    },
    {
      id: 4,
      name: "Sneha Reddy",
      email: "sneha.reddy@email.com",
      phone: "+91 65432 10987",
      position: "Product Manager",
      jobId: "job3",
      experience: "6 years",
      location: "Hyderabad, Telangana",
      currentCompany: "Product Innovations Corp",
      expectedSalary: "₹18-22 LPA",
      noticePeriod: "30 days",
      skills: ["Product Strategy", "Agile", "Analytics", "Market Research", "Leadership"],
      education: "MBA Marketing",
      appliedDate: "2024-08-06T11:20:00Z",
      status: "interviewed",
      matchScore: 94,
      resumeUrl: "/resumes/sneha-reddy.pdf",
      profileImage: null,
      summary: "Strategic product manager with proven track record of launching successful products and leading cross-functional teams.",
      lastActive: "5 hours ago"
    },
    {
      id: 5,
      name: "Vikram Singh",
      email: "vikram.singh@email.com",
      phone: "+91 54321 09876",
      position: "DevOps Engineer",
      jobId: "job4",
      experience: "4 years",
      location: "Pune, Maharashtra",
      currentCompany: "Cloud Systems Pvt Ltd",
      expectedSalary: "₹12-16 LPA",
      noticePeriod: "45 days",
      skills: ["AWS", "Kubernetes", "Jenkins", "Terraform", "Monitoring"],
      education: "B.Tech Computer Engineering",
      appliedDate: "2024-08-05T14:30:00Z",
      status: "rejected",
      matchScore: 78,
      resumeUrl: "/resumes/vikram-singh.pdf",
      profileImage: null,
      summary: "DevOps engineer experienced in cloud infrastructure, CI/CD pipelines, and containerization technologies.",
      lastActive: "1 day ago"
    }
  ];

  const mockJobs = [
    { id: "job1", title: "Senior React Developer", applications: 24 },
    { id: "job2", title: "UI/UX Designer", applications: 18 },
    { id: "job3", title: "Product Manager", applications: 31 },
    { id: "job4", title: "DevOps Engineer", applications: 15 }
  ];

  // Filter applicants based on active tab
  const getFilteredApplicants = () => {
    let filtered = mockApplicants;

    // Filter by status
    if (activeTab !== "all") {
      filtered = filtered.filter(applicant => applicant.status === activeTab);
    }

    // Filter by job
    if (selectedJob !== "all") {
      filtered = filtered.filter(applicant => applicant.jobId === selectedJob);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(applicant =>
        applicant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        applicant.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
        applicant.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort applicants
    switch (sortBy) {
      case "recent":
        filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
        break;
      case "match":
        filtered.sort((a, b) => b.matchScore - a.matchScore);
        break;
      case "experience":
        filtered.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const getStatusColor = (status) => {
    const colors = {
      new: "bg-blue-100 text-blue-800",
      reviewed: "bg-yellow-100 text-yellow-800",
      shortlisted: "bg-green-100 text-green-800",
      interviewed: "bg-purple-100 text-purple-800",
      rejected: "bg-red-100 text-red-800",
      hired: "bg-emerald-100 text-emerald-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getStatusCounts = () => {
    return {
      all: mockApplicants.length,
      new: mockApplicants.filter(a => a.status === "new").length,
      reviewed: mockApplicants.filter(a => a.status === "reviewed").length,
      shortlisted: mockApplicants.filter(a => a.status === "shortlisted").length,
      interviewed: mockApplicants.filter(a => a.status === "interviewed").length,
      rejected: mockApplicants.filter(a => a.status === "rejected").length
    };
  };

  const handleStatusChange = (applicantId, newStatus) => {
    // Update applicant status - implement API call here
    console.log(`Updating applicant ${applicantId} to status ${newStatus}`);
  };

  const handleBulkAction = (action) => {
    if (selectedApplicants.length === 0) return;
    console.log(`Performing bulk action: ${action} on applicants:`, selectedApplicants);
    setSelectedApplicants([]);
  };

  const statusCounts = getStatusCounts();
  const filteredApplicants = getFilteredApplicants();

  const ApplicantCard = ({ applicant }) => (
    <div className="bg-white rounded-2xl border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={selectedApplicants.includes(applicant.id)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedApplicants([...selectedApplicants, applicant.id]);
                } else {
                  setSelectedApplicants(selectedApplicants.filter(id => id !== applicant.id));
                }
              }}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
              {applicant.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-lg">{applicant.name}</h3>
              <p className="text-blue-600 font-medium">{applicant.position}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right">
              <div className="flex items-center gap-2 mb-1">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(applicant.status)}`}>
                  {applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1)}
                </span>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  {applicant.matchScore}% Match
                </span>
              </div>
              <p className="text-xs text-gray-500">Applied {new Date(applicant.appliedDate).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Key Info */}
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H8a2 2 0 01-2-2V8a2 2 0 012-2z" />
            </svg>
            <span className="text-gray-600">{applicant.experience} experience</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-gray-600">{applicant.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h1a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-gray-600">{applicant.currentCompany}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="text-gray-600">{applicant.expectedSalary}</span>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {applicant.skills.slice(0, 4).map((skill, index) => (
              <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                {skill}
              </span>
            ))}
            {applicant.skills.length > 4 && (
              <span className="bg-gray-200 text-gray-600 px-2 py-1 rounded-md text-xs font-medium">
                +{applicant.skills.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{applicant.summary}</p>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
              View Profile
            </button>
            <button className="px-3 py-1.5 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors">
              Download CV
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStatusChange(applicant.id, 'shortlisted')}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Shortlist"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </button>
            <button
              onClick={() => handleStatusChange(applicant.id, 'rejected')}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Reject"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors" title="More options">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Job Applications</h1>
              <p className="text-gray-600">Manage and review applications for your job postings</p>
            </div>
            
            {selectedApplicants.length > 0 && (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">{selectedApplicants.length} selected</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleBulkAction('shortlist')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
                  >
                    Shortlist Selected
                  </button>
                  <button
                    onClick={() => handleBulkAction('reject')}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors"
                  >
                    Reject Selected
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Filters Bar */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search applicants, skills, locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 w-full"
                />
              </div>

              {/* Job Filter */}
              <select
                value={selectedJob}
                onChange={(e) => setSelectedJob(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="all">All Jobs ({mockApplicants.length})</option>
                {mockJobs.map(job => (
                  <option key={job.id} value={job.id}>
                    {job.title} ({job.applications})
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="match">Best Match</option>
                <option value="experience">Experience</option>
                <option value="name">Name A-Z</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Status Tabs */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "all", label: "All Applications", count: statusCounts.all },
              { key: "new", label: "New", count: statusCounts.new },
              { key: "reviewed", label: "Reviewed", count: statusCounts.reviewed },
              { key: "shortlisted", label: "Shortlisted", count: statusCounts.shortlisted },
              { key: "interviewed", label: "Interviewed", count: statusCounts.interviewed },
              { key: "rejected", label: "Rejected", count: statusCounts.rejected }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === tab.key
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredApplicants.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No applicants found</h3>
            <p className="text-gray-600">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <>
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredApplicants.length} of {mockApplicants.length} applicants
              </p>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedApplicants.length === filteredApplicants.length && filteredApplicants.length > 0}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedApplicants(filteredApplicants.map(a => a.id));
                    } else {
                      setSelectedApplicants([]);
                    }
                  }}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">Select All</span>
              </div>
            </div>

            {/* Applicant Cards */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredApplicants.map(applicant => (
                <ApplicantCard key={applicant.id} applicant={applicant} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Applicants;