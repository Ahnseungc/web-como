interface Props {
  name: string;
  placeholder?: string;
  required?: boolean;
  rows?: number;
  minlength?: number;
  maxlength?: number;
  readonly?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void; // onChange 추가
}

export default function Textarea(props: Props) {
  return (
    <textarea
      id={props.name}
      name={props.name}
      placeholder={props.placeholder}
      autoComplete="off"
      required={props.required}
      rows={props.rows}
      minLength={props.minlength}
      maxLength={props.maxlength}
      readOnly={props.readonly}
      disabled={props.readonly}
      onChange={props.onChange} // onChange 핸들러 연결
      value={props.value}
      className="w-full p-3 rounded-md outline-none border border-gray-100 focus-visible:border-gray-900 h4 font-medium placeholder:text-gray-400 text-gray-900 bg-gray-100 focus-visible:bg-gray-50 transition duration-300"
    />
  );
}
