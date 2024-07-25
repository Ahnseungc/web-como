import { Checked, Unchecked } from "@/assets/icons/checkbox";

interface Props {
  text: string;
  checked?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Checkbox(props: Props) {
  return (
    <label
      htmlFor="check"
      className="flex gap-4 h4 font-medium text-gray-900 cursor-pointer select-none"
    >
      <input
        id="check"
        name="check"
        type="checkbox"
        className="peer hidden"
        checked={props.checked}
        onChange={props.onChange}
      />
      <Checked className="hidden peer-checked:block" />
      <Unchecked className="block peer-checked:hidden" />
      {props.text}
    </label>
  );
}
