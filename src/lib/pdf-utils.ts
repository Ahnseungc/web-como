import { StyleSheet, Font } from "@react-pdf/renderer";

// 한글 폰트 등록
export const registerFont = async () => {
  try {
    // SUIT 폰트 파일들 존재 여부 확인
    const [mediumResponse, boldResponse] = await Promise.all([
      fetch("/fonts/SUIT/SUIT-Medium.ttf", { method: "HEAD" }),
      fetch("/fonts/SUIT/SUIT-SemiBold.ttf", { method: "HEAD" }),
      fetch("/fonts/SUIT/SUIT-Bold.ttf", { method: "HEAD" }),
    ]);

    if (mediumResponse.ok && boldResponse.ok) {
      // SUIT 폰트를 개별 굵기 파일로 등록
      Font.register({
        family: "SUIT",
        fonts: [
          {
            src: "/fonts/SUIT/SUIT-Medium.ttf",
            fontWeight: 400,
          },
          {
            src: "/fonts/SUIT/SUIT-Medium.ttf",
            fontWeight: 500,
          },
          {
            src: "/fonts/SUIT/SUIT-SemiBold.ttf",
            fontWeight: 600,
          },
          {
            src: "/fonts/SUIT/SUIT-Bold.ttf",
            fontWeight: 700,
          },
        ],
      });
      console.log("SUIT 폰트 등록 성공");
    } else {
      // 기본 폰트로 대체
      Font.register({
        family: "SUIT",
        fonts: [
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 400,
          },
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 500,
          },
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 700,
          },
        ],
      });
      console.log("기본 한글 폰트로 대체 등록");
    }
  } catch (error) {
    console.error("폰트 등록 실패:", error);
    try {
      Font.register({
        family: "SUIT",
        fonts: [
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 400,
          },
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 500,
          },
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 600,
          },
          {
            src: "https://fonts.gstatic.com/s/notosanskr/v36/PbykFmXiEBPT4ITbgNA5Cgm20xz64px_1hVWr0wuPNGmlQNMEfD4.otf",
            fontWeight: 700,
          },
        ],
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
export const pdfStyles = StyleSheet.create({
  coverPage: {
    padding: 40,
    fontFamily: "SUIT",
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  watermark: {
    position: "absolute",
    top: 35,
    right: 50,
    fontSize: 10,
    color: "#C6C6C7",
    textAlign: "right",
    fontFamily: "SUIT",
    fontWeight: 500,
    letterSpacing: -0.06,
  },
  logo: {
    width: 100,
    height: 20,
  },
  yearTitle: {
    fontSize: 24,
    fontWeight: 700,
    fontFamily: "SUIT",
    color: "#000000",
    marginTop: 30,
  },
  mainTitle: {
    fontSize: 32,
    fontWeight: 700,
    fontFamily: "SUIT",
    color: "#000000",
  },
  subTitle: {
    fontSize: 10,
    fontWeight: 500,
    fontFamily: "SUIT",
    color: "#C6C6C7",
    paddingTop: 4,
  },
  orangeLine: {
    height: 3,
    backgroundColor: "#FD7E2D",
    marginTop: 10,
  },
  infoSection: {
    marginTop: 60,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: "#989899",
    width: 50,
    fontFamily: "SUIT",
  },
  infoLabelHighlight: {
    fontSize: 12,
    fontWeight: 700,
    color: "#FD7E2D",
    width: 50,
    fontFamily: "SUIT",
  },
  infoValue: {
    fontSize: 12,
    fontWeight: 600,
    color: "#1A1A1D",
    fontFamily: "SUIT",
  },
  infoName: {
    fontSize: 20,
    fontWeight: 700,
    color: "#000000",
    fontFamily: "SUIT",
  },
  approvalSection: {
    position: "absolute",
    bottom: 70,
    left: 40,
  },
  approvalTable: {
    width: 120,
    // borderRight: '1px solid #C6C6C7',
  },
  approvalEmptyHeader: {
    backgroundColor: "#2C2C2F",
    width: 48,
    borderLeft: "1px solid #C6C6C7",
  },
  approvalEmptyCell: {
    backgroundColor: "#2C2C2F",
    width: 48,
    borderLeft: "1px solid #C6C6C7",
  },
  approvalHeaderRow: {
    flexDirection: "row",
  },
  approvalHeader: {
    backgroundColor: "#2C2C2F",
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: 700,
    padding: 6,
    textAlign: "center",
    flex: 1,
    fontFamily: "SUIT",
  },
  approvalRow: {
    flexDirection: "row",
    borderBottom: "none",
  },
  approvalLastRow: {
    flexDirection: "row",
  },
  approvalCell: {
    fontSize: 10,
    fontWeight: 400,
    padding: 6,
    textAlign: "center",
    color: "#1A1A1D",
    flex: 1,
    borderRight: "1px solid #C6C6C7",
    borderBottom: "1px solid #C6C6C7",
    fontFamily: "SUIT",
  },
  approvalLastCell: {
    borderRight: "none",
  },
  approvalLeftCell: {
    backgroundColor: "#2C2C2F",
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: 700,
    padding: 12,
    textAlign: "center",
    width: 48,
    fontFamily: "SUIT",
    justifyContent: "center",
    borderTop: "1px solid #2C2C2F",
    borderBottom: "1px solid #2C2C2F",
    borderLeft: "1px solid #C6C6C7",
  },
  contentPage: {
    padding: 40,
    fontFamily: "SUIT",
    position: "relative",
    backgroundColor: "#FFFFFF",
  },
  contentArea: {
    border: "1px solid #000000",
    padding: 20,
    marginTop: 30,
    minHeight: 700,
  },
  clubInfoTable: {
    width: "100%",
    marginTop: 10,
    border: "1px solid #C6C6C7",
    marginBottom: 14,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #C6C6C7",
  },
  tableRowLast: {
    flexDirection: "row",
  },
  tableLabel: {
    width: "15%",
    padding: 10,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "SUIT",
    color: "#FFFFFF",
    backgroundColor: "#2C2C2F",
    borderRight: "1px solid #C6C6C7",
    textAlign: "center",
  },
  tableValue: {
    width: "85%",
    padding: 10,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUIT",
    color: "#1A1A1D",
  },
  tableRowDouble: {
    flexDirection: "row",
    borderBottom: "1px solid #C6C6C7",
  },
  tableLabelHalf: {
    width: "15%",
    padding: 10,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUIT",
    color: "#FFFFFF",
    borderRight: "1px solid #C6C6C7",
    backgroundColor: "#2C2C2F",
    textAlign: "center",
  },
  tableValueHalf: {
    width: "35%",
    padding: 10,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUIT",
    color: "#1A1A1D",
  },
  tableValueHalfLast: {
    width: "35%",
    padding: 10,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUIT",
    color: "#1A1A1D",
  },
  fullRowTitle: {
    width: "100%",
    padding: 10,
    fontSize: 12,
    fontWeight: 700,
    fontFamily: "SUIT",
    color: "#FFFFFF",
    backgroundColor: "#2C2C2F",
    textAlign: "center",
  },
  fullRowDescContainer: {
    width: "100%",
  },
  fullRowDesc: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "SUIT",
    color: "#1A1A1D",
    lineHeight: 1.4,
    flexWrap: "wrap",
    maxWidth: "100%",
    padding: 10,
  },
  pageNumber: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "#1A1A1D",
    fontFamily: "SUIT",
  },
  bottomLine: {
    borderTop: "1px solid #000000",
    marginTop: "auto",
    marginLeft: -20,
    marginRight: -20,
    paddingTop: 10,
  },
  bottomTextsContainer: {
    flexDirection: "column",
    gap: 5,
    paddingHorizontal: 10,
  },
  bottomText: {
    fontSize: 12,
    fontFamily: "SUIT",
    color: "#1A1A1D",
    fontWeight: 700,
    textAlign: "center",
    paddingBottom: 10,
  },
  bottomText2: {
    fontSize: 12,
    fontFamily: "SUIT",
    color: "#1A1A1D",
    fontWeight: 500,
    textAlign: "center",
    paddingBottom: 10,
  },
  bottomText3: {
    fontSize: 12,
    fontFamily: "SUIT",
    color: "#1A1A1D",
    fontWeight: 500,
    textAlign: "left",
  },
});
