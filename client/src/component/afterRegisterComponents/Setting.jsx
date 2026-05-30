import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Setting = () => {
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState("account");
  const [user, setUser] = useState(null);

  const [accountForm, setAccountForm] = useState({
    username: "", email: "", number: "", currentPassword: "", newPassword: "", confirmPassword: ""
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true, jobRecommendations: true, applicationUpdates: true,
    companyMessages: true, weeklyDigest: false, marketingEmails: false,
    smsAlerts: false, pushNotifications: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public", showEmail: false, showPhone: false,
    allowRecruiterContact: true, showApplicationHistory: false, dataSharing: false
  });

  const [preferences, setPreferences] = useState({
    language: "english", timezone: "IST", theme: "light",
    jobAlertFrequency: "daily", currency: "INR", dateFormat: "DD/MM/YYYY"
  });

  const [appearance, setAppearance] = useState({
    theme: "light", compactMode: false, animations: true, fontSize: "medium"
  });

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("reactproject")) || {};
    setUser(stored);
    setAccountForm(prev => ({
      ...prev,
      username: stored.username || "",
      email: stored.email || "",
      number: stored.number || ""
    }));
  }, []);

  const handleAccountSave = () => {
    if (accountForm.newPassword && accountForm.newPassword !== accountForm.confirmPassword) {
      toast.error("Passwords don't match!", { position: "top-center" });
      return;
    }
    const updated = { ...user, username: accountForm.username, email: accountForm.email, number: accountForm.number };
    localStorage.setItem("reactproject", JSON.stringify(updated));
    setUser(updated);
    toast.success("Account updated successfully!", { position: "top-center" });
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Are you sure? This action cannot be undone.")) {
      localStorage.clear();
      toast.success("Account deleted.");
      navigate("/");
    }
  };

  const toggleNotif = (key) => setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  const togglePrivacy = (key) => setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));

  const navItems = [
    { id: "account", icon: "👤", label: "Account" },
    { id: "notifications", icon: "🔔", label: "Notifications" },
    { id: "privacy", icon: "🔒", label: "Privacy" },
    { id: "preferences", icon: "⚙️", label: "Preferences" },
    { id: "appearance", icon: "🎨", label: "Appearance" },
    { id: "security", icon: "🛡️", label: "Security" },
    { id: "billing", icon: "💳", label: "Billing" },
    { id: "danger", icon: "⚠️", label: "Danger Zone" },
  ];

  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${checked ? "bg-gray-900" : "bg-gray-200"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );

  const SectionCard = ({ title, desc, children }) => (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-5 shadow-sm">
      {(title || desc) && (
        <div className="px-6 py-4 border-b border-gray-50">
          {title && <h3 className="font-semibold text-gray-800 text-base">{title}</h3>}
          {desc && <p className="text-sm text-gray-500 mt-0.5">{desc}</p>}
        </div>
      )}
      <div className="px-6 py-5">{children}</div>
    </div>
  );

  const InputField = ({ label, type = "text", value, onChange, placeholder, hint }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 focus:border-transparent outline-none transition-all hover:border-gray-300"
      />
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  const ToggleRow = ({ label, desc, checked, onChange }) => (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-gray-700">{label}</p>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );

  const SelectField = ({ label, value, onChange, options }) => (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      <select
        value={value} onChange={onChange}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-gray-900 outline-none bg-white hover:border-gray-300 transition-all"
      >
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Settings</h1>
            <p className="text-xs text-gray-400 mt-0.5">Manage your account and preferences</p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-gray-500 hover:text-gray-800 flex items-center gap-1.5 transition-colors"
          >
            ← Dashboard
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Sidebar */}
          <div className="w-full lg:w-56 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 p-2 shadow-sm lg:sticky lg:top-24">

              {/* User info */}
              <div className="px-3 py-3 mb-1 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-900 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {user?.username?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{user?.username || "User"}</p>
                    <p className="text-xs text-gray-400 truncate">{user?.email || ""}</p>
                  </div>
                </div>
              </div>

              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left mb-0.5 ${
                    activeSection === item.id
                      ? "bg-gray-900 text-white"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  } ${item.id === "danger" ? (activeSection === item.id ? "" : "text-red-500 hover:bg-red-50 hover:text-red-600") : ""}`}
                >
                  <span className="text-base">{item.icon}</span>
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">

            {/* ===== ACCOUNT ===== */}
            {activeSection === "account" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Account Settings</h2>
                  <p className="text-sm text-gray-500 mt-1">Update your personal information and login details</p>
                </div>

                {/* Profile Photo */}
                <SectionCard title="Profile Photo" desc="Upload a professional photo for your profile">
                  <div className="flex items-center gap-5">
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 shadow-lg">
                      {user?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-medium hover:bg-gray-700 transition mr-2">
                        Upload Photo
                      </button>
                      <button className="px-4 py-2 border border-gray-200 text-gray-600 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                        Remove
                      </button>
                      <p className="text-xs text-gray-400 mt-2">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                  </div>
                </SectionCard>

                {/* Personal Info */}
                <SectionCard title="Personal Information" desc="Your basic account details">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InputField label="Full Name" value={accountForm.username}
                      onChange={e => setAccountForm(p => ({ ...p, username: e.target.value }))}
                      placeholder="John Doe" />
                    <InputField label="Email Address" type="email" value={accountForm.email}
                      onChange={e => setAccountForm(p => ({ ...p, email: e.target.value }))}
                      placeholder="john@example.com" />
                    <InputField label="Phone Number" type="tel" value={accountForm.number}
                      onChange={e => setAccountForm(p => ({ ...p, number: e.target.value }))}
                      placeholder="+91 98765 43210" />
                    <div className="mb-5">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Type</label>
                      <div className={`px-4 py-2.5 border border-gray-200 rounded-xl text-sm flex items-center gap-2 bg-gray-50`}>
                        <span>{user?.role === "company" ? "🏢" : "👤"}</span>
                        <span className="capitalize text-gray-700 font-medium">{user?.role || "Candidate"}</span>
                        <span className="ml-auto text-xs text-gray-400">Cannot be changed</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <button onClick={handleAccountSave}
                      className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition">
                      Save Changes
                    </button>
                  </div>
                </SectionCard>

                {/* Change Password */}
                <SectionCard title="Change Password" desc="Use a strong password to keep your account secure">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <InputField label="Current Password" type="password" value={accountForm.currentPassword}
                      onChange={e => setAccountForm(p => ({ ...p, currentPassword: e.target.value }))}
                      placeholder="••••••••" />
                    <div />
                    <InputField label="New Password" type="password" value={accountForm.newPassword}
                      onChange={e => setAccountForm(p => ({ ...p, newPassword: e.target.value }))}
                      placeholder="••••••••" hint="At least 8 characters" />
                    <InputField label="Confirm New Password" type="password" value={accountForm.confirmPassword}
                      onChange={e => setAccountForm(p => ({ ...p, confirmPassword: e.target.value }))}
                      placeholder="••••••••" />
                  </div>
                  <div className="flex justify-end">
                    <button className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition">
                      Update Password
                    </button>
                  </div>
                </SectionCard>

                {/* Connected Accounts */}
                <SectionCard title="Connected Accounts" desc="Manage your social login connections">
                  {[
                    { name: "Google", icon: "🔵", connected: false, email: "" },
                    { name: "LinkedIn", icon: "💼", connected: false, email: "" },
                    { name: "GitHub", icon: "🐙", connected: false, email: "" },
                  ].map((acc, i) => (
                    <div key={i} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{acc.icon}</span>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{acc.name}</p>
                          <p className="text-xs text-gray-400">{acc.connected ? acc.email : "Not connected"}</p>
                        </div>
                      </div>
                      <button className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                        acc.connected
                          ? "border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                          : "bg-gray-900 text-white hover:bg-gray-700"
                      }`}>
                        {acc.connected ? "Disconnect" : "Connect"}
                      </button>
                    </div>
                  ))}
                </SectionCard>
              </div>
            )}

            {/* ===== NOTIFICATIONS ===== */}
            {activeSection === "notifications" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Notification Settings</h2>
                  <p className="text-sm text-gray-500 mt-1">Choose what updates you want to receive</p>
                </div>

                <SectionCard title="Email Notifications" desc="Notifications sent to your email address">
                  <ToggleRow label="Job Alerts" desc="Get notified when matching jobs are posted"
                    checked={notifications.emailAlerts} onChange={() => toggleNotif("emailAlerts")} />
                  <ToggleRow label="Job Recommendations" desc="Personalized job suggestions based on your profile"
                    checked={notifications.jobRecommendations} onChange={() => toggleNotif("jobRecommendations")} />
                  <ToggleRow label="Application Updates" desc="Status changes for your job applications"
                    checked={notifications.applicationUpdates} onChange={() => toggleNotif("applicationUpdates")} />
                  <ToggleRow label="Company Messages" desc="Direct messages from recruiters and companies"
                    checked={notifications.companyMessages} onChange={() => toggleNotif("companyMessages")} />
                  <ToggleRow label="Weekly Digest" desc="Summary of top jobs and activity each week"
                    checked={notifications.weeklyDigest} onChange={() => toggleNotif("weeklyDigest")} />
                  <ToggleRow label="Marketing Emails" desc="Tips, product updates, and promotional content"
                    checked={notifications.marketingEmails} onChange={() => toggleNotif("marketingEmails")} />
                </SectionCard>

                <SectionCard title="Push & SMS Notifications">
                  <ToggleRow label="Push Notifications" desc="Browser notifications for important updates"
                    checked={notifications.pushNotifications} onChange={() => toggleNotif("pushNotifications")} />
                  <ToggleRow label="SMS Alerts" desc="Text messages for urgent notifications"
                    checked={notifications.smsAlerts} onChange={() => toggleNotif("smsAlerts")} />
                </SectionCard>

                <SectionCard title="Notification Frequency">
                  <SelectField label="Job Alert Frequency"
                    value={preferences.jobAlertFrequency}
                    onChange={e => setPreferences(p => ({ ...p, jobAlertFrequency: e.target.value }))}
                    options={[
                      { value: "instant", label: "Instant" },
                      { value: "daily", label: "Daily Digest" },
                      { value: "weekly", label: "Weekly" },
                    ]}
                  />
                  <SelectField label="Quiet Hours"
                    value="none"
                    onChange={() => {}}
                    options={[
                      { value: "none", label: "No quiet hours" },
                      { value: "night", label: "10 PM - 8 AM" },
                      { value: "custom", label: "Custom" },
                    ]}
                  />
                </SectionCard>
              </div>
            )}

            {/* ===== PRIVACY ===== */}
            {activeSection === "privacy" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Privacy Settings</h2>
                  <p className="text-sm text-gray-500 mt-1">Control who can see your information</p>
                </div>

                <SectionCard title="Profile Visibility" desc="Control who can view your profile">
                  <SelectField label="Who can see my profile"
                    value={privacy.profileVisibility}
                    onChange={e => setPrivacy(p => ({ ...p, profileVisibility: e.target.value }))}
                    options={[
                      { value: "public", label: "Everyone (Public)" },
                      { value: "companies", label: "Verified Companies Only" },
                      { value: "private", label: "Only Me (Private)" },
                    ]}
                  />
                  <ToggleRow label="Show Email Address" desc="Let recruiters see your email on your profile"
                    checked={privacy.showEmail} onChange={() => togglePrivacy("showEmail")} />
                  <ToggleRow label="Show Phone Number" desc="Let recruiters see your phone number"
                    checked={privacy.showPhone} onChange={() => togglePrivacy("showPhone")} />
                  <ToggleRow label="Allow Recruiter Contact" desc="Recruiters can directly message you"
                    checked={privacy.allowRecruiterContact} onChange={() => togglePrivacy("allowRecruiterContact")} />
                </SectionCard>

                <SectionCard title="Activity Privacy">
                  <ToggleRow label="Show Application History" desc="Others can see jobs you've applied to"
                    checked={privacy.showApplicationHistory} onChange={() => togglePrivacy("showApplicationHistory")} />
                  <ToggleRow label="Data Sharing for Insights" desc="Help improve recommendations (anonymized)"
                    checked={privacy.dataSharing} onChange={() => togglePrivacy("dataSharing")} />
                </SectionCard>

                <SectionCard title="Data & Privacy">
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm">
                      <div className="flex items-center gap-3">
                        <span>📥</span>
                        <div className="text-left">
                          <p className="font-medium text-gray-700">Download My Data</p>
                          <p className="text-xs text-gray-400">Export all your account data as a ZIP file</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                    <button className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition text-sm">
                      <div className="flex items-center gap-3">
                        <span>🍪</span>
                        <div className="text-left">
                          <p className="font-medium text-gray-700">Cookie Preferences</p>
                          <p className="text-xs text-gray-400">Manage cookies and tracking</p>
                        </div>
                      </div>
                      <span className="text-gray-400">→</span>
                    </button>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===== PREFERENCES ===== */}
            {activeSection === "preferences" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Preferences</h2>
                  <p className="text-sm text-gray-500 mt-1">Customize your experience on SkillMatch</p>
                </div>

                <SectionCard title="Language & Region">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
                    <SelectField label="Language"
                      value={preferences.language}
                      onChange={e => setPreferences(p => ({ ...p, language: e.target.value }))}
                      options={[
                        { value: "english", label: "English" },
                        { value: "hindi", label: "Hindi" },
                        { value: "tamil", label: "Tamil" },
                        { value: "telugu", label: "Telugu" },
                      ]}
                    />
                    <SelectField label="Timezone"
                      value={preferences.timezone}
                      onChange={e => setPreferences(p => ({ ...p, timezone: e.target.value }))}
                      options={[
                        { value: "IST", label: "IST (UTC +5:30)" },
                        { value: "UTC", label: "UTC" },
                        { value: "EST", label: "EST (UTC -5)" },
                      ]}
                    />
                    <SelectField label="Currency"
                      value={preferences.currency}
                      onChange={e => setPreferences(p => ({ ...p, currency: e.target.value }))}
                      options={[
                        { value: "INR", label: "INR (₹)" },
                        { value: "USD", label: "USD ($)" },
                        { value: "EUR", label: "EUR (€)" },
                      ]}
                    />
                    <SelectField label="Date Format"
                      value={preferences.dateFormat}
                      onChange={e => setPreferences(p => ({ ...p, dateFormat: e.target.value }))}
                      options={[
                        { value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
                        { value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
                        { value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
                      ]}
                    />
                  </div>
                </SectionCard>

                <SectionCard title="Job Preferences" desc="Customize what jobs are shown to you">
                  <SelectField label="Preferred Work Mode"
                    value="any"
                    onChange={() => {}}
                    options={[
                      { value: "any", label: "Any" },
                      { value: "remote", label: "Remote Only" },
                      { value: "hybrid", label: "Hybrid" },
                      { value: "onsite", label: "On-site Only" },
                    ]}
                  />
                  <SelectField label="Experience Level"
                    value="any"
                    onChange={() => {}}
                    options={[
                      { value: "any", label: "All Levels" },
                      { value: "fresher", label: "Fresher" },
                      { value: "mid", label: "Mid Level (2-5 yrs)" },
                      { value: "senior", label: "Senior (5+ yrs)" },
                    ]}
                  />
                  <InputField label="Expected Salary Range"
                    placeholder="e.g. ₹5-10 LPA"
                    value=""
                    onChange={() => {}}
                  />
                </SectionCard>
              </div>
            )}

            {/* ===== APPEARANCE ===== */}
            {activeSection === "appearance" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Appearance</h2>
                  <p className="text-sm text-gray-500 mt-1">Personalize how SkillMatch looks</p>
                </div>

                <SectionCard title="Theme">
                  <div className="grid grid-cols-3 gap-3 mb-2">
                    {[
                      { id: "light", label: "Light", bg: "bg-white", border: "border-gray-200", preview: "☀️" },
                      { id: "dark", label: "Dark", bg: "bg-gray-900", border: "border-gray-700", preview: "🌙" },
                      { id: "system", label: "System", bg: "bg-gradient-to-r from-white to-gray-900", border: "border-gray-300", preview: "💻" },
                    ].map(t => (
                      <button
                        key={t.id}
                        onClick={() => setAppearance(p => ({ ...p, theme: t.id }))}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          appearance.theme === t.id ? "border-gray-900 shadow-md" : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <span className="text-2xl block mb-2">{t.preview}</span>
                        <span className="text-xs font-semibold text-gray-700">{t.label}</span>
                      </button>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Display Options">
                  <ToggleRow label="Compact Mode" desc="Show more content with reduced spacing"
                    checked={appearance.compactMode} onChange={() => setAppearance(p => ({ ...p, compactMode: !p.compactMode }))} />
                  <ToggleRow label="Animations" desc="Enable smooth transitions and effects"
                    checked={appearance.animations} onChange={() => setAppearance(p => ({ ...p, animations: !p.animations }))} />
                </SectionCard>

                <SectionCard title="Font Size">
                  <div className="grid grid-cols-3 gap-3">
                    {["small", "medium", "large"].map(size => (
                      <button
                        key={size}
                        onClick={() => setAppearance(p => ({ ...p, fontSize: size }))}
                        className={`py-3 rounded-xl border-2 text-center capitalize text-sm font-medium transition-all ${
                          appearance.fontSize === size ? "border-gray-900 bg-gray-900 text-white" : "border-gray-200 text-gray-600 hover:border-gray-300"
                        }`}
                      >
                        {size === "small" ? "A" : size === "medium" ? "A" : "A"}
                        <span className="block text-xs mt-1 capitalize">{size}</span>
                      </button>
                    ))}
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===== SECURITY ===== */}
            {activeSection === "security" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Security</h2>
                  <p className="text-sm text-gray-500 mt-1">Protect your account with advanced security options</p>
                </div>

                {/* Security Score */}
                <SectionCard>
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 rounded-full border-4 border-yellow-400 flex items-center justify-center flex-shrink-0">
                      <span className="text-lg font-bold text-yellow-600">60%</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">Security Score: Fair</h3>
                      <p className="text-sm text-gray-500 mt-1">Enable 2FA and use a stronger password to improve your score</p>
                      <div className="w-48 h-2 bg-gray-100 rounded-full mt-2 overflow-hidden">
                        <div className="h-full bg-yellow-400 rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>
                  </div>
                </SectionCard>

                <SectionCard title="Two-Factor Authentication" desc="Add an extra layer of security to your account">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                        <span className="text-xl">🔐</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700 text-sm">Two-Factor Auth</p>
                        <p className="text-xs text-red-500">Not enabled</p>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition">
                      Enable 2FA
                    </button>
                  </div>
                </SectionCard>

                <SectionCard title="Active Sessions" desc="Devices logged into your account">
                  {[
                    { device: "Chrome on Windows", location: "Chennai, India", current: true, time: "Active now" },
                    { device: "Safari on iPhone", location: "Chennai, India", current: false, time: "2 hours ago" },
                    { device: "Firefox on MacOS", location: "Bangalore, India", current: false, time: "3 days ago" },
                  ].map((session, i) => (
                    <div key={i} className="flex items-center justify-between py-3.5 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gray-50 rounded-xl flex items-center justify-center text-base flex-shrink-0">
                          {session.device.includes("iPhone") ? "📱" : session.device.includes("MacOS") ? "💻" : "🖥️"}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">{session.device}</p>
                          <p className="text-xs text-gray-400">{session.location} · {session.time}</p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-semibold">Current</span>
                      ) : (
                        <button className="text-xs text-red-500 hover:text-red-700 font-semibold transition">Revoke</button>
                      )}
                    </div>
                  ))}
                  <button className="mt-4 text-sm text-red-500 hover:text-red-700 font-semibold transition">
                    Revoke All Other Sessions
                  </button>
                </SectionCard>

                <SectionCard title="Login History">
                  {[
                    { action: "Login", device: "Chrome · Windows", time: "Today, 10:30 AM", status: "success" },
                    { action: "Password Changed", device: "Chrome · Windows", time: "Yesterday, 3:15 PM", status: "warning" },
                    { action: "Failed Login", device: "Unknown Device", time: "2 days ago", status: "error" },
                  ].map((log, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          log.status === "success" ? "bg-green-500" : log.status === "warning" ? "bg-yellow-500" : "bg-red-500"
                        }`} />
                        <div>
                          <p className="text-sm font-medium text-gray-700">{log.action}</p>
                          <p className="text-xs text-gray-400">{log.device}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-400">{log.time}</span>
                    </div>
                  ))}
                </SectionCard>
              </div>
            )}

            {/* ===== BILLING ===== */}
            {activeSection === "billing" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Billing & Plans</h2>
                  <p className="text-sm text-gray-500 mt-1">Manage your subscription and payment details</p>
                </div>

                {/* Current Plan */}
                <SectionCard>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center text-white text-xl">⭐</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-gray-900 text-base">Free Plan</h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">Active</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-0.5">Basic access to job listings</p>
                      </div>
                    </div>
                    <button className="px-5 py-2 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition">
                      Upgrade to Pro
                    </button>
                  </div>
                </SectionCard>

                {/* Plans */}
                <SectionCard title="Available Plans">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      {
                        name: "Free", price: "₹0", period: "forever",
                        features: ["Browse jobs", "Apply to 5 jobs/month", "Basic profile", "Email alerts"],
                        current: true, highlight: false
                      },
                      {
                        name: "Pro", price: "₹499", period: "per month",
                        features: ["Unlimited applications", "Priority listing", "Profile boost", "Advanced filters", "Recruiter insights"],
                        current: false, highlight: true
                      },
                      {
                        name: "Premium", price: "₹999", period: "per month",
                        features: ["Everything in Pro", "Resume review", "Career coaching", "1-on-1 support", "Interview prep"],
                        current: false, highlight: false
                      },
                    ].map((plan, i) => (
                      <div key={i} className={`rounded-xl p-5 border-2 transition-all ${
                        plan.highlight ? "border-gray-900 shadow-lg" : "border-gray-200"
                      }`}>
                        {plan.highlight && (
                          <span className="text-xs bg-gray-900 text-white px-2 py-0.5 rounded-full font-semibold mb-3 inline-block">
                            Most Popular
                          </span>
                        )}
                        <h4 className="font-bold text-gray-900 text-base">{plan.name}</h4>
                        <div className="mt-1 mb-4">
                          <span className="text-2xl font-bold text-gray-900">{plan.price}</span>
                          <span className="text-xs text-gray-400 ml-1">/{plan.period}</span>
                        </div>
                        <ul className="space-y-2 mb-4">
                          {plan.features.map((f, j) => (
                            <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                              <span className="text-green-500">✓</span> {f}
                            </li>
                          ))}
                        </ul>
                        <button className={`w-full py-2 rounded-xl text-xs font-bold transition ${
                          plan.current
                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                            : plan.highlight
                            ? "bg-gray-900 text-white hover:bg-gray-700"
                            : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}>
                          {plan.current ? "Current Plan" : "Get Started"}
                        </button>
                      </div>
                    ))}
                  </div>
                </SectionCard>

                <SectionCard title="Billing History">
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">🧾</div>
                    <p className="text-gray-500 text-sm">No billing history yet</p>
                    <p className="text-gray-400 text-xs mt-1">Your invoices will appear here once you upgrade</p>
                  </div>
                </SectionCard>
              </div>
            )}

            {/* ===== DANGER ZONE ===== */}
            {activeSection === "danger" && (
              <div>
                <div className="mb-6">
                  <h2 className="text-lg font-bold text-red-600">Danger Zone</h2>
                  <p className="text-sm text-gray-500 mt-1">Irreversible actions — proceed with caution</p>
                </div>

                <div className="bg-red-50 border-2 border-red-100 rounded-2xl overflow-hidden">
                  {[
                    {
                      title: "Deactivate Account",
                      desc: "Temporarily hide your profile. You can reactivate anytime by logging in.",
                      action: "Deactivate",
                      style: "border border-red-300 text-red-600 hover:bg-red-100",
                      onClick: () => toast.info("Account deactivation coming soon.")
                    },
                    {
                      title: "Clear Application History",
                      desc: "Remove all your job application data. This cannot be undone.",
                      action: "Clear History",
                      style: "border border-red-300 text-red-600 hover:bg-red-100",
                      onClick: () => {
                        if (window.confirm("Clear all application history?")) {
                          localStorage.removeItem("appliedJobs");
                          toast.success("Application history cleared.");
                        }
                      }
                    },
                    {
                      title: "Clear Saved Jobs",
                      desc: "Remove all jobs you've bookmarked. This cannot be undone.",
                      action: "Clear Saved",
                      style: "border border-red-300 text-red-600 hover:bg-red-100",
                      onClick: () => {
                        if (window.confirm("Clear all saved jobs?")) {
                          localStorage.removeItem("savedJobs");
                          toast.success("Saved jobs cleared.");
                        }
                      }
                    },
                    {
                      title: "Delete Account",
                      desc: "Permanently delete your account and all associated data. This action is irreversible.",
                      action: "Delete Account",
                      style: "bg-red-600 text-white hover:bg-red-700",
                      onClick: handleDeleteAccount
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 border-b border-red-100 last:border-0">
                      <div>
                        <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                        <p className="text-xs text-gray-500 mt-0.5 max-w-md">{item.desc}</p>
                      </div>
                      <button
                        onClick={item.onClick}
                        className={`px-5 py-2 rounded-xl text-sm font-semibold transition flex-shrink-0 ${item.style}`}
                      >
                        {item.action}
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mt-5 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">⚠️</span>
                    <div>
                      <p className="text-sm font-semibold text-amber-800">Before you go</p>
                      <p className="text-xs text-amber-700 mt-1 leading-relaxed">
                        If you're facing issues, our support team can help resolve them.
                        Consider downloading your data before deleting your account.
                      </p>
                      <button className="mt-2 text-xs font-semibold text-amber-800 hover:underline">
                        Contact Support →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;