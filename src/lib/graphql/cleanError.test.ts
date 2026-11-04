import { describe, expect, test } from "bun:test";

import { cleanGraphqlError } from "@/lib/graphql/cleanError";

describe("cleanGraphqlError", () => {
  test("returns the structured GraphQL message, not the raw dump", () => {
    // Shape of a graphql-request ClientError: `.message` is a verbose dump of
    // the whole request/response; `.response.errors[0].message` is the clean one.
    const err = {
      message:
        'That namespace name is reserved: {"response":{"errors":[...]},"request":{"query":"mutation CreateNamespace...","variables":{"namespace":{"organizationId":"5234b07c-..."}}}}',
      response: {
        errors: [
          {
            message: "That namespace name is reserved",
            extensions: { code: "RESERVED_NAMESPACE_NAME" },
          },
        ],
      },
    };

    const msg = cleanGraphqlError(err, "Failed to create namespace");
    expect(msg).toBe("That namespace name is reserved");
    // must not leak the query, variables, or ids
    expect(msg).not.toContain("organizationId");
    expect(msg).not.toContain("mutation");
  });

  test("falls back when there is no structured error", () => {
    expect(cleanGraphqlError(new Error("boom"), "Failed to create")).toBe(
      "Failed to create",
    );
    expect(cleanGraphqlError(null, "Failed to create")).toBe(
      "Failed to create",
    );
    expect(cleanGraphqlError({ response: { errors: [] } }, "fb")).toBe("fb");
  });
});
