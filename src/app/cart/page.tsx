'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  _id?: string;
  productId: number;
  name: string;
  price: number;
  originalPrice: number;
  brand: string;
  image: string;
  quantity: number;
  category: string;
  addedAt?: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Load cart from API on component mount
  const loadCart = async () => {
    try {
      const response = await fetch('/api/cart');
      if (response.ok) {
        const data = await response.json();
        setCartItems(data);
      } else {
        // Fallback to localStorage if API fails
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          setCartItems(parsedCart);
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  // Listen for cart updates from other pages
  useEffect(() => {
    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const removeFromCart = async (productId: number) => {
    try {
      // Update localStorage immediately for UI responsiveness
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const updatedCart = currentCart.filter((i: any) => i.id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      window.dispatchEvent(new Event('cartUpdated'));

      // Then update database
      await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
      });
      loadCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
      // Revert localStorage change if API call failed
      loadCart();
    }
  };

  const updateQuantity = async (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    try {
      // Update localStorage immediately for UI responsiveness
      const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
      const existing = currentCart.find((i: any) => i.id === productId);
      if (existing) {
        existing.quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(currentCart));
        window.dispatchEvent(new Event('cartUpdated'));
      }

      // Then update database
      await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
      loadCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      // Revert localStorage change if API call failed
      loadCart();
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalSavings = () => {
    return cartItems.reduce((total, item) => total + ((item.originalPrice - item.price) * item.quantity), 0);
  };

  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        {/* Header */}
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your cart is empty. Start shopping to add items to your cart.
              </p>
            </div>
          </div>
        </section>

        {/* Empty Cart */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-lg shadow-md p-12">
              <div className="text-6xl mb-6">🛒</div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Cart is Empty</h2>
              <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
              <div className="space-x-4">
                <Link
                  href="/accessories"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Browse Accessories
                </Link>
                <Link
                  href="/phones"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors"
                >
                  Browse Phones
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Review your items and proceed to checkout. You have {getItemCount()} item{getItemCount() !== 1 ? 's' : ''} in your basket.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md">
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900">Cart Items ({getItemCount()})</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.productId} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <div className="w-full sm:w-24 h-24 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
                            <p className="text-sm text-gray-600 mb-2">{item.brand}</p>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.productId)}
                            className="text-red-500 hover:text-red-700 text-xl"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-blue-600">${item.price}</span>
                            {item.originalPrice > item.price && (
                              <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                            )}
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors"
                            >
                              -
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded-lg flex items-center justify-center hover:border-blue-500 transition-colors"
                            >
                              +
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            {item.originalPrice > item.price && (
                              <div className="text-sm text-green-600">
                                Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({getItemCount()} items)</span>
                  <span className="font-medium">${getTotalPrice().toFixed(2)}</span>
                </div>

                {getTotalSavings() > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>You Save</span>
                    <span className="font-medium">-${getTotalSavings().toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${(getTotalPrice() * 0.08).toFixed(2)}</span>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${(getTotalPrice() * 1.08).toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                  Proceed to Checkout
                </button>

                <Link
                  href="/accessories"
                  className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold hover:bg-gray-300 transition-colors block text-center"
                >
                  Continue Shopping
                </Link>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Secure checkout powered by industry-standard encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
