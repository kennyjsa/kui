import * as React from "react";
import { cn } from "../lib/utils";

export interface ColorPickerProps {
  id?: string;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

const ColorPicker = React.forwardRef<HTMLInputElement, ColorPickerProps>(
  ({ id, value = "#000000", onChange, disabled, className }, ref) => {
    const [color, setColor] = React.useState(value);

    React.useEffect(() => {
      setColor(value || "#000000");
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newColor = e.target.value;
      setColor(newColor);
      onChange?.(newColor);
    };

    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="relative">
          <input
            ref={ref}
            id={id}
            type="color"
            value={color}
            onChange={handleChange}
            disabled={disabled}
            className={cn(
              "h-10 w-20 cursor-pointer rounded-md border border-input disabled:cursor-not-allowed disabled:opacity-50",
              "appearance-none bg-transparent"
            )}
          />
        </div>
        <input
          type="text"
          value={color.toUpperCase()}
          onChange={(e) => {
            const newColor = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(newColor)) {
              setColor(newColor);
              onChange?.(newColor);
            }
          }}
          disabled={disabled}
          className={cn(
            "flex h-10 w-28 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            "font-mono uppercase"
          )}
          placeholder="#000000"
          maxLength={7}
        />
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";

export { ColorPicker };

