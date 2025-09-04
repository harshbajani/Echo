import { google } from "@ai-sdk/google";
import { RAG } from "@convex-dev/rag";
import { components } from "../../_generated/api";

// Configure the embedding model
const embeddingModel = google.textEmbeddingModel("text-embedding-004", {
  taskType: "RETRIEVAL_DOCUMENT",
});

const rag = new RAG(components.rag, {
  textEmbeddingModel: embeddingModel,
  embeddingDimension: 768, // Must match!
});

export default rag;
