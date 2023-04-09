const express = require('express');
const axios = require('axios');

const app = express();

const router = express.Router();
const openai = require('./openai.js');


app.get("/api/suggest", async (req, res) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt:
      "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
    max_tokens: 100,
    temperature: 0.8,
  });

  const responseText = response.data.choices[0].text;

  res.send(responseText);
});

// app.use('/', router);

// app.get('/api/generate-image', async (req, res) => {
//     const prompt = req.query.prompt;
  
//     const response = await axios.post('https://api.openai.com/v1/images/generations', {
//       model: 'image-alpha-001',
//       prompt,
//       size: '512x512',
//       response_format: 'url'
//     }, {
//       headers: {
//         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
//       }
//     });
  
//     const imageUrl = response.data.data[0].url;
//     res.send({ imageUrl });
//   });

  
  
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
