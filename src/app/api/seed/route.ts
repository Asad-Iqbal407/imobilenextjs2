import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');

    // Sample products data
    const products = [
      {
        id: 1,
        name: "iPhone 15 Pro Max",
        brand: "Apple",
        price: 1199,
        originalPrice: 1299,
        storage: "256GB",
        color: "Natural Titanium",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        features: ["A17 Pro chip", "Pro camera system", "Titanium design", "Action Button"],
        inStock: true,
        rating: 4.8,
        reviews: 1247,
        category: "Phones"
      },
      {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        brand: "Samsung",
        price: 1099,
        originalPrice: 1199,
        storage: "512GB",
        color: "Titanium Black",
        image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop",
        features: ["S Pen included", "200MP camera", "S9 processor", "All-day battery"],
        inStock: true,
        rating: 4.7,
        reviews: 892,
        category: "Phones"
      },
      {
        id: 3,
        name: "Google Pixel 8 Pro",
        brand: "Google",
        price: 899,
        originalPrice: 999,
        storage: "128GB",
        color: "Obsidian",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        features: ["Tensor G3 chip", "Magic Eraser", "7 years updates", "Pure Android"],
        inStock: true,
        rating: 4.6,
        reviews: 654,
        category: "Phones"
      },
      {
        id: 4,
        name: "OnePlus 12",
        brand: "OnePlus",
        price: 799,
        originalPrice: 899,
        storage: "256GB",
        color: "Silky Black",
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
        features: ["120Hz display", "Fast charging", "Hasselblad camera", "OxygenOS"],
        inStock: true,
        rating: 4.5,
        reviews: 423,
        category: "Phones"
      },
      {
        id: 5,
        name: "iPhone 14 Pro",
        brand: "Apple",
        price: 899,
        originalPrice: 999,
        storage: "128GB",
        color: "Deep Purple",
        image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=300&fit=crop",
        features: ["A16 Bionic chip", "Dynamic Island", "Pro camera system", "Always-On display"],
        inStock: true,
        rating: 4.7,
        reviews: 2156,
        category: "Phones"
      },
      {
        id: 6,
        name: "Samsung Galaxy Z Fold 5",
        brand: "Samsung",
        price: 1499,
        originalPrice: 1799,
        storage: "512GB",
        color: "Phantom Black",
        image: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?w=400&h=300&fit=crop",
        features: ["Foldable display", "S Pen support", "Multi-tasking", "Water resistant"],
        inStock: false,
        rating: 4.4,
        reviews: 387,
        category: "Phones"
      },
      {
        id: 7,
        name: "Google Pixel 7a",
        brand: "Google",
        price: 349,
        originalPrice: 399,
        storage: "128GB",
        color: "Sea",
        image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
        features: ["Tensor G2 chip", "3 years updates", "Night Sight", "Water resistant"],
        inStock: true,
        rating: 4.3,
        reviews: 756,
        category: "Phones"
      },
      {
        id: 8,
        name: "OnePlus Nord CE 3",
        brand: "OnePlus",
        price: 299,
        originalPrice: 349,
        storage: "128GB",
        color: "Grey",
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
        features: ["80W charging", "MediaTek Dimensity", "67W charging", "Triple camera"],
        inStock: true,
        rating: 4.2,
        reviews: 298,
        category: "Phones"
      }
    ];

    // Clear existing products
    await db.collection('products').deleteMany({});

    // Insert new products
    const result = await db.collection('products').insertMany(products);

    return NextResponse.json({
      success: true,
      message: `Seeded ${result.insertedCount} products successfully`
    });
  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json({ error: 'Failed to seed products' }, { status: 500 });
  }
}
