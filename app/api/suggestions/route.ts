import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const response = await fetch(
      `https://suggestqueries.google.com/complete/search?client=firefox&q=${encodeURIComponent(
        query
      )}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Google');
    }

    const data = await response.json();
    return NextResponse.json(data[1] || []);
  } catch (error) {
    console.error('Error in suggestions proxy:', error);
    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
