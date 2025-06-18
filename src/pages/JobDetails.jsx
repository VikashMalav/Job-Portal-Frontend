import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { JobSkeleton } from '../components/skeleton/JobSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedJob, getJobById } from '../features/Job/jobSlice';
import ApplicantFormModal from '../components/ApplicantFormModal';
import { applyToJob } from '../features/application/applicationSlice';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams();
   
    const dispatch = useDispatch();

    const { selectedJob: job, error, loading } = useSelector((state) => state.jobs);

    useEffect(() => {
        dispatch(getJobById(id));

        return () => {
            dispatch(clearSelectedJob());
        };
    }, [dispatch, id]);

    useEffect(() => {
        window.scrollTo(0, 0)

    }, [])


    if (loading) return <JobSkeleton />;
    if (error)
        return (
            <div className="text-red-500 flex items-center gap-2 p-10">
                <AlertCircle /> {error}
            </div>
        );

    if (!job) return null;

    const handleSubmit = async (formData) => {
        console.log(id)
        try {
              dispatch(applyToJob({formData,jobId:id}))
            toast.success("Application submitted successfully!");
            setShowModal(false);
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to apply");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-3xl mt-10">
            <div className="mb-6">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">{job.title}</h1>
                <p className="text-lg text-gray-600 mb-1">
                    <strong>Company:</strong> {job.company?.name}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Location:</strong> {job.location}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Type:</strong> {job.jobType}
                </p>
                <p className="text-gray-600 mb-1">
                    <strong>Salary:</strong> ₹{job.salary}
                </p>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {job.skills?.map((skill, idx) => (
                        <span
                            key={idx}
                            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Job Description</h2>
                <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {job.company && (
                <div className="mt-8 p-4 border-t border-gray-200">
                    <h2 className="text-lg font-bold text-indigo-600 mb-2">About the Company</h2>
                    <p className="text-gray-600">
                        <strong>Name:</strong> {job.company.name}
                    </p>
                    {job.company.website && (
                        <p className="text-blue-600">
                            <strong>Website:</strong>{' '}
                            <a href={job.company.website} target="_blank" rel="noopener noreferrer" className="underline">
                                {job.company.website}
                            </a>
                        </p>
                    )}
                    {job.company.email && (
                        <p className="text-gray-600">
                            <strong>Contact:</strong> {job.company.email}
                        </p>
                    )}
                </div>
            )}

            <button
                onClick={() => setShowModal(true)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-lg rounded-xl shadow-lg transition"
            >
                Apply Now
            </button>

            <ApplicantFormModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                jobTitle={job.title}
                onSubmit={handleSubmit}
            />


        </div>
    );
};

export default JobDetails;
