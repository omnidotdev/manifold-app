const compactFormatter = new Intl.NumberFormat(undefined, {
  notation: "compact",
  compactDisplay: "short",
});

/**
 * Format a count for compact display, e.g. 1234 -> "1.2K".
 * Accepts a `BigInt` scalar (serialized as a string) or a number.
 */
const formatCount = (count: string | number): string =>
  compactFormatter.format(Number(count));

export default formatCount;
