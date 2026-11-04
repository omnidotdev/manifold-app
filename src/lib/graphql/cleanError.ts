/**
 * Extract a user-safe message from a graphql-request error.
 *
 * graphql-request's `ClientError.message` stringifies the ENTIRE request and
 * response, including the GraphQL query, the variables, and any ids in them, so
 * rendering `err.message` in the UI leaks implementation details to the user
 * (and can expose internal identifiers). Prefer the structured GraphQL error
 * message the server returned; fall back to a generic message otherwise.
 */
export const cleanGraphqlError = (
  err: unknown,
  fallback = "Something went wrong. Please try again.",
): string => {
  const errors = (
    err as { response?: { errors?: Array<{ message?: unknown }> } } | null
  )?.response?.errors;
  const message = errors?.[0]?.message;
  return typeof message === "string" && message.length > 0 ? message : fallback;
};
