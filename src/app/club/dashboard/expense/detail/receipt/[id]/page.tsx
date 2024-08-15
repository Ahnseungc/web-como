import Link from "next/link";
import BackButton from "@/components/dashboard/common/BackButton";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";

interface Props {
  params: { id: string };
}

export default function ExpenseReceiptDetailPage({ params }: Props) {
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="h3 font-semibold text-gray-900">{"수령증"}</h2>
          <div className="flex gap-3">
            <DocUtilButtons />
            <Link href={`../../transaction/new?receiptCode=${params.id}`}>
              <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900">
                {"입출금 내역 작성"}
              </button>
            </Link>
          </div>
        </div>
        <PDFViewer file="../../../../../sample.pdf" />
      </div>
    </>
  );
}
