import readline from "readline";
import { retrieve } from "./rag.js";
import { generate } from "./gemini.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("🤖 AI Assistant (type 'exit' to quit)");

function ask() {
  rl.question("\nYou: ", async (q) => {
    if (q.toLowerCase() === "exit") {
      rl.close();
      return;
    }

    const context = await retrieve(q);

    const prompt = `
Use the context below to answer.
You may explain and analyze.

Context:
${context}

Question:
${q}
`;

    const answer = await generate(prompt);
    console.log("\nBot:", answer);
    ask();
  });
}

ask();
