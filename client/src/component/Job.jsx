import React from 'react'
import Footer from './Footer'

const Job = () => {
  return (
    <>
    
   

<section>

    <div className="min-h-screen bg-gray-100 py-16 px-6">

  {/* Heading */}
  <div className="max-w-5xl mx-auto text-center mb-14">
    <h2 className="text-4xl font-bold text-gray-800 mb-4">
      Build Your Career With <span className="text-green-600">MediCare+</span>
    </h2>
    <p className="text-gray-600 max-w-xl mx-auto">
      Join our dedicated healthcare team and make a meaningful impact
      in delivering quality patient care.
    </p>
  </div>

  {/* Cards */}
  <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">

    {/* Nurse Card */}
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">

      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium text-green-600">
          Full Time
        </span>
        <span className="text-sm text-gray-500">
          ₹25,000 - ₹40,000
        </span>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Senior Staff Nurse
      </h3>

      <div className="text-sm text-gray-500 mb-4">
        📍 Chennai • 1-3 Years Experience
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Provide patient care, assist doctors, manage ward activities,
        and ensure smooth hospital operations.
      </p>

      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition">
        Apply Now
      </button>

    </div>

    {/* Doctor Card */}
    <div className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition duration-300">

      <div className="flex justify-between mb-4">
        <span className="text-sm font-medium text-blue-600">
          Immediate Hiring
        </span>
        <span className="text-sm text-gray-500">
          ₹80,000 - ₹1.5L
        </span>
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        Consultant Physician
      </h3>

      <div className="text-sm text-gray-500 mb-4">
        📍 Coimbatore • 3-7 Years Experience
      </div>

      <p className="text-gray-600 text-sm mb-6">
        Diagnose patients, create treatment plans, and guide junior
        medical staff to improve patient outcomes.
      </p>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
        Apply Now
      </button>

    </div>

  </div>

</div>


    
    <section className="mt-20 w-full  bg-white rounded-3xl shadow-2xl p-10 max-w-6xl mx-auto">

  <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
    Current Hiring Details
  </h2>

  <div className="overflow-x-auto">
    <table className="w-full text-left border-collapse">
      
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="p-4">Position</th>
          <th className="p-4">Department</th>
          <th className="p-4">Vacancies</th>
          <th className="p-4">Experience</th>
          <th className="p-4">Location</th>
          <th className="p-4">Salary</th>
        </tr>
      </thead>

      <tbody>

        <tr className="border-b hover:bg-green-50 transition">
          <td className="p-4 font-semibold">Staff Nurse</td>
          <td className="p-4">General Ward</td>
          <td className="p-4">15</td>
          <td className="p-4">0-2 Years</td>
          <td className="p-4">Chennai</td>
          <td className="p-4">₹18,000 - ₹25,000</td>
        </tr>

        <tr className="border-b hover:bg-blue-50 transition">
          <td className="p-4 font-semibold">ICU Nurse</td>
          <td className="p-4">Critical Care</td>
          <td className="p-4">8</td>
          <td className="p-4">2+ Years</td>
          <td className="p-4">Bangalore</td>
          <td className="p-4">₹25,000 - ₹35,000</td>
        </tr>

        <tr className="border-b hover:bg-purple-50 transition">
          <td className="p-4 font-semibold">MBBS Doctor</td>
          <td className="p-4">General Medicine</td>
          <td className="p-4">5</td>
          <td className="p-4">1+ Years</td>
          <td className="p-4">Coimbatore</td>
          <td className="p-4">₹60,000 - ₹90,000</td>
        </tr>

        <tr className="hover:bg-pink-50 transition">
          <td className="p-4 font-semibold">Specialist Doctor</td>
          <td className="p-4">Cardiology</td>
          <td className="p-4">3</td>
          <td className="p-4">3+ Years</td>
          <td className="p-4">Chennai</td>
          <td className="p-4">₹1,20,000+</td>
        </tr>

      </tbody>

    </table>
  </div>

</section>

<section className="mt-20 w-full bg-white rounded-3xl shadow-2xl p-10 max-w-6xl mx-auto">

  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
    Detailed Hiring Information
  </h2>

  <div className="space-y-10">

    {/* Nurse Hiring Detail */}
    <div className="bg-green-50 p-8 rounded-2xl shadow-md">
      <h3 className="text-2xl font-bold text-green-700 mb-4">
        Staff Nurse – General & ICU
      </h3>

      <div className="grid md:grid-cols-2 gap-6 text-gray-700">

        <div>
          <p><strong>Qualification:</strong> B.Sc Nursing / GNM</p>
          <p><strong>Experience:</strong> 0 – 3 Years</p>
          <p><strong>Vacancies:</strong> 20 Positions</p>
          <p><strong>Salary:</strong> ₹18,000 – ₹35,000</p>
          <p><strong>Location:</strong> Chennai & Bangalore</p>
          <p><strong>Working Hours:</strong> Rotational Shifts</p>
        </div>

        <div>
          <p><strong>Key Responsibilities:</strong></p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Monitor patient health and vital signs</li>
            <li>Administer medications and treatments</li>
            <li>Assist doctors during procedures</li>
            <li>Maintain patient records accurately</li>
          </ul>
        </div>

      </div>

      <div className="mt-6">
        <p className="mb-3"><strong>Benefits:</strong> PF, ESI, Free Accommodation, Annual Bonus</p>
        <button className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition">
          Apply for Nurse Position
        </button>
      </div>
    </div>

    {/* Doctor Hiring Detail */}
    <div className="bg-blue-50 p-8 rounded-2xl shadow-md">
      <h3 className="text-2xl font-bold text-blue-700 mb-4">
        MBBS / Specialist Doctor
      </h3>

      <div className="grid md:grid-cols-2 gap-6 text-gray-700">

        <div>
          <p><strong>Qualification:</strong> MBBS / MD / MS</p>
          <p><strong>Experience:</strong> 1 – 5+ Years</p>
          <p><strong>Vacancies:</strong> 8 Positions</p>
          <p><strong>Salary:</strong> ₹60,000 – ₹1,50,000</p>
          <p><strong>Location:</strong> Chennai, Coimbatore</p>
          <p><strong>Working Hours:</strong> 8 Hours / Flexible</p>
        </div>

        <div>
          <p><strong>Key Responsibilities:</strong></p>
          <ul className="list-disc ml-5 mt-2 space-y-1">
            <li>Diagnose and treat patients</li>
            <li>Prescribe medications</li>
            <li>Supervise nursing staff</li>
            <li>Ensure quality healthcare standards</li>
          </ul>
        </div>

      </div>

      <div className="mt-6">
        <p className="mb-3"><strong>Benefits:</strong> Health Insurance, Incentives, Paid Leave, Career Growth</p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
          Apply for Doctor Position
        </button>
      </div>
    </div>

    {/* Contact Information */}
    <div className="bg-gray-100 p-6 rounded-xl text-center">
      <h4 className="text-xl font-semibold mb-2">For More Information</h4>
      <p>Email: hr@hospitalcare.com</p>
      <p>Phone: +91 98765 43210</p>
    </div>

  </div>

</section>


<section className="mt-20 w-full bg-gradient-to-r from-green-100 to-blue-100 rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto">

  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
    Our Hiring Process
  </h2>

  <div className="grid md:grid-cols-4 gap-8 text-center">

    {/* Step 1 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
      <div className="text-4xl font-bold text-green-600 mb-4">01</div>
      <h3 className="text-xl font-semibold mb-2">Apply Online</h3>
      <p className="text-gray-600">
        Submit your application through our official website with updated resume.
      </p>
    </div>

    {/* Step 2 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
      <div className="text-4xl font-bold text-blue-600 mb-4">02</div>
      <h3 className="text-xl font-semibold mb-2">HR Screening</h3>
      <p className="text-gray-600">
        Our HR team will review your profile and shortlist eligible candidates.
      </p>
    </div>

    {/* Step 3 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
      <div className="text-4xl font-bold text-purple-600 mb-4">03</div>
      <h3 className="text-xl font-semibold mb-2">Technical Interview</h3>
      <p className="text-gray-600">
        Attend interview with department head to assess skills and experience.
      </p>
    </div>

    {/* Step 4 */}
    <div className="bg-white p-6 rounded-2xl shadow-lg hover:-translate-y-2 transition duration-300">
      <div className="text-4xl font-bold text-pink-600 mb-4">04</div>
      <h3 className="text-xl font-semibold mb-2">Final Selection</h3>
      <p className="text-gray-600">
        Selected candidates will receive offer letter and joining details.
      </p>
    </div>

  </div>

</section>
<section className="mt-20 w-full bg-white rounded-3xl shadow-2xl p-12 max-w-6xl mx-auto">

  <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
    Employee Benefits & Perks
  </h2>

  <div className="grid md:grid-cols-3 gap-8">

    {/* Benefit 1 */}
    <div className="bg-green-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-green-700 mb-4">
        Health Insurance
      </h3>
      <p className="text-gray-600">
        Comprehensive medical coverage for employees and their immediate family members.
      </p>
    </div>

    {/* Benefit 2 */}
    <div className="bg-blue-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-blue-700 mb-4">
        Paid Leave & Holidays
      </h3>
      <p className="text-gray-600">
        Enjoy annual paid leave, sick leave, and government holidays.
      </p>
    </div>

    {/* Benefit 3 */}
    <div className="bg-purple-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-purple-700 mb-4">
        Career Development
      </h3>
      <p className="text-gray-600">
        Regular training sessions, workshops, and opportunities for promotions.
      </p>
    </div>

    {/* Benefit 4 */}
    <div className="bg-pink-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-pink-700 mb-4">
        Performance Incentives
      </h3>
      <p className="text-gray-600">
        Attractive bonuses and rewards based on performance and dedication.
      </p>
    </div>

    {/* Benefit 5 */}
    <div className="bg-yellow-50 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-yellow-700 mb-4">
        Free Accommodation
      </h3>
      <p className="text-gray-600">
        Comfortable accommodation provided for eligible staff members.
      </p>
    </div>

    {/* Benefit 6 */}
    <div className="bg-gray-100 p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-bold text-gray-700 mb-4">
        Safe Work Environment
      </h3>
      <p className="text-gray-600">
        Modern medical equipment and a supportive healthcare team.
      </p>
    </div>

  </div>

</section>

</section>

   <Footer/>
    </>
  )
}

export default Job
