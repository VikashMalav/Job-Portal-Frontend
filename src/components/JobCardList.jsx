import { MapPin, Briefcase, DollarSign, CalendarDays, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const JobList = ({ jobs = [] }) => {
  const jobTypeStyle = {
    FullTime: "from-green-400 to-green-600",
    PartTime: "from-yellow-400 to-yellow-600",
    Remote: "from-purple-400 to-purple-600",
    Internship: "from-blue-400 to-blue-600",
    Contract: "from-red-400 to-red-600",
  };

  return (
    <div className="bg-gradient-to-br from-white via-slate-50 to-white px-6 py-16 md:px-20 min-h-screen">
      <h2 className="hidden md:block text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-600 mb-10 py-2">
        🔥 Trending Jobs Right Now
      </h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <Link to={`/jobs/${job._id}`} key={index}>
            <div className="relative bg-white/80 backdrop-blur-xl border border-white/30 rounded-3xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:scale-[1.02] p-6 overflow-hidden">
              {/* Job Type Badge */}
              <div className="absolute top-4 right-4 z-10">
                <span
                  className={`text-xs text-white px-3 py-1 rounded-full font-semibold shadow-md bg-gradient-to-r ${jobTypeStyle[job.jobType] || "from-gray-400 to-gray-600"
                    }`}
                >
                  {job.jobType}
                </span>
              </div>

              {/* Save Job Button */}
              <button
                className="absolute top-4 left-4 z-10 bg-white/80 hover:bg-white text-indigo-600 rounded-full p-2 shadow-md transition"
                title="Save Job"
              >
                <Bookmark size={18} />
              </button>

              {/* Job Info */}
              <div className="relative z-0 mt-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{job.title}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2 mb-4">
                  <Briefcase size={16} /> {job.company?.name}
                </p>

                <ul className="text-sm text-gray-700 space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <MapPin size={16} /> {job.location}
                  </li>
                  <li className="flex items-center gap-2">
                    <DollarSign size={16} /> ₹ {job.salary}
                  </li>
                  <li className="flex items-center gap-2">
                    <CalendarDays size={16} />{" "}
                    {new Date(job.createdAt).toLocaleDateString()}
                  </li>
                </ul>

                <button className="w-full py-2 bg-gradient-to-r from-indigo-600 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition">
                  Apply Now
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JobList;
