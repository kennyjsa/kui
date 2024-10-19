import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "../lib/utils";

export interface RatingProps {
  id?: string;
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
  className?: string;
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ id, value = 0, onChange, max = 5, disabled = false, className }, ref) => {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null);

    const handleClick = (rating: number) => {
      if (!disabled && onChange) {
        onChange(rating);
      }
    };

    return (
      <div
        ref={ref}
        id={id}
        className={cn("flex items-center gap-1", className)}
        onMouseLeave={() => setHoverValue(null)}
      >
        {Array.from({ length: max }, (_, index) => {
          const starValue = index + 1;
          const isActive = hoverValue !== null ? starValue <= hoverValue : starValue <= value;

          return (
            <button
              key={index}
              type="button"
              onClick={() => handleClick(starValue)}
              onMouseEnter={() => !disabled && setHoverValue(starValue)}
              disabled={disabled}
              className={cn(
                "transition-colors",
                disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer hover:scale-110"
              )}
              aria-label={`${starValue} ${starValue === 1 ? "estrela" : "estrelas"}`}
            >
              <Star
                className={cn(
                  "h-5 w-5 transition-all",
                  isActive
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-none text-gray-300"
                )}
              />
            </button>
          );
        })}
        {value > 0 && (
          <span className="ml-2 text-sm text-muted-foreground">
            {value}/{max}
          </span>
        )}
      </div>
    );
  }
);

Rating.displayName = "Rating";

export { Rating };

