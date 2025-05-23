import React from "react";

interface ApprovalButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  content: string;
}

const ApprovalButton = ({ onClick, content }: ApprovalButtonProps) => {
  return (
    <button
      className={
        "py-1 px-4 rounded body-1 font-medium text-gray-0 w-[60px] h-[32px]" +
        ` ${content === "승인" ? "bg-point-blue" : "bg-gray-600"} hover:${content === "승인" ? "bg-point-blue-dark" : "bg-gray-700"}`
      }
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default ApprovalButton;
