"use client";

import { openModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import { Info } from "@/assets/icons/info";

interface Props {
  id: string;
  title: string;
  content: string;
}

export default function InfoTooltipButton({ id, title, content }: Props) {
  return (
    <div className="relative flex items-center">
      <button onClick={() => openModal(id)}>
        <Info className="w-6 h-6 text-gray-400" />
      </button>
      <div id={id} className="modal hidden absolute top-8 left-0">
        <Backdrop invisible />
        <div className="relative z-50 space-y-2 w-96 p-4 rounded-lg border border-gray-300 bg-gray-0">
          <span className="body-1 font-bold text-gray-900">{title}</span>
          <p className="body-1 font-medium text-gray-700 break-keep">{content}</p>
        </div>
      </div>
    </div>
  );
}
