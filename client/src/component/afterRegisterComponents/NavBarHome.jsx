import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import profileboy from "../../../public/images/profileboy.svg";
import profilegirl from "../../../public/images/profielgirl.svg";

const NavBarHome = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileimg, setProfileimg] = useState(profilegirl);
  const [role, setRole] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("reactproject");
    localStorage.removeItem("skillmatch_token");
    navigate("/");
    setMobileMenuOpen(false);
    setOpen(false);
  };

  // Get role from localStorage
  useEffect(() => {
    const userdata = JSON.parse(localStorage.getItem("reactproject"));
    if (userdata) {
      setRole(userdata.role);
    }
  }, []);

  // Profile image auto change
  useEffect(() => {
    const interval = setInterval(() => {
      setProfileimg((prev) =>
        prev === profilegirl ? profileboy : profilegirl
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.menu-button')) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        
        {/* Logo */}
        <h1
          onClick={() => navigate("/dashboard")}
          className="text-xl sm:text-2xl font-semibold text-gray-900 cursor-pointer hover:text-gray-700 transition-colors"
        >
          SkillMatch
        </h1>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex gap-6 lg:gap-8 text-gray-700 text-sm font-medium">
          {role === "candidate" && (
            <>
              <Link to="/dashboard" className="hover:text-black transition-colors relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/jobsapply" className="hover:text-black transition-colors relative group">
                Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/applied" className="hover:text-black transition-colors relative group">
                Applied Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/savedjob" className="hover:text-black transition-colors relative group">
                Saved Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
          
          {role === "company" && (
            <>
              <Link to="/companydashboard" className="hover:text-black transition-colors relative group">
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/company/postjob" className="hover:text-black transition-colors relative group">
                Post a Job
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/company/applications" className="hover:text-black transition-colors relative group">
                Applications
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/company/myjobs" className="hover:text-black transition-colors relative group">
                My Jobs
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </>
          )}
        </nav>

        {/* Right Side - Profile and Actions */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          {/* Notification Bell */}
          <div className="text-gray-600 cursor-pointer hover:text-black transition-colors relative group">
            🔔
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              Notifications
            </span>
          </div>

          {/* Role Badge - Hidden on very small screens */}
          {role && (
            <span className={`hidden sm:inline-block text-xs px-2 sm:px-3 py-1 rounded-full font-medium ${
              role === "company"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}>
              {role === "company" ? "🏢 Company" : "👤 Candidate"}
            </span>
          )}

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={() => setOpen(!open)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-transparent hover:ring-gray-300 transition-all"
            >
              <img src={profileimg} alt="Profile" className="w-full h-full object-cover" />
            </div>

            {open && (
              <div className="absolute right-0 mt-2 sm:mt-3 w-44 bg-white border border-gray-200 rounded-md shadow-lg py-2 z-50 animate-fadeIn">
                <Link
                  to="/profile"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  👤 My Profile
                </Link>
                <Link
                  to="/settings"
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  ⚙️ Settings
                </Link>
                <hr className="my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors menu-button"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-gray-600 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden animate-fadeIn" onClick={() => setMobileMenuOpen(false)}>
          <div 
            className="mobile-menu absolute top-0 right-0 w-64 h-full bg-white shadow-2xl transform transition-transform duration-300 animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Menu Header */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <img src={profileimg} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Welcome!</p>
                  {role && (
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      role === "company"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {role === "company" ? "Company Account" : "Candidate Account"}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col py-2">
              {role === "candidate" && (
                <>
                  <MobileNavLink to="/dashboard" icon="🏠" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink to="/jobsapply" icon="💼" label="Jobs" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink to="/applied" icon="✅" label="Applied Jobs" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink to="/savedjob" icon="⭐" label="Saved Jobs" onClick={() => setMobileMenuOpen(false)} />
                </>
              )}
              
              {role === "company" && (
                <>
                  <MobileNavLink to="/companydashboard" icon="📊" label="Dashboard" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink to="/company/postjob" icon="📝" label="Post a Job" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink to="/company/applications" icon="👥" label="Applications" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink to="/company/myjobs" icon="📋" label="My Jobs" onClick={() => setMobileMenuOpen(false)} />
                </>
              )}
              
              <hr className="my-2 mx-4" />
              
              <MobileNavLink to="/profile" icon="👤" label="My Profile" onClick={() => setMobileMenuOpen(false)} />
              <MobileNavLink to="/settings" icon="⚙️" label="Settings" onClick={() => setMobileMenuOpen(false)} />
              
              <button
                onClick={handleLogout}
                className="mx-4 mt-2 px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-3"
              >
                <span>🚪</span>
                <span>Logout</span>
              </button>
            </nav>
          </div>
        </div>
      )}

      {/* Add animation styles */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, icon, label, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="px-4 py-3 text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-3"
  >
    <span className="text-lg">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </Link>
);

export default NavBarHome;