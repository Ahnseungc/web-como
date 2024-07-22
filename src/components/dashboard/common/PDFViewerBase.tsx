"use client";

import { useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "/standard_fonts/",
};

interface Props {
  file?: string | File | null;
}

export default function PDFViewerBase({ file = "../../sample.pdf" }: Props) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setCurrentPage(1);
    setTotalPages(numPages);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  return (
    <>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        renderMode="canvas"
        className={"flex justify-around"}
      >
        <Page pageNumber={currentPage} width={700} />
        <Page
          pageNumber={currentPage + 1}
          width={700}
          className={"hidden xl:block"}
        />
      </Document>
      <div className="mt-6 mx-auto">
        <div className="flex items-center gap-5 p-1 rounded-full bg-gray-100">
          <button
            className="py-1.5 px-4 rounded-full body-1 font-bold text-gray-900 bg-gray-0 shadow"
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            {"이전"}
          </button>
          <span className="body-1 font-medium text-gray-800">{`${currentPage} / ${totalPages}`}</span>
          <button
            className="py-1.5 px-4 rounded-full body-1 font-bold text-gray-0 bg-gray-900 shadow"
            disabled={currentPage === totalPages}
            onClick={handleNextPage}
          >
            {"다음"}
          </button>
        </div>
      </div>
    </>
  );
}
