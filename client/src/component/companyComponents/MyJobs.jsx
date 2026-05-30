import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [repostModal, setRepostModal] = useState(null);
  const [repostDays, setRepostDays] = useState("30");
  const navigate = useNavigate();

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("skillmatch_token");
      const res = await api.get(
        "/api/jobs/myjobs",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMyJobs(res.data.jobs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchMyJobs(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;
    try {
      const token = localStorage.getItem("skillmatch_token");
      await api.delete(
        `/api/jobs/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Job deleted");
      fetchMyJobs();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  // ✅ Repost job
  const handleRepost = async () => {
    try {
      const token = localStorage.getItem("skillmatch_token");
      await api.put(
        `/api/jobs/repost/${repostModal}`,
        { expiryDays: repostDays },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Job reposted successfully! 🎉", { position: "top-center" });
      setRepostModal(null);
      fetchMyJobs();
    } catch (error) {
      toast.error("Failed to repost");
    }
  };

  // Days remaining helper
  const getDaysRemaining = (expiresAt) => {
    if (!expiresAt) return null;
    const now = new Date();
    const exp = new Date(expiresAt);
    const diff = Math.ceil((exp - now) / (1000 * 60 * 60 * 24));
    return diff;
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  const activeJobs = myJobs.filter(j => !j.isExpired);
  const expiredJobs = myJobs.filter(j => j.isExpired);

  return (
    <section className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Posted Jobs</h1>
            <p className="text-gray-500 mt-1">
              <span className="text-green-600 font-semibold">{activeJobs.length} Active</span>
              {expiredJobs.length > 0 && (
                <span className="text-red-500 font-semibold ml-3">{expiredJobs.length} Expired</span>
              )}
            </p>
          </div>
          <button
            onClick={() => navigate("/company/postjob")}
            className="px-5 py-2.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition flex items-center gap-2"
          >
            + Post New Job
          </button>
        </div>

        {myJobs.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow text-center">
            <div className="text-5xl mb-4">📋</div>
            <p className="text-gray-500 text-lg mb-4">No jobs posted yet.</p>
            <button onClick={() => navigate("/company/postjob")}
              className="px-6 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition">
              Post Your First Job
            </button>
          </div>
        ) : (
          <div className="space-y-4">

            {/* Active Jobs */}
            {activeJobs.map((job) => {
              const daysLeft = getDaysRemaining(job.expiresAt);
              const isUrgent = daysLeft !== null && daysLeft <= 3;

              return (
                <div key={job._id}
                  className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition border border-gray-100">
                  <div className="flex flex-col md:flex-row justify-between gap-4">

                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap mb-2">
                        <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>

                        {/* ✅ Active Badge */}
                        <span className="px-2.5 py-1 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold">
                          ✅ Active
                        </span>

                        {/* Urgent warning */}
                        {isUrgent && (
                          <span className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-bold animate-pulse">
                            🔥 Expiring Soon!
                          </span>
                        )}
                      </div>

                      <p className="text-gray-500 mb-3">{job.company} • {job.location}</p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        {job.category && (
                          <span className="text-xs px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">
                            {job.category}
                          </span>
                        )}
                        {job.employmentType && (
                          <span className="text-xs px-3 py-1 bg-gray-100 text-gray-600 rounded-full font-medium">
                            {job.employmentType}
                          </span>
                        )}
                        {job.salary && (
                          <span className="text-xs px-3 py-1 bg-green-50 text-green-600 rounded-full font-medium">
                            💰 {job.salary}
                          </span>
                        )}
                      </div>

                      {/* ✅ Expiry info */}
                      <div className={`flex items-center gap-2 p-2.5 rounded-xl text-sm ${
                        isUrgent ? "bg-red-50 border border-red-100" : "bg-amber-50 border border-amber-100"
                      }`}>
                        <span>⏳</span>
                        <span className={isUrgent ? "text-red-600 font-semibold" : "text-amber-700"}>
                          {daysLeft !== null ? (
                            daysLeft <= 0
                              ? "Expired today"
                              : `${daysLeft} day${daysLeft > 1 ? 's' : ''} remaining`
                          ) : "No expiry set"}
                          {job.expiresAt && (
                            <span className="text-gray-400 font-normal ml-2">
                              (Expires: {new Date(job.expiresAt).toLocaleDateString("en-IN", {
                                day: "numeric", month: "short", year: "numeric"
                              })})
                            </span>
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex md:flex-col gap-2 items-start md:items-end justify-end">
                      <button
                        onClick={() => setRepostModal(job._id)}
                        className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold hover:bg-blue-100 transition border border-blue-100"
                      >
                        🔄 Extend
                      </button>
                      <button
                        onClick={() => handleDelete(job._id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition border border-red-100"
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Expired Jobs */}
            {expiredJobs.length > 0 && (
              <>
                <div className="flex items-center gap-3 my-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-sm text-gray-400 font-medium px-3">
                    🕐 Expired Jobs ({expiredJobs.length})
                  </span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                {expiredJobs.map((job) => (
                  <div key={job._id}
                    className="bg-white p-6 rounded-2xl border border-gray-100 opacity-75">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 flex-wrap mb-2">
                          <h3 className="text-xl font-bold text-gray-600">{job.title}</h3>
                          {/* ✅ Expired Badge */}
                          <span className="px-2.5 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-bold">
                            ❌ Expired
                          </span>
                        </div>
                        <p className="text-gray-400 mb-2">{job.company} • {job.location}</p>
                        <p className="text-xs text-gray-400">
                          Expired on: {new Date(job.expiresAt).toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric"
                          })}
                        </p>
                      </div>

                      <div className="flex md:flex-col gap-2 items-start md:items-end justify-end">
                        <button
                          onClick={() => setRepostModal(job._id)}
                          className="px-4 py-2 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition"
                        >
                          🚀 Repost Job
                        </button>
                        <button
                          onClick={() => handleDelete(job._id)}
                          className="px-4 py-2 bg-red-50 text-red-600 rounded-xl text-sm font-semibold hover:bg-red-100 transition border border-red-100"
                        >
                          🗑 Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* ✅ Repost Modal */}
      {repostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setRepostModal(null)} />
          <div className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl z-10">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              🔄 Extend / Repost Job
            </h3>
            <p className="text-gray-500 text-sm mb-6">
              Select how many days to keep this job active
            </p>

            {/* Quick select */}
            <div className="grid grid-cols-4 gap-3 mb-6">
              {[
                { days: "7", label: "7 Days" },
                { days: "15", label: "15 Days" },
                { days: "30", label: "30 Days" },
                { days: "60", label: "60 Days" },
              ].map(({ days, label }) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setRepostDays(days)}
                  className={`py-3 rounded-xl border-2 text-sm font-bold transition ${
                    repostDays === days
                      ? "border-black bg-black text-white"
                      : "border-gray-200 text-gray-600 hover:border-gray-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Custom input */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-sm text-gray-500">Custom:</span>
              <input
                type="number" value={repostDays}
                onChange={(e) => setRepostDays(e.target.value)}
                min="1" max="365"
                className="w-24 px-3 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-black"
              />
              <span className="text-sm text-gray-500">days</span>
            </div>

            {/* Preview */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-6">
              <p className="text-sm text-amber-700">
                📅 New expiry:{" "}
                <span className="font-bold">
                  {(() => {
                    const d = new Date();
                    d.setDate(d.getDate() + parseInt(repostDays || 30));
                    return d.toLocaleDateString("en-IN", {
                      day: "numeric", month: "long", year: "numeric"
                    });
                  })()}
                </span>
              </p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setRepostModal(null)}
                className="flex-1 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
                Cancel
              </button>
              <button onClick={handleRepost}
                className="flex-1 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition">
                🚀 Confirm Repost
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MyJobs;