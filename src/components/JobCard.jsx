import {  Building2, MapPin, Clock, BookmarkPlus, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const JobCard = ({ job, onSave, isSaved = false, onApply }) => {

  const formatSalary = (salary) => {
    if (!salary) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(salary);
  };

  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
  };

 
  const getJobTypeColor = (jobType) => {
    const colors = {
      'Full-time': 'bg-green-100 text-green-800',
      'Part-time': 'bg-blue-100 text-blue-800',
      'Internship': 'bg-purple-100 text-purple-800',
      'Remote': 'bg-orange-100 text-orange-800',
    };
    return colors[jobType] || 'bg-gray-100 text-gray-800';
  };

  const transformString =(description)=>{
    if(description.length>30) {
      return description.slice(0,60)
    }
  }

  
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden">
      <div className="p-6">
       
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                {job.company?.name?.charAt(0) || job.company?.logo || 'C'}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-1">
                {job.title}
              </h3>
              <div className="flex items-center text-gray-600 mb-2">
                <Building2 className="h-4 w-4 mr-1" />
                <span className="font-medium">
                  {job.company?.name || 'Company Name'}
                </span>
              </div>
              <div className="flex items-center text-gray-500 text-sm flex-wrap gap-4">
                {job.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                )}
                {job.createdAt && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{formatDate(job.createdAt)}</span>
                  </div>
                )}
                {job.applicants && job.applicants.length > 0 && (
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{job.applicants.length} applicant{job.applicants.length !== 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          {onSave && (
            <button
              onClick={() => onSave(job._id)}
              className={`p-2 rounded-lg transition-colors ${
                isSaved
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save job'}
            >
              <BookmarkPlus className="h-5 w-5" />
            </button>
          )}
        </div>

{/*      
        {job.description && (
          <div className="mb-4">
            <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
              {transformString(job.description)}<span className='text-blue-500 hover:text-blue-700'>...See more</span>
            </p>
          </div>
        )} */}

  
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className={`text-sm font-medium px-3 py-1 rounded-full ${getJobTypeColor(job.jobType)}`}>
              {job.jobType || 'Full-time'}
            </span>
          </div>
          {job.salary && (
            <div className="text-right">
              <div className="flex items-center text-lg font-semibold text-gray-900">
               
                <span>{formatSalary(job.salary)}</span>
              </div>
              <p className="text-sm text-gray-500">per year</p>
            </div>
          )}
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {job.skills.slice(0, 6).map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-50 text-blue-700 text-xs font-medium px-2 py-1 rounded-md"
                >
                  {skill}
                </span>
              ))}
              {job.skills.length > 6 && (
                <span className="bg-gray-50 text-gray-600 text-xs font-medium px-2 py-1 rounded-md">
                  +{job.skills.length - 6} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Footer Section */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">
              Job ID: {job._id?.slice(-6) || 'N/A'}
            </span>
          </div>
          <div className="flex space-x-3">
            <Link to={`/jobs/${job._id}`} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              View Details
            </Link>
            <button 
              onClick={() => onApply && onApply(job._id)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard

