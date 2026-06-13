import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";


const PostJob = () => {
  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    title: "", company: "", category: "",
    location: "", workMode: "", employmentType: "",
    experience: "", salary: "", skills: "",
    description: "", expiryDays: "30"
  });

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("skillmatch_token");
      await api.post(
        "/api/jobs/post",
        formdata,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Job Posted Successfully! 🎉", { position: "top-center" });
      navigate("/company/myjobs");
    } catch (error) {
      toast.error(
        error.response?.data?.msg || "Failed to post job",
        { position: "top-center" }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-6">
            <h2 className="text-2xl font-bold text-white mb-1">Post a New Job</h2>
            <p className="text-gray-300 text-sm">Fill in the details to find the right candidate</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8">
            <div className="grid md:grid-cols-2 gap-6">

              {/* Job Title */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input type="text" name="title"
                  placeholder="Frontend Developer"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Company */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Company Name <span className="text-red-500">*</span>
                </label>
                <input type="text" name="company"
                  placeholder="Your Company"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Category <span className="text-red-500">*</span>
                </label>
                <select name="category" onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  required>
                  <option value="">Select Category</option>
                  <option value="IT">IT</option>
                  <option value="Banking">Banking</option>
                  <option value="Government">Government</option>
                  <option value="Design">Design</option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Education">Education</option>
                  <option value="Sales">Sales</option>
                </select>
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">
                  Location <span className="text-red-500">*</span>
                </label>
                <input type="text" name="location"
                  placeholder="Chennai, Tamil Nadu"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              {/* Work Mode */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Work Mode</label>
                <select name="workMode" onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Select</option>
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Employment Type</label>
                <select name="employmentType" onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none bg-white">
                  <option value="">Select</option>
                  <option value="Full Time">Full Time</option>
                  <option value="Part Time">Part Time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>

              {/* Experience */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Experience</label>
                <input type="text" name="experience"
                  placeholder="0 - 2 Years"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Salary */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">Salary</label>
                <input type="text" name="salary"
                  placeholder="₹4 - ₹8 LPA"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* ✅ Expiry Days - Full width */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  ⏳ Job Listing Duration
                </label>

                {/* Quick select buttons */}
                <div className="grid grid-cols-4 gap-3 mb-3">
                  {[
                    { days: "7", label: "7 Days", sub: "1 week" },
                    { days: "15", label: "15 Days", sub: "2 weeks" },
                    { days: "30", label: "30 Days", sub: "1 month" },
                    { days: "60", label: "60 Days", sub: "2 months" },
                  ].map(({ days, label, sub }) => (
                    <button
                      key={days}
                      type="button"
                      onClick={() => setFormdata(prev => ({ ...prev, expiryDays: days }))}
                      className={`p-3 rounded-xl border-2 text-center transition-all ${
                        formdata.expiryDays === days
                          ? "border-black bg-black text-white"
                          : "border-gray-200 hover:border-gray-400 text-gray-700"
                      }`}
                    >
                      <p className="font-bold text-sm">{label}</p>
                      <p className={`text-xs mt-0.5 ${formdata.expiryDays === days ? "text-gray-300" : "text-gray-400"}`}>
                        {sub}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Custom days input */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-500">Or custom:</span>
                  <input
                    type="number"
                    name="expiryDays"
                    value={formdata.expiryDays}
                    onChange={handleChange}
                    min="1"
                    max="365"
                    className="w-28 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                  <span className="text-sm text-gray-500">days</span>
                </div>

                {/* Expiry date preview */}
                {formdata.expiryDays && (
                  <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl mt-2">
                    <span>📅</span>
                    <p className="text-sm text-amber-700">
                      This job will expire on{" "}
                      <span className="font-bold">
                        {(() => {
                          const d = new Date();
                          d.setDate(d.getDate() + parseInt(formdata.expiryDays));
                          return d.toLocaleDateString("en-IN", {
                            day: "numeric", month: "long", year: "numeric"
                          });
                        })()}
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Skills */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">
                  Skills (comma separated)
                </label>
                <input type="text" name="skills"
                  placeholder="React, Node.js, MongoDB"
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              {/* Description */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-semibold text-gray-700">Job Description</label>
                <textarea name="description"
                  placeholder="Describe the role, responsibilities..."
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2">
                <button type="submit"
                  className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all flex items-center justify-center gap-2">
                  🚀 Post Job
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJob;