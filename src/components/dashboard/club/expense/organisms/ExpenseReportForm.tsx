"use client";

import { useEffect, useState, useRef } from "react";
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
import Input from "@/components/common/Input";
import { Document, Download, Print } from "@/assets/icons/util";
import { ExpenseFormValues } from "@/api/types/company/expense";

// 한글 폰트 등록
const registerFont = async () => {
  try {
    // 폰트 파일 존재 여부 확인
    const response = await fetch("/fonts/SUIT/SUIT-Variable.ttf", {
      method: "HEAD",
    });
    if (response.ok) {
      // SUIT 폰트를 다양한 스타일로 등록
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
      // 기본 폰트로 대체
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
    // 마지막 수단으로 기본 폰트 사용
    try {
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
      console.log("외부 한글 폰트로 대체 등록");
    } catch (fallbackError) {
      console.error("모든 폰트 등록 실패:", fallbackError);
    }
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
const ExpenseReportPDF = ({ expense }: { expense: ExpenseFormValues }) => (
  <PDFDocument>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>활동지원비 신청서</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기본 정보</Text>

        <View style={styles.field}>
          <Text style={styles.label}>행사명</Text>
          <Text style={styles.value}>{expense.eventName}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동 내용</Text>
          <Text style={styles.value}>{expense.description}</Text>
        </View>

        {expense.note && (
          <View style={styles.field}>
            <Text style={styles.label}>주요 내용</Text>
            <Text style={styles.value}>{expense.note}</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>지급 계좌 정보</Text>

        <View style={styles.field}>
          <Text style={styles.label}>장소(사용처)</Text>
          <Text style={styles.value}>{expense.location}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>참여 인원</Text>
          <Text style={styles.value}>{expense.participantCount}명</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>신청 금액</Text>
          <Text style={styles.value}>{expense.amount.toLocaleString()}원</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>산출 내역</Text>
          <Text style={styles.value}>{expense.details}</Text>
        </View>

        {expense.file && (
          <View style={styles.field}>
            <Text style={styles.label}>첨부 파일</Text>
            <Text style={styles.value}>{getDecodedFileName(expense.file)}</Text>
          </View>
        )}
      </View>

      <Text style={styles.footer}>
        상기와 같이 해당 {expense.eventName} 활동의 지원금을 요청합니다.
      </Text>
    </Page>
  </PDFDocument>
);

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

export default function ExpenseReportForm({
  expense,
  onPDFDownload,
  onPrint,
}: {
  expense: ExpenseFormValues;
  onPDFDownload?: () => void;
  onPrint?: () => void;
}) {
  const [formValues, setFormValues] = useState<ExpenseFormValues | null>(null);
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFormValues({
      eventName: expense.eventName,
      description: expense.description,
      note: expense.note,
      location: expense.location,
      participantCount: expense.participantCount,
      amount: expense.amount,
      details: expense.details,
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

  if (!formValues) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-3 w-full">
      {/* PDF 다운로드/인쇄 버튼 */}
      <div className="flex gap-3 justify-end mb-4 no-print">
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
              value={formValues.note}
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
                <h3 className="font-semibold text-gray-900">{"첨부 파일"}</h3>
                <h3 className="text-point-red">{"*"}</h3>
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
}
