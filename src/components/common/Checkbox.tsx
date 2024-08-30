import { Checked, Unchecked } from "@/assets/icons/checkbox";
import { cn } from "@/lib/utils";

interface Props {
  name: string;
  content: React.ReactNode | string;
  fillColor?: string;
  style?: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: Props) {
  return (
    <label
      htmlFor={props.name}
      className={cn(
        "flex gap-4 cursor-pointer select-none",
        props.style ? props.style : "h4 font-medium text-gray-900"
      )}
    >
      <input
        id={props.name}
        name={props.name}
        type="checkbox"
        className="peer hidden"
        checked={props.checked}
        onChange={props.onChange}
      />
      <Checked
        className="hidden peer-checked:block"
        fillColor={props.fillColor}
      />
      <Unchecked className="block peer-checked:hidden" />
      {props.content}
    </label>
  );
}
