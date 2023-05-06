// Import necessary modules
const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// Create a new router
const imageRouter = express.Router();

// Set up a connection to MongoDB
const client = new MongoClient('mongodb://localhost:27017', { useUnifiedTopology: true });
client.connect();

// Define the GET route to retrieve all images
imageRouter.get('/', async (req, res) => {
  try {
    // Get a reference to the "images" collection in MongoDB
    const collection = client.db('your_database_name').collection('images');
    
    // Query MongoDB to retrieve all images
    const images = await collection.find().toArray();

    // Return the retrieved images as a JSON response
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});

// Export the router
module.exports = imageRouter;
