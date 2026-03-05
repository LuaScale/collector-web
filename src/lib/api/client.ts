/**
 * API Client for Symfony API Platform (JSON-LD/Hydra)
 */

import { HydraError } from "@/types/hydra";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
const API_TIMEOUT_MS = Number(process.env.NEXT_PUBLIC_API_TIMEOUT_MS || 8000);

// Log the API URL in development
if (process.env.NODE_ENV === "development") {
  console.log("[API Client] Base URL:", API_BASE_URL);
}

export interface RequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
  next?: NextFetchRequestConfig;
}

/**
 * Custom API Error with Hydra error data
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public data: HydraError | { message: string }
  ) {
    const message =
      "hydra:description" in data
        ? data["hydra:description"]
        : data.message || "API Error";
    super(message);
    this.name = "ApiError";
  }

  /**
   * Get validation errors mapped by field
   */
  getFieldErrors(): Record<string, string> {
    const errors: Record<string, string> = {};
    if ("violations" in this.data && this.data.violations) {
      for (const violation of this.data.violations) {
        errors[violation.propertyPath] = violation.message;
      }
    }
    return errors;
  }
}

/**
 * Base API client function
 */
export async function apiClient<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, body, next, ...fetchOptions } = options;

  // Build URL with query params
  const url = new URL(`${API_BASE_URL}${endpoint}`);
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, String(value));
      }
    });
  }

  // Determine content type based on method
  const isPatch = fetchOptions.method === "PATCH";
  const contentType = isPatch
    ? "application/merge-patch+json"
    : "application/ld+json";

  console.log("[API Client] Fetching:", url.toString());

  const timeoutSignal = AbortSignal.timeout(API_TIMEOUT_MS);
  const signal = fetchOptions.signal
    ? AbortSignal.any([fetchOptions.signal, timeoutSignal])
    : timeoutSignal;

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      ...fetchOptions,
      headers: {
        Accept: "application/ld+json",
        ...(body ? { "Content-Type": contentType } : {}),
        ...fetchOptions.headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      next,
      signal,
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "TimeoutError") {
      throw new ApiError(504, { message: `API request timeout after ${API_TIMEOUT_MS}ms` });
    }
    throw error;
  }

  console.log("[API Client] Response status:", response.status);

  const parseJsonBody = async () => {
    const text = await response.text();
    if (!text.trim()) {
      return undefined;
    }

    try {
      return JSON.parse(text);
    } catch {
      return undefined;
    }
  };

  // Handle errors
  if (!response.ok) {
    let errorData: HydraError | { message: string };
    const parsedError = await parseJsonBody();
    if (parsedError && typeof parsedError === "object") {
      errorData = parsedError as HydraError;
    } else {
      errorData = { message: `HTTP Error ${response.status}` };
    }
    throw new ApiError(response.status, errorData);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return undefined as T;
  }

  const parsedResponse = await parseJsonBody();
  return parsedResponse as T;
}

/**
 * Server-side fetch with ISR caching
 */
export async function serverFetch<T>(
  endpoint: string,
  options: RequestOptions & { revalidate?: number | false } = {}
): Promise<T> {
  const { revalidate = 60, ...restOptions } = options;

  return apiClient<T>(endpoint, {
    ...restOptions,
    next: { revalidate },
  });
}
