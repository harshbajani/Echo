import { google } from "@ai-sdk/google";
import { createTool } from "@convex-dev/agent";
import { generateText } from "ai";
import z from "zod";
import { internal } from "../../../_generated/api";
import { supportAgent } from "../agents/supportAgent";
import rag from "../rag";
import { SEARCH_INTERPRETER_PROMPT } from "../constants";

export const search = createTool({
  description:
    "Search the knowledge base for relevant information to help answer user questions. Always provide a specific query string.",
  args: z.object({
    query: z.string().min(1).describe("The search query to find relevant information - this must be a non-empty string"),
  }),
  handler: async (ctx, args) => {
    // Validate the query parameter
    if (!args.query || args.query.trim().length === 0) {
      return "Error: Search query cannot be empty. Please provide a specific question or keywords to search for.";
    }
    if (!ctx.threadId) {
      return "Missing thread ID";
    }

    const conversation = await ctx.runQuery(
      internal.system.conversations.getByThreadId,
      { threadId: ctx.threadId }
    );

    if (!conversation) {
      return "Conversation not found";
    }

    const orgId = conversation.organizationId;

    const searchResult = await rag.search(ctx, {
      namespace: orgId,
      query: args.query,
      limit: 5,
    });

    const contextText = `Found results in ${searchResult.entries
      .map((e) => e.title || null)
      .filter((t) => t !== null)
      .join(", ")}. Here is the context:\n\n${searchResult.text}`;

    const response = await generateText({
      messages: [
        {
          role: "system",
          content: SEARCH_INTERPRETER_PROMPT,
        },
        {
          role: "user",
          content: `User asked "${args.query}"\n\nSearch results: ${contextText}`,
        },
      ],
      model: google.chat("gemini-2.5-flash"),
    });

    await supportAgent.saveMessage(ctx, {
      threadId: ctx.threadId,
      message: {
        role: "assistant",
        content: response.text,
      },
    });
    return response.text;
  },
});
