import { ActivityReportDetail } from "@/api/types/company/report";
import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { pdfStyles } from "@/lib/pdf-utils";
import { formatDate2 } from "@/lib/format";

// 비용 카테고리 정의
export const expenseCategory = {
  activity: "정책사업: 인적자원운용",
  welfare: "단위사업: 교직원 복지와 사기진작",
  support: "세부사업: 교직원복지지원",
  club: "사업 항목: 직장동호회지원",
  benefit: "목(240) : 복리후생비",
};

export const ReportPDF = ({
  reportData,
}: {
  reportData: ActivityReportDetail;
}) => {
  const comoLogo = "/logo.png";
  const today = new Date();
  const currentDate = `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;

  return (
    <PDFDocument>
      <Page size="A4" style={pdfStyles.coverPage}>
        <Text style={pdfStyles.watermark}>
          본 보고서의 저작권은 (주)핀데브에 있습니다. 변형 또는 무단 배포를
          금지합니다.{"\n"}
          ©2024. (주)핀데브 Inc.all right reserved.
        </Text>
        <View style={{ paddingTop: 30 }}>
          <Image src={comoLogo} style={pdfStyles.logo} />
        </View>

        <Text style={pdfStyles.yearTitle}>2025년</Text>
        <Text style={pdfStyles.mainTitle}>[{reportData.clubName}]</Text>
        <Text style={pdfStyles.mainTitle}>활동 보고서 및 정산서</Text>
        <Text style={pdfStyles.subTitle}>
          (주)핀데브에서 제공하는 자동보고서 기능으로 작성되었습니다.
        </Text>
        <View style={pdfStyles.orangeLine} />

        <View style={pdfStyles.infoSection}>
          <View
            style={{
              flexDirection: "row",
              marginBottom: 12,
              alignItems: "center",
            }}
          >
            <Text style={pdfStyles.infoLabelHighlight}>작성자</Text>
            <Text style={pdfStyles.infoName}>
              {reportData.writerName || ""}
            </Text>
          </View>
          <View style={pdfStyles.infoRow}>
            <Text style={pdfStyles.infoLabel}>활동일자: </Text>
            <Text style={pdfStyles.infoValue}>
              {formatDate2(reportData.activityDate)}
            </Text>
          </View>
          <View style={pdfStyles.infoRow}>
            <Text style={pdfStyles.infoLabel}>작성일자: </Text>
            <Text style={pdfStyles.infoValue}>{currentDate}</Text>
          </View>
        </View>
      </Page>

      <Page size="A4" style={pdfStyles.contentPage}>
        <Text style={pdfStyles.watermark}>
          본 보고서의 저작권은 (주)핀데브에 있습니다. 변형 또는 무단 배포를
          금지합니다.{"\n"}
          ©2024. (주)핀데브 Inc.all right reserved.
        </Text>
        <View style={pdfStyles.contentArea}>
          <Text style={pdfStyles.infoName}>동호회 정보</Text>
          <View style={pdfStyles.clubInfoTable}>
            <View style={pdfStyles.tableRow}>
              <Text style={pdfStyles.tableLabel}>동호회명</Text>
              <Text style={pdfStyles.tableValue}>{reportData.clubName}</Text>
            </View>
            <View style={pdfStyles.tableRowDouble}>
              <Text style={pdfStyles.tableLabelHalf}>회장</Text>
              <Text style={pdfStyles.tableValueHalf}>{["운영장"] || ""}</Text>
              <Text style={pdfStyles.tableLabelHalf}>부회장</Text>
              <Text style={pdfStyles.tableValueHalfLast}>
                {["부운영장"] || ""}
              </Text>
            </View>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabelHalf}>총무</Text>
              <Text style={pdfStyles.tableValueHalf}>{["총무"] || ""}</Text>
              <Text style={pdfStyles.tableLabelHalf}>.</Text>
              <Text style={pdfStyles.tableValueHalfLast}>.</Text>
            </View>
          </View>
          <Text style={pdfStyles.infoName}>활동 정보</Text>
          <View style={pdfStyles.clubInfoTable}>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabel}>행사명</Text>
              <Text style={pdfStyles.tableValue}>{reportData.eventName}</Text>
            </View>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabel}>행사 일정</Text>
              <Text style={pdfStyles.tableValue}>
                {reportData.activityDate + " / " + reportData.activityTime}
              </Text>
            </View>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabel}>행사 장소</Text>
              <Text style={pdfStyles.tableValue}>{reportData.location}</Text>
            </View>
          </View>
          <Text style={pdfStyles.infoName}>활동 개요</Text>
          <View style={pdfStyles.clubInfoTable}>
            <Text style={pdfStyles.fullRowTitle}>주요활동 내용</Text>
            <View style={pdfStyles.fullRowDescContainer}>
              <Text style={pdfStyles.fullRowDesc}>
                {reportData.activityContent}
              </Text>
            </View>
          </View>
        </View>
        <Text style={pdfStyles.pageNumber}>- 1 -</Text>
      </Page>
    </PDFDocument>
  );
};
