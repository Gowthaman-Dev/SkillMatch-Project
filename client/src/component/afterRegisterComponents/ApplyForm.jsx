import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../api/axios";

const ApplyForm = () => {
  const { id } = useParams();  // job._id
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    experience: "", skills: "", education: "",
    currentCompany: "", expectedSalary: "",
    availability: "", coverLetter: ""
  });

  // Job details fetch பண்ணுங்க
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0])
  }
  // handleSubmit-ல success part மட்டும் இப்படி மாத்துங்க:

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!resumeFile) {
      toast.error('Please upload your resume', { position: 'top-center' })
      return
    }

    setSubmitting(true)

    try {
      const token = localStorage.getItem('skillmatch_token')

      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('experience', formData.experience)
      data.append('skills', formData.skills)
      data.append('education', formData.education)
      data.append('currentCompany', formData.currentCompany)
      data.append('expectedSalary', formData.expectedSalary)
      data.append('availability', formData.availability)
      data.append('coverLetter', formData.coverLetter)
      data.append('resume', resumeFile)

      await api.post(
        `/api/applications/apply/${id}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      // handleSubmit success part-ல இப்படி மாத்துங்க:

      // ✅ _id use பண்ணுங்க, id இல்லை
      const storedApplied = JSON.parse(localStorage.getItem("appliedJobs")) || []
      const alreadyInLocal = storedApplied.find(item => item.id === id)
      if (!alreadyInLocal) {
        storedApplied.push({ id: id })  // id = useParams() from URL = job._id
        localStorage.setItem("appliedJobs", JSON.stringify(storedApplied))
      }
      toast.success('Application submitted! 🎉', { position: 'top-center' })
      navigate('/applied')

    } catch (error) {
      toast.error(
        error.response?.data?.msg || 'Application failed',
        { position: 'top-center' }
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (!job) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-12 rounded-2xl shadow text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Job Not Found</h3>
        <button onClick={() => navigate('/jobsapply')}
          className="px-6 py-3 bg-black text-white rounded-xl mt-4">
          Back to Jobs
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-5xl mx-auto">

        {/* Job Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
              <p className="text-gray-600 text-lg">{job.company}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-sm font-semibold">
                {job.employmentType}
              </span>
              <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl text-sm font-semibold">
                {job.salary}
              </span>
            </div>
          </div>
        </div>

        {/* Application Form */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-1">Application Form</h2>
            <p className="text-gray-300 text-sm">Fill your details carefully before submitting</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Full Name */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="name"
                  placeholder="John Doe"
                  onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input type="email" name="email"
                  placeholder="john@example.com"
                  onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input type="tel" name="phone"
                  placeholder="+91 98765 43210"
                  onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Experience (Years) <span className="text-red-500">*</span>
                </label>
                <input type="number" name="experience"
                  placeholder="2" min="0" step="0.5"
                  onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Skills */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Skills (comma separated)</label>
                <input type="text" name="skills"
                  placeholder="React, Node.js, MongoDB"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Education */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Highest Qualification</label>
                <input type="text" name="education"
                  placeholder="B.Tech Computer Science"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Current Company */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Current Company</label>
                <input type="text" name="currentCompany"
                  placeholder="Tech Corp"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Expected Salary */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Expected Salary</label>
                <input type="text" name="expectedSalary"
                  placeholder="₹8 - ₹12 LPA"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Availability <span className="text-red-500">*</span>
                </label>
                <select name="availability" onChange={handleChange} required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                >
                  <option value="">Select</option>
                  <option value="Immediate">Immediate</option>
                  <option value="15 Days">15 Days</option>
                  <option value="1 Month">1 Month</option>
                </select>
              </div>

              {/* Cover Letter */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Cover Letter</label>
                <textarea name="coverLetter" rows="4"
                  placeholder="Tell us why you're the perfect candidate..."
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Upload Resume <span className="text-red-500">*</span>
                </label>
                <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-blue-400 transition-colors group">
                  <input type="file" name="resume"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    {resumeFile ? (
                      <p className="text-sm text-green-600 font-semibold mt-2">
                        ✅ {resumeFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="md:col-span-2 mt-4">
                <button type="submit" disabled={submitting}
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 rounded-xl font-semibold hover:from-gray-800 hover:to-gray-700 transition-all disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </>
                  ) : 'Submit Application'}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ApplyForm