import PDFViewerWithNoSSR from "../../common/PDFViewerNoSSR";

export default function ReportViewer() {
  return (
    <div className="flex flex-col gap-3 p-8 rounded-xl bg-gray-50">
      <h3 className="font-semibold text-gray-900">{"작성한 보고서"}</h3>
      <PDFViewerWithNoSSR />
    </div>
  );
}
