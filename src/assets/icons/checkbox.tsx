interface Props {
  className?: string;
  fillColor?: string;
}

export const Checked = ({ className, fillColor }: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        y="0.5"
        width="24"
        height="24"
        rx="12"
        fill={fillColor || "#FD7E2D"}
      />
      <path
        d="M16 9.5L10.5 15L8 12.5"
        stroke="#FDFDFD"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Unchecked = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.5" y="1" width="23" height="23" rx="11.5" fill="white" />
      <rect x="0.5" y="1" width="23" height="23" rx="11.5" stroke="#DDDDDD" />
      <path
        d="M16 9.5L10.5 15L8 12.5"
        stroke="#C6C6C7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
