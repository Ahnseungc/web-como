import dynamic from "next/dynamic";

const NoSSR = dynamic(() => import("./PDFViewerBase"), {
  ssr: false,
});

interface Props {
  file?: string | File | null;
}

export default function PDFViewer({ file }: Props) {
  return (
    <div className="min-w-[700px] min-h-[970px]">
      <NoSSR file={file} />
    </div>
  );
}
