import { pipeline } from "@xenova/transformers";
import { ChromaClient } from "chromadb";

const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false
});

const collection = await client.getOrCreateCollection({
  name: "knowledge",
  embeddingFunction: null
});

export async function retrieve(query) {
  const embedding = await embedder(query, { pooling: "mean" });

  const results = await collection.query({
    queryEmbeddings: [Array.from(embedding.data)],
    nResults: 5
  });

  if (!results.documents || !results.documents[0]) {
    return "";
  }

  return results.documents[0].join("\n");
}
