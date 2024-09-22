import { createOpenAI, openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    // const groq = createOpenAI({
    //     baseURL: 'https://api.groq.com/openai/v1',
    //     apiKey: process.env.GROQ_API_KEY,
    //   });

    const {messages} = await req.json()
    // const {field} = 

    const result = await streamText({
        // model: groq("mixtral-8x7b-32768"),
        model: openai('gpt-4-turbo'),
 
        messages: convertToCoreMessages(messages),
    })
    // console.log(messages)

    return result.toDataStreamResponse()
}