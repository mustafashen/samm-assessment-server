import { readFile } from "fs/promises";
import { join } from "path";
import { cwd, title } from "process";
import { generateErrorMessage } from "./generate-message.js";

export async function readPoints() {
  const pointPath = join(cwd(), "store", "points.json");

  try {
    const pointsFile: Buffer = await readFile(pointPath);
    const points = pointsFile.toString("utf-8");
    return {
      success: true,
      data: JSON.parse(points),
    };
  } catch (error: unknown) {
    return generateErrorMessage(error, "Unknown error occurred")
  }
}
