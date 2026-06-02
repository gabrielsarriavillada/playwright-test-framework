import fs from "fs";
import path from "path";
import { generateAITestReview } from "../services/generateAITestReview";
import { buildTestReviewPrompt } from "../prompts/testReviewPrompt";

const testFile = process.argv[2];

if (!testFile) {
  console.error(
    "Usage: npm run ai:test-review <path-to-test-file>",
  );
  process.exit(1);
}

const testPath = path.resolve(testFile);

if (!fs.existsSync(testPath)) {
  console.error(`Report file not found: ${testPath}`);
  process.exit(1);
}

const testContent = fs.readFileSync(testPath, "utf-8");

async function main() {
  const outputDir = path.resolve("ai/output");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

const prompt = buildTestReviewPrompt({
    testPath,
    testContent,
});

let aiAnalysis: string;

try {
    aiAnalysis = await generateAITestReview({
    prompt,
    });
} catch (error) {
    console.error(`AI analysis failed for test: ${testPath}`, error);

    aiAnalysis = "AI analysis unavailable.";
}



const fileName = `test-review-${path.basename(
  testPath,
  path.extname(testPath),
)}.md`;
const outputPath = path.join(outputDir, fileName);

fs.writeFileSync(outputPath, aiAnalysis, "utf-8");

console.log(`Test review generated: ${outputPath}`);
}

main().catch((error) => {
  console.error("Failed to generate test review:", error);
  process.exit(1);
});
