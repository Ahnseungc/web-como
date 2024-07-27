"use client";

import { closeModal, cn } from "@/lib/utils";

interface Props {
  invisible?: boolean;
  handleClose?: () => void;
}

export default function Backdrop({ invisible, handleClose }: Props) {
  return (
    <div
      className={cn("fixed inset-0 z-30", invisible ? "" : "bg-gray-1000/30")}
      onClick={() => {
        handleClose?.();
        closeModal();
      }}
    />
  );
}
