interface Props {
  className?: string;
}

export const Calendar = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3408_48693)">
        <path
          d="M19 3H18V2C18 1.45 17.55 1 17 1C16.45 1 16 1.45 16 2V3H8V2C8 1.45 7.55 1 7 1C6.45 1 6 1.45 6 2V3H5C3.89 3 3.01 3.9 3.01 5L3 19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM18 19H6C5.45 19 5 18.55 5 18V8H19V18C19 18.55 18.55 19 18 19Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3408_48693">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Category = ({ className }: Props) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.7085 1.16797L3.50016 6.41797H9.91683L6.7085 1.16797ZM6.7085 3.40797L7.83433 5.2513H5.57683L6.7085 3.40797ZM9.91683 7.58464C8.46433 7.58464 7.29183 8.75713 7.29183 10.2096C7.29183 11.6621 8.46433 12.8346 9.91683 12.8346C11.3693 12.8346 12.5418 11.6621 12.5418 10.2096C12.5418 8.75713 11.3693 7.58464 9.91683 7.58464ZM9.91683 11.668C9.11183 11.668 8.4585 11.0146 8.4585 10.2096C8.4585 9.40464 9.11183 8.7513 9.91683 8.7513C10.7218 8.7513 11.3752 9.40464 11.3752 10.2096C11.3752 11.0146 10.7218 11.668 9.91683 11.668ZM1.4585 12.543H6.12516V7.8763H1.4585V12.543ZM2.62516 9.04297H4.9585V11.3763H2.62516V9.04297Z"
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
      <g clipPath="url(#clip0_3642_8901)">
        <path
          d="M5.00001 2.66602C4.08334 2.66602 3.34168 3.41602 3.34168 4.33268L3.33334 17.666C3.33334 18.5827 4.07501 19.3327 4.99168 19.3327H15C15.9167 19.3327 16.6667 18.5827 16.6667 17.666V7.66602L11.6667 2.66602H5.00001ZM10.8333 8.49935V3.91602L15.4167 8.49935H10.8333Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3642_8901">
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

export const Info = ({ className }: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3628_102560)">
        <path
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 17C11.45 17 11 16.55 11 16V12C11 11.45 11.45 11 12 11C12.55 11 13 11.45 13 12V16C13 16.55 12.55 17 12 17ZM13 9H11V7H13V9Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3628_102560">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Marker = ({ className }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3661_5700)">
        <path
          d="M9 9C9.825 9 10.5 8.325 10.5 7.5C10.5 6.675 9.825 6 9 6C8.175 6 7.5 6.675 7.5 7.5C7.5 8.325 8.175 9 9 9ZM9 1.5C12.15 1.5 15 3.915 15 7.65C15 10.035 13.1625 12.84 9.495 16.0725C9.21 16.32 8.7825 16.32 8.4975 16.0725C4.8375 12.84 3 10.035 3 7.65C3 3.915 5.85 1.5 9 1.5Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3661_5700">
          <rect width="18" height="18" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const People = ({ className }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3357_22942)">
        <path
          d="M13.333 9.16699C14.7163 9.16699 15.8247 8.05033 15.8247 6.66699C15.8247 5.28366 14.7163 4.16699 13.333 4.16699C11.9497 4.16699 10.833 5.28366 10.833 6.66699C10.833 8.05033 11.9497 9.16699 13.333 9.16699ZM6.66634 9.16699C8.04967 9.16699 9.15801 8.05033 9.15801 6.66699C9.15801 5.28366 8.04967 4.16699 6.66634 4.16699C5.28301 4.16699 4.16634 5.28366 4.16634 6.66699C4.16634 8.05033 5.28301 9.16699 6.66634 9.16699ZM6.66634 10.8337C4.72467 10.8337 0.833008 11.8087 0.833008 13.7503V15.0003C0.833008 15.4587 1.20801 15.8337 1.66634 15.8337H11.6663C12.1247 15.8337 12.4997 15.4587 12.4997 15.0003V13.7503C12.4997 11.8087 8.60801 10.8337 6.66634 10.8337ZM13.333 10.8337C13.0913 10.8337 12.8163 10.8503 12.5247 10.8753C12.5413 10.8837 12.5497 10.9003 12.558 10.9087C13.508 11.6003 14.1663 12.5253 14.1663 13.7503V15.0003C14.1663 15.292 14.108 15.5753 14.0163 15.8337H18.333C18.7913 15.8337 19.1663 15.4587 19.1663 15.0003V13.7503C19.1663 11.8087 15.2747 10.8337 13.333 10.8337Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3357_22942">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export const Profile = ({ className }: Props) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g clipPath="url(#clip0_3703_32103)">
        <path
          d="M8.00016 1.33203C4.32016 1.33203 1.3335 4.3187 1.3335 7.9987C1.3335 11.6787 4.32016 14.6654 8.00016 14.6654C11.6802 14.6654 14.6668 11.6787 14.6668 7.9987C14.6668 4.3187 11.6802 1.33203 8.00016 1.33203ZM8.00016 3.33203C9.10683 3.33203 10.0002 4.22536 10.0002 5.33203C10.0002 6.4387 9.10683 7.33203 8.00016 7.33203C6.8935 7.33203 6.00016 6.4387 6.00016 5.33203C6.00016 4.22536 6.8935 3.33203 8.00016 3.33203ZM8.00016 12.7987C6.3335 12.7987 4.86016 11.9454 4.00016 10.652C4.02016 9.32536 6.66683 8.5987 8.00016 8.5987C9.32683 8.5987 11.9802 9.32536 12.0002 10.652C11.1402 11.9454 9.66683 12.7987 8.00016 12.7987Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_3703_32103">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
