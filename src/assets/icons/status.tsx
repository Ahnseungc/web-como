interface Props {
  className?: string;
}
export const Complete = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#FDFDFD" />
      <path
        d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM7.29 14.29L3.7 10.7C3.31 10.31 3.31 9.68 3.7 9.29C4.09 8.9 4.72 8.9 5.11 9.29L8 12.17L14.88 5.29C15.27 4.9 15.9 4.9 16.29 5.29C16.68 5.68 16.68 6.31 16.29 6.7L8.7 14.29C8.32 14.68 7.68 14.68 7.29 14.29Z"
        fill="#337AF0"
      />
    </svg>
  );
};

export const Incomplete = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#FDFDFD" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM9 6C9 5.44772 9.44771 5 10 5C10.5523 5 11 5.44772 11 6V10C11 10.5523 10.5523 11 10 11C9.44771 11 9 10.5523 9 10V6ZM10 15C10.5523 15 11 14.5523 11 14C11 13.4477 10.5523 13 10 13C9.44771 13 9 13.4477 9 14C9 14.5523 9.44771 15 10 15Z"
        fill="#58585A"
      />
    </svg>
  );
};

export const Check = ({ className }: Props) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_4626_46060)">
        <path
          d="M11.2498 20.7598L6.91231 16.4223C6.42481 15.9348 5.6373 15.9348 5.1498 16.4223C4.6623 16.9098 4.6623 17.6973 5.1498 18.1848L10.3748 23.4098C10.8623 23.8973 11.6498 23.8973 12.1373 23.4098L25.3623 10.1848C25.8498 9.69727 25.8498 8.90977 25.3623 8.42227C24.8748 7.93477 24.0873 7.93477 23.5998 8.42227L11.2498 20.7598Z"
          fill="#FD7E2D"
        />
      </g>
      <defs>
        <clipPath id="clip0_4626_46060">
          <rect
            width="30"
            height="30"
            fill="white"
            transform="translate(0 0.546875)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
