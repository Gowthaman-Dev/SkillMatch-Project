import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../Footer';
import api from '../../api/axios';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    shortlisted: 0,
    hired: 0
  });
  const [recentApplications, setRecentApplications] = useState([]);
  const [recentJobs, setRecentJobs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const token = localStorage.getItem("skillmatch_token");
        const userData = JSON.parse(localStorage.getItem("reactproject"));
        
        if (!token) {
          console.log("No token found");
          setError("Please login again");
          setLoading(false);
          return;
        }

        if (!userData || userData.role !== "company") {
          console.log("User is not a company");
          setError("You don't have company access");
          setLoading(false);
          return;
        }

        // Fetch company profile
        let profileData = userData;
        try {
          const profileRes = await api.get("/api/profile/me", {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000
          });
          if (profileRes.data && profileRes.data.profile) {
            profileData = profileRes.data.profile;
          }
          setCompanyData(profileData);
        } catch (profileError) {
          console.log("Profile fetch error:", profileError.message);
          setCompanyData(userData);
          // Don't show toast for profile error
        }
        
        // Fetch jobs posted by company
        let jobs = [];
        try {
          const jobsRes = await api.get("/api/jobs/myjobs", {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000
          });
          jobs = jobsRes.data.jobs || [];
          setRecentJobs(jobs.slice(0, 3));
        } catch (jobsError) {
          console.log("Jobs fetch error:", jobsError.message);
          // If no jobs, just set empty array
          jobs = [];
          setRecentJobs([]);
        }
        
        // Fetch applications for company jobs
        let applications = [];
        try {
          const appsRes = await api.get("/api/applications/all-applications", {
            headers: { Authorization: `Bearer ${token}` },
            timeout: 5000
          });
          applications = appsRes.data.applications || [];
          setRecentApplications(applications.slice(0, 4));
        } catch (appsError) {
          console.log("Applications fetch error:", appsError.message);
          applications = [];
          setRecentApplications([]);
        }
        
        // Calculate stats
        const activeJobs = jobs.filter(job => !job.isExpired && job.status !== "closed").length;
        const totalApplications = applications.length;
        const shortlisted = applications.filter(app => app.status === "shortlisted").length;
        const hired = applications.filter(app => app.status === "accepted").length;
        
        setStats({
          totalJobs: jobs.length,
          activeJobs: activeJobs,
          totalApplications: totalApplications,
          shortlisted: shortlisted,
          hired: hired
        });
        
      } catch (error) {
        console.log("Main fetch error:", error);
        setError(error.message || "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyData();
  }, []);

  if (loading) {
    return (
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-sm sm:text-base">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-6 sm:py-8 md:py-10">
        
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl animate-fadeIn">
            <div className="flex items-center gap-3">
              <span className="text-yellow-600 text-xl">⚠️</span>
              <div className="flex-1">
                <p className="text-sm text-yellow-800">{error}</p>
                <p className="text-xs text-yellow-600 mt-1">Please check your connection or try again later.</p>
              </div>
              <button 
                onClick={() => window.location.reload()}
                className="px-3 py-1 bg-yellow-600 text-white text-xs rounded-lg hover:bg-yellow-700 transition"
              >
                Retry
              </button>
            </div>
          </div>
        )}
        
        {/* Welcome Section */}
        <div className="mb-8 sm:mb-10 md:mb-12 animate-fadeIn">
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 text-white relative overflow-hidden group">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <div className="relative z-10">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                Welcome back, {companyData?.username || "Company"}! 👋
              </h1>
              <p className="text-gray-200 text-sm sm:text-base max-w-2xl">
                Manage your job postings, review applications, and find the perfect candidates for your company.
              </p>
              <div className="mt-4 sm:mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/company/postjob")}
                  className="px-4 sm:px-6 py-2 bg-white text-gray-900 rounded-xl text-sm font-medium hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-2"
                >
                  <span>📝</span> Post New Job
                </button>
                <button
                  onClick={() => navigate("/company/myjobs")}
                  className="px-4 sm:px-6 py-2 bg-transparent border border-white text-white rounded-xl text-sm font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                >
                  <span>👁️</span> View All Jobs
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-8 sm:mb-10 md:mb-12">
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl sm:text-2xl md:text-3xl">📊</span>
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-blue-600 text-xs">jobs</span>
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">{stats.totalJobs}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Total Jobs</div>
            <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-blue-300 transition-all duration-300"></div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl sm:text-2xl md:text-3xl">✅</span>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-green-600 text-xs">active</span>
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{stats.activeJobs}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Active Jobs</div>
            <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-green-300 transition-all duration-300"></div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl sm:text-2xl md:text-3xl">👥</span>
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-purple-600 text-xs">apps</span>
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-purple-600">{stats.totalApplications}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Total Applications</div>
            <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-purple-300 transition-all duration-300"></div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl sm:text-2xl md:text-3xl">⭐</span>
              <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-yellow-600 text-xs">short</span>
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-600">{stats.shortlisted}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Shortlisted</div>
            <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-yellow-300 transition-all duration-300"></div>
          </div>
          
          <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xl sm:text-2xl md:text-3xl">🎉</span>
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-green-600 text-xs">hired</span>
              </div>
            </div>
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-green-600">{stats.hired}</div>
            <div className="text-[10px] sm:text-xs text-gray-500 mt-1">Hired</div>
            <div className="mt-2 h-0.5 w-0 group-hover:w-full bg-green-300 transition-all duration-300"></div>
          </div>
        </div>

        {/* Quick Actions Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-4 sm:mb-5 flex items-center gap-2">
            <span>⚡</span> Quick Actions
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <button
              onClick={() => navigate("/company/postjob")}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📝</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">Post Job</div>
            </button>
            <button
              onClick={() => navigate("/company/applications")}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">👥</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">Applications</div>
            </button>
            <button
              onClick={() => navigate("/company/myjobs")}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">📋</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">My Jobs</div>
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="text-2xl sm:text-3xl mb-2 group-hover:scale-110 transition-transform">🏢</div>
              <div className="text-xs sm:text-sm font-medium text-gray-700">Company Profile</div>
            </button>
          </div>
        </div>

        {/* Recent Jobs & Applications */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">
          
          {/* Recent Jobs */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
            <div className="p-4 sm:p-5 md:p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span>📌</span> Recent Jobs
                </h2>
                <button
                  onClick={() => navigate("/company/myjobs")}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View All →
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentJobs.length > 0 ? (
                recentJobs.map((job, index) => (
                  <div key={job._id || index} className="p-4 sm:p-5 hover:bg-gray-50 transition-all duration-300 group cursor-pointer animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 text-sm sm:text-base group-hover:text-black transition-colors">
                          {job.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{job.location}</p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className="text-[10px] sm:text-xs px-2 py-1 bg-gray-100 rounded-full">{job.employmentType}</span>
                          <span className="text-[10px] sm:text-xs px-2 py-1 bg-gray-100 rounded-full">{job.salary}</span>
                        </div>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        !job.isExpired && job.status !== "closed" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}>
                        {!job.isExpired && job.status !== "closed" ? "Active" : "Closed"}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No jobs posted yet</p>
                  <button
                    onClick={() => navigate("/company/postjob")}
                    className="mt-3 text-blue-600 hover:underline text-sm"
                  >
                    Post your first job →
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Applications */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden">
            <div className="p-4 sm:p-5 md:p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <span>📬</span> Recent Applications
                </h2>
                <button
                  onClick={() => navigate("/company/applications")}
                  className="text-xs sm:text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  View All →
                </button>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {recentApplications.length > 0 ? (
                recentApplications.map((app, index) => {
                  const statusColors = {
                    pending: "bg-yellow-100 text-yellow-600",
                    reviewed: "bg-blue-100 text-blue-600",
                    shortlisted: "bg-green-100 text-green-600",
                    rejected: "bg-red-100 text-red-600",
                    accepted: "bg-purple-100 text-purple-600"
                  };
                  return (
                    <div key={app._id || index} className="p-4 sm:p-5 hover:bg-gray-50 transition-all duration-300 group cursor-pointer animate-fadeInUp" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800 text-sm sm:text-base">{app.name}</h3>
                          <p className="text-xs sm:text-sm text-gray-500 mt-1">
                            Applied for: {app.jobId?.title || "Job Title"}
                          </p>
                          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className={`text-[10px] sm:text-xs px-2 py-1 rounded-full ${statusColors[app.status] || "bg-gray-100 text-gray-600"}`}>
                          {app.status}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <p>No applications received yet</p>
                  <p className="text-xs mt-2">Post jobs to start receiving applications</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Company Insights Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8">
          <div className="text-center mb-5 sm:mb-6">
            <div className="inline-block p-3 bg-white rounded-full shadow-md mb-3">
              <span className="text-2xl sm:text-3xl">📈</span>
            </div>
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2">
              Hiring Insights
            </h3>
            <p className="text-gray-600 text-xs sm:text-sm max-w-2xl mx-auto">
              Tips to improve your hiring process and attract the best talent
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Clear Job Descriptions</h4>
              <p className="text-xs text-gray-500">Detailed job posts get 40% more qualified applications</p>
            </div>
            <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">⚡</div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Quick Response Time</h4>
              <p className="text-xs text-gray-500">Respond to applications within 48 hours for best results</p>
            </div>
            <div className="bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group">
              <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">💼</div>
              <h4 className="font-semibold text-gray-800 text-sm mb-1">Competitive Benefits</h4>
              <p className="text-xs text-gray-500">Highlight unique perks to stand out from competitors</p>
            </div>
          </div>
        </div>

        
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
            transform: translateY(15px);
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
          animation: fadeInUp 0.4s ease-out forwards;
          opacity: 0;
        }
      `}</style>
      <Footer/>
    </div>
    
  );
};

export default CompanyDashboard;