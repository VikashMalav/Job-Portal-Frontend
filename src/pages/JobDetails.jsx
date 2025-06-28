import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { MapPin, Clock, DollarSign, Building2, Globe, Mail, Calendar, Share2, Bookmark, ArrowRight, CheckCircle } from 'lucide-react';
import { JobSkeleton } from '../components/skeleton/JobSkeleton';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedJob, getJobById } from '../features/Job/jobSlice';
import ApplicantFormModal from '../components/ApplicantFormModal';
import { applyToJob } from '../features/application/applicationSlice';
import { toast } from 'react-toastify';

const JobDetails = () => {
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams();
    console.log(id)
    const dispatch = useDispatch();

    const { selectedJob: job, loading } = useSelector((state) => state.jobs);
    const { user } = useSelector((state) => state.auth);
    const { error } = useSelector((state) => state.applicant);


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

    if (!job) return null;

    const checkAlreadyApplied = user?.appliedJobs?.some((id) => id === job._id)

    const handleSubmit = async (formData) => {
    try {
        const application = await dispatch(applyToJob({ formData, jobId: id })).unwrap(); 

        console.log("Success:", application);

        if (application?.success === true) {
            toast.success("Application submitted successfully!");
        } else {
            toast.info(application.message || "Something happened.");
        }
    } catch (error) {
        console.error("Error:", error);
        toast.error(error?.message || "Failed to apply.");
    } finally {
        setShowModal(false);
    }
};


    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Navigation */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link to='/' className="text-gray-600 hover:text-gray-900 transition-colors">
                                ← Back to Jobs
                            </Link>
                        </div>
                        <div className="flex items-center space-x-3">
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                                <Share2 className="w-5 h-5" />
                            </button>
                            <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all">
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Job Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-800 rounded-xl flex items-center justify-center">
                                    <Building2 className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-1">{job.title}</h1>
                                    <p className="text-xl text-gray-600">{job.company?.name}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{job.location}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{job.jobType}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span className="font-semibold text-green-600">₹{job.salary}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>Posted 2 days ago</span>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {job.skills?.slice(0, 5).map((skill, idx) => (
                                    <span
                                        key={idx}
                                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                                    >
                                        {skill}
                                    </span>
                                ))}
                                {job.skills?.length > 5 && (
                                    <span className="bg-gray-100 text-gray-500 px-3 py-1 rounded-full text-sm">
                                        +{job.skills.length - 5} more
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="lg:ml-8 mt-6 lg:mt-0">
                            {!checkAlreadyApplied ?
                                (
                                    <button
                                        onClick={() => setShowModal(true)}
                                        className="w-full lg:w-auto bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        Apply Now
                                        <ArrowRight className="w-4 h-4" />
                                    </button>
                                )
                                :
                                (
                                    <button
                                        disabled={checkAlreadyApplied}
                                        className="w-full lg:w-auto cursor-not-allowed bg-green-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                                    >
                                        Already Applied

                                    </button>
                                )
                            }
                            <p className="text-sm text-gray-500 mt-2 text-center lg:text-left">
                                Join 50+ applicants
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Job Description */}
                        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                                Job Description
                            </h2>
                            <div className="prose prose-gray max-w-none">
                                <p className="text-gray-700 leading-relaxed text-base">
                                    {job.description}
                                </p>
                            </div>
                        </section>

                        {/* Requirements */}
                        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                                Skills & Requirements
                            </h2>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {job.skills?.map((skill, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                                    >
                                        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                        <span className="text-gray-700 text-sm font-medium">{skill}</span>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Company Section */}
                        {job.company && (
                            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">
                                    About {job.company.name}
                                </h2>
                                <div className="flex items-start gap-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Building2 className="w-10 h-10 text-gray-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">{job.company.name}</h3>
                                        <div className="space-y-3">
                                            {job.company.website && (
                                                <div className="flex items-center gap-3">
                                                    <Globe className="w-4 h-4 text-gray-400" />
                                                    <a
                                                        href={job.company.website}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-600 hover:text-blue-800 transition-colors"
                                                    >
                                                        Visit Company Website
                                                    </a>
                                                </div>
                                            )}
                                            {job.company.email && (
                                                <div className="flex items-center gap-3">
                                                    <Mail className="w-4 h-4 text-gray-400" />
                                                    <span className="text-gray-600">{job.company.email}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        {/* Quick Stats */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 sticky top-24">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Overview</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 text-sm">Salary</span>
                                    <span className="font-semibold text-gray-900">₹{job.salary}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 text-sm">Location</span>
                                    <span className="font-semibold text-gray-900">{job.location}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 text-sm">Job Type</span>
                                    <span className="font-semibold text-gray-900">{job.jobType}</span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                                    <span className="text-gray-600 text-sm">Experience</span>
                                    <span className="font-semibold text-gray-900">2-5 years</span>
                                </div>
                            </div>

                            {!checkAlreadyApplied ?
                                <button
                                    onClick={() => setShowModal(true)}
                                    className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    Quick Apply
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                                : (<button
                                    disabled={checkAlreadyApplied}
                                    className="w-full mt-6 bg-green-500 cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                                >
                                    Already Applied

                                </button>)
                            }
                        </div>

                        {/* Application Process */}
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Application Process</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                    <span className="text-sm text-gray-700">Submit Application</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                                    <span className="text-sm text-gray-700">HR Screening</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                                    <span className="text-sm text-gray-700">Technical Interview</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 bg-gray-300 text-gray-600 rounded-full flex items-center justify-center text-xs font-bold">4</div>
                                    <span className="text-sm text-gray-700">Final Decision</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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