import { searchWebTool } from "@/app/utils/tools";
import { createOpenAI, openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText, tool } from "ai";
import {z} from "zod"

export const maxDuration = 30;



export async function POST(req: Request) {
    // const groq = createOpenAI({
    //     baseURL: 'https://api.groq.com/openai/v1',
    //     apiKey: process.env.GROQ_API_KEY,
    //   });

    const {messages} = await req.json()
    // const {field} = 

    const result = await streamText({
        model: openai('gpt-4-turbo'),
        messages: convertToCoreMessages(messages),
        tools: {
            getInformation: tool({
              description: `get information from your knowledge base to answer questions.`,
              parameters: z.object({
                query: z.string().describe("the users query"),
              }),
              execute: async ({ query }) => {
                return searchWebTool(query);
              },
            }),
          },
    })
    // console.log(messages)

    return result.toDataStreamResponse()
}