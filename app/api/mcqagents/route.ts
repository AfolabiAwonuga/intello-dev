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
import {Annotation, END, MessagesAnnotation, MemorySaver, START, StateGraph} from "@langchain/langgraph"
import {openai} from "@ai-sdk/openai"
import { GeneratedQuestions, generatedQuestionSchema, critiqueResponseSchema } from "@/app/utils/tools";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { qaPromptTemplate } from "../../utils/prompts";
import { tool } from "@langchain/core/tools";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { graph } from "@/app/utils/agentGraph";



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
      return {content: (message as AIMessage)};
    }
}

let questions: Array<string> = []


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

        // TODO: Dynamically pass thread_id
        const config = { configurable: { thread_id: "conversation-num-1", field: `${field}` } };
        const result = await graph.invoke(
          { messages },
          {...config}
        );
        const filteredMessages = result.messages.map(langToVercelMessage).filter(Boolean);
        const lastMessage = filteredMessages[filteredMessages.length - 1];
        // console.log(lastMessage.content.tool_calls[0].args)

        return NextResponse.json(
          // result.generatedQuestion,
          lastMessage.content.tool_calls[messages.length - 1].args,
          { status: 200 },
        );

        } catch (e: any) {
            // console.error("Error in POST request:", e);
            return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
          }
        
    }
    
  