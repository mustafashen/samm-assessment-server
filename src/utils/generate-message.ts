export function generateErrorMessage(
  error: unknown,
  fallbackMessage: string
): {
  success: false;
  message: string;
  name?: string;
  stack?: string;
  cause?: unknown;
} {
  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      name: error.name,
      stack: error.stack,
      cause: error.cause,
    };
  } else {
    return {
      success: false,
      message: fallbackMessage
    };
  }
}
