const Footer = () => {
  return (
    <footer className="bg-[#111111] text-gray-400 mt-24">
      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* Top Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-14">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-5">
              SkillMatch
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              A modern job platform connecting talented professionals
              with trusted companies. Verified listings. Simple process.
              Real opportunities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-medium mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              {["Find Jobs", "Companies", "Post a Job", "Career Advice"].map(
                (item, i) => (
                  <li
                    key={i}
                    className="hover:text-white transition cursor-pointer"
                  >
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-medium mb-6">Resources</h3>
            <ul className="space-y-4 text-sm">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms & Conditions",
                "Contact Us",
              ].map((item, i) => (
                <li
                  key={i}
                  className="hover:text-white transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-medium mb-6">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-5">
              Get job alerts and career tips in your inbox.
            </p>

            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-2 rounded-l-xl
                           bg-[#1c1c1c] border border-gray-700
                           text-sm focus:outline-none text-white"
              />
              <button
                className="bg-white text-black px-5
                           rounded-r-xl text-sm
                           hover:bg-gray-200 transition"
              >
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex
                        flex-col md:flex-row justify-between items-center gap-6">

          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} SkillMatch. All rights reserved.
          </p>

          <div className="flex gap-6 text-gray-500">
            <span className="hover:text-white transition cursor-pointer">🌐</span>
            <span className="hover:text-white transition cursor-pointer">💼</span>
            <span className="hover:text-white transition cursor-pointer">🐦</span>
            <span className="hover:text-white transition cursor-pointer">📸</span>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
