import {z} from "zod"

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
    hint: z.string().describe("A generated hint that can help guide the user toward the correct answer")
  });

const generatedQuestionArraySchema = z.array(generatedQuestionSchema).describe("An array of generatedQuestionSchema")
  
export type GeneratedQuestions = z.infer<typeof generatedQuestionArraySchema>;