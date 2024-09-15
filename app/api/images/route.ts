import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
require('dotenv').config();
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
const client = new MongoClient(uri);

export async function GET() {
  try {
    await client.connect();
    // Connect to MongoDB
    await client.connect();
    await client.connect();

    // Get a reference to the "test.images" collection in MongoDB
    const collection = client.db('test').collection('images');

    // Query MongoDB to retrieve all images
    const images = await collection.find().toArray();

    // Close the MongoDB connection
    await client.close();

    return NextResponse.json(images);
  } catch (error) {
    console.error('Error retrieving images:', error);
    return NextResponse.json({ error: 'Failed to retrieve images' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Connect to MongoDB
    await client.connect();

    // Get a reference to the "test.images" collection in MongoDB
    const collection = client.db('test').collection('images');

    // Get the image data from the request body
    const imageData = await req.json();

    // Store the image data in MongoDB
    const result = await collection.insertOne(imageData);

    // Close the MongoDB connection
    await client.close();

    return NextResponse.json({ _id: result.insertedId });
  } catch (error) {
    console.error('Error storing image:', error);
    return NextResponse.json({ error: 'Failed to store image' }, { status: 500 });
  }
}