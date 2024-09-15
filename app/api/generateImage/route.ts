import openai from '@/openai';
import { MongoClient, ObjectId } from 'mongodb';
require('dotenv').config();
const uri = process.env.MONGODB_URI;
if (!uri) {
  throw new Error('MONGODB_URI environment variable is not set');
}
const client = new MongoClient(uri);

export async function POST(req: Request) {
  const { prompt } = await req.json();

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: '512x512',
    });

    const imageUrl = response.data.data[0].url;
    const imageData = await fetch(imageUrl).then(res => res.arrayBuffer());

    // Connect to MongoDB
    await client.connect();

    // Get a reference to the "test.images" collection in MongoDB
    const collection = client.db('test').collection('images');

    // Store the image data in MongoDB
    const result = await collection.insertOne({
      prompt,
      imageData: Buffer.from(imageData),
      contentType: response.data.data[0].mime,
    });

    // Close the MongoDB connection
    await client.close();

    // Retrieve the inserted document using the insertedId
    const insertedDocument = await collection.findOne({ _id: new ObjectId(result.insertedId) });

    return new Response(JSON.stringify(insertedDocument), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error generating image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}