import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await api.get(`/api/jobs/single/${id}`)
        setJob(res.data.job)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchJob()
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!job) return (
    <div className="text-center mt-20 text-xl font-medium">
      Job Not Found
    </div>
  )

  return (
    <section className="min-h-screen bg-gray-50 py-20 px-6">
      <div className="max-w-5xl mx-auto bg-white p-10 rounded-3xl shadow-lg">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-700 font-bold text-xl">
            {job.company?.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{job.title}</h1>
            <p className="text-gray-500">{job.company}</p>
            <p className="text-sm text-gray-400 mt-1">
              📍 {job.location} • {job.workMode}
            </p>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 text-sm bg-gray-50 p-6 rounded-xl">
          <p><strong>Experience:</strong> {job.experience}</p>
          <p><strong>Salary:</strong> {job.salary}</p>
          <p><strong>Employment:</strong> {job.employmentType}</p>
          <p><strong>Location:</strong> {job.location}</p>
          <p><strong>Work Mode:</strong> {job.workMode}</p>
          <p><strong>Category:</strong> {job.category}</p>
        </div>

        {/* Description */}
        {job.description && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>
            <p className="text-gray-600 leading-relaxed">{job.description}</p>
          </div>
        )}

        {/* Skills */}
        {job.skills && job.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Skills Required</h2>
            <div className="flex flex-wrap gap-3">
              {job.skills.map((skill, index) => (
                <span key={index}
                  className="bg-gray-100 px-4 py-2 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Apply Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => navigate(`/apply/${job._id}`)}
            className="px-8 py-3 bg-black text-white rounded-xl text-sm hover:bg-gray-800 transition"
          >
            Apply Now
          </button>
        </div>

      </div>
    </section>
  )
}

export default JobDetails