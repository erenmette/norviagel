import { NextResponse } from 'next/server';
import { readFileSync } from 'fs';
import { join } from 'path';

export async function POST(req: Request) {
  try {
    const { messages, locale } = await req.json();

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { message: locale === 'nl'
          ? 'Chat is momenteel niet beschikbaar. Neem contact op via gelgloves@carpartsroosendaal.nl'
          : 'Chat is currently unavailable. Please contact us at gelgloves@carpartsroosendaal.nl'
        },
        { status: 200 }
      );
    }

    // Load instructions from the repo file
    let instructions = '';
    try {
      instructions = readFileSync(
        join(process.cwd(), 'src', 'chat-instructions.md'),
        'utf-8'
      );
    } catch {
      instructions = 'You are a helpful sales assistant for Norvia Gel Glove.';
    }

    const systemPrompt = `${instructions}\n\nThe customer is speaking ${locale === 'nl' ? 'Dutch' : 'English'}. Always respond in the same language as the customer.`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 300,
        system: systemPrompt,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Claude API error:', error);
      throw new Error('Claude API request failed');
    }

    const data = await response.json();
    const assistantMessage = data.content[0]?.text || '';

    return NextResponse.json({ message: assistantMessage });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json(
      { message: 'Sorry, something went wrong. Please try again.' },
      { status: 200 }
    );
  }
}
