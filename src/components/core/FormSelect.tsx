import { Portal } from "@ark-ui/react";
import { Button } from "@omnidotdev/thornberry/button";
import {
  Select,
  SelectContent,
  SelectControl,
  SelectHiddenSelect,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from "@omnidotdev/thornberry/select";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

export interface FormSelectOption {
  value: string;
  label: string;
}

interface Props {
  /** Selected value; an empty string shows the placeholder */
  value: string;
  options: FormSelectOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  /** Accessible name for the trigger, matching the field's visible label */
  ariaLabel?: string;
  required?: boolean;
}

/**
 * Single-choice form field built on the thornberry select: an options list in,
 * one string value out, sized like the form inputs beside it
 */
const FormSelect = ({
  value,
  options,
  onValueChange,
  placeholder,
  ariaLabel,
  required,
}: Props) => {
  const collection = useMemo(
    () => createListCollection({ items: options }),
    [options],
  );

  return (
    <Select
      collection={collection}
      value={value ? [value] : []}
      onValueChange={(details) => {
        const next = details.value[0];

        if (next !== undefined) onValueChange(next);
      }}
      positioning={{ sameWidth: true }}
      required={required}
      // Mount the list on open so its portal lands after any open dialog and
      // stacks above it (both layers share z-50)
      lazyMount
      unmountOnExit
    >
      <SelectControl>
        <SelectTrigger asChild aria-label={ariaLabel}>
          <Button
            variant="outline"
            className="w-full justify-between font-normal hover:bg-transparent"
          >
            <SelectValueText placeholder={placeholder} />
            <SelectIndicator className="text-muted-foreground">
              <ChevronDown />
            </SelectIndicator>
          </Button>
        </SelectTrigger>
      </SelectControl>
      <Portal>
        <SelectPositioner>
          <SelectContent className="w-full p-1">
            {options.map((option) => (
              <SelectItem key={option.value} item={option}>
                <SelectItemText>{option.label}</SelectItemText>
                <SelectItemIndicator />
              </SelectItem>
            ))}
          </SelectContent>
        </SelectPositioner>
      </Portal>
      <SelectHiddenSelect />
    </Select>
  );
};

export default FormSelect;
