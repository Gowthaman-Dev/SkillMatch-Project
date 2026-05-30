import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const BASE_URL = "http://localhost:5000";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("skillmatch_token");
        const res = await api.get(
          "/api/applications/all-applications",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        console.log("Applications data:", res.data.applications);
        console.log("First app candidateId:", res.data.applications[0]?.candidateId);

        setApplications(res.data.applications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const handleStatusChange = async (appId, status) => {
    try {
      const token = localStorage.getItem("skillmatch_token");
      await api.put(
        `/api/applications/status/${appId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setApplications(prev =>
        prev.map(app => app._id === appId ? { ...app, status } : app)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleViewProfile = (app) => {
    // candidateId object or string check
    const candidateUserId = app.candidateId?._id || app.candidateId;
    console.log("Navigating to candidate profile:", candidateUserId);
    if (candidateUserId) {
      navigate(`/candidate-profile/${candidateUserId}`);
    } else {
      alert("Candidate profile ID not found");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Applications</h1>
          <p className="text-gray-500 mt-1">
            Candidates who applied to your jobs
          </p>
          <span className="inline-block mt-3 bg-black text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {applications.length} Total Applications
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow text-center">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-gray-500 text-lg">No applications yet.</p>
            <p className="text-gray-400 text-sm mt-2">
              Applications will appear here when candidates apply to your jobs.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {applications.map((app) => (
              <div
                key={app._id}
                className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100"
              >
                <div className="flex flex-col md:flex-row justify-between gap-6">

                  {/* LEFT - Candidate Info */}
                  <div className="flex-1">

                    {/* Name + Job Title */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white font-bold text-lg shadow flex-shrink-0">
                        {app.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-800 text-lg">{app.name}</h3>
                        <p className="text-xs text-gray-500">
                          Applied for:{" "}
                          <span className="font-semibold text-gray-700">
                            {app.jobId?.title}
                          </span>{" "}
                          • {app.jobId?.company}
                        </p>
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm mb-4">
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-400">📧 Email</p>
                        <p className="text-gray-700 font-medium truncate">{app.email}</p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-400">📱 Phone</p>
                        <p className="text-gray-700 font-medium">{app.phone}</p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-400">💼 Experience</p>
                        <p className="text-gray-700 font-medium">
                          {app.experience || "N/A"} yrs
                        </p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-400">💰 Expected Salary</p>
                        <p className="text-gray-700 font-medium">
                          {app.expectedSalary || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-400">🎓 Education</p>
                        <p className="text-gray-700 font-medium truncate">
                          {app.education || "N/A"}
                        </p>
                      </div>
                      <div className="bg-gray-50 px-3 py-2 rounded-lg">
                        <p className="text-xs text-gray-400">⏰ Availability</p>
                        <p className="text-gray-700 font-medium">
                          {app.availability || "N/A"}
                        </p>
                      </div>
                    </div>

                    {/* Skills */}
                    {app.skills && (
                      <div className="mb-4">
                        <p className="text-xs text-gray-400 mb-2">🛠️ Skills</p>
                        <div className="flex flex-wrap gap-2">
                          {app.skills.split(",").map((skill, i) => (
                            <span key={i}
                              className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                              {skill.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Cover Letter */}
                    {app.coverLetter && (
                      <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
                        <p className="text-xs text-blue-500 font-medium mb-1">
                          📝 Cover Letter
                        </p>
                        <p className="text-sm text-gray-600 italic leading-relaxed">
                          "{app.coverLetter.length > 150
                            ? app.coverLetter.substring(0, 150) + "..."
                            : app.coverLetter}"
                        </p>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3 mt-2">

                      {/* Resume Download */}
                      {app.resumePath && (
                        <a
                          href={`${BASE_URL}/${app.resumePath.replace(/\\/g, "/")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-medium hover:bg-blue-100 transition flex items-center gap-2 border border-blue-100"
                        >
                          📄 Download Resume
                        </a>
                      )}

                      {/* ✅ View Profile Button */}
                      <button
                        onClick={() => handleViewProfile(app)}
                        className="px-4 py-2 bg-black text-white rounded-xl text-sm font-medium hover:bg-gray-800 transition flex items-center gap-2"
                      >
                        👤 View Profile
                      </button>

                    </div>
                  </div>

                  {/* RIGHT - Status */}
                  <div className="flex flex-col items-end justify-between gap-4 min-w-[150px]">

                    {/* Applied Date */}
                    <p className="text-xs text-gray-400">
                      📅 {new Date(app.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>

                    {/* Status Badge */}
                    <div className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      app.status === "pending"
                        ? "bg-yellow-50 text-yellow-600 border border-yellow-200"
                        : app.status === "reviewed"
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "bg-red-50 text-red-600 border border-red-200"
                    }`}>
                      {app.status === "pending" ? "⏳ Pending"
                        : app.status === "reviewed" ? "✅ Reviewed"
                        : "❌ Rejected"}
                    </div>

                    {/* Status Update Dropdown */}
                    <div className="w-full">
                      <p className="text-xs text-gray-400 mb-1 text-center">
                        Update Status
                      </p>
                      <select
                        value={app.status}
                        onChange={(e) => handleStatusChange(app._id, e.target.value)}
                        className={`px-3 py-2 rounded-xl text-sm font-medium border outline-none cursor-pointer w-full ${
                          app.status === "pending"
                            ? "bg-yellow-50 text-yellow-600 border-yellow-200"
                            : app.status === "reviewed"
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : "bg-red-50 text-red-600 border-red-200"
                        }`}
                      >
                        <option value="pending">⏳ Pending</option>
                        <option value="reviewed">✅ Reviewed</option>
                        <option value="rejected">❌ Rejected</option>
                      </select>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Applications;