"use client";

import { useState } from "react";
import { openModal } from "@/lib/utils";
import ViewGuideModal from "@/components/dashboard/company/employee/modals/ViewGuideModal";
import UploadGuideModal from "@/components/dashboard/company/employee/modals/UploadGuideModal";

export default function GuideDocuments() {
  const [selectedGuide, setSelectedGuide] = useState<"expense" | "supply">(
    "expense"
  );

  return (
    <>
      <div className="m-0">
        <ViewGuideModal guide={selectedGuide} />
        <UploadGuideModal guide={selectedGuide} />
      </div>
      <div className="space-y-8 p-8 rounded-xl bg-gray-800">
        <h2 className="h1 font-bold text-gray-0">{"필수 안내서 업로드"}</h2>
        <div className="flex">
          <div className="flex-1 space-y-5">
            <div className="h4 font-bold text-gray-200">{"활동비 안내서"}</div>
            <div className="flex gap-2">
              <button
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-brand-orange"
                onClick={() => {
                  setSelectedGuide("expense");
                  openModal("view-guide");
                }}
              >
                {"보기"}
              </button>
              <button
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-700"
                onClick={() => {
                  setSelectedGuide("expense");
                  openModal("upload-guide");
                }}
              >
                {"업로드"}
              </button>
            </div>
          </div>
          <span className="h-[76px] mx-8 border-l border-gray-700" />
          <div className="flex-1 space-y-5">
            <div className="h4 font-bold text-gray-200">{"비품 안내서"}</div>
            <div className="flex gap-2">
              <button
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-brand-orange"
                onClick={() => {
                  setSelectedGuide("supply");
                  openModal("view-guide");
                }}
              >
                {"보기"}
              </button>
              <button
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-700"
                onClick={() => {
                  setSelectedGuide("supply");
                  openModal("upload-guide");
                }}
              >
                {"업로드"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
