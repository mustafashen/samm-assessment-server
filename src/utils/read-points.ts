import { readFile } from "fs/promises";
import { join } from "path";
import { cwd } from "process";
import { generateErrorMessage } from "./generate-message.js";

export async function readPoints() {
  const pointPath = join(cwd(), "store", "points.json");

  try {
    const pointsFile: Buffer = await readFile(pointPath);
    const points = pointsFile.toString("utf-8");

    if (points) {
      return {
        success: true,
        data: JSON.parse(points),
      };  
    }

    const notFoundError = new Error();
    notFoundError.name = "NotFoundError";
    notFoundError.message = "Points not found";
    throw notFoundError;
    
  } catch (error: unknown) {
    return generateErrorMessage(error, "Unknown error occurred")
  }
}
