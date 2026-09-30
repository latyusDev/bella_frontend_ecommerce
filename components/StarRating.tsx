"use client";
import { useState } from "react";
import { Star } from "lucide-react";

type Props = {
  value: number;
  onChange?: (val: number) => void;
  size?: number;
  readonly?: boolean;
};

export default function StarRating({ value, onChange, size = 20, readonly = false }: Props) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <button
          key={s}
          type="button"
          disabled={readonly}
          onClick={() => !readonly && onChange?.(s)}
          onMouseEnter={() => !readonly && setHovered(s)}
          onMouseLeave={() => !readonly && setHovered(0)}
          className={readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"}
        >
          <Star
            size={size}
            className={
              s <= (hovered || value)
                ? "fill-primary text-primary"
                : "text-gray-200 fill-gray-200"
            }
          />
        </button>
      ))}
    </div>
  );
}
