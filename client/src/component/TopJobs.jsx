import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";


const TopJobs = () => {

  const navigate = useNavigate()


  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg"
  ]


  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 3000); // 3 seconds

    return () => clearInterval(interval);
  }, []);




  const [showPopup, setShowPopup] = useState(false);


  const jobs = [
    // IT JOBS
    {
      title: "React Developer",
      company: "Tech Solutions",
      location: "Chennai",
      type: "Full Time",
      category: "IT",
      salary: "₹6 – 10 LPA",
      experience: "2+ Years",
      posted: "2 days ago",
      desc: "Build modern UI using React & Tailwind."
    },
    {
      title: "Node.js Backend Developer",
      company: "CloudNova",
      location: "Remote",
      type: "Full Time",
      category: "IT",
      salary: "₹8 – 12 LPA",
      experience: "3+ Years",
      posted: "1 day ago",
      desc: "Develop scalable backend APIs using Node.js."
    },

    // BANK & FINANCE
    {
      title: "Bank Clerk",
      company: "Public Sector Bank",
      location: "Tamil Nadu",
      type: "Government",
      category: "Bank",
      salary: "₹30,000 – ₹45,000 / month",
      experience: "Fresher",
      posted: "Today",
      desc: "Customer handling & banking operations."
    },
    {
      title: "Account Executive",
      company: "ABC Finance",
      location: "Coimbatore",
      type: "Full Time",
      category: "Finance",
      salary: "₹25,000 – ₹35,000 / month",
      experience: "1–3 Years",
      posted: "3 days ago",
      desc: "GST filing, accounts & billing management."
    },

    // GOVERNMENT
    {
      title: "Village Assistant",
      company: "TN Government",
      location: "District Level",
      type: "Government",
      category: "Govt",
      salary: "₹20,000 / month",
      experience: "Fresher",
      posted: "5 days ago",
      desc: "Assist VAO in government administrative work."
    },

    // LABOUR / FACTORY
    {
      title: "Factory Helper",
      company: "Manufacturing Unit",
      location: "Hosur",
      type: "Full Time",
      category: "Labour",
      salary: "₹12,000 – ₹15,000 / month",
      experience: "No Experience",
      posted: "1 day ago",
      desc: "Support factory production and loading work."
    },
    {
      title: "Construction Labour",
      company: "Private Contractor",
      location: "Chennai",
      type: "Daily Wage",
      category: "Labour",
      salary: "₹700 – ₹900 / day",
      experience: "Any",
      posted: "Today",
      desc: "Site work, loading & construction support."
    },

    // DELIVERY / DRIVER
    {
      title: "Delivery Executive",
      company: "Swiggy / Zomato",
      location: "Local Area",
      type: "Part Time",
      category: "Delivery",
      salary: "₹18,000 – ₹30,000 / month",
      experience: "Fresher",
      posted: "Today",
      desc: "Food delivery using bike."
    },
    {
      title: "Auto / Cab Driver",
      company: "Ola / Uber",
      location: "City Area",
      type: "Full Time",
      category: "Driver",
      salary: "₹25,000 – ₹40,000 / month",
      experience: "Driving License Required",
      posted: "2 days ago",
      desc: "Passenger transport using own vehicle."
    },

    // HOSPITAL
    {
      title: "Hospital Ward Boy",
      company: "Private Hospital",
      location: "Madurai",
      type: "Full Time",
      category: "Hospital",
      salary: "₹14,000 – ₹18,000 / month",
      experience: "Fresher",
      posted: "1 day ago",
      desc: "Patient assistance & hospital support work."
    },
    {
      title: "Staff Nurse",
      company: "Multi Specialty Hospital",
      location: "Trichy",
      type: "Full Time",
      category: "Hospital",
      salary: "₹20,000 – ₹35,000 / month",
      experience: "1+ Year",
      posted: "4 days ago",
      desc: "Patient care & medical assistance."
    },

    // HOTEL / SHOP
    {
      title: "Hotel Master",
      company: "Veg Restaurant",
      location: "Salem",
      type: "Full Time",
      category: "Hotel",
      salary: "₹18,000 – ₹22,000 / month",
      experience: "1+ Year",
      posted: "Today",
      desc: "Order taking & customer service."
    },
    {
      title: "Shop Salesman",
      company: "Textile Shop",
      location: "Erode",
      type: "Full Time",
      category: "Shop",
      salary: "₹12,000 – ₹18,000 / month",
      experience: "Fresher",
      posted: "3 days ago",
      desc: "Customer handling & billing."
    },

    // SECURITY
    {
      title: "Security Guard",
      company: "Security Agency",
      location: "Bangalore",
      type: "Full Time",
      category: "Security",
      salary: "₹14,000 – ₹20,000 / month",
      experience: "Fresher",
      posted: "Today",
      desc: "Building & premises security."
    },

    // FREELANCE / WFH
    {
      title: "Data Entry Operator",
      company: "Freelance",
      location: "Work From Home",
      type: "Freelance",
      category: "WFH",
      salary: "₹10,000 – ₹20,000 / month",
      experience: "Basic Computer Knowledge",
      posted: "2 days ago",
      desc: "Online data entry & document processing."
    }
  ];

  return (
    <>

   <section className="bg-white py-20 px-5">

  <div className="max-w-6xl mx-auto">

    {/* Top Split Section */}
    <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

      {/* Left Image */}
      <div>
        <img
          src={banners[current]}
          alt="Jobs"
          className="w-full h-[320px] object-cover rounded-2xl shadow-sm"
        />
      </div>

      {/* Right Content */}
      <div>

        <p className="text-sm tracking-widest text-gray-400 mb-3 uppercase">
          Explore Opportunities
        </p>

        <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
          Find Jobs That Match Your Skills
        </h1>

        <p className="text-gray-500 text-lg leading-relaxed mb-8">
          Discover verified opportunities across IT, Non-IT, Government,
          Banking and Work-From-Home roles. SkillMatch helps you
          find the right career path with clarity and confidence.
        </p>

        <button
          className="bg-black text-white px-8 py-3 rounded-xl
                     font-medium hover:bg-gray-800 transition"
        >
          Browse Jobs
        </button>

      </div>

    </div>


    {/* Job Cards Section */}
    <div className="space-y-8">

      {jobs.map((job, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row md:items-center
                     justify-between bg-white p-6 rounded-2xl
                     border border-gray-200
                     hover:shadow-md transition-all duration-300"
        >

          {/* Left Content */}
          <div className="flex gap-5 items-start">

            {/* Company Initial Logo */}
            <div className="w-12 h-12 bg-gray-100 rounded-xl
                            flex items-center justify-center
                            text-gray-700 font-semibold">
              {job.company[0]}
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {job.title}
              </h2>

              <p className="text-gray-500 text-sm mt-1">
                {job.company} · {job.location}
              </p>

              <div className="flex flex-wrap gap-5 mt-3 text-sm text-gray-600">
                <span>💰 {job.salary}</span>
                <span>🧑‍💼 {job.experience}</span>
                <span>⏰ {job.posted}</span>
              </div>

              <p className="text-gray-500 text-sm mt-3 max-w-xl">
                {job.desc}
              </p>

              <div className="flex gap-3 mt-4">
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {job.category}
                </span>
                <span className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-700">
                  {job.type}
                </span>
              </div>
            </div>

          </div>

          {/* Right Action */}
          <button
            className="mt-6 md:mt-0 px-7 py-2.5 rounded-xl
                       bg-black text-white font-medium
                       hover:bg-gray-800 transition"
            onClick={() => setShowPopup(true)}
          >
            Apply Now
          </button>

        </div>
      ))}

    </div>

  </div>

  <div className="flex justify-center mt-10">
  <button
    onClick={() => setShowPopup(true)}
    className="px-8 py-3 rounded-xl
               bg-black text-white
               font-medium
               hover:bg-gray-800
               transition"
  >
    Show More Jobs
  </button>
</div>

</section>






<section>
  {showPopup && (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={() => setShowPopup(false)}
      ></div>

      {/* Modal */}
      <div className="relative bg-white w-[92%] max-w-md 
                      rounded-2xl p-8 
                      border border-gray-200 
                      shadow-xl transition-all duration-300">

        {/* Close */}
        <button
          onClick={() => setShowPopup(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-black"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-semibold text-gray-900 text-center mb-4">
          Register to Apply
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-center mb-8 leading-relaxed">
          Please register or login to continue your job application.
          It only takes a few seconds.
        </p>

        {/* Buttons */}
        <div className="space-y-4">

          <button
            onClick={() => navigate("/register")}
            className="w-full py-3 rounded-xl
                       bg-black text-white font-medium
                       hover:bg-gray-800 transition"
          >
            Continue with Register
          </button>

          <button
            onClick={() => navigate("/login")}
            className="w-full py-3 rounded-xl
                       border border-gray-300
                       text-gray-700 font-medium
                       hover:bg-gray-100 transition"
          >
            Login Instead
          </button>

        </div>

      </div>
    </div>
  )}
</section>


     <Footer/>
    </>
  );
};

export default TopJobs;
