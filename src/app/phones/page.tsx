'use client';

import { useState } from 'react';
import { addToCartItem } from '../../lib/cart';

export default function Phones() {
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const phones = [
    {
      id: 1,
      name: "iPhone 15 Pro Max",
      brand: "Apple",
      price: 1199,
      originalPrice: 1299,
      storage: "256GB",
      color: "Natural Titanium",
      image: "📱",
      features: ["A17 Pro chip", "Pro camera system", "Titanium design", "Action Button"],
      inStock: true,
      rating: 4.8,
      reviews: 1247
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      brand: "Samsung",
      price: 1099,
      originalPrice: 1199,
      storage: "512GB",
      color: "Titanium Black",
      image: "📱",
      features: ["S Pen included", "200MP camera", "S9 processor", "All-day battery"],
      inStock: true,
      rating: 4.7,
      reviews: 892
    },
    {
      id: 3,
      name: "Google Pixel 8 Pro",
      brand: "Google",
      price: 899,
      originalPrice: 999,
      storage: "128GB",
      color: "Obsidian",
      image: "📱",
      features: ["Tensor G3 chip", "Magic Eraser", "7 years updates", "Pure Android"],
      inStock: true,
      rating: 4.6,
      reviews: 654
    },
    {
      id: 4,
      name: "OnePlus 12",
      brand: "OnePlus",
      price: 799,
      originalPrice: 899,
      storage: "256GB",
      color: "Silky Black",
      image: "📱",
      features: ["120Hz display", "Fast charging", "Hasselblad camera", "OxygenOS"],
      inStock: true,
      rating: 4.5,
      reviews: 423
    },
    {
      id: 5,
      name: "iPhone 14 Pro",
      brand: "Apple",
      price: 899,
      originalPrice: 999,
      storage: "128GB",
      color: "Deep Purple",
      image: "📱",
      features: ["A16 Bionic chip", "Dynamic Island", "Pro camera system", "Always-On display"],
      inStock: true,
      rating: 4.7,
      reviews: 2156
    },
    {
      id: 6,
      name: "Samsung Galaxy Z Fold 5",
      brand: "Samsung",
      price: 1499,
      originalPrice: 1799,
      storage: "512GB",
      color: "Phantom Black",
      image: "📱",
      features: ["Foldable display", "S Pen support", "Multi-tasking", "Water resistant"],
      inStock: false,
      rating: 4.4,
      reviews: 387
    },
    {
      id: 7,
      name: "Google Pixel 7a",
      brand: "Google",
      price: 349,
      originalPrice: 399,
      storage: "128GB",
      color: "Sea",
      image: "📱",
      features: ["Tensor G2 chip", "3 years updates", "Night Sight", "Water resistant"],
      inStock: true,
      rating: 4.3,
      reviews: 756
    },
    {
      id: 8,
      name: "OnePlus Nord CE 3",
      brand: "OnePlus",
      price: 299,
      originalPrice: 349,
      storage: "128GB",
      color: "Grey",
      image: "📱",
      features: ["80W charging", "MediaTek Dimensity", "67W charging", "Triple camera"],
      inStock: true,
      rating: 4.2,
      reviews: 298
    }
  ];

  const brands = ["All", "Apple", "Samsung", "Google", "OnePlus"];

  // Filter and sort phones
  const filteredPhones = phones.filter(phone =>
    selectedBrand === 'All' || phone.brand === selectedBrand
  );

  const sortedPhones = [...filteredPhones].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id; // Assuming higher ID = newer
      default:
        return 0;
    }
  });

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Latest Mobile Phones</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the latest smartphones from top brands. Competitive prices, genuine products, and expert advice.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`px-4 py-2 rounded-lg border transition-colors ${
                    selectedBrand === brand
                      ? 'border-blue-500 bg-blue-50 text-blue-600'
                      : 'border-gray-300 hover:border-blue-500 hover:text-blue-600'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
            <div className="flex gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest First</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {sortedPhones.map((phone) => (
              <div key={phone.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="text-6xl mb-4 text-center">{phone.image}</div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{phone.name}</h3>
                    <p className="text-sm text-gray-600">{phone.brand} • {phone.storage} • {phone.color}</p>
                  </div>

                  <div className="flex items-center mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-sm ${i < Math.floor(phone.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {phone.rating} ({phone.reviews})
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl font-bold text-blue-600">${phone.price}</span>
                      <span className="text-lg text-gray-500 line-through">${phone.originalPrice}</span>
                    </div>
                    <div className="text-sm text-green-600 font-medium">
                      Save ${(phone.originalPrice - phone.price)}
                    </div>
                  </div>

                  <div className="mb-4">
                    <ul className="text-xs text-gray-600 space-y-1">
                      {phone.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx}>• {feature}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => phone.inStock && addToCartItem(phone)}
                      className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                        phone.inStock
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!phone.inStock}
                    >
                      {phone.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
                      ❤️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8">Get notified about new phone releases and special offers</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}