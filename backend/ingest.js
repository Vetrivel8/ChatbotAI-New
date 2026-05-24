import { pipeline } from "@xenova/transformers";
import fs from "fs";
import { ChromaClient } from "chromadb";


const client = new ChromaClient({
  host: "localhost",
  port: 8000,
  ssl: false
});



const embedder = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);

const collection = await client.getOrCreateCollection({
  name: "knowledge",
  embeddingFunction: null
});


const text = fs.readFileSync("data/colleges.json", "utf-8");
const chunks = text.split("\n---\n");

for (let i = 0; i < chunks.length; i++) {
  const embedding = await embedder(chunks[i], { pooling: "mean" });
  await collection.add({
    ids: [String(i)],
    documents: [chunks[i]],
    embeddings: [Array.from(embedding.data)]
  });
}

console.log("✅ Data ingested");
