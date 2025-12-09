import {
  ActivityReportDetail,
  ActivityReportExpense,
  ActivityReportPhoto,
} from "@/api/types/company/report";
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
  const createdDate = reportData.createdDate
    ? formatDate2(reportData.createdDate)
    : currentDate;

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
            <Text style={pdfStyles.infoValue}>{createdDate}</Text>
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
              <Text style={pdfStyles.tableValueHalf}>{"운영장"}</Text>
              <Text style={pdfStyles.tableLabelHalf}>부회장</Text>
              <Text style={pdfStyles.tableValueHalfLast}>{"부운영장"}</Text>
            </View>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabelHalf}>총무</Text>
              <Text style={pdfStyles.tableValueHalf}>{"총무"}</Text>
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
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabel}>비고</Text>
              <Text style={pdfStyles.tableValue}>{reportData.note}</Text>
            </View>
          </View>
        </View>
        <Text style={pdfStyles.pageNumber}>- 1 -</Text>
      </Page>

      <Page size="A4" style={pdfStyles.contentPage}>
        <Text style={pdfStyles.watermark}>
          본 보고서의 저작권은 (주)핀데브에 있습니다. 변형 또는 무단 배포를
          금지합니다.{"\n"}
          ©2024. (주)핀데브 Inc.all right reserved.
        </Text>
        <View style={pdfStyles.contentArea}>
          <Text style={pdfStyles.infoName}>지출 증빙용 활동 사진</Text>
          <View style={pdfStyles.imageGrid}>
            {reportData.images && reportData.images.length > 0 ? (
              reportData.images.map(
                (photo: ActivityReportPhoto, index: number) => (
                  <View key={photo.id || index} style={pdfStyles.imageWrapper}>
                    <Image src={photo.url} style={pdfStyles.gridImage} />
                  </View>
                )
              )
            ) : (
              <Text style={pdfStyles.fullRowDesc}>등록된 사진이 없습니다.</Text>
            )}
          </View>
        </View>
        <Text style={pdfStyles.pageNumber}>- 2 -</Text>
      </Page>

      <Page size="A4" style={pdfStyles.coverPage}>
        <Text style={pdfStyles.watermark}>
          본 보고서의 저작권은 (주)핀데브에 있습니다. 변형 또는 무단 배포를
          금지합니다.{"\n"}
          ©2024. (주)핀데브 Inc.all right reserved.
        </Text>

        <View style={pdfStyles.contentArea}>
          <Text style={pdfStyles.infoName}>활동 지원비 정산서</Text>
          {reportData.receipts && reportData.receipts.length > 0 ? (
            <>
              <View style={pdfStyles.clubInfoTable}>
                <View style={pdfStyles.tableRowDouble2}>
                  <Text style={pdfStyles.tableLabelHalf}>과목</Text>
                  <Text style={pdfStyles.tableValueHalf}>
                    {reportData.receipts[0].category}
                  </Text>
                  <Text style={pdfStyles.tableLabelHalf}>지원액</Text>
                  <Text style={pdfStyles.tableValueHalfLast}>
                    {reportData.receipts[0].supportAmount.toLocaleString()}
                  </Text>
                </View>
                <View style={pdfStyles.tableRowLast}>
                  <Text style={pdfStyles.tableLabelHalf}>집행액</Text>
                  <Text style={pdfStyles.tableValueHalf}>
                    {reportData.receipts[0].usedAmount.toLocaleString()}
                  </Text>
                  <Text style={pdfStyles.tableLabelHalf}>잔액</Text>
                  <Text style={pdfStyles.tableValueHalfLast}>
                    {reportData.receipts[0].remainingAmount.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={pdfStyles.clubInfoTable}>
                <Text style={pdfStyles.fullRowTitle}>집행 내역</Text>
                <View style={pdfStyles.fullRowDescContainer}>
                  <Text style={pdfStyles.fullRowDesc}>
                    {reportData.receipts[0].usageDetail}
                  </Text>
                </View>
              </View>
              <Text style={pdfStyles.infoName}>활동 지원비 영수증</Text>
              <View style={pdfStyles.clubInfoTable}>
                <View style={pdfStyles.tableRowDouble2}>
                  <Text style={pdfStyles.tableLabelHalf}>담당자</Text>
                  <Text style={pdfStyles.tableValueHalf}>
                    {reportData.receipts[0].submittedBy}
                  </Text>
                  <Text style={pdfStyles.tableLabelHalf}>일자</Text>
                  <Text style={pdfStyles.tableValueHalfLast}>
                    {reportData.receipts[0].issuedDate}
                  </Text>
                </View>
                <View style={pdfStyles.tableRowLast}>
                  <Text style={pdfStyles.tableLabelHalf}>사용처</Text>
                  <Text style={pdfStyles.tableValueHalf}>
                    {reportData.receipts[0].vendor}
                  </Text>
                  <Text style={pdfStyles.tableLabelHalf}>금액</Text>
                  <Text style={pdfStyles.tableValueHalfLast}>
                    {reportData.receipts[0].amount.toLocaleString()}
                  </Text>
                </View>
              </View>

              <View style={pdfStyles.clubInfoTable}>
                <Text style={pdfStyles.fullRowTitle}>내용</Text>
                <View style={pdfStyles.fullRowDescContainer}>
                  <Text style={pdfStyles.fullRowDesc}>
                    {reportData.receipts[0].description}
                  </Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={pdfStyles.fullRowDesc}>등록된 영수증이 없습니다.</Text>
          )}
        </View>
        <Text style={pdfStyles.pageNumber}>- 3 -</Text>
      </Page>

      <Page size="A4" style={pdfStyles.contentPage}>
        <Text style={pdfStyles.watermark}>
          본 보고서의 저작권은 (주)핀데브에 있습니다. 변형 또는 무단 배포를
          금지합니다.{"\n"}
          ©2024. (주)핀데브 Inc.all right reserved.
        </Text>

        <View style={pdfStyles.contentArea2}>
          <Text style={pdfStyles.infoName}>영수증 첨부</Text>
          <View style={pdfStyles.imageGrid}>
            {reportData.receipts &&
            reportData.receipts.length > 0 &&
            reportData.receipts[0].file ? (
              <Image
                src={reportData.receipts[0].file}
                style={pdfStyles.receiptImage}
              />
            ) : (
              <Text style={pdfStyles.fullRowDesc}>등록된 사진이 없습니다.</Text>
            )}
          </View>
        </View>

        <View style={pdfStyles.bottomLine}>
          <View style={pdfStyles.bottomTextsContainer}>
            <Text style={pdfStyles.bottomText}>
              상기와 같이 {reportData.clubName} 동호회 대표로서 동회 활동 실적을
              보고합니다.
            </Text>
            <Text style={pdfStyles.bottomText2}>{createdDate}</Text>
            <Text style={pdfStyles.bottomText}>
              {reportData.clubName} @{reportData.writerName} (인)
            </Text>
            <Text style={pdfStyles.bottomText3}>당사 주무부서 귀하</Text>
          </View>
        </View>

        <Text style={pdfStyles.pageNumber}>- 4 -</Text>
      </Page>
    </PDFDocument>
  );
};
