import {z} from "zod"
import { tavily } from "@tavily/core"

export const generatedQuestionSchema = z.object({
    // id: z.number().describe("Id of generated question"),
    question: z.string().describe("The generated question from the language model"),
    choices: z.object({
      a: z.string(),
      b: z.string(),
      c: z.string(),
      d: z.string(),
    }).describe("The generated choices to answer the generated question"),
    rightChoice: z.string().describe("The correct choice"),
    hint: z.string().describe("A generated hint that can help guide the user toward the correct answer"),
  });

const generatedQuestionArraySchema = z.array(generatedQuestionSchema).describe("An array of generatedQuestionSchema")
  
export type GeneratedQuestions = z.infer<typeof generatedQuestionArraySchema>;

export const critiqueResponseSchema = z.object({
  questions: z.string().describe("The previously generated question(s)"),
  responsE: z.string().describe("REJECTED, if current question is a direct duplicate or similar to any of the previous questions otherwise ACCEPTED")
})


export const searchWebTool = (query: string ) => {
  const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });
  const context = tvly.searchContext(query, {
    searchDepth: "advanced"
  });
  // console.log(context)
  return context
}