import { ActivityReportDetail } from "@/api/types/company/report";
import Input from "@/components/common/Input";
import { formatDateArray, formatDateFlexible } from "@/lib/utils";
import Image from "next/image";
import { useRef, forwardRef, useImperativeHandle } from "react";
import { useReactToPrint } from "react-to-print";
import { pdf, Font } from "@react-pdf/renderer";
import { Download, Print } from "@/assets/icons/util";
import { usePathname } from "next/navigation";
import { ReportPDF, expenseCategory } from "./ReportDetailPDF";

interface Props {
  data: {
    data: ActivityReportDetail;
    resultCode: string;
    resultMessage: string;
  };
}

// ReportDetail에서 외부로 노출할 메서드 타입
export interface ReportDetailRef {
  handlePDFDownload: () => Promise<void>;
}

// 파일이 PDF인지 확인하는 함수
const isPDFFile = (url: string): boolean => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return (
    lowerUrl.endsWith(".pdf") ||
    lowerUrl.includes(".pdf?") ||
    lowerUrl.includes("pdf")
  );
};

const ReportDetail = forwardRef<ReportDetailRef, Props>(({ data }, ref) => {
  const reportData = data?.data;
  const printRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // /club/report/ 경로인지 확인
  const isClubReportPath = pathname?.startsWith(
    "/company/dashboard/club/report/"
  );

  // 인쇄 기능
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `활동보고서_${reportData?.eventName || "보고서"}`,
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
        .pdf-viewer {
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

      const pdfDoc = pdf(<ReportPDF reportData={reportData} />);
      console.log("PDF 문서 생성 완료");

      const blob = await pdfDoc.toBlob();
      console.log("PDF Blob 생성 완료:", blob);

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `활동보고서_${reportData?.eventName || "보고서"}.pdf`;
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
        reportData: reportData,
      });
      alert(
        `PDF 다운로드 중 오류가 발생했습니다: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  // 부모 컴포넌트에서 호출할 수 있도록 메서드 노출
  useImperativeHandle(ref, () => ({
    handlePDFDownload,
  }));

  return (
    <div className="w-full">
      {!isClubReportPath && (
        <div className="flex gap-3 justify-center mb-4 no-print">
          <button
            onClick={handlePDFDownload}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            PDF 다운로드
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <Print className="w-4 h-4" />
            인쇄
          </button>
        </div>
      )}

      <div ref={printRef} className="w-full">
        {/* 1페이지: 활동 사진 첨부까지 */}
        <div className="space-y-2 p-8 rounded-xl bg-gray-0 w-full print-page-break-after">
          <div className="flex gap-4 mb-[36px]">
            <div className="relative aspect-[1/1] min-w-[336px]">
              {reportData?.clubImage && (
                <Image
                  fill
                  src={reportData.clubImage}
                  alt="clubImage"
                  className="rounded-[8px]"
                />
              )}
            </div>
            <div className=" w-full  ">
              {reportData?.eventName ? (
                <Input
                  label="행사명"
                  value={reportData.eventName}
                  readOnly
                  inputStyle="w-full"
                />
              ) : (
                <div className="w-full">
                  <span className="text-xl font-[600] mb-[8px] block">
                    행사명
                  </span>
                  <div className="text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] text-gray-400">
                    행사명 정보를 불러올 수 없습니다.
                  </div>
                </div>
              )}
              <div className="flex gap-[12px] mt-[24px]">
                <Input
                  label="동호회명"
                  inputStyle=" basis-1/2"
                  readOnly
                  value={reportData?.clubName || ""}
                />
                <Input
                  label="작성자"
                  inputStyle="basis-1/2"
                  readOnly
                  value={reportData?.writerName || ""}
                />
              </div>
              <div className="flex w-full gap-[12px] mt-[24px]">
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">
                    활동 일정
                  </span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                    {reportData?.activityDate
                      ? formatDateFlexible(reportData.activityDate)
                      : "-"}
                  </div>
                </div>
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px] text-gray-100">
                    .
                  </span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                    {Array.isArray(reportData?.activityTime) &&
                    reportData.activityTime.length >= 2
                      ? `${String(reportData.activityTime[0]).padStart(2, "0")}:${String(reportData.activityTime[1]).padStart(2, "0")}`
                      : "-"}
                  </div>
                </div>
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">
                    활동 장소
                  </span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                    {reportData?.location || "-"}
                  </div>
                </div>
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px] text-gray-100">
                    ,
                  </span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                    {reportData?.locationDetail || "-"}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full gap-[8px]">
            <span className="text-xl font-[600]">주요활동 내용</span>
            <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
              {reportData?.activityContent || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full gap-[8px] pt-[36px]">
            <span className="text-xl font-[600]">비고</span>
            <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
              {reportData?.note || "-"}
            </div>
          </div>
          <div className="flex flex-col w-full gap-[8px] pt-[36px]">
            <span className="text-xl font-[600]">
              지출 증빙용 활동 사진 첨부
            </span>
            <div className="grid grid-cols-2 gap-[12px] w-full">
              {reportData?.images &&
                reportData.images.map((image) => (
                  <div key={image.id} className="aspect-[1/1] relative w-full">
                    <Image
                      src={image.url}
                      alt="photo"
                      fill
                      className="rounded-[8px] object-cover"
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* 2페이지: 활동 지원비 정산서부터 */}
        {reportData?.receipts && reportData.receipts.length > 0 ? (
          reportData.receipts.map((item, idx) => {
            const fileIsPDF = item.file ? isPDFFile(item.file) : false;

            return (
              <div
                key={idx}
                className="space-y-2 p-8 rounded-xl bg-gray-0 w-full mt-[12px] mb-[100px]"
              >
                <div className=" text-2xl font-[700] mb-[36px]">
                  활동 지원비 정산서
                </div>
                <div className="flex w-full gap-[12px]">
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px]">과목</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                      {
                        expenseCategory[
                          item.category as keyof typeof expenseCategory
                        ]
                      }
                    </div>
                  </div>
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px]">지원액</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                      {item.supportAmount || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px]">집행액</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                      {item.amount || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px] ">잔액</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                      {item.remainingAmount || "-"}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full gap-[8px] pt-[36px]">
                  <span className="text-xl font-[600]">집행내역</span>
                  <div className="bg-gray-100 rounded-[6px] py-[18px] px-[20px] whitespace-pre-line">
                    {item.usageDetail || "-"}
                  </div>
                </div>

                {/*활동 지원비 영수증 */}
                <div className=" text-2xl font-[700] pt-[36px] pb-[24px]">
                  활동 지원비 영수증
                </div>
                <div className="flex w-full gap-[12px] pb-[24px]">
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px]">담당자</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                      {item.submittedBy || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px] ">일자</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                      {item.issuedDate || "-"}
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-[12px]">
                  <div className="flex flex-col basis-1/2">
                    <span className=" text-xl font-[600] mb-[8px]">사용처</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]   ">
                      {item.vendor || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col basis-1/2">
                    <span className=" text-xl font-[600] mb-[8px] ">금액</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px] ">
                      {item.usedAmount || "-"}
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-[12px] flex-col">
                  <div className="flex flex-col basis-1">
                    <span className=" text-xl font-[600] mb-[8px]">내용</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                      {item.description || "-"}
                    </div>
                  </div>
                  <div className="flex flex-col basis-1">
                    <span className=" text-xl font-[600] mb-[8px] ">
                      영수증
                    </span>
                    <div className="grid grid-cols-2 gap-[12px] w-full">
                      {item.file && (
                        <div className="aspect-[760/1013] relative min-w-full">
                          {fileIsPDF ? (
                            <div className="w-full h-full border border-gray-300 rounded-[8px] overflow-hidden">
                              <iframe
                                src={item.file}
                                className="w-full h-full pdf-viewer"
                                title="영수증 PDF"
                              />
                              {/* 인쇄 시 PDF 링크 표시 */}
                              <div className="hidden print:block p-4 bg-gray-100 rounded-[8px]">
                                <p className="text-sm text-gray-700">
                                  PDF 영수증: {item.file}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <Image
                              src={item.file}
                              alt="영수증"
                              fill
                              className="rounded-[8px] object-cover"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="space-y-2 p-8 rounded-xl bg-gray-0 w-full mt-[12px] mb-[100px]">
            <div className="text-2xl font-[700] mb-[36px]">
              활동 지원비 정산서
            </div>
            <div className="text-lg text-gray-500 text-center py-8">
              활동 지원비 내역이 없습니다.
            </div>
          </div>
        )}
      </div>
    </div>
  );
});

ReportDetail.displayName = "ReportDetail";

export default ReportDetail;
