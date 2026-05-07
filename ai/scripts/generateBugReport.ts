import fs from "fs";
import path from "path";
import { bugReportTemplate } from "../templates/bugReportTemplate";

const inputFile = process.argv[2];

if (!inputFile) {
  console.error("Usage: npm run ai:bug-report <path-to-failure-file>");
  process.exit(1);
}

const failurePath = path.resolve(inputFile);

if (!fs.existsSync(failurePath)) {
  console.error(`Failure file not found: ${failurePath}`);
  process.exit(1);
}

const failureContent = fs.readFileSync(failurePath, "utf-8");
const bugReport = bugReportTemplate(failureContent);

console.log(bugReport);
