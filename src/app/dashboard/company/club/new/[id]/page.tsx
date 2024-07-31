"use client";

import { useSearchParams } from "next/navigation";
import { openModal } from "@/lib/utils";
import BackButton from "@/components/dashboard/common/BackButton";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";
import RejectApplicationModal from "@/components/dashboard/company/club/molecules/RejectApplicationModal";
import RevertRejectionModal from "@/components/dashboard/company/club/molecules/RevertRejectionModal";

export default function ApplicationDetailPage() {
  const status = useSearchParams().get("status");

  return (
    <>
      <BackButton />
      <div className="space-y-3 p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between">
          <h2 className="h3 font-semibold text-gray-900">{"작성한 신청서"}</h2>
          {status === "new" ? (
            <div className="flex gap-2">
              <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue">
                {"승인"}
              </button>
              <button
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-600"
                onClick={() => openModal("reject-application")}
              >
                {"반려"}
              </button>
            </div>
          ) : (
            status === "reject" && (
              <button
                className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
                onClick={() => openModal("revert-rejection")}
              >
                {"반려 취소"}
              </button>
            )
          )}
        </div>
        <PDFViewer file="../../../../../sample.pdf" />
      </div>
      <div className="mt-0">
        <RejectApplicationModal />
        <RevertRejectionModal />
      </div>
    </>
  );
}
