export default function Home() {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Professional Mobile Phone Repair
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Fast, reliable, and affordable mobile phone repairs. We fix screens, batteries, cameras, and more with expert technicians.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/services"
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Our Services
              </a>
              <a
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose iMobile Repair?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We provide top-quality mobile repair services with certified technicians and genuine parts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Fast Service</h3>
              <p className="text-gray-600">Most repairs completed within 30 minutes to 2 hours.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔧</div>
              <h3 className="text-xl font-semibold mb-2">Expert Technicians</h3>
              <p className="text-gray-600">Certified professionals with years of experience.</p>
            </div>

            <div className="text-center p-6 bg-white rounded-lg shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Affordable Prices</h3>
              <p className="text-gray-600">Competitive pricing with no hidden fees.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular Services</h2>
            <p className="text-lg text-gray-600">We repair all major brands including iPhone, Samsung, Google, and more.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📱</div>
              <h3 className="font-semibold mb-2">Screen Replacement</h3>
              <p className="text-sm text-gray-600">Cracked or broken screens</p>
            </div>

            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🔋</div>
              <h3 className="font-semibold mb-2">Battery Replacement</h3>
              <p className="text-sm text-gray-600">Fast battery drain issues</p>
            </div>

            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">📷</div>
              <h3 className="font-semibold mb-2">Camera Repair</h3>
              <p className="text-sm text-gray-600">Front/back camera issues</p>
            </div>

            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-3xl mb-3">🔊</div>
              <h3 className="font-semibold mb-2">Speaker/Microphone</h3>
              <p className="text-sm text-gray-600">Audio problems</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <a
              href="/services"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Your Phone Fixed?</h2>
          <p className="text-xl mb-8">Contact us today for a free diagnosis and quote.</p>
          <a
            href="/contact"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get Started
          </a>
        </div>
      </section>
    </div>
  );
}
