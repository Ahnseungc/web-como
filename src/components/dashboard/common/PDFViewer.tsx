import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./PDFViewerBase"), {
  ssr: false,
});

interface Props {
  file?: string | File | null;
}

export default function PDFViewer({ file }: Props) {
  return <NoSSR file={file} />;
}
