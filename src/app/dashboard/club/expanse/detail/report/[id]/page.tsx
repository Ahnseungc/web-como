import BackButton from "@/components/dashboard/common/BackButton";
import DocUtilButtons from "@/components/dashboard/common/DocUtil";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";

export default function ExpanseReportDetailPage() {
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="h3 font-semibold text-gray-900">{"작성된 품의서"}</h2>
          <DocUtilButtons />
        </div>
        <PDFViewer file="../../../../../sample.pdf" />
      </div>
    </>
  );
}
