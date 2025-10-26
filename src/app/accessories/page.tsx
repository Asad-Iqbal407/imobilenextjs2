'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { accessories } from './data';
import { addToCartItem } from '../../lib/cart';

export default function Accessories() {
  const [selectedPriceRange, setSelectedPriceRange] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const searchParams = useSearchParams();

  // Handle URL query parameters
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Filter and sort accessories
  const filteredAccessories = accessories.filter(accessory => {
    const brandMatch = selectedBrands.length === 0 || selectedBrands.includes(accessory.brand);
    const categoryMatch = selectedCategory === '' ||
      accessory.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      accessory.name.toLowerCase().includes(selectedCategory.toLowerCase());

    let priceMatch = true;
    if (selectedPriceRange.length > 0) {
      priceMatch = selectedPriceRange.some(range => {
        switch (range) {
          case 'under-25':
            return accessory.price < 25;
          case '25-50':
            return accessory.price >= 25 && accessory.price < 50;
          case '50-100':
            return accessory.price >= 50 && accessory.price < 100;
          case 'over-100':
            return accessory.price >= 100;
          default:
            return true;
        }
      });
    }

    return brandMatch && categoryMatch && priceMatch;
  });

  const sortedAccessories = [...filteredAccessories].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const handlePriceRangeChange = (range: string) => {
    setSelectedPriceRange(prev =>
      prev.includes(range)
        ? prev.filter(r => r !== range)
        : [...prev, range]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Mobile Accessories</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete your mobile experience with our wide range of premium accessories. Quality products at competitive prices.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedPriceRange.includes('under-25')}
                      onChange={() => handlePriceRangeChange('under-25')}
                    />
                    <span>Under $25</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedPriceRange.includes('25-50')}
                      onChange={() => handlePriceRangeChange('25-50')}
                    />
                    <span>$25 - $50</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedPriceRange.includes('50-100')}
                      onChange={() => handlePriceRangeChange('50-100')}
                    />
                    <span>$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={selectedPriceRange.includes('over-100')}
                      onChange={() => handlePriceRangeChange('over-100')}
                    />
                    <span>Over $100</span>
                  </label>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Brands</h3>
                <div className="space-y-2">
                    {["Apple", "Samsung", "Sony", "Anker", "JBL", "Generic"].map((brand) => (
                      <label key={brand} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-2"
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandChange(brand)}
                        />
                        <span>{brand}</span>
                      </label>
                    ))}
                  </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-full">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">Showing {sortedAccessories.length} products</p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="featured">Sort by: Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {sortedAccessories.map((accessory) => (
                <div key={accessory.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <Link href={`/accessories/${accessory.id}`} className="block">
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
                    </div>
                  </Link>

                  <div className="p-6 pt-0 mt-auto">
                    <div className="flex gap-2">
                      <button
                        onClick={() => accessory.inStock && addToCartItem(accessory)}
                        className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-colors ${
                          accessory.inStock
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!accessory.inStock}
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
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-lg text-gray-600">Find exactly what you need</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Phone Cases", icon: "📱", count: 25, filter: "Cases" },
              { name: "Screen Protectors", icon: "✨", count: 12, filter: "Touch+Display" },
              { name: "Chargers", icon: "🔌", count: 18, filter: "Adapters" },
              { name: "Headphones", icon: "🎧", count: 8, filter: "Earbuds" },
              { name: "Power Banks", icon: "🔋", count: 15, filter: "Batteries" },
              { name: "Cables", icon: "🔗", count: 22, filter: "Audio Cables" }
            ].map((category) => (
              <Link
                key={category.name}
                href={`/accessories?category=${encodeURIComponent(category.filter)}`}
                className="text-center p-6 border rounded-lg hover:shadow-md transition-shadow cursor-pointer block"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.count} items</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}