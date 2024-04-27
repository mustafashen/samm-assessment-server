import { NewPoint } from "../types/points.js";
import { v4 as uuidv4 } from "uuid";
import { readPoints } from "./read-points.js";
import { writeFile } from "fs/promises";
import { pointsPath } from "../constants/directories.js";
import { generateErrorMessage } from "./generate-message.js";

export async function createPoint(newPoint: NewPoint) {
  const pointToAdd = {
    id: uuidv4(),
    ...newPoint,
  };
  try {
    const readResponse = await readPoints();
    if (!("data" in readResponse)) {
      throw new Error("Error reading points");  
    }

    const prevPoints = readResponse.data;
    const newPoints = JSON.stringify([...prevPoints, pointToAdd]);
    await writeFile(pointsPath, newPoints);

    return {
      success: true,
      data: pointToAdd,
    };
  } catch (error: unknown) {
    return generateErrorMessage(
      error,
      "An error occurred while creating a point"
    );
  }
}
