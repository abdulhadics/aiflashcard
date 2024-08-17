import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const systemPrompt = `
You are a flashcard creator. Generate exactly 10 flashcards from the provided text.
Both the front and back of each card should be one sentence long.
Return the flashcards in the following JSON format:
{
  "flashcards": [
    {
      "front": "Front of the card",
      "back": "Back of the card"
    }
  ]
}
`;

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.json(); // Use json() instead of text() for JSON payload
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data.text },
    ],
    response_format: { type: 'json_object' },
  });

  const flashcards = JSON.parse(completion.choices[0].message.content);

  return NextResponse.json(flashcards);
}
