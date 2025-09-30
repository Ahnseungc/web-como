import { ActivityReportDetail } from "@/api/types/company/report";
import Input from "@/components/common/Input";
import { formatDateArray, formatDateFlexible } from "@/lib/utils";
import Image from "next/image";
import { useRef, forwardRef, useImperativeHandle } from "react";
import { useReactToPrint } from "react-to-print";
import {
  pdf,
  Document as PDFDocument,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { Download, Print } from "@/assets/icons/util";

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

const expenseCategory = {
  activity: "정책사업: 인적자원운용",
  welfare: "단위사업: 교직원 복지와 사기진작",
  support: "세부사업: 교직원복지지원",
  club: "사업 항목: 직장동호회지원",
  benefit: "목(240) : 복리후생비",
};

// 한글 폰트 등록
const registerFont = async () => {
  try {
    const response = await fetch("/fonts/SUIT/SUIT-Variable.ttf", {
      method: "HEAD",
    });
    if (response.ok) {
      Font.register({
        family: "SUIT",
        src: "/fonts/SUIT/SUIT-Variable.ttf",
        fontWeight: "normal",
      });
      Font.register({
        family: "SUIT",
        src: "/fonts/SUIT/SUIT-Variable.ttf",
        fontWeight: "bold",
      });
      console.log("SUIT 폰트 등록 성공");
    } else {
      console.error("폰트 파일을 찾을 수 없습니다:", response.status);
      Font.register({
        family: "SUIT",
        src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
        fontWeight: "normal",
      });
      Font.register({
        family: "SUIT",
        src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
        fontWeight: "bold",
      });
      console.log("기본 한글 폰트로 대체 등록");
    }
  } catch (error) {
    console.error("폰트 등록 실패:", error);
  }
};

// 폰트 등록 실행
registerFont();

// PDF 스타일 정의
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "SUIT",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "SUIT",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    borderBottom: "1px solid #000000",
    paddingBottom: 5,
    fontFamily: "SUIT",
  },
  field: {
    marginBottom: 10,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 3,
    fontFamily: "SUIT",
  },
  value: {
    fontSize: 11,
    padding: 8,
    border: "1px solid #CCCCCC",
    backgroundColor: "#F9F9F9",
    fontFamily: "SUIT",
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: "center",
    fontFamily: "SUIT",
  },
});

// PDF 문서 컴포넌트
const ReportPDF = ({ reportData }: { reportData: ActivityReportDetail }) => (
  <PDFDocument>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>활동 보고서</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기본 정보</Text>

        <View style={styles.field}>
          <Text style={styles.label}>행사명</Text>
          <Text style={styles.value}>{reportData.eventName || "-"}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>동호회명</Text>
          <Text style={styles.value}>{reportData.clubName || "-"}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>작성자</Text>
          <Text style={styles.value}>{reportData.writerName || "-"}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동 일정</Text>
          <Text style={styles.value}>
            {reportData.activityDate
              ? formatDateFlexible(reportData.activityDate)
              : "-"}
          </Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동 장소</Text>
          <Text style={styles.value}>{reportData.location || "-"}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>주요활동 내용</Text>
          <Text style={styles.value}>{reportData.activityContent || "-"}</Text>
        </View>

        {reportData.note && (
          <View style={styles.field}>
            <Text style={styles.label}>비고</Text>
            <Text style={styles.value}>{reportData.note}</Text>
          </View>
        )}
      </View>

      {reportData.expenses && reportData.expenses.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>활동 지원비 정산서</Text>
          {reportData.expenses.map((expense, idx) => (
            <View key={idx} style={styles.field}>
              <Text style={styles.label}>과목</Text>
              <Text style={styles.value}>
                {
                  expenseCategory[
                    expense.category as keyof typeof expenseCategory
                  ]
                }
              </Text>
              <Text style={styles.label}>지원액</Text>
              <Text style={styles.value}>{expense.supportAmount || "-"}</Text>
              <Text style={styles.label}>집행액</Text>
              <Text style={styles.value}>{expense.usedAmount || "-"}</Text>
              <Text style={styles.label}>잔액</Text>
              <Text style={styles.value}>{expense.remainingAmount || "-"}</Text>
              <Text style={styles.label}>집행내역</Text>
              <Text style={styles.value}>{expense.usageDetail || "-"}</Text>
            </View>
          ))}
        </View>
      )}
    </Page>
  </PDFDocument>
);

const ReportDetail = forwardRef<ReportDetailRef, Props>(({ data }, ref) => {
  const reportData = data?.data;
  const printRef = useRef<HTMLDivElement>(null);

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
      {/* PDF 다운로드/인쇄 버튼 - 왼쪽 정보 카드 아래 */}
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

      <div ref={printRef} className="w-full">
        {/* 나머지 컴포넌트 내용은 동일 */}
        {/* 1페이지: 활동 사진 첨부까지 */}
        <div className="space-y-2 p-8 rounded-xl bg-gray-0 w-full print-page-break-after">
          {" "}
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
                </div>{" "}
                <div className="flex flex-col basis-1/4">
                  <span className=" text-xl font-[600] mb-[8px]">
                    활동 장소
                  </span>
                  <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                    {reportData?.location || "-"}
                  </div>
                </div>{" "}
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
              {reportData?.photos &&
                reportData.photos.map((photo) => (
                  <div key={photo.id} className="aspect-[1/1] relative w-full">
                    <Image
                      src={photo.url}
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
        {reportData?.expenses && reportData.expenses.length > 0 ? (
          reportData.expenses.map((item, idx) => {
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
                  </div>{" "}
                  <div className="flex flex-col basis-1/4">
                    <span className=" text-xl font-[600] mb-[8px]">집행액</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                      {item.usedAmount || "-"}
                    </div>
                  </div>{" "}
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
                      {item.issuedDate?.join("-") || "-"}
                    </div>
                  </div>{" "}
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
                  </div>{" "}
                </div>
                <div className="flex w-full gap-[12px] flex-col">
                  <div className="flex flex-col basis-1">
                    <span className=" text-xl font-[600] mb-[8px]">내용</span>
                    <div className=" text-lg bg-gray-100 rounded-[6px] py-[18px] px-[20px]  ">
                      {item.description || "-"}
                    </div>
                  </div>{" "}
                  <div className="flex flex-col basis-1">
                    <span className=" text-xl font-[600] mb-[8px] ">
                      영수증
                    </span>
                    <div className="grid grid-cols-2 gap-[12px] w-full">
                      {item.file && (
                        <div className="aspect-[760/1013] relative min-w-full">
                          <Image
                            src={item.file}
                            alt="photo"
                            fill
                            className="rounded-[8px] object-cover"
                          />
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
