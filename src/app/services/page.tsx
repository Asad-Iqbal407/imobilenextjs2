export default function Services() {
  const services = [
    {
      title: "Screen Replacement",
      description: "Cracked, shattered, or unresponsive screens. We use high-quality OEM screens.",
      price: "Starting at $99",
      icon: "📱",
      features: ["OEM quality screens", "Same-day service", "90-day warranty", "All phone models"]
    },
    {
      title: "Battery Replacement",
      description: "Fast battery drain, won't hold charge, or phone shuts down unexpectedly.",
      price: "Starting at $49",
      icon: "🔋",
      features: ["Genuine batteries", "30-minute service", "1-year warranty", "Performance testing"]
    },
    {
      title: "Camera Repair",
      description: "Front camera, rear camera, or camera module issues.",
      price: "Starting at $79",
      icon: "📷",
      features: ["Camera calibration", "Lens replacement", "Sensor repair", "Quality testing"]
    },
    {
      title: "Charging Port Repair",
      description: "Broken charging port, loose connection, or won't charge properly.",
      price: "Starting at $59",
      icon: "🔌",
      features: ["Port replacement", "Cable testing", "Data transfer", "Fast repair"]
    },
    {
      title: "Speaker/Microphone",
      description: "No sound, distorted audio, or microphone not working.",
      price: "Starting at $39",
      icon: "🔊",
      features: ["Speaker replacement", "Microphone repair", "Audio testing", "Quality check"]
    },
    {
      title: "Water Damage Repair",
      description: "Phone exposed to water, won't turn on, or has corrosion.",
      price: "Starting at $89",
      icon: "💧",
      features: ["Water damage assessment", "Component cleaning", "Corrosion removal", "Data recovery"]
    },
    {
      title: "Back Glass Replacement",
      description: "Cracked or shattered back glass on modern smartphones.",
      price: "Starting at $129",
      icon: "✨",
      features: ["Glass replacement", "Adhesive bonding", "Wireless charging", "Camera alignment"]
    },
    {
      title: "Software Issues",
      description: "Frozen screen, app crashes, system errors, or virus removal.",
      price: "Starting at $29",
      icon: "💻",
      features: ["OS reinstallation", "Virus removal", "Data backup", "App optimization"]
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional mobile phone repair services for all major brands. We use genuine parts and provide warranty on all repairs.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600 mb-4">{service.price}</div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="/contact"
                  className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors block text-center"
                >
                  Get Quote
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands We Service */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Brands We Service</h2>
            <p className="text-lg text-gray-600">We repair all major smartphone brands and models</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 items-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🍎</div>
              <p className="font-semibold">iPhone</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📱</div>
              <p className="font-semibold">Samsung</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🤖</div>
              <p className="font-semibold">Google</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">💜</div>
              <p className="font-semibold">OnePlus</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">📞</div>
              <p className="font-semibold">Motorola</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🔵</div>
              <p className="font-semibold">And More</p>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Our Warranty Guarantee</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              All our repairs come with a comprehensive warranty. We're confident in our work and stand behind every repair we do.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl mb-4">🛡️</div>
                <h3 className="text-xl font-semibold mb-2">Parts Warranty</h3>
                <p>90 days on parts, 1 year on batteries</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold mb-2">Labor Warranty</h3>
                <p>30 days on labor and workmanship</p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-4">📞</div>
                <h3 className="text-xl font-semibold mb-2">Support</h3>
                <p>Lifetime technical support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Get Your Phone Fixed?</h2>
          <p className="text-xl text-gray-600 mb-8">Contact us today for a free diagnosis and repair quote.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get Free Quote
            </a>
            <a
              href="tel:+15551234567"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
            >
              Call Now: (555) 123-4567
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}