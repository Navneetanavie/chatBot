import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const lowerMessage = message.toLowerCase();

    if (!lowerMessage.includes("joke")) {
      return NextResponse.json({ reply: "I’m still learning. Can you rephrase that?" });
    }

    const response = await fetch("https://official-joke-api.appspot.com/random_joke");

    if (!response.ok) {
      throw new Error(`Joke API error: ${response.statusText}`);
    }

    const data = await response.json();
    const joke = `${data.setup}\n\n${data.punchline}`;

    return NextResponse.json({ reply: joke });
  } catch (error) {
    console.error("Error calling Joke API:", error);
    return NextResponse.json(
      { error: "Failed to fetch joke" },
      { status: 500 }
    );
  }
}
