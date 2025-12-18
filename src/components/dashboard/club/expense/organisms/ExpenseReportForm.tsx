"use client";

import {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useReactToPrint } from "react-to-print";
import { pdf, Font } from "@react-pdf/renderer";
import Input from "@/components/common/Input";
import { Document } from "@/assets/icons/util";
import { ExpenseFormValues } from "@/api/types/company/expense";
import { ExpenseReportPDF } from "./ExpenseReportPDF";

const getDecodedFileName = (url: string) => {
  try {
    // URL을 언더스코어로 분리하고 마지막 부분만 가져옴
    const encodedFileName = url.split("_").pop() || "";
    // URL 디코딩
    return decodeURIComponent(encodedFileName);
  } catch (e) {
    console.error("파일명 디코딩 중 오류 발생:", e);
    return "첨부파일";
  }
};

export interface ExpenseReportFormRef {
  handlePrint: () => void;
  handlePDFDownload: () => void;
}

const ExpenseReportForm = forwardRef<
  ExpenseReportFormRef,
  { expense: ExpenseFormValues }
>(({ expense }, ref) => {
  const [formValues, setFormValues] = useState<ExpenseFormValues | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormValues({
      eventName: expense.eventName,
      clubName: expense.clubName,
      description: expense.description,
      content: expense.content,
      leadersSummary: expense.leadersSummary,
      location: expense.location,
      participantCount: expense.participantCount,
      amount: expense.amount,
      details: expense.details,
      createdAt: expense.createdAt,
      file: expense.file,
    });
  }, [expense]);

  const handleFileDownload = (fileUrl: string) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 인쇄 기능
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `활동지원비신청서_${expense.eventName}`,
    pageStyle: `
      @page {
        size: A4;
        margin: 20mm;
      }
      @media print {
        body {
          -webkit-print-color-adjust: exact;
          color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `,
  });

  // PDF 다운로드 기능
  const handlePDFDownload = async () => {
    try {
      console.log("PDF 생성 시작...");

      // 폰트 등록이 완료될 때까지 대기
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // 폰트 등록 상태 확인
      const registeredFonts = Font.getRegisteredFonts();
      console.log("등록된 폰트:", registeredFonts);

      const pdfDoc = pdf(<ExpenseReportPDF expense={expense} />);
      console.log("PDF 문서 생성 완료");

      const blob = await pdfDoc.toBlob();
      console.log("PDF Blob 생성 완료:", blob);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `활동지원비신청서_${expense.eventName}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      console.log("PDF 다운로드 완료");
    } catch (error) {
      console.error("PDF 생성 중 오류 발생:", error);
      console.error("오류 상세:", {
        message: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined,
        expense: expense,
      });
      alert(
        `PDF 다운로드 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // ref를 통해 외부에서 함수들을 호출할 수 있도록 노출
  useImperativeHandle(ref, () => ({
    handlePrint,
    handlePDFDownload,
  }));

  if (!formValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-3 w-full">
      <div ref={printRef} className="space-y-3 w-full">
        <form className="space-y-3 w-full">
          <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
            <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
            <Input
              value={formValues.eventName}
              name="eventName"
              label="행사명"
              type="text"
              placeholder="행사명을 입력해주세요."
              readOnly
              required
            />
            <Input
              value={formValues.description}
              name="description"
              label="활동 내용"
              type="text"
              maxLength={1000}
              placeholder="활동 내용을 입력해주세요."
              readOnly
              inputStyle="h-[300px] resize-none whitespace-pre-wrap"
              required
            />
            <Input
              value={formValues.content}
              name="note"
              label="주요 내용"
              type="text"
              maxLength={1000}
              placeholder="주요 내용을 입력하세요."
              inputStyle="h-[300px] resize-none whitespace-pre-wrap"
              readOnly
            />
          </div>
          <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
            <h3 className="h2 font-bold text-gray-900">{"지급 계좌 정보"}</h3>
            <Input
              required
              value={formValues.location}
              name="location"
              label="장소(사용처)"
              placeholder="위치를 입력하세요."
              readOnly
              className="w-full min-h-[60px] py-4 px-3 rounded-md outline-none border border-gray-100 
             focus-visible:border-gray-900 h4 font-medium placeholder:text-gray-400 
             text-gray-900 bg-gray-100 focus-visible:bg-gray-50 
             transition duration-300 block resize-none whitespace-pre-wrap"
            />

            <Input
              required
              value={formValues.participantCount.toString()}
              inputStyle="max-w-[350px]"
              name="participantCount"
              label="참여 인원"
              type="number"
              placeholder="인원수를 입력해주세요."
              readOnly
            />
            <Input
              required
              value={formValues.amount.toLocaleString()}
              inputStyle="max-w-[350px]"
              name="amount"
              label="신청 금액"
              type="text"
              placeholder="금액을 입력해주세요."
              readOnly
            />

            <Input
              required
              value={formValues.details}
              name="details"
              label="산출 내역"
              type="text"
              placeholder="산출 내역을 입력해주세요."
              readOnly
              maxLength={1000}
              inputStyle="h-[300px] resize-none whitespace-pre-wrap"
            />

            <div className="space-y-2">
              <div className="flex">
                <h3 className="font-semibold text-gray-900">첨부 파일</h3>
                <h3 className="text-point-red">*</h3>
              </div>

              {formValues.file && (
                <div
                  onClick={() => {
                    if (formValues.file) handleFileDownload(formValues.file);
                  }}
                  className="cursor-pointer flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0"
                >
                  <div className="flex gap-2 h4 font-medium text-gray-800 cursor-pointer hover:text-brand-orange">
                    {getDecodedFileName(formValues.file)}
                  </div>
                  <div className="p-1 rounded bg-point-green">
                    <Document className="w-6 h-6 text-gray-0" />
                  </div>
                </div>
              )}
              {!formValues.file && (
                <div className="flex items-center justify-between p-3 rounded-md border border-gray-400 bg-gray-0 ">
                  <div className="flex gap-2 h4 font-medium text-gray-800">
                    첨부 파일이 없습니다.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="p-8 rounded-xl bg-gray-0 text-xl font-suit">
            {`상기와 같이 해당 ${formValues.eventName} 활동의 지원금을 요청합니다.`}
          </div>
        </form>
      </div>
    </div>
  );
});

ExpenseReportForm.displayName = "ExpenseReportForm";

export default ExpenseReportForm;
