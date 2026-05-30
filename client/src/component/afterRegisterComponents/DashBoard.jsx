import { useEffect, useState } from "react";
import homeimage from "../../../public/images/welcome.svg";
import homeVideo from "../../../public/video/AD.mp4"
import resumeImage from "../../../public/images/ressume.svg"
import Footer from "../Footer"
import { useNavigate } from "react-router-dom";

const DashBoard = () => {

  const navigate = useNavigate()

  const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Chennai",
    type: "Full Time",
    description: "Looking for a React developer with strong UI skills and 1-3 years experience."
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Bangalore",
    type: "Remote",
    description: "Node.js developer needed with experience in APIs and databases."
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Hyderabad",
    type: "Full Time",
    description: "Creative designer required with Figma and user research skills."
  },
  {
    id: 4,
    title: "Bank Officer",
    location: "Chennai",
    type: "Full Time",
    description: "Hiring probationary officers for leading private bank. Freshers can apply."
  },
  {
    id: 5,
    title: "Office Administrator",
    location: "Coimbatore",
    type: "Full Time",
    description: "Manage daily office operations, documentation, and staff coordination."
  },
  {
    id: 6,
    title: "Accountant",
    location: "Madurai",
    type: "Full Time",
    description: "Looking for experienced accountant with GST & Tally knowledge."
  },
  {
    id: 7,
    title: "HR Executive",
    location: "Bangalore",
    type: "Hybrid",
    description: "Responsible for recruitment, onboarding, and employee engagement."
  },
  {
    id: 8,
    title: "Government Clerk",
    location: "Trichy",
    type: "Full Time",
    description: "State department hiring clerks for administrative support roles."
  },
  {
    id: 9,
    title: "Sales Executive",
    location: "Salem",
    type: "Full Time",
    description: "Field sales role for FMCG company. Incentives + travel allowance."
  }
];

  const [username,setUsername] = useState("")

  useEffect(()=>{
    const getdatas = localStorage.getItem("reactproject")
    
    if(getdatas){
      const changedata = JSON.parse(getdatas)
     setUsername(changedata.username)   
    }
    
  },[])
  
  return (
    <>
    {/* Hero Section with Animation */}
    <div className="bg-white flex justify-center min-h-screen pb-20 md:pb-30 px-4 md:px-5 overflow-hidden">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 md:gap-12 items-center animate-fadeIn">
        
        {/* Left Content with Text Animation */}
        <div className="transform transition-all duration-700 hover:scale-105 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 animate-slideInLeft">
            Welcome <span className="relative inline-block hover:animate-bounce">{username}</span> 👋
          </h1>

          <p className="text-gray-600 mb-4 text-base md:text-lg animate-slideInLeft animation-delay-200">
            Find your dream job with <span className="font-medium relative group">
              SkillMatch
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </span>
            and build a successful career.
          </p>

          <p className="text-gray-500 mb-6 md:mb-8 animate-slideInLeft animation-delay-400 relative group text-sm md:text-base">
            Explore thousands of verified job listings, connect with
            top companies, and take the next step toward your future
            with confidence.
            <span className="absolute -z-10 inset-0 bg-gray-100 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-lg"></span>
          </p>

          <button className="px-5 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl animate-slideInLeft animation-delay-600 relative overflow-hidden group">
            <span className="relative z-10">Explore Jobs</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-20"></span>
          </button>
        </div>

        {/* Right Image with Animation */}
        <div className="text-center animate-slideInRight">
          <div className="relative group">
            <img
              src={homeimage}
              alt="Welcome Illustration"
              className="w-full max-w-sm md:max-w-md mx-auto transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-2xl"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-full blur-xl"></div>
          </div>
          <p className="text-gray-500 mt-4 text-xs md:text-sm animate-pulse">
            Your Future Starts Here.
          </p>
        </div>

      </div>
    </div>
    
    {/* 🎬 VIDEO SECTION */}
    <section className="bg-gray-50 -mt-20 md:-mt-30 py-16 md:py-20 px-4 md:px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* 🎥 Left Side - Video with Enhanced Shadow */}
        <div className="rounded-2xl overflow-hidden shadow-xl hover:shadow-3xl transition-all duration-700 transform hover:scale-105 hover:-rotate-1 order-2 md:order-1">
          <video
            autoPlay
            loop
            muted
            playsInline
            controls
            className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-110"
          >
            <source src={homeVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* 📝 Right Side - Content with Text Movement */}
        <div className="space-y-5 md:space-y-6 order-1 md:order-2 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 md:mb-6 transform transition-all duration-500 hover:translate-x-2">
            See How SkillMatch Works
          </h2>

          <p className="text-gray-600 mb-5 md:mb-6 text-base md:text-lg transform transition-all duration-500 hover:translate-x-2 hover:text-gray-900">
            Watch this short video to understand how we help you
            find the right opportunities faster and smarter.
          </p>

          <ul className="space-y-2 md:space-y-3 text-gray-600">
            {[
              "Personalized job recommendations",
              "Easy application tracking",
              "Verified company listings",
              "Smart skill-based matching"
            ].map((item, index) => (
              <li 
                key={index}
                className="transform transition-all duration-300 hover:translate-x-4 hover:text-black cursor-default group flex items-center justify-center md:justify-start"
              >
                <span className="inline-block transition-transform duration-300 group-hover:scale-125 mr-2">✔</span>
                <span className="relative">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </span>
              </li>
            ))}
          </ul>

          <button className="mt-6 md:mt-8 px-5 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl relative overflow-hidden group">
            <span className="relative z-10">Join Now</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-20"></span>
          </button>
        </div>

      </div>
    </section>

    {/* 🚀 NEW SECTION - Success Stories with Paragraph */}
    <section className="bg-gradient-to-br from-blue-50 to-indigo-50 py-16 md:py-20 px-4 md:px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 md:mb-14 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 relative inline-block group">
            Success Stories
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 transform -translate-x-1/2 transition-all duration-500 group-hover:w-24"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Real stories from real people who found their dream jobs through SkillMatch
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
          {/* Success Story Card 1 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl transform transition-all duration-300 group-hover:scale-110">
                R
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg md:text-xl">Rahul Sharma</h3>
                <p className="text-sm text-gray-500">Frontend Developer at TechCorp</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              "SkillMatch helped me find the perfect job that matched my skills and career goals. 
              The personalized recommendations were spot on, and I got hired within 2 weeks of joining!"
            </p>
            <div className="mt-4 flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <span key={star} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>

          {/* Success Story Card 2 */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 group cursor-pointer">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl transform transition-all duration-300 group-hover:scale-110">
                P
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg md:text-xl">Priya Patel</h3>
                <p className="text-sm text-gray-500">HR Manager at Global Solutions</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">
              "The resume builder is incredible! I created an ATS-friendly resume that helped me stand out. 
              SkillMatch made my job search journey smooth and successful."
            </p>
            <div className="mt-4 flex gap-1">
              {[1,2,3,4,5].map((star) => (
                <span key={star} className="text-yellow-400 text-lg">★</span>
              ))}
            </div>
          </div>
        </div>

        {/* Paragraph Section */}
        <div className="bg-white rounded-2xl p-6 md:p-10 shadow-xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
          <div className="text-center mb-6">
            <div className="inline-block p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 transform transition-all duration-500 hover:rotate-12">
              <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3">Why Choose SkillMatch?</h3>
          </div>
          
          <p className="text-gray-600 text-sm md:text-base leading-relaxed text-center max-w-4xl mx-auto">
            At SkillMatch, we believe that finding the right job shouldn't be a struggle. Our platform combines 
            cutting-edge AI technology with personalized career guidance to connect talented professionals with 
            their dream opportunities. With over 10,000+ successful placements, 98% customer satisfaction rate, 
            and partnerships with 500+ top companies across India, we're committed to transforming the way people 
            find jobs. Our dedicated team works tirelessly to ensure that every job seeker gets the support they 
            need to build a successful career. Whether you're a fresh graduate or an experienced professional, 
            SkillMatch is your trusted partner in career growth. Join thousands of satisfied users who have 
            already achieved their career goals with us. Your dream job is just a click away!
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 md:mt-8">
            <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-110">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">10K+</div>
              <div className="text-xs md:text-sm text-gray-600">Success Stories</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-110">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">98%</div>
              <div className="text-xs md:text-sm text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="text-center p-3 md:p-4 bg-gray-50 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 transform hover:scale-110">
              <div className="text-2xl md:text-3xl font-bold text-blue-600">500+</div>
              <div className="text-xs md:text-sm text-gray-600">Partner Companies</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Latest Jobs Section */}
    <section className="bg-white py-16 md:py-20 px-4 md:px-5">
      <div className="max-w-6xl mx-auto">

        {/* Section Header with Animation */}
        <div className="text-center mb-10 md:mb-14 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 relative inline-block group">
            Latest Jobs
            <span className="absolute -bottom-2 left-1/2 w-0 h-1 bg-black transform -translate-x-1/2 transition-all duration-500 group-hover:w-24"></span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base transform transition-all duration-500 hover:scale-105">
            Explore the newest job opportunities posted by top companies.
            Find roles that match your skills and apply with confidence.
          </p>
        </div>

        {/* Job Cards Grid with Enhanced Hover */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {jobs.map((job, index) => (
            <div
              key={job.id}
              className="border border-gray-200 rounded-xl p-5 md:p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 bg-white animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2 group relative inline-block">
                {job.title}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mb-3 flex items-center gap-2 flex-wrap">
                <span className="inline-block w-2 h-2 bg-black rounded-full animate-pulse"></span>
                {job.location} • {job.type}
              </p>
              <p className="text-gray-600 text-xs md:text-sm mb-4 transform transition-all duration-300 hover:translate-x-1">
                {job.description}
              </p>
              <button onClick={()=>{navigate('/jobsapply')}} className="text-xs md:text-sm font-medium text-black hover:text-gray-700 transition-all duration-300 group flex items-center gap-2">
                <span>View Details</span>
                <span className="transform transition-transform duration-300 group-hover:translate-x-2">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 📄 RESUME SECTION */}
    <section className="bg-gray-50 py-16 md:py-20 px-4 md:px-5 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 md:gap-12 items-center">

        {/* 📝 Left Content with Text Movement */}
        <div className="space-y-5 md:space-y-6 order-2 md:order-1 text-center md:text-left">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-4 md:mb-6 transform transition-all duration-500 hover:translate-x-2 hover:scale-105">
            Build Your Resume Professionally
          </h2>

          <p className="text-gray-600 text-base md:text-lg mb-5 md:mb-6 transform transition-all duration-500 hover:translate-x-2 hover:text-gray-900">
            Create a powerful and job-winning resume with our easy-to-use
            resume builder. Stand out from the competition and impress recruiters.
          </p>

          <ul className="space-y-2 md:space-y-3 text-gray-600 mb-6 md:mb-8">
            {[
              "ATS-friendly resume templates",
              "Easy customization options",
              "Professional formatting",
              "Download in PDF format instantly"
            ].map((item, index) => (
              <li 
                key={index}
                className="transform transition-all duration-300 hover:translate-x-4 hover:text-black cursor-default group flex items-center justify-center md:justify-start"
              >
                <span className="inline-block transition-transform duration-300 group-hover:scale-125 mr-2">✔</span>
                <span className="relative">
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
                </span>
              </li>
            ))}
          </ul>

          <button className="px-5 md:px-6 py-2.5 md:py-3 bg-black text-white rounded-md hover:bg-gray-800 transition-all duration-300 transform hover:scale-110 hover:shadow-2xl relative overflow-hidden group">
            <span className="relative z-10">Create Resume Now</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left opacity-20"></span>
          </button>
        </div>

        {/* 🖼 Right Image with Enhanced Shadow */}
        <div className="flex justify-center order-1 md:order-2">
          <div className="relative group">
            <img
              src={resumeImage}
              alt="Resume Builder"
              className="w-full max-w-sm md:max-w-md rounded-xl shadow-lg transform transition-all duration-700 group-hover:scale-110 group-hover:rotate-2 group-hover:shadow-3xl"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl"></div>
          </div>
        </div>

      </div>
    </section>

    <Footer/>

    {/* Add these styles */}
    <style >{`
      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes slideInRight {
        from {
          opacity: 0;
          transform: translateX(50px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      
      .animate-fadeIn {
        animation: fadeIn 1s ease-out;
      }
      
      .animate-slideInLeft {
        animation: slideInLeft 0.8s ease-out forwards;
        opacity: 0;
      }
      
      .animate-slideInRight {
        animation: slideInRight 0.8s ease-out forwards;
        opacity: 0;
      }
      
      .animate-fadeInUp {
        animation: fadeInUp 0.6s ease-out forwards;
        opacity: 0;
      }
      
      .animation-delay-200 {
        animation-delay: 200ms;
      }
      
      .animation-delay-400 {
        animation-delay: 400ms;
      }
      
      .animation-delay-600 {
        animation-delay: 600ms;
      }
      
      .hover\:shadow-3xl:hover {
        box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.3);
      }
      
      .hover\:shadow-4xl:hover {
        box-shadow: 0 40px 70px -20px rgba(0, 0, 0, 0.4);
      }
      
      @media (max-width: 768px) {
        .animate-slideInLeft, .animate-slideInRight, .animate-fadeInUp {
          animation-duration: 0.5s;
        }
      }
    `}</style>
    </>
  );
};

export default DashBoard