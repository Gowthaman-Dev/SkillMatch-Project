import img1 from "../../public/images/qr.webp"   // Better move image to src/assets

const GetApp = () => {
  return (
    <section className="py-24 px-6 bg-white border-t">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* Left Content */}
        <div className="space-y-6">

          <h2 className="text-4xl font-bold text-gray-900">
            Get Our Mobile App
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Download our mobile application from Google Play Store and
            explore verified job opportunities instantly.
            Apply faster, receive real-time updates, and manage your
            applications easily from your phone.
          </p>

          {/* Features */}
          <div className="space-y-3 text-gray-700">

            <div className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <p>Instant job alerts & notifications</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <p>One-click application process</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <p>Track your application status anytime</p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-green-600 font-bold">✓</span>
              <p>Secure & verified job listings</p>
            </div>

          </div>

          {/* CTA Button */}
          <div className="pt-4">
            <button className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
              Download from Play Store
            </button>
          </div>

          <p className="text-sm text-gray-500">
            Free Download • Easy Registration • 100% Secure
          </p>

        </div>

        {/* Right QR Section */}
        <div className="bg-gray-50 p-12 rounded-2xl shadow-md text-center">

          <h3 className="text-2xl font-semibold text-gray-800 mb-6">
            Scan to Install
          </h3>

          <img 
            src={img1}
            alt="QR Code"
            className="w-52 mx-auto"
          />

          <p className="text-gray-500 mt-6">
            Scan the QR code to install the app instantly on your device.
          </p>

        </div>

      </div>

    </section>
  )
}

export default GetApp
