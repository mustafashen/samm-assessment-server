import { createReadStream } from "fs";
import { pointsPath } from "../constants/directories.js";
import { generateErrorMessage } from "./generate-message.js";

export default function downloadPoints() {
  try {
    return createReadStream(pointsPath);
  } catch (error) {
    return generateErrorMessage(error, "Error during creating file stream");
  }
}
