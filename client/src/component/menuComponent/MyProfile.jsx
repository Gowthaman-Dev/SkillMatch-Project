import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";


const MyProfile = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const bannerInputRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [showColorPicker, setShowColorPicker] = useState(false);

  // Photo previews
  const [profilePreview, setProfilePreview] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);
  const [removePhoto, setRemovePhoto] = useState(false);
  const [removeBanner, setRemoveBanner] = useState(false);

  // Saved profile from DB
  const [profile, setProfile] = useState(null);
  const [bannerColor, setBannerColor] = useState("#1a1a2e");

  const [formData, setFormData] = useState({
    username: "", email: "", number: "", location: "", bio: "",
    jobTitle: "", company: "", experience: "", expectedSalary: "",
    availability: "", workMode: "",
    degree: "", college: "", graduationYear: "", specialization: "",
    skills: "", languages: "", certifications: "",
    linkedin: "", github: "", portfolio: ""
  });

  // localStorage user
  const localUser = JSON.parse(localStorage.getItem("reactproject")) || {};

  // ✅ Fetch profile from backend
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("skillmatch_token");
        const res = await api.get("/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (res.data.profile) {
          const p = res.data.profile;
          setProfile(p);
          setFormData({
            username: p.username || localUser.username || "",
            email: p.email || localUser.email || "",
            number: p.number || localUser.number || "",
            location: p.location || "",
            bio: p.bio || "",
            jobTitle: p.jobTitle || "",
            company: p.company || "",
            experience: p.experience || "",
            expectedSalary: p.expectedSalary || "",
            availability: p.availability || "",
            workMode: p.workMode || "",
            degree: p.degree || "",
            college: p.college || "",
            graduationYear: p.graduationYear || "",
            specialization: p.specialization || "",
            skills: p.skills || "",
            languages: p.languages || "",
            certifications: p.certifications || "",
            linkedin: p.linkedin || "",
            github: p.github || "",
            portfolio: p.portfolio || ""
          });
          if (p.bannerColor) setBannerColor(p.bannerColor);
        } else {
          setFormData(prev => ({
            ...prev,
            username: localUser.username || "",
            email: localUser.email || "",
            number: localUser.number || "",
          }));
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePhotoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast.error("Photo must be under 2MB");
      return;
    }
    setProfileFile(file);
    setRemovePhoto(false);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleBannerSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 3 * 1024 * 1024) {
      toast.error("Banner must be under 3MB");
      return;
    }
    setBannerFile(file);
    setRemoveBanner(false);
    setBannerPreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("skillmatch_token");

      const data = new FormData();

      Object.keys(formData).forEach(key => {
        data.append(key, formData[key] || "");
      });
      data.append("bannerColor", bannerColor);
      data.append("role", localUser.role || "");

      if (profileFile) data.append("profilePhoto", profileFile);
      if (bannerFile) data.append("bannerImage", bannerFile);
      if (removePhoto) data.append("removeProfilePhoto", "true");
      if (removeBanner) data.append("removeBannerImage", "true");

      const res = await api.post("/api/profile/save", data, {
        headers: {
          Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setProfile(res.data.profile);
      const updated = { ...localUser, username: formData.username };
      localStorage.setItem("reactproject", JSON.stringify(updated));

      setProfileFile(null);
      setBannerFile(null);
      setProfilePreview(null);
      setBannerPreview(null);
      setRemovePhoto(false);
      setRemoveBanner(false);

      setEditMode(false);
      toast.success("Profile saved! ✅", { position: "top-center" });

    } catch (error) {
      toast.error(error.response?.data?.msg || "Save failed", { position: "top-center" });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        username: profile.username || "",
        email: profile.email || "",
        number: profile.number || "",
        location: profile.location || "",
        bio: profile.bio || "",
        jobTitle: profile.jobTitle || "",
        company: profile.company || "",
        experience: profile.experience || "",
        expectedSalary: profile.expectedSalary || "",
        availability: profile.availability || "",
        workMode: profile.workMode || "",
        degree: profile.degree || "",
        college: profile.college || "",
        graduationYear: profile.graduationYear || "",
        specialization: profile.specialization || "",
        skills: profile.skills || "",
        languages: profile.languages || "",
        certifications: profile.certifications || "",
        linkedin: profile.linkedin || "",
        github: profile.github || "",
        portfolio: profile.portfolio || ""
      });
      setBannerColor(profile.bannerColor || "#1a1a2e");
    }
    setProfileFile(null);
    setBannerFile(null);
    setProfilePreview(null);
    setBannerPreview(null);
    setRemovePhoto(false);
    setRemoveBanner(false);
    setEditMode(false);
  };

  const getPhotoUrl = (path) => path ? `${BASE_URL}/${path.replace(/\\/g, '/')}` : null;

  const currentProfilePhoto = profilePreview ||
    (!removePhoto && profile?.profilePhoto ? getPhotoUrl(profile.profilePhoto) : null);

  const currentBannerImage = bannerPreview ||
    (!removeBanner && profile?.bannerImage ? getPhotoUrl(profile.bannerImage) : null);

  const skillsArray = formData.skills
    ? formData.skills.split(",").map(s => s.trim()).filter(Boolean)
    : [];

  const tabs = [
    { id: "personal", label: "👤 Personal" },
    { id: "professional", label: "💼 Professional" },
    { id: "education", label: "🎓 Education" },
    { id: "skills", label: "🛠️ Skills" },
    { id: "social", label: "🔗 Social" },
  ];

  const bannerColors = [
    "#1a1a2e", "#16213e", "#0f3460", "#533483",
    "#2d6a4f", "#1b4332", "#7b2d8b", "#c0392b",
    "#e67e22", "#2c3e50"
  ];

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== BANNER ===== */}
      <div className="relative">
        <div className="h-40 sm:h-48 md:h-56 w-full relative overflow-hidden"
          style={{
            background: currentBannerImage
              ? `url(${currentBannerImage}) center/cover no-repeat`
              : `linear-gradient(135deg, ${bannerColor}, ${bannerColor}99)`
          }}
        >
          {!currentBannerImage && (
            <div className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 0),
                                  radial-gradient(circle at 75% 75%, white 2px, transparent 0)`,
                backgroundSize: '50px 50px'
              }}
            />
          )}
          {currentBannerImage && <div className="absolute inset-0 bg-black/20" />}

          {/* Banner Edit Controls - Mobile Optimized */}
          {editMode && (
            <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4 flex flex-col gap-2 items-end">
              <button 
                onClick={() => bannerInputRef.current.click()}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 text-gray-800 rounded-lg text-xs sm:text-sm font-medium hover:bg-white transition shadow flex items-center gap-1 sm:gap-2"
              >
                <span className="text-sm sm:text-base">🖼️</span>
                <span className="hidden sm:inline">Upload Banner</span>
              </button>
              <input ref={bannerInputRef} type="file" accept="image/*"
                onChange={handleBannerSelect} className="hidden" />

              {currentBannerImage && (
                <button
                  onClick={() => { setBannerPreview(null); setBannerFile(null); setRemoveBanner(true); }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-red-500/90 text-white rounded-lg text-xs sm:text-sm hover:bg-red-600 transition shadow">
                  🗑️ Remove
                </button>
              )}

              {!currentBannerImage && (
                <div className="relative">
                  <button
                    onClick={() => setShowColorPicker(!showColorPicker)}
                    className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/90 text-gray-800 rounded-lg text-xs sm:text-sm hover:bg-white transition shadow flex items-center gap-2"
                  >
                    🎨 Colors
                  </button>
                  {showColorPicker && (
                    <div className="absolute bottom-full right-0 mb-2 p-2 bg-white rounded-xl shadow-lg flex flex-wrap gap-2 w-40 sm:w-48 z-10">
                      {bannerColors.map(color => (
                        <button
                          key={color}
                          onClick={() => {
                            setBannerColor(color);
                            setShowColorPicker(false);
                          }}
                          className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border-2 transition-all ${bannerColor === color ? 'border-black scale-110' : 'border-transparent'}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* ===== PROFILE PHOTO ===== */}
        <div className="absolute left-4 sm:left-6 md:left-8 bottom-0 translate-y-1/2">
          <div className="relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-gray-200">
              {currentProfilePhoto ? (
                <img src={currentProfilePhoto} alt="Profile"
                  className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                  <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                    {formData.username?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
              )}
            </div>

            {editMode && (
              <>
                <button 
                  onClick={() => fileInputRef.current.click()}
                  className="absolute inset-0 rounded-full bg-black/50 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition cursor-pointer"
                >
                  <span className="text-lg sm:text-xl md:text-2xl">📷</span>
                  <span className="text-[10px] sm:text-xs mt-1">Change</span>
                </button>
                <input ref={fileInputRef} type="file" accept="image/*"
                  onChange={handleProfilePhotoSelect} className="hidden" />
                {currentProfilePhoto && (
                  <button
                    onClick={() => { setProfilePreview(null); setProfileFile(null); setRemovePhoto(true); }}
                    className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 bg-red-500 text-white rounded-full text-xs sm:text-sm flex items-center justify-center shadow hover:bg-red-600">
                    ✕
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Action Buttons - Mobile Responsive */}
        <div className="absolute right-2 sm:right-4 md:right-6 bottom-0 translate-y-1/2 flex gap-2 sm:gap-3">
          {editMode ? (
            <>
              <button onClick={handleCancel}
                className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-gray-200 text-gray-700 rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-300 transition">
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-black text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-800 transition flex items-center gap-1 sm:gap-2 disabled:opacity-70">
                {saving ? (
                  <><div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Saving...</>
                ) : (
                  <>
                    <span>💾</span>
                    <span className="hidden sm:inline">Save</span>
                  </>
                )}
              </button>
            </>
          ) : (
            <button onClick={() => setEditMode(true)}
              className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 bg-black text-white rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-800 transition flex items-center gap-1 sm:gap-2">
              ✏️ <span className="hidden sm:inline">Edit Profile</span>
            </button>
          )}
        </div>
      </div>

      {/* ===== NAME + BIO ===== */}
      <div className="bg-white px-4 sm:px-6 md:px-8 pt-16 sm:pt-20 md:pt-24 pb-4 sm:pb-6 shadow-sm">
        <div className="max-w-5xl mx-auto">
          {editMode ? (
            <div className="grid md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-xs text-gray-400">Full Name</label>
                <input type="text" name="username" value={formData.username}
                  onChange={handleChange}
                  className="w-full text-xl sm:text-2xl font-bold border-b-2 border-gray-200 focus:border-black outline-none pb-1 mt-1"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Job Title</label>
                <input type="text" name="jobTitle" value={formData.jobTitle}
                  onChange={handleChange} placeholder="e.g., Frontend Developer"
                  className="w-full text-sm sm:text-base text-gray-500 border-b-2 border-gray-200 focus:border-black outline-none pb-1 mt-1"
                />
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 break-words">
                {profile?.username || localUser.username || "Your Name"}
              </h1>
              <p className="text-sm sm:text-base text-gray-500 mt-1">
                {profile?.jobTitle || "Add your job title"}
              </p>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-3 text-xs sm:text-sm text-gray-500">
                {profile?.location && <span>📍 {profile.location}</span>}
                {profile?.experience && <span>💼 {profile.experience}</span>}
                {profile?.availability && (
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    ⚡ {profile.availability}
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                  localUser.role === 'company'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-green-100 text-green-700'
                }`}>
                  {localUser.role === 'company' ? '🏢 Company' : '👤 Candidate'}
                </span>
              </div>
            </div>
          )}

          {/* Bio */}
          <div className="mt-3 sm:mt-4">
            {editMode ? (
              <textarea name="bio" value={formData.bio} onChange={handleChange}
                placeholder="Write a short bio..." rows="3"
                className="w-full border border-gray-200 rounded-xl p-2 sm:p-3 text-xs sm:text-sm focus:ring-2 focus:ring-black outline-none resize-none"
              />
            ) : (
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                {profile?.bio || "No bio added yet."}
              </p>
            )}
          </div>

          {/* Skills pills */}
          {!editMode && skillsArray.length > 0 && (
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4">
              {skillsArray.map((skill, i) => (
                <span key={i} className="px-2 sm:px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
          
          {/* LEFT SIDEBAR - Mobile Responsive */}
          <div className="space-y-3 sm:space-y-4 order-2 lg:order-1">
            
            {/* Contact */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Contact Info</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: "email", label: "Email", icon: "📧", type: "email" },
                  { name: "number", label: "Phone", icon: "📱", type: "tel" },
                  { name: "location", label: "Location", icon: "📍", type: "text", placeholder: "Chennai, India" },
                ].map(field => (
                  <div key={field.name}>
                    <p className="text-xs text-gray-400">{field.icon} {field.label}</p>
                    {editMode ? (
                      <input type={field.type} name={field.name}
                        value={formData[field.name]} onChange={handleChange}
                        placeholder={field.placeholder}
                        className="w-full border-b border-gray-200 focus:border-black outline-none text-xs sm:text-sm py-1 mt-0.5"
                      />
                    ) : (
                      <p className="text-xs sm:text-sm text-gray-700 mt-0.5 break-words">
                        {profile?.[field.name] || <span className="text-gray-400 italic">Not added</span>}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social */}
            <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm">
              <h3 className="font-semibold text-gray-800 mb-3 sm:mb-4 text-sm sm:text-base">Social Links</h3>
              <div className="space-y-3 sm:space-y-4">
                {[
                  { name: "linkedin", label: "LinkedIn", icon: "💼" },
                  { name: "github", label: "GitHub", icon: "🐙" },
                  { name: "portfolio", label: "Portfolio", icon: "🌐" },
                ].map(({ name, label, icon }) => (
                  <div key={name}>
                    <p className="text-xs text-gray-400">{icon} {label}</p>
                    {editMode ? (
                      <input type="url" name={name}
                        value={formData[name]} onChange={handleChange}
                        placeholder={`https://${name}.com/...`}
                        className="w-full border-b border-gray-200 focus:border-black outline-none text-xs sm:text-sm py-1 mt-0.5"
                      />
                    ) : (
                      profile?.[name] ? (
                        <a href={profile[name]} target="_blank" rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-blue-600 hover:underline truncate block mt-0.5 break-words">
                          {profile[name]}
                        </a>
                      ) : (
                        <p className="text-xs sm:text-sm text-gray-400 italic mt-0.5">Not added</p>
                      )
                    )}
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("reactproject");
                localStorage.removeItem("skillmatch_token");
                navigate("/login");
              }}
              className="w-full py-2.5 sm:py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition text-xs sm:text-sm">
              🚪 Logout
            </button>
          </div>

          {/* RIGHT - TABS */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
              {/* Horizontal Scroll Tabs for Mobile */}
              <div className="overflow-x-auto border-b border-gray-100">
                <div className="flex min-w-max">
                  {tabs.map(tab => (
                    <button 
                      key={tab.id} 
                      onClick={() => setActiveTab(tab.id)}
                      className={`px-3 sm:px-4 md:px-5 py-3 sm:py-4 text-xs sm:text-sm font-medium whitespace-nowrap transition ${
                        activeTab === tab.id
                          ? 'border-b-2 border-black text-black'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}>
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">

                {/* PERSONAL */}
                {activeTab === "personal" && (
                  <div className="space-y-4 sm:space-y-5">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Personal Information</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      {[
                        { name: "username", label: "Full Name", type: "text", placeholder: "John Doe" },
                        { name: "location", label: "Location", type: "text", placeholder: "Chennai, India" },
                        { name: "email", label: "Email", type: "email", placeholder: "john@email.com" },
                        { name: "number", label: "Phone", type: "tel", placeholder: "+91 98765 43210" },
                      ].map(field => (
                        <div key={field.name}>
                          <label className="text-xs sm:text-sm font-medium text-gray-600">{field.label}</label>
                          {editMode ? (
                            <input type={field.type} name={field.name}
                              value={formData[field.name]} onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800 text-xs sm:text-sm break-words">
                              {profile?.[field.name] || <span className="text-gray-400 italic">Not added</span>}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-600">Bio</label>
                      {editMode ? (
                        <textarea name="bio" value={formData.bio} onChange={handleChange}
                          placeholder="Write about yourself..." rows="4"
                          className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none resize-none text-xs sm:text-sm"
                        />
                      ) : (
                        <p className="mt-1 text-gray-700 text-xs sm:text-sm leading-relaxed">
                          {profile?.bio || <span className="text-gray-400 italic">No bio added</span>}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* PROFESSIONAL */}
                {activeTab === "professional" && (
                  <div className="space-y-4 sm:space-y-5">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Professional Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      {[
                        { name: "jobTitle", label: "Job Title", placeholder: "Frontend Developer" },
                        { name: "company", label: "Current Company", placeholder: "Tech Corp" },
                        { name: "experience", label: "Experience", placeholder: "2 Years" },
                        { name: "expectedSalary", label: "Expected Salary", placeholder: "₹8 - ₹12 LPA" },
                      ].map(field => (
                        <div key={field.name}>
                          <label className="text-xs sm:text-sm font-medium text-gray-600">{field.label}</label>
                          {editMode ? (
                            <input type="text" name={field.name}
                              value={formData[field.name]} onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800 text-xs sm:text-sm">
                              {profile?.[field.name] || <span className="text-gray-400 italic">Not added</span>}
                            </p>
                          )}
                        </div>
                      ))}

                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">Availability</label>
                        {editMode ? (
                          <select name="availability" value={formData.availability} onChange={handleChange}
                            className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm bg-white">
                            <option value="">Select</option>
                            <option>Immediate</option>
                            <option>15 Days</option>
                            <option>1 Month</option>
                            <option>Not Looking</option>
                          </select>
                        ) : (
                          <p className="mt-1 text-gray-800 text-xs sm:text-sm">
                            {profile?.availability || <span className="text-gray-400 italic">Not added</span>}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">Work Mode</label>
                        {editMode ? (
                          <select name="workMode" value={formData.workMode} onChange={handleChange}
                            className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm bg-white">
                            <option value="">Select</option>
                            <option>Remote</option>
                            <option>On-site</option>
                            <option>Hybrid</option>
                          </select>
                        ) : (
                          <p className="mt-1 text-gray-800 text-xs sm:text-sm">
                            {profile?.workMode || <span className="text-gray-400 italic">Not added</span>}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* EDUCATION */}
                {activeTab === "education" && (
                  <div className="space-y-4 sm:space-y-5">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Education Details</h3>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                      {[
                        { name: "degree", label: "Degree", placeholder: "B.Tech / B.E" },
                        { name: "specialization", label: "Specialization", placeholder: "Computer Science" },
                        { name: "college", label: "College", placeholder: "Anna University" },
                        { name: "graduationYear", label: "Graduation Year", placeholder: "2024" },
                      ].map(field => (
                        <div key={field.name}>
                          <label className="text-xs sm:text-sm font-medium text-gray-600">{field.label}</label>
                          {editMode ? (
                            <input type="text" name={field.name}
                              value={formData[field.name]} onChange={handleChange}
                              placeholder={field.placeholder}
                              className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm"
                            />
                          ) : (
                            <p className="mt-1 text-gray-800 text-xs sm:text-sm">
                              {profile?.[field.name] || <span className="text-gray-400 italic">Not added</span>}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    {!editMode && profile?.degree && (
                      <div className="p-3 sm:p-4 md:p-5 bg-blue-50 rounded-xl sm:rounded-2xl border border-blue-100">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-blue-100 rounded-full flex items-center justify-center text-lg sm:text-xl md:text-2xl">🎓</div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 text-xs sm:text-sm md:text-base truncate">
                              {profile.degree} {profile.specialization && `- ${profile.specialization}`}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 truncate">{profile.college}</p>
                            <p className="text-[10px] sm:text-xs text-gray-400">Graduated: {profile.graduationYear}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* SKILLS */}
                {activeTab === "skills" && (
                  <div className="space-y-4 sm:space-y-6">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Skills & Expertise</h3>
                    {[
                      { name: "skills", label: "Technical Skills", placeholder: "React, Node.js, MongoDB", colorClass: "bg-black text-white" },
                      { name: "languages", label: "Languages", placeholder: "Tamil, English, Hindi", colorClass: "bg-blue-100 text-blue-700" },
                      { name: "certifications", label: "Certifications", placeholder: "AWS, Google Cloud", colorClass: "bg-yellow-100 text-yellow-700" },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">
                          {field.label} <span className="text-gray-400 text-[10px] sm:text-xs">(comma separated)</span>
                        </label>
                        {editMode ? (
                          <input type="text" name={field.name}
                            value={formData[field.name]} onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm"
                          />
                        ) : (
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2">
                            {profile?.[field.name]
                              ? profile[field.name].split(",").map((item, i) => (
                                <span key={i} className={`px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium ${field.colorClass}`}>
                                  {field.name === "certifications" ? "🏆 " : ""}{item.trim()}
                                </span>
                              ))
                              : <span className="text-gray-400 italic text-xs sm:text-sm">Not added</span>
                            }
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* SOCIAL */}
                {activeTab === "social" && (
                  <div className="space-y-4 sm:space-y-5">
                    <h3 className="font-semibold text-gray-800 text-sm sm:text-base">Social & Portfolio Links</h3>
                    {[
                      { name: "linkedin", label: "LinkedIn", icon: "💼", placeholder: "https://linkedin.com/in/yourname" },
                      { name: "github", label: "GitHub", icon: "🐙", placeholder: "https://github.com/yourname" },
                      { name: "portfolio", label: "Portfolio Website", icon: "🌐", placeholder: "https://yourportfolio.com" },
                    ].map(field => (
                      <div key={field.name}>
                        <label className="text-xs sm:text-sm font-medium text-gray-600">{field.icon} {field.label}</label>
                        {editMode ? (
                          <input type="url" name={field.name}
                            value={formData[field.name]} onChange={handleChange}
                            placeholder={field.placeholder}
                            className="w-full mt-1 px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-black outline-none text-xs sm:text-sm"
                          />
                        ) : (
                          profile?.[field.name] ? (
                            <a href={profile[field.name]} target="_blank" rel="noopener noreferrer"
                              className="mt-1 text-blue-600 hover:underline text-xs sm:text-sm block break-words">
                              {profile[field.name]}
                            </a>
                          ) : (
                            <p className="mt-1 text-gray-400 italic text-xs sm:text-sm">Not added</p>
                          )
                        )}
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;