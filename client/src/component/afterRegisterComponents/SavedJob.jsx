import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SavedJob = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(jobs);
  }, []);

  const handleRemove = (id, title) => {
    const updated = savedJobs.filter((job) => job.id !== id);
    localStorage.setItem("savedJobs", JSON.stringify(updated));
    setSavedJobs(updated);
    toast.success(`Removed ${title} from saved jobs`);
  };

  const handleApply = (job) => {
    navigate(`/job/${job.id}`, { state: { job } });
  };

  if (savedJobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl text-center max-w-md border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="text-6xl mb-4 animate-bounce">💼</div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            No Saved Jobs
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            You haven't saved any jobs yet. Start exploring and save jobs you're interested in!
          </p>

          <button
            onClick={() => navigate("/jobsapply")}
            className="bg-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg relative overflow-hidden group"
          >
            <span className="relative z-10">Browse Jobs</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-20"></span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 sm:py-12 px-3 sm:px-4">
      <div className="max-w-7xl mx-auto">

        {/* HEADER - Modern Design */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-8 sm:mb-10 md:mb-12">
          <div className="animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Saved Jobs
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Jobs you've saved for later
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {savedJobs.length} {savedJobs.length === 1 ? "Job" : "Jobs"} Saved
          </div>
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {savedJobs.map((job, index) => (
            <div
              key={job.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
            >
              {/* Gradient Top Border */}
              <div className="h-1 bg-gradient-to-r from-yellow-500 to-orange-500"></div>
              
              {/* Saved Badge */}
              <div className="absolute top-4 right-4">
                <div className="bg-yellow-100 text-yellow-700 rounded-full p-1.5 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M5 3a2 2 0 00-2 2v14l7-3 7 3V5a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                
                {/* Job Title & Company */}
                <div className="mb-4 pr-8">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                    {job.company}
                  </p>
                </div>

                {/* Job Details Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600">
                    <span>💼</span> {job.employmentType || "Full Time"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600">
                    <span>📍</span> {job.location || "Remote"}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600">
                    <span>💰</span> {job.salary || "Not Specified"}
                  </span>
                </div>

                {/* Experience */}
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                  <span>💪</span>
                  <span>Experience: {job.experience || "Fresher"}</span>
                </div>

                {/* Description Preview */}
                {job.description && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {job.description}
                    </p>
                  </div>
                )}

                {/* Skills Section */}
                {job.skills && job.skills.length > 0 && (
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1.5">
                      {job.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                          {skill}
                        </span>
                      ))}
                      {job.skills.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-50 text-gray-600 rounded-full">
                          +{job.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Expandable Details */}
                <div className={`transition-all duration-300 overflow-hidden ${selectedJob === job.id ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="border-t border-gray-100 pt-4 mt-2 space-y-2">
                    
                    {/* Company Info */}
                    {job.companyInfo && (
                      <div className="space-y-1">
                        <p className="text-xs font-semibold text-gray-700">Company Info:</p>
                        <p className="text-xs text-gray-600">{job.companyInfo}</p>
                      </div>
                    )}
                    
                    {/* Benefits */}
                    {job.benefits && job.benefits.length > 0 && (
                      <div>
                        <p className="text-xs font-semibold text-gray-700 mb-1">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {job.benefits.map((benefit, i) => (
                            <span key={i} className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Posted Date */}
                    {job.postedDate && (
                      <p className="text-xs text-gray-400 mt-2">
                        Posted: {job.postedDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleApply(job);
                    }}
                    className="flex-1 px-3 py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded-xl text-sm font-medium hover:from-gray-800 hover:to-gray-900 transition-all duration-300 transform hover:scale-105"
                  >
                    Apply Now
                  </button>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(job.id, job.title);
                    }}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
                  >
                    Remove
                  </button>
                </div>

                {/* Mobile Expand Hint */}
                <div className="block md:hidden text-center mt-3 text-xs text-gray-400">
                  <span className="flex items-center justify-center gap-1">
                    {selectedJob === job.id ? '▲ Tap to hide details' : '▼ Tap to show details'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        {savedJobs.length > 0 && (
          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-gray-900">
                {savedJobs.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Total Saved</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gray-300 transition-all duration-300 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:text-blue-700">
                {savedJobs.filter(job => job.employmentType === "Full Time").length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Full Time</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-blue-300 transition-all duration-300 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 group-hover:text-purple-700">
                {savedJobs.filter(job => job.employmentType === "Remote").length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Remote</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-purple-300 transition-all duration-300 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 group-hover:text-green-700">
                {savedJobs.filter(job => parseInt(job.salary) > 100000).length}
              </div>
              <div className="text-xs text-gray-500 mt-1">High Salary</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-green-300 transition-all duration-300 mx-auto"></div>
            </div>
          </div>
        )}

        {/* Recommendation Section */}
        {savedJobs.length > 0 && (
          <div className="mt-12 sm:mt-16 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 md:p-10">
            <div className="text-center mb-6">
              <div className="inline-block p-3 bg-white rounded-full shadow-md mb-4">
                <span className="text-3xl">💡</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                Keep Exploring!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
                You've saved {savedJobs.length} job{savedJobs.length > 1 ? 's' : ''}. Check out more opportunities that match your skills and interests.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => navigate("/jobsapply")}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
              >
                <span>🔍</span>
                Find More Jobs
                <span>→</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.5s ease-out forwards;
          opacity: 0;
        }
        
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default SavedJob;