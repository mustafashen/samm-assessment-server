import { readFile } from "fs/promises";
import { join } from "path";
import { cwd, title } from "process";

export async function readPoints() {
  const pointPath = join(cwd(), "store", "points.json");

  try {
    const pointsFile: Buffer = await readFile(pointPath);
    const points = pointsFile.toString("utf-8");
    return {
      data: JSON.parse(points),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        error: {
          detail: error.message,
          title: error.name,
        },
      };
    } else {
      return {
        error: {
          detail: "An unknown error occurred",
          title: "Unknown Error",
        },
      };
    }
  }
}
