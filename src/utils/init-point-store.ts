import fs from "fs/promises";
import { join } from "path";
import { cwd } from "process";

function initializePointStoreError(error: unknown) {
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
    };
  }
  return {
    success: false,
    message: "An unknown error occurred",
  };
}

export default async function initializePointStore() {
  const store = join(cwd(), "store");
  const points = join(store, "points.json");

  let isStoreDirectoryExist: boolean | undefined;
  try {
    (await fs.stat(store)).isDirectory();
    isStoreDirectoryExist = true;
  } catch (error) {
    isStoreDirectoryExist = false;
  }

  if (!isStoreDirectoryExist) {
    try {
      await fs.mkdir(cwd());
      await fs.writeFile(points, JSON.stringify([]));

      return {
        success: true,
        message: "Point store initialized successfully",
      };
    } catch (error: unknown) {
      return initializePointStoreError(error);
    }
  }

  let isPointFileExist: boolean | undefined;
  try {
    (await fs.stat(points)).isFile();
    isPointFileExist = true;
  } catch (error) {
    isPointFileExist = false;
  }

  if (!isPointFileExist) {
    try {
      await fs.writeFile(points, JSON.stringify([]));

      return {
        success: true,
        message: "Point store initialized successfully",
      };
    } catch (error: unknown) {
      return initializePointStoreError(error);
    }
  }

  return {
    success: true,
    message: "Point store initialized successfully",
  };
}
