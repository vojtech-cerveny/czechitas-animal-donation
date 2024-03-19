export type SuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
};

export type ErrorResponse = {
  success: false;
  message: string;
  error?: any; // Consider using a more specific type for errors if possible
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export function successResponse<T>(
  message: string,
  data: T,
): SuccessResponse<T> {
  console.log("successResponse", message, data);
  return { success: true, message, data };
}

export function errorResponse(message: string, error?: any): ErrorResponse {
  console.log("errorResponse", message, error);
  return { success: false, message, error };
}
