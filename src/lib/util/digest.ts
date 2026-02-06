/**
 * Compute SHA-256 digest of content using Web Crypto API.
 *
 * @param content - String content to hash
 * @returns Digest in format: sha256:hexstring
 */
export const computeDigest = async (content: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `sha256:${hashHex}`;
};

/**
 * Get the byte size of a string.
 *
 * @param content - String content
 * @returns Size in bytes
 */
export const getByteSize = (content: string): number =>
  new Blob([content]).size;
