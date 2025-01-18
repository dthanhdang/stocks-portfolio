import { isNotFound } from "@tanstack/react-router";

export function handleError(error: unknown, errorMessage: string): never {
  const error_ = isNotFound(error) ? error : new Error(errorMessage);
  throw error_;
}
