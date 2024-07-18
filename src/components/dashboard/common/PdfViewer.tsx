import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./PDFViewerBase"), {
  ssr: false,
});

export default function PDFViewer() {
  return <NoSSR />;
}
