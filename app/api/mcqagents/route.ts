import { NextRequest, NextResponse } from "next/server";
import { streamText, convertToCoreMessages,  Message as VercelChatMessage } from 'ai';
import { ChatOpenAI } from "@langchain/openai";
// import { ChatGroq } from "@langchain/groq";
import {
    AIMessage,
    BaseMessage,
    ChatMessage,
    HumanMessage,
    SystemMessage,
  } from "@langchain/core/messages";
  import {Annotation, END, MessagesAnnotation, messagesStateReducer, START, StateGraph} from "@langchain/langgraph"
import {openai} from "@ai-sdk/openai"
import { GeneratedQuestions, generatedQuestionSchema } from "@/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { qaPromptTemplate } from "./prompts";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";


function formatQaPrompt(field: string): string {
    return qaPromptTemplate.replace(/{FIELD}/g, field);
  }

const vercelToLangMessage = (message: VercelChatMessage): BaseMessage => {
    if (message.role === "user") {
        return new HumanMessage(message.content)
    } else if (message.role === "assistant") {
            return new AIMessage(message.content)
    } else {
            return new ChatMessage(message.content, message.role)
    }
}

const langToVercelMessage = (message: BaseMessage) => {
    if (message._getType() === "ai") {
      return {content: (message as AIMessage).tool_calls};
    }
}


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const messages = (body.messages ?? [])
          .filter(
              (message: VercelChatMessage) =>
                message.role === "user" || message.role === "assistant",
            )
          .map(vercelToLangMessage);
        const field = body.field

        // Graph State
        const GraphState = Annotation.Root({
            ...MessagesAnnotation.spec,

        })
        
        // Tools
        // const toolNode = new ToolNode()
        const finalResponseTool = tool(async () => "mocked value", {
            name: "Response",
            description: "Always respond to the user using this tool.",
            schema: generatedQuestionSchema
          })
        
        
        // Model
        const llm = new ChatOpenAI({
            model: "gpt-4o",
            temperature: 1
        })
        
        
        const callQagent = async (state: typeof GraphState.State) => {
            const {messages} = state
            const systemPrompt = {
                role: "system",
                content: formatQaPrompt(field)
            }
        
            const llmWithTools = llm.bindTools([finalResponseTool]);      
            const result = await llmWithTools.invoke([systemPrompt, ...messages]);
            return { messages: [result] };
          }
          
          
          const workflow = new StateGraph(GraphState)
            .addNode("agent", callQagent)
            .addEdge(START, "agent")
          //   .addNode("tools", toolNode)
            .addEdge("agent", END)
          
          
          const graph = workflow.compile();

          const result = await graph.invoke(
            { messages }
     
          );
          // console.log(result.messages.map(langToVercelMessage).filter(Boolean)[0].content[0].args)

          return NextResponse.json(
            // result.generatedQuestion,
            result.messages.map(langToVercelMessage).filter(Boolean)[0].content[0].args,
            { status: 200 },
          );

        } catch (e: any) {
            return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
          }
        
    }
    
  