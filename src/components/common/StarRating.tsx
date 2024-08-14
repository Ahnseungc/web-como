import { cn } from "@/lib/utils";
import { Star } from "@/assets/icons/action";

interface Props {
  currentValue: number;
  name?: string;
  readonly?: boolean;
  size?: "small" | "large";
  label?: string;
  labelStyle?: string;
  handleChange?: (newRating: number) => void;
}

export default function StarRating(props: Props) {
  const labelStyle = "h3 font-semibold text-gray-900";

  return (
    <div className="flex flex-col gap-2">
      {props.label && (
        <label htmlFor={props.name} className={props.labelStyle || labelStyle}>
          {props.label}
        </label>
      )}
      {!props.readonly && (
        <input id={props.name} name={props.name} type="number" hidden />
      )}
      <div
        className={cn(
          "flex",
          props.size === "small" ? "gap-1 my-[2.5px]" : "gap-1.5"
        )}
      >
        {Array.from({ length: 5 }).map((e, i) => (
          <Star
            key={i + 1}
            className={cn(
              props.size === "small" ? "w-4 h-4" : "w-10 h-10",
              props.currentValue >= i + 1
                ? "text-brand-orange"
                : "text-gray-300",
              props.readonly ? "" : "cursor-pointer transition duration-200"
            )}
            onClick={
              props.readonly ? undefined : () => props.handleChange!(i + 1)
            }
          />
        ))}
      </div>
    </div>
  );
}
