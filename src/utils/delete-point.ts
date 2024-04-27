import { writeFile } from "fs/promises";
import { Point } from "../types/points";
import { readPoints } from "./read-points.js";
import { pointsPath } from "../constants/directories.js";
import { generateErrorMessage } from "./generate-message.js";

export async function deletePoint(pointId: string) {
  try {
    const readResponse = await readPoints();
    if (!("data" in readResponse)) {
      throw new Error("Error reading points");
    }

    let deletedPoint: Point | undefined;
    const newPoints = readResponse.data.filter((point: Point) => {
      if (point.id === pointId) {
        deletedPoint = point;
        return false;
      }
      return true;
    });

    await writeFile(pointsPath, JSON.stringify(newPoints));

    if (deletedPoint) {
      return {
        success: true,
        data: deletedPoint,
      };
    }

    throw new Error("Point not found");
    
  } catch (error) {
    return generateErrorMessage(
      error,
      "An error occurred while deleting the point"
    );
  }
}
