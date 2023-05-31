const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

// Create a new router
const imageRouter = express.Router();

// Set up a connection to MongoDB
const client = new MongoClient(process.env.MONGODB_URI, { useUnifiedTopology: true });

// Define the GET route to retrieve all images
imageRouter.get('/', async (req, res) => {
  try {
    // Connect to MongoDB
    await client.connect();
    
    // Get a reference to the "images" collection in MongoDB
    const collection = client.db().collection('images');
    
    // Query MongoDB to retrieve all images
    const images = await collection.find().toArray();
    console.log(images);
    
    // Return the retrieved images as a JSON response
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  } finally {
    // Close the MongoDB connection
    await client.close();
  }
});

// Export the router
module.exports = imageRouter;

