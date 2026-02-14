// app/api/convert/route.js
import { NextResponse } from 'next/server';
import { unicodeToLegacy } from '@/lib/converter';

export async function POST(request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // Logic එක Call කරනවා
    const converted = unicodeToLegacy(text);

    return NextResponse.json({ 
      original: text,
      legacy: converted,
      font: "FMAbhaya" 
    });

  } catch (error) {
    return NextResponse.json({ error: 'Failed to convert' }, { status: 500 });
  }
}
