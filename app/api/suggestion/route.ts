// import { Request } from 'express';
// import openai from '../../../openai';

// export async function GET(request: Request) {
//   // const prompt = request.query.prompt as string;
//   const response = await openai.createCompletion({
//     model: 'text-davinci-003',
//     prompt: "Write a random text prompt for DALL·E to generate an image, this prompt will be shown to the user, include details such as the genre and what type of painting it should be, options can include: oil painting, watercolor, photo-realistic, 4k, abstract, modern, black and white etc. Do not wrap the answer in quotes.",
//     max_tokens: 10,
//     n: 1,
//     stop: ['\n'],
//     temperature: 0.7,
//   });
//   const suggestion = response.data.choices[0].text?.trim();
//   return new Response(JSON.stringify({ suggestion  }), {
//     status: 200,
//   });
// }


