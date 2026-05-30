// ❗ SAME IMPORTS
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const JobsApply = () => {
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobIds, setAppliedJobIds] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["All", "IT", "Banking", "Government", "Design"];

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/api/jobs/all");
        setJobs(res.data.jobs);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("skillmatch_token");
        if (!token) return;

        const res = await api.get(
          "/api/applications/my-applications",
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const ids = res.data.applications.map(
          (app) => app.jobId?._id || app.jobId
        );

        setAppliedJobIds(ids.map((id) => id?.toString()));
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    const storedSaved =
      JSON.parse(localStorage.getItem("savedJobs")) || [];
    setSavedJobs(storedSaved.map((item) => item.id || item._id));
  }, []);

  const handleSave = (job) => {
    const existingSaved =
      JSON.parse(localStorage.getItem("savedJobs")) || [];

    const alreadySaved = existingSaved.find(
      (item) => item.id === job._id
    );

    if (!alreadySaved) {
      const updated = [...existingSaved, { ...job, id: job._id }];
      localStorage.setItem("savedJobs", JSON.stringify(updated));
      setSavedJobs(updated.map((item) => item.id));
    }
  };

  const handleApply = (job) => {
    navigate(`/job/${job._id}`);
  };

  const filteredJobs = jobs.filter((job) => {
    const matchCategory =
      activeCategory === "All" || job.category === activeCategory;

    const matchSearch =
      job.title?.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchSearch;
  });

  const isApplied = (id) => {
    return appliedJobIds.includes(id?.toString());
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin w-10 h-10 border-4 border-gray-300 border-t-black rounded-full"></div>
      </div>
    );

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-16 px-6">
      <div className="max-w-7xl mx-auto">

        {/* HERO */}
        <div className="text-center mb-14">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">
            Find Your Dream Job 🚀
          </h1>
          <p className="text-gray-600 text-lg">
            Discover opportunities that match your skills
          </p>
        </div>

        {/* SEARCH */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center bg-white/70 backdrop-blur-lg shadow-xl rounded-full px-6 py-3 w-full max-w-xl border border-gray-200">
            <span className="text-gray-400 mr-3 text-lg">🔍</span>
            <input
              type="text"
              placeholder="Search jobs, companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full outline-none bg-transparent text-sm"
            />
          </div>
        </div>

        {/* CATEGORY */}
        <div className="flex justify-center flex-wrap gap-3 mb-14">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-black text-white shadow-lg scale-105"
                  : "bg-white border hover:shadow-md hover:scale-105"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* JOB CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredJobs.map((job) => {
            const applied = isApplied(job._id);
            const saved = savedJobs.includes(job._id?.toString());

            return (
              <div
                key={job._id}
                className="bg-white/80 backdrop-blur-md p-6 rounded-3xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {job.title}
                  </h3>

                  <p className="text-sm text-gray-500 mb-4">
                    {job.company}
                  </p>

                  <div className="space-y-1 text-sm text-gray-600 mb-4">
                    <p>📍 {job.location}</p>
                    <p>💼 {job.experience}</p>
                    <p>💰 {job.salary}</p>
                  </div>

                  {/* SKILLS */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills?.slice(0, 3).map((s, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-200 px-3 py-1 rounded-full"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* BUTTONS */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => handleSave(job)}
                    className={`text-sm font-medium transition ${
                      saved
                        ? "text-green-600"
                        : "text-gray-500 hover:text-black"
                    }`}
                  >
                    {saved ? "✅ Saved" : "🔖 Save"}
                  </button>

                  <button
                    onClick={() => !applied && handleApply(job)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      applied
                        ? "bg-gray-300 cursor-not-allowed"
                        : "bg-black text-white hover:bg-gray-800 shadow-md"
                    }`}
                  >
                    {applied ? "Applied" : "Apply Now →"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobsApply;