import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
console.log(GOOGLE_API_KEY);
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export async function POST(req: NextRequest) {
  try {
    const { data, prompt }: { data: string; prompt: string } = await req.json();

    console.log("data", data, "prompt", prompt);
    if (!data) {
      return NextResponse.json(
        { message: "Missing required fields: data or prompt" },
        { status: 400 }
      );
    }
    const messageContent = `${data}\n${prompt}`;

    const result = await model.generateContent(messageContent);
    console.log(result);
    const responseString = result.response.text();

    return NextResponse.json({ message: responseString });
  } catch (error) {
    console.error("Error fetching Gemini response:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
