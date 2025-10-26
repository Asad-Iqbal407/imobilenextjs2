import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '../../lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');
    const cartItems = await db.collection('cart').find({}).toArray();
    return NextResponse.json(cartItems);
  } catch (error) {
    console.error('Error fetching cart:', error);
    return NextResponse.json({ error: 'Failed to fetch cart' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');
    const body = await request.json();

    const { productId, quantity = 1 } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Get product details from products collection
    const product = await db.collection('products').findOne({ id: productId });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if item already exists in cart
    const existingItem = await db.collection('cart').findOne({ productId });

    if (existingItem) {
      // Update quantity
      await db.collection('cart').updateOne(
        { productId },
        { $inc: { quantity } }
      );
    } else {
      // Add new item to cart
      await db.collection('cart').insertOne({
        productId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        brand: product.brand,
        image: product.image,
        quantity,
        category: product.category,
        addedAt: new Date()
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error adding to cart:', error);
    return NextResponse.json({ error: 'Failed to add to cart' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // Try to delete by string productId first, then by numeric productId
    let result = await db.collection('cart').deleteOne({ productId });

    if (result.deletedCount === 0) {
      // Try with numeric productId
      result = await db.collection('cart').deleteOne({ productId: parseInt(productId) });
    }

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Item not found in cart' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error removing from cart:', error);
    return NextResponse.json({ error: 'Failed to remove from cart' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');
    const body = await request.json();

    const { productId, quantity } = body;

    if (!productId || quantity === undefined) {
      return NextResponse.json({ error: 'Product ID and quantity are required' }, { status: 400 });
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or less
      await db.collection('cart').deleteOne({ productId });
    } else {
      // Update quantity
      await db.collection('cart').updateOne(
        { productId },
        { $set: { quantity } }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error updating cart:', error);
    return NextResponse.json({ error: 'Failed to update cart' }, { status: 500 });
  }
}
