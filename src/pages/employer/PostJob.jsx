
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postJob, resetPostJob } from "../../features/employer/postJobSlice";

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

  // Example: company could be set from user.company if available
  // If you have a company list, replace with a dropdown

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

  return (
    <div className="bg-white rounded-xl shadow p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">Post a New Job</h2>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-1">Job Title</label>
          <input name="title" type="text" value={form.title} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter job title" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter job description" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Location</label>
          <input name="location" type="text" value={form.location} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter location" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Job Type</label>
          <select name="jobType" value={form.jobType} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
            {jobTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Salary</label>
          <input name="salary" type="number" value={form.salary} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter salary" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Skills (comma separated)</label>
          <input name="skills" type="text" value={form.skills} onChange={handleChange} className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="e.g. React, Redux, Tailwind" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Company ID</label>
          <input name="company" type="text" value={form.company} onChange={handleChange} required className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400" placeholder="Enter company ObjectId" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-2 rounded-lg hover:bg-blue-700 transition">
          {loading ? "Posting..." : "Post Job"}
        </button>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">Job posted successfully!</div>}
      </form>
    </div>
  );
};

export default PostJob;
