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

export default function PdfViewer({ file = "../../sample.pdf" }: Props) {
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
      <div className="flex items-center justify-center gap-6">
        <button disabled={currentPage === 1} onClick={handlePrevPage}>
          {"이전"}
        </button>
        <span>{`${currentPage} / ${totalPages}`}</span>
        <button disabled={currentPage === totalPages} onClick={handleNextPage}>
          {"다음"}
        </button>
      </div>
      <Document
        file={file}
        onLoadSuccess={onDocumentLoadSuccess}
        options={options}
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
    </>
  );
}
