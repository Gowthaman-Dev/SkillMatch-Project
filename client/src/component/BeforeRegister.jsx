import { useNavigate } from "react-router-dom";
import img from "../assets/undraw_interview_yz52.svg";
import { useEffect, useState } from "react";

const BeforeRegister = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const stats = [
    { number: "50K+", label: "Active Jobs", icon: "💼", trend: "+12%", color: "from-blue-500 to-cyan-500" },
    { number: "10K+", label: "Companies", icon: "🏢", trend: "+8%", color: "from-purple-500 to-pink-500" },
    { number: "2M+", label: "Job Seekers", icon: "👥", trend: "+25%", color: "from-green-500 to-emerald-500" },
    { number: "95%", label: "Success Rate", icon: "🎯", trend: "+5%", color: "from-orange-500 to-red-500" },
  ];

  const features = [
    { icon: "🎯", title: "Smart Matching", desc: "AI-powered job recommendations based on your skills and goals." },
    { icon: "🏢", title: "Verified Companies", desc: "Every employer is verified. Apply with confidence." },
    { icon: "⚡", title: "One-Click Apply", desc: "Save your profile once, apply to hundreds of jobs instantly." },
    { icon: "📊", title: "Track Applications", desc: "Know exactly where you stand in real-time." },
    { icon: "🔔", title: "Instant Alerts", desc: "Get notified when companies review your application." },
    { icon: "🌐", title: "Remote Friendly", desc: "Filter for remote, hybrid, or on-site roles worldwide." },
  ];

  const steps = [
    { step: "01", title: "Create Profile", desc: "Build your professional profile with skills and resume." },
    { step: "02", title: "Discover Jobs", desc: "Browse thousands of verified listings by category." },
    { step: "03", title: "Apply Instantly", desc: "One-click apply and track every application." },
    { step: "04", title: "Get Hired", desc: "Companies reach out. Land your dream job faster." },
  ];

  const testimonials = [
    { name: "Priya Sharma", role: "Engineer at Google", text: "Landed my dream job in 3 weeks. The matching algorithm is incredibly accurate.", avatar: "PS" },
    { name: "Arjun Kumar", role: "PM at Flipkart", text: "Applied to 5 companies and got 3 interviews. The profile tips were super helpful.", avatar: "AK" },
    { name: "Meera Nair", role: "Designer at Swiggy", text: "Verified companies gave me confidence. Only real opportunities, no scams.", avatar: "MN" },
  ];

  const categories = [
    { label: "IT & Software", count: "12,400+", icon: "💻" },
    { label: "Design", count: "3,200+", icon: "🎨" },
    { label: "Finance", count: "5,800+", icon: "🏦" },
    { label: "Healthcare", count: "4,100+", icon: "🏥" },
    { label: "Education", count: "2,900+", icon: "📚" },
    { label: "Government", count: "1,600+", icon: "🏛️" },
    { label: "Sales", count: "6,300+", icon: "📈" },
    { label: "Engineering", count: "7,500+", icon: "⚙️" },
  ];

  return (
    <div className="font-sans text-gray-900 overflow-x-hidden">
      {/* ===== HERO ===== */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4 sm:px-6 py-16 sm:py-20 relative">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-48 sm:w-72 h-48 sm:h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center relative z-10">
          {/* Left */}
          <div className="space-y-5 sm:space-y-6 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 hover:scale-105 transition-all duration-300 cursor-default">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse inline-block"></span>
              <span className="text-blue-700 text-xs sm:text-sm font-semibold">India's #1 Job Platform</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight">
              Explore jobs and grow your professional network
            </h1>

            <p className="text-gray-500 text-sm sm:text-base md:text-lg leading-relaxed">
              Discover opportunities, connect with professionals, and build your career with confidence.
            </p>

            <div className="flex flex-col gap-3 pt-2 items-center md:items-start">
              <button
                onClick={() => navigate("/register")}
                className="w-full max-w-xs sm:max-w-sm bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:from-blue-600 hover:to-blue-700 active:scale-95 transition-all duration-300 py-3 rounded-full font-medium shadow-lg text-sm sm:text-base"
              >
                Sign up with Email
              </button>

              <p className="text-gray-400 text-xs sm:text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-gray-700 font-semibold cursor-pointer hover:text-blue-600 active:text-blue-700 transition-colors"
                >
                  Sign in
                </span>
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="hidden md:block relative">
            <div className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500 hover:scale-105">
              <img src={img} alt="Career Illustration" className="w-full max-w-lg mx-auto" />
            </div>
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 flex items-center gap-3 animate-float hover:scale-110 transition-all duration-300 cursor-pointer">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-lg">💼</div>
              <div>
                <p className="text-xs font-bold text-gray-800 m-0">Frontend Dev</p>
                <p className="text-xs text-green-600 font-semibold m-0">₹18-24 LPA • Remote</p>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-4 animate-float animation-delay-2000 hover:scale-110 transition-all duration-300 cursor-pointer">
              <p className="text-xs text-gray-400 m-0">Applied Today</p>
              <p className="text-2xl font-bold text-blue-600 m-0">2,847</p>
              <p className="text-xs text-green-500 font-semibold m-0">↑ 12% from yesterday</p>
            </div>
          </div>

          {/* Mobile only */}
          <div className="block md:hidden w-full max-w-xs mx-auto mt-2">
            <img src={img} alt="Career Illustration" className="w-full" />
          </div>
        </div>
      </section>

      {/* ===== WHY US SECTION ===== */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50 pointer-events-none"></div>
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-48 sm:w-72 h-48 sm:h-72 bg-blue-300/20 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-10 w-48 sm:w-96 h-48 sm:h-96 bg-purple-300/20 rounded-full blur-3xl animate-float animation-delay-2000"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="space-y-5 sm:space-y-6 md:space-y-8 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm hover:shadow-md transition-all duration-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-blue-600 text-xs sm:text-sm font-semibold">Why Choose Us</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Revolutionizing Your
                </span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Job Search Experience
                </span>
              </h2>

              <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed">
                At SkillMatch, we believe finding your dream job shouldn't feel impossible.
                Our platform combines AI technology with human-centric design to create a seamless experience
                that puts your career goals first.
              </p>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                We've helped over <span className="font-semibold text-blue-600">2 million professionals</span> connect with{" "}
                <span className="font-semibold text-blue-600">10,000+ verified companies</span> across India.
              </p>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-2">
                {[
                  { val: "98%", label: "Placement Rate" },
                  { val: "24/7", label: "Support" },
                  { val: "100%", label: "Verified Jobs" },
                ].map((item, i) => (
                  <div key={i} className="text-center group cursor-pointer">
                    <div className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent group-hover:scale-110 group-active:scale-95 transition-transform inline-block">
                      {item.val}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-700 transition-colors">{item.label}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center md:justify-start">
                <button
                  onClick={() => navigate("/register")}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl active:scale-95 transition-all duration-300 text-sm sm:text-base"
                >
                  <span>Start Your Journey</span>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 group-active:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="relative mt-8 md:mt-0 max-w-sm mx-auto md:max-w-none w-full">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer">
                <div className="absolute -top-4 -left-4 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg italic leading-relaxed">
                    "SkillMatch transformed my career journey. Within weeks, I found a role that perfectly matched my skills and aspirations."
                  </p>
                  <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md text-sm sm:text-base flex-shrink-0 group-hover:scale-110 transition-transform">
                      RJ
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 text-sm sm:text-base m-0 group-hover:text-blue-600 transition-colors">Rahul Jain</p>
                      <p className="text-xs sm:text-sm text-gray-500 m-0">Senior Software Engineer</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-xs sm:text-sm text-gray-500 ml-2">(2,500+ reviews)</span>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-2 sm:-top-8 sm:-right-8 bg-white rounded-xl p-2 sm:p-3 shadow-lg animate-float hidden sm:block hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 m-0">Success Rate</p>
                    <p className="text-sm sm:text-lg font-bold text-green-600 m-0">95%</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-2 sm:-bottom-8 sm:-left-8 bg-white rounded-xl p-2 sm:p-3 shadow-lg animate-float animation-delay-2000 hidden sm:block hover:scale-110 transition-all duration-300 cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800 m-0">Response Time</p>
                    <p className="text-sm sm:text-lg font-bold text-blue-600 m-0">&lt; 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 pointer-events-none"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full px-4 py-2 mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-blue-600 text-xs sm:text-sm font-semibold">Platform Growth</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              Trusted by Millions
            </h2>
            <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base md:text-lg">Our platform in numbers</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((s, i) => (
              <div
                key={i}
                className="group relative bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg hover:shadow-2xl active:scale-95 transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${s.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                <div className="absolute inset-0.5 bg-white rounded-xl sm:rounded-2xl group-hover:bg-transparent transition-colors duration-500"></div>
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-3 sm:mb-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center text-xl sm:text-2xl shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      {s.icon}
                    </div>
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-100 text-green-600 group-hover:bg-white/20 group-hover:text-white transition-all duration-300">
                      {s.trend}
                    </span>
                  </div>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300 mb-1">
                    {s.number}
                  </p>
                  <p className="text-gray-500 text-xs sm:text-sm font-medium group-hover:text-white/90 transition-colors duration-300">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6">
            {[
              { val: "⭐ 4.9/5", label: "User Rating" },
              { val: "🚀 15,000+", label: "New Jobs Daily" },
              { val: "💼 24/7", label: "Support" },
            ].map((item, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-3 sm:p-4 text-center hover:shadow-lg active:scale-95 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <p className="text-base sm:text-2xl font-bold text-gray-800 m-0">{item.val}</p>
                <p className="text-xs sm:text-sm text-gray-500 mt-1 m-0">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest inline-block">
              Browse Categories
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-3">
              Explore by Industry
            </h2>
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">Find opportunities across every sector</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {categories.map((cat, i) => (
              <div
                key={i}
                onClick={() => navigate("/register")}
                className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-5 border border-gray-100 hover:border-blue-200 hover:shadow-xl active:scale-95 transition-all duration-300 cursor-pointer flex items-center gap-2 sm:gap-4 group"
              >
                <span className="text-2xl sm:text-3xl group-hover:scale-125 group-active:scale-90 transition-transform flex-shrink-0">{cat.icon}</span>
                <div className="min-w-0">
                  <p className="font-bold text-gray-800 text-xs sm:text-sm m-0 group-hover:text-blue-600 transition-colors truncate">{cat.label}</p>
                  <p className="text-gray-400 text-xs m-0 mt-0.5">{cat.count} jobs</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest inline-block">
              Why SkillMatch
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-3">
              Everything You Need to Get Hired
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl mx-auto">
              Tools and features designed to make your job search faster and smarter
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-5 sm:p-7 border border-gray-100 hover:border-blue-200 hover:shadow-2xl active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-gray-200 flex items-center justify-center text-xl sm:text-2xl mb-4 sm:mb-5 shadow-sm group-hover:scale-110 group-active:scale-90 transition-all duration-300">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-800 text-base sm:text-lg mb-2 group-hover:text-blue-600 transition-colors">{f.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed m-0 group-hover:text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest inline-block">
              How It Works
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-3">
              Land Your Dream Job in 4 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 relative">
            <div className="hidden lg:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />

            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center group cursor-pointer">
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-full mb-4 sm:mb-5 flex items-center justify-center text-base sm:text-lg font-bold border-2 transition-all duration-300 group-hover:scale-110 group-active:scale-95 ${
                    i === 0
                      ? "bg-gradient-to-r from-gray-900 to-gray-800 text-white border-gray-900 group-hover:from-blue-600 group-hover:to-blue-700"
                      : "bg-white text-gray-400 border-gray-200 group-hover:border-blue-400 group-hover:text-blue-600"
                  }`}
                >
                  {s.step}
                </div>
                <h3 className="font-bold text-gray-800 text-sm sm:text-base mb-2 group-hover:text-blue-600 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm leading-relaxed m-0 group-hover:text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="bg-white py-16 sm:py-20 md:py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-14">
            <span className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest inline-block">
              Success Stories
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-3">
              Loved by Professionals
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-100 hover:border-blue-200 hover:shadow-2xl active:scale-95 transition-all duration-300 group cursor-pointer"
              >
                <div className="flex gap-1 mb-4 sm:mb-5">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm sm:text-base group-hover:scale-110 transition-transform">
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed italic mb-4 sm:mb-6 group-hover:text-gray-700">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-xs sm:text-xs font-bold text-gray-600 flex-shrink-0 group-hover:scale-110 group-active:scale-90 transition-all duration-300">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-xs sm:text-sm m-0 group-hover:text-blue-600 transition-colors">
                      {t.name}
                    </p>
                    <p className="text-gray-400 text-xs m-0">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Ready to Find Your Dream Job?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-8 sm:mb-10">
            Join 2 million professionals who found their perfect career match on SkillMatch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/register")}
              className="w-full sm:w-auto bg-white text-gray-900 hover:bg-gray-100 active:scale-95 transition-all duration-300 px-8 py-3 sm:py-4 rounded-full font-bold text-sm sm:text-base shadow-lg"
            >
              Create Free Account →
            </button>
            <button
              onClick={() => navigate("/topjobs")}
              className="w-full sm:w-auto bg-transparent text-white border border-gray-600 hover:border-gray-400 hover:bg-white/10 active:scale-95 transition-all duration-300 px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black py-12 sm:py-14 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-12">
            <div className="col-span-2 md:col-span-1">
              <h3 className="text-white text-lg sm:text-xl font-bold mb-3 hover:text-blue-400 transition-colors cursor-pointer">
                SkillMatch
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4">
                India's most trusted job platform connecting talented professionals with great companies.
              </p>
            </div>
            {[
              { title: "Job Seekers", links: ["Browse Jobs", "Companies", "Saved Jobs", "Career Advice"] },
              { title: "Companies", links: ["Post a Job", "Find Talent", "Pricing", "Success Stories"] },
              { title: "Company", links: ["About Us", "Blog", "Privacy Policy", "Contact"] },
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white text-xs sm:text-sm font-bold mb-3 sm:mb-4 hover:text-blue-400 transition-colors cursor-pointer">
                  {col.title}
                </h4>
                <ul className="space-y-2 sm:space-y-3 list-none p-0 m-0">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <span className="text-gray-500 text-xs sm:text-sm hover:text-gray-200 active:text-gray-300 transition-colors cursor-pointer inline-block">
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-800 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-center sm:text-left">
            <p className="text-gray-600 text-xs sm:text-sm m-0 hover:text-gray-400 transition-colors">
              © 2026 SkillMatch. All rights reserved.
            </p>
            <p className="text-gray-600 text-xs sm:text-sm m-0 hover:text-gray-400 transition-colors">
              Made with ❤️ in India
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        
        /* Mobile touch feedback */
        @media (max-width: 768px) {
          button:active, .cursor-pointer:active {
            transform: scale(0.98);
          }
        }
      `}</style>
    </div>
  );
};

export default BeforeRegister;