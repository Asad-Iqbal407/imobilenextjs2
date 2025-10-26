'use client';

import { useState, useEffect } from 'react';
import AdminProductForm from '../components/AdminProductForm';
import AdminProductList from '../components/AdminProductList';
import AdminContactList from '../components/AdminContactList';
import AdminCartList from '../components/AdminCartList';

interface Product {
  _id: string;
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  storage: string;
  color: string;
  image: string;
  features: string[];
  inStock: boolean;
  rating: number;
  reviews: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'contacts' | 'cart'>('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Simple authentication (in production, use proper auth)
  const ADMIN_PASSWORD = 'admin123'; // Change this to a secure password

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
    } else {
      alert('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('adminAuthenticated');
  };

  const handleAddProduct = async (productData: Omit<Product, '_id' | 'id' | 'createdAt'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productData)
      });

      if (!response.ok) throw new Error('Failed to add product');

      setShowProductForm(false);
      // Refresh will happen via the component
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    }
  };

  const handleEditProduct = async (productData: Omit<Product, '_id' | 'id' | 'createdAt'>) => {
    if (!editingProduct) return;

    try {
      const response = await fetch('/api/products', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: editingProduct.id, ...productData })
      });

      if (!response.ok) throw new Error('Failed to update product');

      setEditingProduct(null);
      setShowProductForm(false);
      window.location.reload(); // Simple refresh for now
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product');
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowProductForm(true);
  };

  const handleCancel = () => {
    setShowProductForm(false);
    setEditingProduct(null);
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('adminAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Admin Login</h1>
            <p className="text-gray-600 mt-2">Enter password to access admin panel</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter admin password"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'products', label: 'Products', icon: '📦' },
              { id: 'contacts', label: 'Contacts', icon: '📧' },
              { id: 'cart', label: 'Cart Items', icon: '🛒' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center px-1 py-2 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="space-y-8">
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Product Management</h2>
                <button
                  onClick={() => setShowProductForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Add New Product
                </button>
              </div>

              {showProductForm && (
                <div className="mb-8">
                  <AdminProductForm
                    product={editingProduct || undefined}
                    onSubmit={editingProduct ? handleEditProduct : handleAddProduct}
                    onCancel={handleCancel}
                  />
                </div>
              )}

              <AdminProductList onEdit={handleEdit} />
            </div>
          )}

          {activeTab === 'contacts' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Submissions</h2>
              <AdminContactList />
            </div>
          )}

          {activeTab === 'cart' && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Cart Items</h2>
              <AdminCartList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
