import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

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
const ActivityReportPDF = ({ reportData }: { reportData: any }) => (
  <PDFDocument>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>활동 보고서</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>기본 정보</Text>

        <View style={styles.field}>
          <Text style={styles.label}>동아리명</Text>
          <Text style={styles.value}>{reportData?.clubName || ""}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동명</Text>
          <Text style={styles.value}>{reportData?.activityName || ""}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동 내용</Text>
          <Text style={styles.value}>{reportData?.content || ""}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동 일시</Text>
          <Text style={styles.value}>{reportData?.activityDate || ""}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>활동 장소</Text>
          <Text style={styles.value}>{reportData?.location || ""}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>참여 인원</Text>
          <Text style={styles.value}>
            {reportData?.participantCount || 0}명
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>활동 결과</Text>

        <View style={styles.field}>
          <Text style={styles.label}>활동 성과</Text>
          <Text style={styles.value}>{reportData?.achievement || ""}</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>소감 및 개선사항</Text>
          <Text style={styles.value}>{reportData?.reflection || ""}</Text>
        </View>
      </View>

      <Text style={styles.footer}>
        상기와 같이 {reportData?.activityName || "활동"} 보고서를 제출합니다.
      </Text>
    </Page>
  </PDFDocument>
);

export default ActivityReportPDF;
