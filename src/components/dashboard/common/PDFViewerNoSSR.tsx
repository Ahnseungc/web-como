import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./PdfViewer"), {
  ssr: false,
});

export default function PDFViewerWithNoSSR() {
  return <NoSSR />;
}
