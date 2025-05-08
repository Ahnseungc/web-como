interface Props {
  className?: string;
}

export const Close = ({ className }: Props) => {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3483_43383)">
        <path
          d="M27.4501 8.56508C26.8651 7.98008 25.9201 7.98008 25.3351 8.56508L18.0001 15.8851L10.6651 8.55008C10.0801 7.96508 9.13508 7.96508 8.55008 8.55008C7.96508 9.13508 7.96508 10.0801 8.55008 10.6651L15.8851 18.0001L8.55008 25.3351C7.96508 25.9201 7.96508 26.8651 8.55008 27.4501C9.13508 28.0351 10.0801 28.0351 10.6651 27.4501L18.0001 20.1151L25.3351 27.4501C25.9201 28.0351 26.8651 28.0351 27.4501 27.4501C28.0351 26.8651 28.0351 25.9201 27.4501 25.3351L20.1151 18.0001L27.4501 10.6651C28.0201 10.0951 28.0201 9.13508 27.4501 8.56508Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3483_43383">
          <rect width="36" height="36" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const CountPlus = ({ className }: Props) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 5V0H5V5H0V7H5V12H7V7H12V5H7Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const CountMinus = ({ className }: Props) => {
  return (
    <svg
      width="12"
      height="2"
      viewBox="0 0 12 2"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="12" height="2" fill="currentColor" />
    </svg>
  );
};

export const Plus = ({ className }: Props) => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3962_7788)">
        <path
          d="M23.9998 17.3327H17.3332V23.9993C17.3332 24.7327 16.7332 25.3327 15.9998 25.3327C15.2665 25.3327 14.6665 24.7327 14.6665 23.9993V17.3327H7.99984C7.2665 17.3327 6.6665 16.7327 6.6665 15.9993C6.6665 15.266 7.2665 14.666 7.99984 14.666H14.6665V7.99935C14.6665 7.26602 15.2665 6.66602 15.9998 6.66602C16.7332 6.66602 17.3332 7.26602 17.3332 7.99935V14.666H23.9998C24.7332 14.666 25.3332 15.266 25.3332 15.9993C25.3332 16.7327 24.7332 17.3327 23.9998 17.3327Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3962_7788">
          <rect width="32" height="32" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Remove = ({ className }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3962_10166)">
        <path
          d="M9 1.5C4.8525 1.5 1.5 4.8525 1.5 9C1.5 13.1475 4.8525 16.5 9 16.5C13.1475 16.5 16.5 13.1475 16.5 9C16.5 4.8525 13.1475 1.5 9 1.5ZM12.225 12.225C11.9325 12.5175 11.46 12.5175 11.1675 12.225L9 10.0575L6.8325 12.225C6.54 12.5175 6.0675 12.5175 5.775 12.225C5.4825 11.9325 5.4825 11.46 5.775 11.1675L7.9425 9L5.775 6.8325C5.4825 6.54 5.4825 6.0675 5.775 5.775C6.0675 5.4825 6.54 5.4825 6.8325 5.775L9 7.9425L11.1675 5.775C11.46 5.4825 11.9325 5.4825 12.225 5.775C12.5175 6.0675 12.5175 6.54 12.225 6.8325L10.0575 9L12.225 11.1675C12.51 11.4525 12.51 11.9325 12.225 12.225Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3962_10166">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Star = ({
  className,
  onClick,
}: {
  className: string;
  onClick?: () => void;
}) => {
  return (
    <svg
      width="40"
      height="37"
      viewBox="0 0 40 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      onClick={onClick}
    >
      <path
        d="M20 0L24.4903 13.8197H39.0211L27.2654 22.3607L31.7557 36.1803L20 27.6393L8.2443 36.1803L12.7346 22.3607L0.97887 13.8197H15.5097L20 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export const File = ({ className }: Props) => {
  return (
    <svg
      width="20"
      height="22"
      viewBox="0 0 20 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clip-path="url(#clip0_238_290)">
        <path
          d="M5.00004 2.66675C4.08337 2.66675 3.34171 3.41675 3.34171 4.33341L3.33337 17.6667C3.33337 18.5834 4.07504 19.3334 4.99171 19.3334H15C15.9167 19.3334 16.6667 18.5834 16.6667 17.6667V7.66675L11.6667 2.66675H5.00004ZM10.8334 8.50008V3.91675L15.4167 8.50008H10.8334Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_238_290">
          <rect
            width="20"
            height="20"
            fill="white"
            transform="translate(0 1)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
