import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('imobilenext');
    const contacts = await db.collection('repairing').find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;
    const device = formData.get('device') as string;
    const issue = formData.get('issue') as string;
    const message = formData.get('message') as string;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    // Handle image uploads
    const imageUrls: string[] = [];
    const images = [];

    // Collect all image files
    for (let i = 1; i <= 3; i++) {
      const imageFile = formData.get(`image${i}`) as File;
      if (imageFile && imageFile.size > 0) {
        images.push({ file: imageFile, index: i });
      }
    }

    // Save images to public/uploads directory
    for (const { file, index } of images) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const timestamp = Date.now();
      const filename = `contact_${timestamp}_${index}_${file.name}`;
      const filepath = path.join(process.cwd(), 'public', 'uploads', filename);

      // Ensure uploads directory exists
      const fs = require('fs');
      const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      await writeFile(filepath, buffer);
      imageUrls.push(`/uploads/${filename}`);
    }

    const client = await clientPromise;
    const db = client.db('imobilenext');
    const collection = db.collection('repairing');

    const contactData = {
      name,
      email,
      phone: phone || '',
      device: device || '',
      issue: issue || '',
      message,
      images: imageUrls,
      createdAt: new Date(),
      status: 'new'
    };

    const result = await collection.insertOne(contactData);

    return NextResponse.json(
      {
        message: 'Contact form submitted successfully',
        id: result.insertedId,
        images: imageUrls.length
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