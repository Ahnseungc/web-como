"use client";

import { closeModal, cn } from "@/lib/utils";

interface Props {
  invisible?: boolean;
}

export default function Backdrop({ invisible }: Props) {
  return (
    <div
      className={cn("fixed inset-0 z-30", invisible ? "" : "bg-gray-1000/30")}
      onClick={closeModal}
    />
  );
}
