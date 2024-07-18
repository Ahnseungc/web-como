// "use client";

// import { useEffect, useState } from "react";
// import { usePDFSlick } from "@pdfslick/react";
// import PdfNavigation from "./PdfNavigation";
// import "@pdfslick/react/dist/pdf_viewer.css";

// interface Props {
//   file?: string;
// }

// export default function PdfViewer({ file = "../../sample.pdf" }: Props) {
//   const [isMounted, setIsMounted] = useState(false);
//   const { viewerRef, usePDFSlickStore, PDFSlickViewer } = usePDFSlick(file, {
//     singlePageViewer: true,
//     scaleValue: "page-fit",
//   });

//   return (
//     <div className="absolute inset-0 bg-slate-200/70 pdfSlick">
//       <div className="flex-1 relative h-full">
//         <PDFSlickViewer {...{ viewerRef, usePDFSlickStore }} />
//         <PdfNavigation {...{ usePDFSlickStore }} />
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { pdfjs, Document, Page } from "react-pdf";
import type { PDFDocumentProxy } from "pdfjs-dist";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

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

  useEffect(() => {
    if (typeof Promise.withResolvers !== "function") {
      if (window) {
        window.Promise.withResolvers = function <T>(): PromiseWithResolvers<T> {
          let resolve!: (value: T | PromiseLike<T>) => void;
          let reject!: (reason?: any) => void;
          const promise = new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
          });
          return { promise, resolve, reject };
        };
      } else {
        global.Promise.withResolvers = function <T>(): PromiseWithResolvers<T> {
          let resolve!: (value: T | PromiseLike<T>) => void;
          let reject!: (reason?: any) => void;
          const promise = new Promise<T>((res, rej) => {
            resolve = res;
            reject = rej;
          });
          return { promise, resolve, reject };
        };
      }
    }

    pdfjs.GlobalWorkerOptions.workerSrc = new URL(
      "pdfjs-dist/build/pdf.worker.min.mjs",
      import.meta.url
    ).toString();
  }, []);

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
