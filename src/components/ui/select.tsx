import { Select as ArkSelect, Portal } from "@ark-ui/react";
import { Check, ChevronDown } from "lucide-react";

import cn from "@/lib/utils";

import type { ComponentProps, PropsWithChildren } from "react";

const Select = ({
  children,
  value,
  onValueChange,
  required,
}: PropsWithChildren<{
  value?: string;
  onValueChange?: (value: string) => void;
  required?: boolean;
}>) => (
  // @ts-expect-error -- Ark UI requires `collection` but this wrapper uses child-based items
  <ArkSelect.Root
    value={value ? [value] : []}
    onValueChange={(e) => onValueChange?.(e.value[0])}
    required={required}
    positioning={{ sameWidth: true }}
  >
    {children}
  </ArkSelect.Root>
);

const SelectTrigger = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof ArkSelect.Trigger>) => (
  <ArkSelect.Control>
    <ArkSelect.Trigger
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
        className,
      )}
      {...rest}
    >
      {children}
      <ArkSelect.Indicator>
        <ChevronDown className="h-4 w-4 opacity-50" />
      </ArkSelect.Indicator>
    </ArkSelect.Trigger>
  </ArkSelect.Control>
);

const SelectValue = ({
  placeholder,
  className,
}: {
  placeholder?: string;
  className?: string;
}) => (
  <ArkSelect.ValueText
    placeholder={placeholder}
    className={cn("text-left", className)}
  />
);

const SelectContent = ({
  className,
  children,
  ...rest
}: ComponentProps<typeof ArkSelect.Content>) => (
  <Portal>
    <ArkSelect.Positioner>
      <ArkSelect.Content
        className={cn(
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=closed]:animate-out data-[state=open]:animate-in",
          className,
        )}
        {...rest}
      >
        <ArkSelect.ItemGroup className="p-1">{children}</ArkSelect.ItemGroup>
      </ArkSelect.Content>
    </ArkSelect.Positioner>
  </Portal>
);

const SelectItem = ({
  className,
  children,
  value,
  ...rest
}: Omit<ComponentProps<typeof ArkSelect.Item>, "item"> & { value: string }) => (
  <ArkSelect.Item
    item={value}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50",
      className,
    )}
    {...rest}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ArkSelect.ItemIndicator>
        <Check className="h-4 w-4" />
      </ArkSelect.ItemIndicator>
    </span>
    <ArkSelect.ItemText>{children}</ArkSelect.ItemText>
  </ArkSelect.Item>
);

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
