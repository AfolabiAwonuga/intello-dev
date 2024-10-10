import { BaseMessage, ToolMessage } from "@langchain/core/messages"
import { tool } from "@langchain/core/tools"
import { Annotation, END, MemorySaver, MessagesAnnotation, START, StateGraph } from "@langchain/langgraph"
import { critiqueResponseSchema, generatedQuestionSchema } from "./tools"
import { ChatOpenAI } from "@langchain/openai"
import { qaPromptTemplate } from "./prompts"
import { RunnableConfig } from "@langchain/core/runnables"


const GraphState = Annotation.Root({
    ...MessagesAnnotation.spec,
    questions: Annotation<BaseMessage[]>({
      reducer: (x, y) => x.concat(y),
    })

})

function formatQaPrompt(field: string): string {
    return qaPromptTemplate.replace(/{FIELD}/g, field);
  }

// Tools
const finalResponseTool = tool(async () => "mocked value", {
    name: "Response",
    description: "Always respond to the user using this tool.",
    schema: generatedQuestionSchema
  })

const rejectDuplicateTool = tool(async () => "mocked value", {
  name: "Ignore Duplicates",
  description: "Always respond using this tool.",
  schema: critiqueResponseSchema

}) 

// Nodes
const callQagent = async (state: typeof GraphState.State, config?: RunnableConfig) => {
    const {messages, questions} = state
    
    // console.log(messages)
    console.log(questions)
    // Model
    const llm = new ChatOpenAI({
        model: "gpt-4o",
        temperature: 1
    })

    const systemPrompt = {
        role: "system",
        content: formatQaPrompt(config?.configurable!.field)
    }
    
    const llmWithTools = llm.bindTools([finalResponseTool]);      
    const result = await llmWithTools.invoke([systemPrompt, ...messages]);
    const question = result.tool_calls![0].args.question
    // console.log(result)
    const toolCall = result.tool_calls![0];
    const toolResponse = new ToolMessage(
        {
            tool_call_id: toolCall.id!, 
            content: JSON.stringify(toolCall.args)
        }
    )
    
    return { messages: [result, toolResponse], questions: [question] };
  }

// const callCritiqueAgent = async (state: typeof GraphState.State) => {
//     const {messages} = state
//     const llm = new ChatOpenAI({
//         model: "gpt-4o",
//         temperature: 1
//     })
//     const systemPrompt = {
//       role: "system",
//       content: `Your task is to ensure that the generated question isn't a direct duplicate or closely related to any of the questions in state.`
//   }


//     const llmWithTools  = llm.bindTools([rejectDuplicateTool]);      
//     const result = await llmWithTools.invoke([systemPrompt, ...messages]);
//     return { questions: [question] };
//   }

// const checkStateAgent = async (state: typeof GraphState.State) => {
//   console.log(state.questions)
// }
  
  
const workflow = new StateGraph(GraphState)
  // NODES
  .addNode("Qagent", callQagent)
//   .addNode("CritiqueAgent", callCritiqueAgent)
//   .addNode("CheckState", checkStateAgent)

  // EDGES
  .addEdge(START, "Qagent")
//   .addEdge("Qagent", "CritiqueAgent")
//   .addEdge("CritiqueAgent", "CheckState")
//   .addEdge("CheckState", END)
  .addEdge("Qagent", END)

const memory = new MemorySaver();

export const graph = workflow.compile({ checkpointer: memory });



