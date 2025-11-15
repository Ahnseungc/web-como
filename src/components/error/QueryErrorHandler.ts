import { QueryCache, MutationCache } from "@tanstack/react-query";

export const queryErrorHandler = (error: Error, query: any) => {
  // 차후에 사용
  // const errorMessage = getErrorMessage(error);

  if (isNetworkError(error)) {
    return;
  }

  if (isAuthError(error)) {
    return;
  }
};

export const mutationErrorHandler = (
  error: Error,
  variables: unknown,
  context: unknown,
  mutation: any
) => {
  // 차후에 사용
  // const errorMessage = getErrorMessage(error);

  if (isNetworkError(error)) {
    return;
  }

  if (isAuthError(error)) {
    return;
  }
};

function getErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return "알 수 없는 오류가 발생했습니다.";
}

function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes("network") ||
      error.message.includes("fetch") ||
      error.message.includes("NetworkError") ||
      error.name === "NetworkError"
    );
  }
  return false;
}

function isAuthError(error: any): boolean {
  const status = error?.response?.status || error?.status;
  return status === 401 || status === 403;
}
