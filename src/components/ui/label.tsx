import cn from "@/lib/utils";

import type { ComponentProps } from "react";

const Label = ({ className, ...rest }: ComponentProps<"label">) => (
  <label
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className,
    )}
    {...rest}
  />
);

export { Label };
