import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, device, issue, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('imobile');
    const collection = db.collection('repairing');

    const contactData = {
      name,
      email,
      phone: phone || '',
      device: device || '',
      issue: issue || '',
      message,
      createdAt: new Date(),
      status: 'new'
    };

    const result = await collection.insertOne(contactData);

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        id: result.insertedId
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}