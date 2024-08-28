"use client";

import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import FileItem from "@/components/common/FileItem";
import { Close } from "@/assets/icons/action";

interface Props {
  guide: "expense" | "supply";
}

export default function ViewGuideModal({ guide }: Props) {
  return (
    <div id="view-guide" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[1200px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex items-center justify-between">
          <h2 className="text-center h1 font-bold text-gray-900">
            {guide === "expense" ? "활동비 규정 안내서" : "비품 규정 안내서"}
          </h2>
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8" />
          </button>
        </div>
        <ul>
          <FileItem />
        </ul>
      </div>
    </div>
  );
}
