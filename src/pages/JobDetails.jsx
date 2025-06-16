import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle } from 'lucide-react';
import { JobSkeleton } from '../components/skeleton/JobSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedJob, getJobById } from '../features/Job/jobSlice';

const JobDetails = () => {
    const { id } = useParams();
    console.log(id)
    const { selectedByJob: job, error, loading } = useSelector(state => state.jobs)
    console.log( job, error, loading )
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getJobById(id));
        return () => {
            dispatch(clearSelectedJob());
        };
    }, [dispatch, id]);

    if (loading) return <JobSkeleton />;
    if (error) return <div className="text-red-500 flex items-center gap-2 p-10"><AlertCircle /> {error}</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{job.title}</h1>
            <p className="text-lg text-gray-600 mb-2"><strong>Company:</strong> {job.company?.name}</p>
            <p className="mb-2"><strong>Location:</strong> {job.location}</p>
            <p className="mb-2"><strong>Type:</strong> {job.jobType}</p>
            <p className="mb-2"><strong>Salary:</strong> ₹{job.salary}</p>
            <div className="mb-4">
                <strong>Skills:</strong>
                <ul className="list-disc list-inside ml-4">
                    {job.skills.map((skill, idx) => (
                        <li key={idx}>{skill}</li>
                    ))}
                </ul>
            </div>
            <div>
                <strong>Description:</strong>
                <p className="text-gray-700 mt-2">{job.description}</p>
            </div>
        </div>
    );
};

export default JobDetails;
