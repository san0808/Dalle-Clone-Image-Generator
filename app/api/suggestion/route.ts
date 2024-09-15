import { NextResponse } from 'next/server';
import openai from '@/openai';

export async function GET(request: Request) {
  try {
    const prompt = 'Generate a suggestion for an image prompt';
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const suggestion = response.data.choices[0].message.content.trim();
    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error('Error generating suggestion:', error);
    return NextResponse.json({ error: 'Failed to generate suggestion' }, { status: 500 });
  }
}