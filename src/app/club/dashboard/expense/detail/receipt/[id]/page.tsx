import BackButton from "@/components/dashboard/common/BackButton";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";

export default function ExpenseReceiptDetailPage() {
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="h3 font-semibold text-gray-900">{"해당 수령증"}</h2>
          <DocUtilButtons />
        </div>
        <PDFViewer file="../../../../../sample.pdf" />
      </div>
    </>
  );
}
