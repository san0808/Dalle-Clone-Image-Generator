export async function GET(request: Request) {
  const response = await fetch(
    "http://localhost:3000/",
    {
      cache: "no-store",
    }
  );
  const textData = await response.text();

  return new Response(JSON.stringify(textData.trim()), {
    status: 200,
  });
}

//this is not in use for now as route.ts still gives some error to connect






// import { NextApiRequest, NextApiResponse } from 'next';
// import axios from 'axios';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== 'GET') {
//     res.status(405).json({ message: 'Method not allowed' });
//     return;
//   }
  
//   const prompt = req.query.prompt;
//   const gptResponse = await axios.get(`https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${prompt}&max_tokens=50`, {
//     headers: {
//       Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
//     }
//   });
//   const suggestions = gptResponse.data.choices[0].text;
//   res.json({ suggestions });
// }


  