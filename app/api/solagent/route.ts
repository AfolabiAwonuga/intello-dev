import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
    const {messages} = await req.json()
    // const {field} = 

    const result = await streamText({
        model: openai('gpt-4-turbo'),
//         system: `You are a problem solver, the best in {FIELD}, you love to teach and can break things down to a level anyone can understand.
// Your task is to solve MCQ problems given to you, teach your solution, and engage in an educational conversation about the problem.`,
        messages: convertToCoreMessages(messages),
    })
    // console.log(messages)

    return result.toDataStreamResponse()
}