import { useEffect, useState } from "react";

import { BASE_URL } from "@/lib/config/env.config";

/**
 * Manifold's absolute base URL, for the account hub's return. Production
 * builds with an empty `VITE_BASE_URL`, so the browser's origin stands in
 * there, read after mount so server and client render the same first markup
 */
const useAppBaseUrl = (): string | undefined => {
  const [browserOrigin, setBrowserOrigin] = useState<string>();

  useEffect(() => {
    if (!BASE_URL) setBrowserOrigin(window.location.origin);
  }, []);

  return BASE_URL || browserOrigin;
};

export default useAppBaseUrl;
