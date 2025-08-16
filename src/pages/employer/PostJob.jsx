import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJob, resetPostJob } from "../../features/employer/postJobSlice";
import { CheckCircle, XCircle } from "lucide-react"; 

const jobTypes = ["Full-time", "Part-time", "Internship", "Remote"];

const PostJob = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { loading, error, success } = useSelector((state) => state.postJob);

  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    jobType: "Full-time",
    salary: "",
    skills: "",
    company: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user?._id) return;

    const payload = {
      ...form,
      salary: form.salary ? Number(form.salary) : undefined,
      skills: form.skills ? form.skills.split(",").map((s) => s.trim()) : [],
      createdBy: user._id,
    };

    dispatch(postJob(payload));
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        dispatch(resetPostJob());
        setForm({
          title: "",
          description: "",
          location: "",
          jobType: "Full-time",
          salary: "",
          skills: "",
          company: "",
        });
      }, 3000);
    }
  }, [success, dispatch]);

  return (
    <div className="bg-white rounded-3xl shadow-xl p-10 max-w-2xl mx-auto my-10 border border-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-blue-700">📝 Post a New Job</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Job Title */}
        <div>
          <label className="block text-sm font-semibold mb-1">Job Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="e.g. Frontend Developer"
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Describe the role..."
            rows={4}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="e.g. Remote, Bengaluru"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-sm font-semibold mb-1">Job Type</label>
          <select
            name="jobType"
            value={form.jobType}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {jobTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Salary */}
        <div>
          <label className="block text-sm font-semibold mb-1">Salary (per year)</label>
          <input
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="e.g. 600000"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold mb-1">Skills (comma separated)</label>
          <input
            name="skills"
            value={form.skills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, MongoDB"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Company */}
        <div>
          <label className="block text-sm font-semibold mb-1">Company ID</label>
          <input
            name="company"
            value={form.company}
            onChange={handleChange}
            required
            placeholder="Enter company ObjectId"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Posting Job..." : "🚀 Post Job"}
        </button>

        {/* Feedback */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg mt-4 text-sm">
            <XCircle className="w-5 h-5" />
            {typeof error === "string" ? error : error.message || "Something went wrong!"}
          </div>
        )}
        {success && (
          <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg mt-4 text-sm">
            <CheckCircle className="w-5 h-5" />
            Job posted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default PostJob;
