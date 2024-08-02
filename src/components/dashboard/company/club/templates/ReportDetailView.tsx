"use client";

import { openModal } from "@/lib/utils";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";

export default function ReportDetailView() {
  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="h3 font-semibold text-gray-900">{"활동보고서"}</h2>
        <div className="flex gap-2">
          <button
            className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800"
            onClick={() => openModal("report-confirm")}
          >
            {"확인완료"}
          </button>
          <button
            className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
            onClick={() => openModal("report-rerequest")}
          >
            {"재요청"}
          </button>
        </div>
      </div>
      <PDFViewer file="../../../../../sample.pdf" />
    </div>
  );
}
