import { Search, MapPin, X } from "lucide-react";
import { useState } from "react";

const jobTypes = ["Full-time", "Part-time", "Remote", "Internship"];

const JobFilter = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    keyword: "",
    location: "",
    jobType: "",
  });

  const handleChange = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onFilter(updated);
  };

  const clearFilters = () => {
    const cleared = { keyword: "", location: "", jobType: "" };
    setFilters(cleared);
    onFilter(cleared);
  };

  return (
    <div className="bg-white border border-indigo-100 rounded-2xl shadow-md px-4 md:px-6 py-4 md:py-5 mx-4 md:mx-16 mt-6">
      <div className="flex flex-col lg:flex-row items-center gap-3 lg:gap-4 flex-wrap">

        {/* Keyword */}
        <div className="relative w-full lg:w-1/3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-500" size={18} />
          <input
            type="text"
            value={filters.keyword}
            onChange={(e) => handleChange("keyword", e.target.value)}
            placeholder="Job title or skill"
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
        </div>

        {/* Location */}
        <div className="relative w-full lg:w-1/4">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500" size={18} />
          <input
            type="text"
            value={filters.location}
            onChange={(e) => handleChange("location", e.target.value)}
            placeholder="Location"
            className="w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-400 text-sm"
          />
        </div>

        {/* Job Type Dropdown */}
        <div className="w-full lg:w-1/5">
          <select
            value={filters.jobType}
            onChange={(e) => handleChange("jobType", e.target.value)}
            className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">All Job Types</option>
            {jobTypes.map((type) => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Clear Button */}
        <div className="flex gap-2 items-center mt-1 lg:mt-0">
          <button
            onClick={clearFilters}
            className="text-sm text-gray-600 flex items-center gap-1 hover:text-red-500"
          >
            <X size={16} /> Clear
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobFilter;
