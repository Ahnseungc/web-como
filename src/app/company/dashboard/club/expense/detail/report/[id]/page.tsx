"use client";

import { openModal } from "@/lib/utils";
import BackButton from "@/components/dashboard/common/BackButton";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";
import ExpenseRejectFormModal from "@/components/dashboard/company/club/modals/ExpenseRejectFormModal";
import ExpensePaymentSuccessModal from "@/components/dashboard/company/club/modals/ExpensePaymentSuccessModal";
import ExpenseRejectSuccessModal from "@/components/dashboard/company/club/modals/ExpenseRejectSuccessModal";

interface Props {
  params: { id: string };
}

export default function ExpenseReportDetailPage({ params }: Props) {
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="h3 font-semibold text-gray-900">{"품의서"}</h2>
          <div className="flex gap-2">
            <button
              className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900"
              onClick={() => openModal("expense-payment-success")}
            >
              {"지급"}
            </button>
            <button
              className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red"
              onClick={() => openModal("expense-reject-form")}
            >
              {"반려"}
            </button>
          </div>
        </div>
        <PDFViewer file="../../../../../../sample.pdf" />
      </div>
      <div className="m-0">
        <ExpensePaymentSuccessModal />
        <ExpenseRejectFormModal />
        <ExpenseRejectSuccessModal />
      </div>
    </>
  );
}
