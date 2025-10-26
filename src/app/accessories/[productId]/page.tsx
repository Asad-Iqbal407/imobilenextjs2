"use client";

import Link from 'next/link';
import { accessories } from '../data';
import { addToCartItem } from '../../../lib/cart';

interface Props {
  params: { productId: string };
}

export default function ProductPage({ params }: Props) {
  const id = parseInt(params.productId, 10);
  const product = accessories.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-4">We couldn't find the product you're looking for.</p>
        <Link href="/accessories" className="mt-6 inline-block text-blue-600">Back to accessories</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <div className="flex gap-8">
        <div className="text-8xl">{product.image}</div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-sm text-gray-600 mt-1">{product.brand} · {product.category}</p>

          <div className="mt-4">
            <span className="text-2xl font-bold text-blue-600">${product.price}</span>
            <span className="text-lg text-gray-500 line-through ml-3">${product.originalPrice}</span>
            <div className="text-sm text-green-600 mt-1">Save ${(product.originalPrice - product.price).toFixed(2)}</div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Features</h3>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              {product.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => addToCartItem(product)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              Add to Cart
            </button>
            <Link href="/accessories" className="px-4 py-2 border rounded-lg">Back</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
