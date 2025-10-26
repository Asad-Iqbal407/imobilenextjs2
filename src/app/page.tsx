'use client';

import { useState } from 'react';
import Link from 'next/link';
import { accessories } from './accessories/data';
import { addToCartItem } from '../lib/cart';

export default function Home() {
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);


  // Filter accessories based on selected subcategories
  const filteredAccessories = selectedSubcategories.length === 0
    ? accessories
    : accessories.filter(accessory =>
        selectedSubcategories.some(sub =>
          accessory.category.toLowerCase().includes(sub.toLowerCase()) ||
          accessory.name.toLowerCase().includes(sub.toLowerCase())
        )
      );
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

      {/* Our Services */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600">Professional mobile phone repairs with warranty</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow">
              <div className="text-4xl mb-3">📱</div>
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

          <div className="text-center">
            <a
              href="/services"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mr-4"
            >
              View All Services
            </a>
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

      {/* Shop by Category */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find the perfect products for your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Smartphones/Cell Phones",
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
                count: 3,
                slug: "smartphones-cell-phones"
              },
              {
                name: "Sound & Audio",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
                count: 6,
                slug: "sound-audio"
              },
              {
                name: "Gadgets",
                image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
                count: 6,
                slug: "gadgets"
              },
              {
                name: "SIM Cards",
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
                count: 3,
                slug: "sim-cards"
              },
              {
                name: "Accessories",
                image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
                count: 6,
                slug: "accessories"
              },
              {
                name: "Components",
                image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=300&fit=crop",
                count: 6,
                slug: "components"
              },
              {
                name: "Tools",
                image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
                count: 6,
                slug: "tools"
              },
              {
                name: "Computing",
                image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
                count: 6,
                slug: "computing"
              }
            ].map((category) => (
              <Link
                key={category.name}
                href={`/accessories/${category.slug}`}
                className="border rounded-lg border-gray-200 hover:border-blue-300 transition-all overflow-hidden block"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{category.name}</h3>
                  <span className="text-gray-500 text-sm">({category.count} products)</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Products Section */}
          <div>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {selectedSubcategories.length > 0 ? 'Filtered Products' : 'Featured Products'}
              </h2>
              <p className="text-lg text-gray-600">
                {selectedSubcategories.length > 0 ? `Showing products from: ${selectedSubcategories.join(', ')}` : 'Latest smartphones and premium accessories'}
              </p>
              {selectedSubcategories.length > 0 && (
                <button
                  onClick={() => setSelectedSubcategories([])}
                  className="mt-4 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
              {filteredAccessories.map((accessory) => (
                <a
                  key={accessory.id}
                  href={`/accessories/${accessory.id}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow block"
                >
                  <div className="p-6">
                    <div className="w-full h-48 mb-4 overflow-hidden rounded-lg">
                      <img
                        src={accessory.image}
                        alt={accessory.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="mb-3">
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                        {accessory.category}
                      </span>
                    </div>

                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{accessory.name}</h3>
                      <p className="text-sm text-gray-600">{accessory.brand}</p>
                    </div>

                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${i < Math.floor(accessory.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 ml-2">
                        {accessory.rating} ({accessory.reviews})
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl font-bold text-blue-600">${accessory.price}</span>
                        <span className="text-lg text-gray-500 line-through">${accessory.originalPrice}</span>
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Save ${(accessory.originalPrice - accessory.price).toFixed(2)}
                      </div>
                    </div>

                    <div className="mb-4">
                      <ul className="text-xs text-gray-600 space-y-1">
                        {accessory.features.slice(0, 2).map((feature, idx) => (
                          <li key={idx}>• {feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex gap-2">
                      <button
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                          accessory.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!accessory.inStock}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (accessory.inStock) {
                            // Use the centralized addToCartItem function
                            addToCartItem(accessory);
                          }
                        }}
                      >
                        {accessory.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </button>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = '/cart';
                        }}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors"
                      >
                        🛒
                      </button>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center">
              <a
                href="/phones"
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-900 transition-colors mr-4"
              >
                Browse All Phones
              </a>
              <a
                href="/accessories"
                className="border-2 border-gray-800 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 hover:text-white transition-colors"
              >
                Browse Accessories
              </a>
            </div>
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
