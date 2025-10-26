import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');

    // Sample products data (phones)
    const phones = [
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

    // Accessories data from data.ts
    const accessories = [
      // Smartphones/Cell Phones
      {
        id: 9,
        name: "iPhone 15 Pro Max Case",
        category: "Cases",
        price: 39.99,
        originalPrice: 49.99,
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 234,
        inStock: true,
        features: ["Military-grade protection", "Wireless charging compatible", "Precise cutouts"]
      },
      {
        id: 10,
        name: "Samsung Galaxy S24 Screen Protector",
        category: "Touch+Display",
        price: 24.99,
        originalPrice: 34.99,
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 156,
        inStock: true,
        features: ["9H hardness", "Oleophobic coating", "Bubble-free installation"]
      },
      {
        id: 11,
        name: "Refurbished iPhone 13",
        category: "Refurbished",
        price: 599.99,
        originalPrice: 799.99,
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 89,
        inStock: true,
        features: ["90-day warranty", "Like new condition", "All accessories included"]
      },

      // Sound & Audio
      {
        id: 12,
        name: "Sony WH-1000XM5",
        category: "Earbuds",
        price: 299.99,
        originalPrice: 399.99,
        brand: "Sony",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        rating: 4.9,
        reviews: 1234,
        inStock: true,
        features: ["Industry-leading noise canceling", "30-hour battery", "Hi-Res audio"]
      },
      {
        id: 13,
        name: "USB-C to Lightning Cable",
        category: "Audio Cables",
        price: 19.99,
        originalPrice: 29.99,
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 445,
        inStock: true,
        features: ["MFi certified", "2m length", "Fast charging support"]
      },
      {
        id: 14,
        name: "Wireless Earbuds Pro",
        category: "Earphones",
        price: 129.99,
        originalPrice: 179.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 234,
        inStock: true,
        features: ["Active noise canceling", "24-hour battery", "Touch controls"]
      },
      {
        id: 15,
        name: "Bluetooth Speaker",
        category: "Speakers",
        price: 59.99,
        originalPrice: 79.99,
        brand: "JBL",
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 456,
        inStock: true,
        features: ["Waterproof IPX7", "20-hour battery", "360° sound"]
      },
      {
        id: 16,
        name: "Professional Microphone",
        category: "Microphones",
        price: 149.99,
        originalPrice: 199.99,
        brand: "Audio-Technica",
        image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 178,
        inStock: true,
        features: ["Cardioid pickup pattern", "USB connectivity", "Pop filter included"]
      },
      {
        id: 17,
        name: "Neckband Wireless Headphones",
        category: "Neckband",
        price: 79.99,
        originalPrice: 109.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 145,
        inStock: true,
        features: ["20-hour battery", "Magnetic earbuds", "Quick charge"]
      },

      // Gadgets
      {
        id: 18,
        name: "Samsung Galaxy Watch 6",
        category: "Smartwatches",
        price: 349.99,
        originalPrice: 449.99,
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 567,
        inStock: true,
        features: ["Health monitoring", "GPS tracking", "40mm case"]
      },
      {
        id: 19,
        name: "Digital Stylus Pen",
        category: "Digital Pen",
        price: 49.99,
        originalPrice: 69.99,
        brand: "Wacom",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 123,
        inStock: true,
        features: ["Pressure sensitivity", "Palm rejection", "USB rechargeable"]
      },
      {
        id: 20,
        name: "WiFi Security Camera",
        category: "Surveillance Camera",
        price: 89.99,
        originalPrice: 129.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 234,
        inStock: true,
        features: ["1080p HD", "Night vision", "Motion detection"]
      },
      {
        id: 21,
        name: "Car Cigarette Lighter Adapter",
        category: "Cigarette Lighter",
        price: 14.99,
        originalPrice: 19.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=300&fit=crop",
        rating: 4.1,
        reviews: 89,
        inStock: true,
        features: ["12V output", "Built-in fuse", "Universal fit"]
      },

      // SIM Cards
      {
        id: 22,
        name: "Prepaid SIM Card",
        category: "Prepaid",
        price: 9.99,
        originalPrice: 14.99,
        brand: "AT&T",
        image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 345,
        inStock: true,
        features: ["30-day validity", "Unlimited data", "Nationwide coverage"]
      },
      {
        id: 23,
        name: "Data Only SIM",
        category: "Data SIM",
        price: 19.99,
        originalPrice: 29.99,
        brand: "Verizon",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 156,
        inStock: true,
        features: ["100GB data", "No contract", "Hotspot compatible"]
      },
      {
        id: 24,
        name: "eSIM Activation Kit",
        category: "eSIM",
        price: 4.99,
        originalPrice: 9.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 78,
        inStock: true,
        features: ["Digital activation", "QR code setup", "Multiple carriers"]
      },

      // Accessories
      {
        id: 25,
        name: "OTG USB Adapter",
        category: "OTG Adapter",
        price: 12.99,
        originalPrice: 17.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 234,
        inStock: true,
        features: ["USB 3.0", "Lightning compatible", "Durable construction"]
      },
      {
        id: 26,
        name: "Ring Light with Tripod",
        category: "Ringlight",
        price: 79.99,
        originalPrice: 99.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 89,
        inStock: true,
        features: ["10-inch ring light", "Adjustable brightness", "Phone holder included"]
      },
      {
        id: 27,
        name: "Car Phone Mount",
        category: "Supports",
        price: 14.99,
        originalPrice: 19.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 167,
        inStock: true,
        features: ["Universal fit", "Strong suction cup", "360° rotation"]
      },
      {
        id: 28,
        name: "Blue Light Blocking Glasses",
        category: "Glasses",
        price: 29.99,
        originalPrice: 39.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 145,
        inStock: true,
        features: ["Anti-blue light", "UV protection", "Lightweight frame"]
      },

      // Components
      {
        id: 29,
        name: "Camera Lens Kit",
        category: "Lens",
        price: 79.99,
        originalPrice: 109.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 123,
        inStock: true,
        features: ["Wide angle lens", "Macro lens", "Fishteye lens"]
      },
      {
        id: 30,
        name: "Professional Camera Lens",
        category: "Camera Lens",
        price: 299.99,
        originalPrice: 399.99,
        brand: "Canon",
        image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 89,
        inStock: true,
        features: ["85mm focal length", "f/1.4 aperture", "Image stabilization"]
      },
      {
        id: 31,
        name: "LCD Display Connector",
        category: "LCD Connector",
        price: 24.99,
        originalPrice: 34.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1609592806580-6a8c8e1b1b0b?w=400&h=300&fit=crop",
        rating: 4.2,
        reviews: 67,
        inStock: true,
        features: ["Flexible cable", "Gold plated", "Easy installation"]
      },
      {
        id: 32,
        name: "Privacy Screen Protector",
        category: "Touch+Display",
        price: 16.99,
        originalPrice: 24.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        rating: 4.1,
        reviews: 78,
        inStock: true,
        features: ["Anti-glare coating", "Blue light filter", "2-way privacy"]
      },
      {
        id: 33,
        name: "Anker PowerCore 20K",
        category: "Batteries",
        price: 49.99,
        originalPrice: 69.99,
        brand: "Anker",
        image: "https://images.unsplash.com/photo-1609592806580-6a8c8e1b1b0b?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 892,
        inStock: true,
        features: ["20000mAh capacity", "22.5W fast charging", "Multi-device charging"]
      },

      // Computing
      {
        id: 34,
        name: "MagSafe Charger",
        category: "Adapters",
        price: 39.99,
        originalPrice: 49.99,
        brand: "Apple",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 678,
        inStock: true,
        features: ["15W wireless charging", "MagSafe technology", "LED indicator"]
      },
      {
        id: 35,
        name: "Laptop Sleeve 15-inch",
        category: "Bag for Laptop",
        price: 34.99,
        originalPrice: 49.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 234,
        inStock: true,
        features: ["Water resistant", "Padded protection", "Multiple compartments"]
      },
      {
        id: 36,
        name: "Portable SSD 1TB",
        category: "Bag for Laptop",
        price: 89.99,
        originalPrice: 119.99,
        brand: "Samsung",
        image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop",
        rating: 4.8,
        reviews: 345,
        inStock: true,
        features: ["USB 3.2 Gen 2", "Up to 1050MB/s", "Password protection"]
      },
      {
        id: 37,
        name: "External Monitor 24-inch",
        category: "Display For Laptop",
        price: 149.99,
        originalPrice: 199.99,
        brand: "Dell",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 178,
        inStock: true,
        features: ["1080p Full HD", "75Hz refresh rate", "Thin bezels"]
      },
      {
        id: 38,
        name: "Mechanical Gaming Keyboard",
        category: "Keyboard",
        price: 89.99,
        originalPrice: 129.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 456,
        inStock: true,
        features: ["RGB backlighting", "Mechanical switches", "Anti-ghosting"]
      },
      {
        id: 39,
        name: "Wireless Optical Mouse",
        category: "Mouse",
        price: 24.99,
        originalPrice: 34.99,
        brand: "Logitech",
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 567,
        inStock: true,
        features: ["2.4GHz wireless", "1000 DPI", "Ergonomic design"]
      },

      // Tools Category
      {
        id: 40,
        name: "Professional Cleaning Kit",
        category: "Cleaning Tools",
        price: 29.99,
        originalPrice: 39.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        rating: 4.5,
        reviews: 123,
        inStock: true,
        features: ["Anti-static brushes", "Cleaning solution", "Microfiber cloths"]
      },
      {
        id: 41,
        name: "Phone Opening Tools Set",
        category: "Equipments",
        price: 49.99,
        originalPrice: 69.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=300&fit=crop",
        rating: 4.6,
        reviews: 89,
        inStock: true,
        features: ["Precision screwdrivers", "Plastic pry tools", "Suction cup"]
      },
      {
        id: 42,
        name: "B7000 Glue Adhesive",
        category: "Glues",
        price: 12.99,
        originalPrice: 17.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=300&fit=crop",
        rating: 4.4,
        reviews: 234,
        inStock: true,
        features: ["Strong bonding", "Flexible", "Quick drying"]
      },
      {
        id: 43,
        name: "Digital Microscope",
        category: "Microscopes and Magnifiers",
        price: 79.99,
        originalPrice: 109.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=400&h=300&fit=crop",
        rating: 4.7,
        reviews: 156,
        inStock: true,
        features: ["HD camera", "LED lighting", "USB connectivity"]
      },
      {
        id: 44,
        name: "Lead-Free Solder Wire",
        category: "Solder Wires",
        price: 8.99,
        originalPrice: 12.99,
        brand: "Generic",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        rating: 4.3,
        reviews: 78,
        inStock: true,
        features: ["0.8mm diameter", "Flux core", "Lead-free"]
      }
    ];

    const products = [...phones, ...accessories];

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
