import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplied = async () => {
      try {
        const token = localStorage.getItem("skillmatch_token");

        const res = await api.get(
          "/api/applications/my-applications",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setAppliedJobs(res.data.applications);
      } catch (error) {
        console.log(error);
        toast.error("Failed to load applied jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchApplied();
  }, []);

  const handleWithdraw = async (applicationId) => {
    if (window.confirm("Are you sure you want to withdraw this application?")) {
      try {
        const token = localStorage.getItem("skillmatch_token");
        await api.delete(
          `/api/applications/${applicationId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppliedJobs(appliedJobs.filter(job => job._id !== applicationId));
        toast.success("Application withdrawn successfully!");
      } catch (error) {
        toast.error("Failed to withdraw application");
      }
    }
  };

  const getStatusConfig = (status) => {
    const configs = {
      pending: {
        color: "from-yellow-500 to-orange-500",
        badge: "bg-yellow-100 text-yellow-700",
        icon: "⏳",
        label: "Pending Review",
        bg: "bg-yellow-50",
        progress: "w-2/3"
      },
      reviewed: {
        color: "from-blue-500 to-indigo-500",
        badge: "bg-blue-100 text-blue-700",
        icon: "👀",
        label: "Under Review",
        bg: "bg-blue-50",
        progress: "w-1/2"
      },
      shortlisted: {
        color: "from-green-500 to-emerald-500",
        badge: "bg-green-100 text-green-700",
        icon: "⭐",
        label: "Shortlisted",
        bg: "bg-green-50",
        progress: "w-3/4"
      },
      rejected: {
        color: "from-red-500 to-pink-500",
        badge: "bg-red-100 text-red-700",
        icon: "❌",
        label: "Not Selected",
        bg: "bg-red-50",
        progress: "w-full"
      },
      accepted: {
        color: "from-purple-500 to-violet-500",
        badge: "bg-purple-100 text-purple-700",
        icon: "🎉",
        label: "Accepted",
        bg: "bg-purple-50",
        progress: "w-full"
      }
    };
    return configs[status] || configs.pending;
  };

  // 🔄 LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading your applications...</p>
        </div>
      </div>
    );
  }

  // ❌ EMPTY
  if (appliedJobs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl text-center max-w-md border border-gray-100 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="text-6xl mb-4 animate-bounce">📭</div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
            No Applied Jobs
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            You haven't applied to any jobs yet. Start your journey today!
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

        {/* HEADER - Mobile Responsive */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-8 sm:mb-10 md:mb-12">
          <div className="animate-fadeIn">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Applied Jobs
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-1">
              Track and manage your job applications
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            {appliedJobs.length}{" "}
            {appliedJobs.length === 1 ? "Application" : "Applications"}
          </div>
        </div>

        {/* CARDS GRID - New Modern Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-7">
          {appliedJobs.map((app, index) => {
            const statusConfig = getStatusConfig(app.status);
            const appliedDate = new Date(app.createdAt);
            const daysAgo = Math.floor((new Date() - appliedDate) / (1000 * 60 * 60 * 24));
            
            return (
              <div
                key={app._id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer animate-fadeInUp"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => setSelectedJob(selectedJob === app._id ? null : app._id)}
              >
                {/* Gradient Top Border */}
                <div className={`h-1 bg-gradient-to-r ${statusConfig.color}`}></div>
                
                {/* Company Logo Placeholder */}
                <div className="absolute top-4 right-4">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${statusConfig.color} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {app.jobId?.company?.charAt(0)?.toUpperCase() || "J"}
                  </div>
                </div>

                <div className="p-5 sm:p-6">
                  
                  {/* Job Title & Company */}
                  <div className="mb-4 pr-12">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-1">
                      {app.jobId?.title || "Job Title"}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-gray-400 rounded-full"></span>
                      {app.jobId?.company || "Company Name"}
                    </p>
                  </div>

                  {/* Job Details Badges */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600">
                      <span>💼</span> {app.jobId?.employmentType || "Full Time"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600">
                      <span>💰</span> {app.jobId?.salary || "Not Specified"}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-gray-50 text-gray-600">
                      <span>📍</span> {app.jobId?.location || "Remote"}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusConfig.badge}`}>
                      <span>{statusConfig.icon}</span>
                      {statusConfig.label}
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Application Progress</span>
                      <span>{statusConfig.label}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r ${statusConfig.color} transition-all duration-500 ${statusConfig.progress}`}
                        style={{ width: statusConfig.progress === "w-full" ? "100%" : statusConfig.progress === "w-3/4" ? "75%" : statusConfig.progress === "w-2/3" ? "66%" : "50%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Applied Date */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                    <span>📅</span>
                    <span>Applied {daysAgo === 0 ? "today" : `${daysAgo} days ago`}</span>
                    <span>•</span>
                    <span>{appliedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  </div>

                  {/* Expandable Details */}
                  <div className={`transition-all duration-300 overflow-hidden ${selectedJob === app._id ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="border-t border-gray-100 pt-4 mt-2 space-y-2">
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-medium text-gray-700 min-w-[65px]">Name:</span>
                        <span className="text-gray-600 break-words flex-1">{app.name}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-medium text-gray-700 min-w-[65px]">Email:</span>
                        <span className="text-gray-600 break-words flex-1 text-xs sm:text-sm">{app.email}</span>
                      </div>
                      <div className="flex items-start gap-2 text-sm">
                        <span className="font-medium text-gray-700 min-w-[65px]">Phone:</span>
                        <span className="text-gray-600">{app.phone}</span>
                      </div>
                      
                      {app.resumeUrl && (
                        <div className="mt-3 pt-2">
                          <a 
                            href={app.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-700 hover:gap-2 transition-all"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>📄</span> View Resume
                            <span>→</span>
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/job/${app.jobId?._id}`);
                      }}
                      className="flex-1 px-3 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:from-gray-100 hover:to-gray-200 transition-all duration-300 transform hover:scale-105"
                    >
                      👁️ View Details
                    </button>
                    
                    {app.status === "pending" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleWithdraw(app._id);
                        }}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-medium hover:bg-red-100 transition-all duration-300 transform hover:scale-105"
                      >
                        Withdraw
                      </button>
                    )}
                  </div>

                  {/* Mobile Expand Hint */}
                  <div className="block md:hidden text-center mt-3 text-xs text-gray-400">
                    <span className="flex items-center justify-center gap-1">
                      {selectedJob === app._id ? '▲ Tap to hide details' : '▼ Tap to show details'}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section - Modern Design */}
        {appliedJobs.length > 0 && (
          <div className="mt-10 sm:mt-12 md:mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-gray-800 group-hover:text-gray-900">
                {appliedJobs.length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Total Applied</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-gray-300 transition-all duration-300 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-yellow-600 group-hover:text-yellow-700">
                {appliedJobs.filter(j => j.status === "pending").length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Pending</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-yellow-300 transition-all duration-300 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 group-hover:text-blue-700">
                {appliedJobs.filter(j => j.status === "reviewed" || j.status === "shortlisted").length}
              </div>
              <div className="text-xs text-gray-500 mt-1">In Review</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-blue-300 transition-all duration-300 mx-auto"></div>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 group-hover:text-green-700">
                {appliedJobs.filter(j => j.status === "accepted").length}
              </div>
              <div className="text-xs text-gray-500 mt-1">Accepted</div>
              <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-green-300 transition-all duration-300 mx-auto"></div>
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
      `}</style>
    </section>
  );
};

export default AppliedJobs;