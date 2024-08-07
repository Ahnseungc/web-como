import Backdrop from "@/components/common/Backdrop";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";

export default function ViewReportModal() {
  return (
    <div id="view-report" className="hidden modal">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-40 p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-3 h-fit max-h-[90dvh] scrollbar-custom overflow-y-auto p-4">
          <h2 className="h1 font-bold text-gray-900">{"활동 보고서"}</h2>
          <PDFViewer file={"../../../../sample.pdf"} />
        </div>
      </div>
    </div>
  );
}
