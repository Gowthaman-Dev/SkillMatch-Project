import Footer from "./Footer"

const People = () => {
  return (
    <>
    <section className="bg-white py-24 px-5">
  <div className="max-w-5xl mx-auto text-center">

    {/* Small Label */}
    <p className="text-sm tracking-widest text-gray-400 mb-4 uppercase">
      Trusted Platform
    </p>

    {/* Heading */}
    <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6">
      Helping You Find the Right Career Path
    </h1>

    {/* Description */}
    <p className="text-gray-500 text-lg leading-relaxed max-w-3xl mx-auto">
      Thousands of job seekers across India use SkillMatch to discover
      verified opportunities in IT, Banking, Government and Work-From-Home.
      We focus on simplicity, clarity and real job listings — so you can
      apply confidently without confusion.
    </p>

    {/* Stats */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mt-16">

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">10K+</h2>
        <p className="text-gray-400 text-sm mt-2">Active Users</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">5K+</h2>
        <p className="text-gray-400 text-sm mt-2">Job Listings</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">3K+</h2>
        <p className="text-gray-400 text-sm mt-2">Placements</p>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-gray-900">100+</h2>
        <p className="text-gray-400 text-sm mt-2">Companies</p>
      </div>

    </div>

    {/* Button */}
    <div className="mt-14">
      <button className="bg-black text-white px-8 py-3 rounded-xl
                         font-medium hover:bg-gray-800 transition">
        Join SkillMatch
      </button>
    </div>

  </div>
</section>

   <section>
    {/* People & Reviews */}
<section className="mt-16">
  <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
    What Our Users Say
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
    {[
      {
        name: "Arun Kumar",
        role: "Frontend Developer",
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        review:
          "This platform helped me find a job within a week. Very easy to use and genuine job listings.",
      },
      {
        name: "Priya Sharma",
        role: "HR Executive",
        img: "https://randomuser.me/api/portraits/women/45.jpg",
        review:
          "Verified jobs and smooth application flow. I strongly recommend this app for freshers.",
      },
      {
        name: "Sathish",
        role: "Fresher",
        img: "https://randomuser.me/api/portraits/men/76.jpg",
        review:
          "First job search experience was stress-free. Simple UI and fast updates.",
      },
      {
        name: "Divya R",
        role: "UI Designer",
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        review:
          "Beautiful interface and clear job descriptions. Applying for jobs is very smooth.",
      },
      {
        name: "Karthik M",
        role: "Backend Developer",
        img: "https://randomuser.me/api/portraits/men/54.jpg",
        review:
          "I liked how fast recruiters respond. The platform feels reliable and professional.",
      },
      {
        name: "Anitha",
        role: "Career Switcher",
        img: "https://randomuser.me/api/portraits/women/21.jpg",
        review:
          "This app gave me confidence to switch careers. Job filters are very helpful.",
      },
    ].map((user, index) => (
      <div
        key={index}
        className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
      >
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.img}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>
        <p className="text-gray-600 text-sm leading-relaxed">
          {user.review}
        </p>
      </div>
    ))}
  </div>
</section>
   </section>

<Footer/>
    </>
  )
}

export default People