"use client";

import { useState } from "react";
import { closeModal } from "@/lib/utils";
import Backdrop from "@/components/common/Backdrop";
import Button from "@/components/common/Button";
import FileDragNDropInput from "@/components/common/FileDragNDropInput";
import InfoTooltipButton from "@/components/dashboard/common/InfoTooltipButton";
import { Close } from "@/assets/icons/action";

interface Props {
  guide: "expense" | "supply";
}

export default function UploadGuideModal({ guide }: Props) {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div id="upload-guide" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 space-y-8 w-full max-w-[1200px] p-8 rounded-xl bg-gray-0 shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-center h1 font-bold text-gray-900">
              {guide === "expense"
                ? "활동비 규정 안내서 업로드"
                : "비품 규정 안내서 업로드"}
            </h2>
            <InfoTooltipButton
              id="guide-upload-tooltip"
              title="필수 안내서 업로드"
              content="동호회 임원이 활동비 신청서(품의서)를 작성하거나 품의서 작성을 통해 지급받은 비품을 관리함에 있어 준수해야할 사항들을 업로드할 수 있는 페이지입니다. 활동비 규정 안내서와 비품 관련 안내서 두 종으로 분류되며, 해당 페이지를 통해 업로드된 파일들은 동호회 임원들이 다운로드하여 열람할 수 있습니다."
            />
          </div>
          <button onClick={() => closeModal()}>
            <Close className="w-8 h-8" />
          </button>
        </div>
        <FileDragNDropInput
          setFiles={setFiles}
          helperText="안내서 파일은 1개만 등록 가능합니다."
          limit={1}
        />
        <Button content="등록하기" primary disabled={files.length !== 1} />
      </div>
    </div>
  );
}
