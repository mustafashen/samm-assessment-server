import { join } from "path";
import { cwd } from "process";

export const storePath = join(cwd(), "store");
export const pointsPath = join(storePath, "points.json");