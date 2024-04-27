import fs from "fs/promises";
import { cwd } from "process";
import { pointsPath, storePath } from "../constants/directories.js";
import { generateErrorMessage } from "./generate-message.js";

export default async function initializePointStore() {
  let isStoreDirectoryExist: boolean | undefined;
  try {
    (await fs.stat(storePath)).isDirectory();
    isStoreDirectoryExist = true;
  } catch (error) {
    isStoreDirectoryExist = false;
  }

  if (!isStoreDirectoryExist) {
    try {
      await fs.mkdir(cwd());
      await fs.writeFile(pointsPath, JSON.stringify([]));

      return {
        success: true,
        message: "Point store initialized successfully",
      };
    } catch (error: unknown) {
      return generateErrorMessage(error, "Unknown error occurred");
    }
  }

  let isPointFileExist: boolean | undefined;
  try {
    (await fs.stat(pointsPath)).isFile();
    isPointFileExist = true;
  } catch (error) {
    isPointFileExist = false;
  }

  if (!isPointFileExist) {
    try {
      await fs.writeFile(pointsPath, JSON.stringify([]));

      return {
        success: true,
        message: "Point store initialized successfully",
      };
    } catch (error: unknown) {
      return generateErrorMessage(error, "Unknown error occurred");
    }
  }

  return {
    success: true,
    message: "Point store initialized successfully",
  };
}
