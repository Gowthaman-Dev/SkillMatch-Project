import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const CandidateProfile = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("skillmatch_token");
        const res = await api.get(
          `/api/profile/candidate/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProfile(res.data.profile);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  const getPhotoUrl = (path) =>
    path ? `${BASE_URL}/${path.replace(/\\/g, "/")}` : null;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-12 rounded-2xl shadow text-center">
        <div className="text-5xl mb-4">😕</div>
        <p className="text-gray-500 text-lg mb-4">Profile not found</p>
        <p className="text-gray-400 text-sm mb-6">
          This candidate hasn't set up their profile yet.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-black text-white rounded-xl"
        >
          ← Go Back
        </button>
      </div>
    </div>
  );

  const skillsArray = profile.skills
    ? profile.skills.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== BANNER ===== */}
      <div
        className="h-48 w-full relative overflow-hidden"
        style={{
          background: profile.bannerImage
            ? `url(${getPhotoUrl(profile.bannerImage)}) center/cover no-repeat`
            : `linear-gradient(135deg, ${profile.bannerColor || "#1a1a2e"}, ${profile.bannerColor || "#1a1a2e"}99)`,
        }}
      >
        {profile.bannerImage && (
          <div className="absolute inset-0 bg-black/20" />
        )}
      </div>

      {/* ===== PROFILE PHOTO + NAME ===== */}
      <div className="bg-white px-8 pt-0 pb-6 shadow-sm relative">
        <div className="absolute -top-16 left-8">
          <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
            {profile.profilePhoto ? (
              <img
                src={getPhotoUrl(profile.profilePhoto)}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                <span className="text-4xl font-bold text-white">
                  {profile.username?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="pt-16 max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {profile.username}
              </h1>
              <p className="text-gray-500 mt-1">
                {profile.jobTitle || "No job title added"}
              </p>
              <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
                {profile.location && <span>📍 {profile.location}</span>}
                {profile.experience && <span>💼 {profile.experience}</span>}
                {profile.workMode && <span>🖥️ {profile.workMode}</span>}
                {profile.availability && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    ⚡ {profile.availability}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl text-sm hover:bg-gray-200 transition flex items-center gap-2"
            >
              ← Back
            </button>
          </div>

          {/* Bio */}
          {profile.bio && (
            <p className="text-gray-600 text-sm mt-4 leading-relaxed max-w-2xl">
              {profile.bio}
            </p>
          )}

          {/* Skills Pills */}
          {skillsArray.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {skillsArray.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== MAIN DETAILS ===== */}
      <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">

        {/* LEFT SIDEBAR */}
        <div className="space-y-4">

          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-4">📞 Contact Info</h3>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-400">📧 Email</p>
                <p className="text-sm text-gray-700 mt-0.5">{profile.email}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400">📱 Phone</p>
                <p className="text-sm text-gray-700 mt-0.5">
                  {profile.number || <span className="text-gray-400 italic">Not added</span>}
                </p>
              </div>
              {profile.location && (
                <div>
                  <p className="text-xs text-gray-400">📍 Location</p>
                  <p className="text-sm text-gray-700 mt-0.5">{profile.location}</p>
                </div>
              )}
            </div>
          </div>

          {/* Social Links */}
          {(profile.linkedin || profile.github || profile.portfolio) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">🔗 Social Links</h3>
              <div className="space-y-3">
                {profile.linkedin && (
                  <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    💼 LinkedIn
                  </a>
                )}
                {profile.github && (
                  <a href={profile.github} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    🐙 GitHub
                  </a>
                )}
                {profile.portfolio && (
                  <a href={profile.portfolio} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                    🌐 Portfolio
                  </a>
                )}
              </div>
            </div>
          )}

        </div>

        {/* RIGHT MAIN */}
        <div className="md:col-span-2 space-y-5">

          {/* Professional */}
          {(profile.jobTitle || profile.company || profile.experience) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">💼 Professional Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { label: "Job Title", value: profile.jobTitle },
                  { label: "Current Company", value: profile.company },
                  { label: "Experience", value: profile.experience },
                  { label: "Expected Salary", value: profile.expectedSalary },
                  { label: "Work Mode", value: profile.workMode },
                  { label: "Availability", value: profile.availability },
                ].map(({ label, value }) =>
                  value ? (
                    <div key={label} className="bg-gray-50 px-4 py-3 rounded-xl">
                      <p className="text-xs text-gray-400">{label}</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{value}</p>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Education */}
          {profile.degree && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-4">🎓 Education</h3>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  🎓
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {profile.degree}
                    {profile.specialization && ` - ${profile.specialization}`}
                  </p>
                  <p className="text-sm text-gray-600">{profile.college}</p>
                  {profile.graduationYear && (
                    <p className="text-xs text-gray-400 mt-0.5">
                      Graduated: {profile.graduationYear}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Skills, Languages, Certifications */}
          {(profile.skills || profile.languages || profile.certifications) && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-5">🛠️ Skills & Expertise</h3>

              {profile.skills && (
                <div className="mb-5">
                  <p className="text-xs text-gray-400 font-medium mb-2">Technical Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.split(",").map((s, i) => (
                      <span key={i}
                        className="px-3 py-1.5 bg-black text-white rounded-full text-xs font-medium">
                        {s.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.languages && (
                <div className="mb-5">
                  <p className="text-xs text-gray-400 font-medium mb-2">Languages</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.languages.split(",").map((l, i) => (
                      <span key={i}
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {l.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {profile.certifications && (
                <div>
                  <p className="text-xs text-gray-400 font-medium mb-2">Certifications</p>
                  <div className="flex flex-wrap gap-2">
                    {profile.certifications.split(",").map((c, i) => (
                      <span key={i}
                        className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium border border-yellow-200">
                        🏆 {c.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;