import {
  Document as PDFDocument,
  Page,
  Text,
  View,
  Image,
} from "@react-pdf/renderer";
import { ExpenseFormValues, CardInfo } from "@/api/types/company/expense";
import { pdfStyles } from "@/lib/pdf-utils";
import { formatDate2 } from "@/lib/format";

type ExpenseReportProps = ExpenseFormValues &
  Omit<Partial<CardInfo>, "createdAt">;

interface ExpenseFormProps {
  expense: ExpenseReportProps;
}

const parseLeadersSummary = (leadersSummary: string) => {
  const leaders: Record<string, string> = {};

  if (!leadersSummary) return leaders;

  const parts = leadersSummary.split(" / ");
  parts.forEach((part) => {
    const [role, name] = part.split("_");
    if (role && name) {
      leaders[role.trim()] = name.trim();
    }
  });

  return leaders;
};

// PDF 문서 컴포넌트
export const ExpenseReportPDF = ({ expense }: ExpenseFormProps) => {
  const comoLogo = "/logo.png";
  const leaders = parseLeadersSummary(expense.leadersSummary || "");

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
        <Text style={pdfStyles.mainTitle}>[{expense.clubName}]</Text>
        <Text style={pdfStyles.mainTitle}>활동비 지급 신청서</Text>
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
            <Text style={pdfStyles.infoLabelHighlight}>동호회장</Text>
            <Text style={pdfStyles.infoName}>{leaders["운영장"] || ""}</Text>
          </View>
          {/* <View style={pdfStyles.infoRow}>
            <Text style={pdfStyles.infoLabel}>활동일자: </Text>
            <Text style={pdfStyles.infoValue}>{"2024.06.19"}</Text>
          </View> */}
          <View style={pdfStyles.infoRow}>
            <Text style={pdfStyles.infoLabel}>작성일자: </Text>
            <Text style={pdfStyles.infoValue}>
              {formatDate2(expense.createdAt)}
            </Text>
          </View>
          {/* <View style={pdfStyles.infoRow}>
            <Text style={pdfStyles.infoLabel}>문서번호: </Text>
            <Text style={pdfStyles.infoValue}>{"2407-85-001-1"}</Text>
          </View> */}
        </View>

        <View style={pdfStyles.approvalSection}>
          <View style={pdfStyles.approvalTable}>
            <View style={pdfStyles.approvalHeaderRow}>
              <Text style={pdfStyles.approvalEmptyHeader}></Text>
              <Text style={pdfStyles.approvalHeader}>담당자</Text>
              {/* <Text style={pdfStyles.approvalHeader}>부서장</Text> */}
              {/* <Text style={pdfStyles.approvalHeader}>임 원</Text> */}
              {/* <Text style={pdfStyles.approvalHeader}>사 장</Text> */}
            </View>
            <View style={pdfStyles.approvalRow}>
              <Text style={pdfStyles.approvalLeftCell}>결{"\n\n"}재</Text>
              <Text style={pdfStyles.approvalCell}></Text>
              {/* <Text style={pdfStyles.approvalCell}></Text> */}
              {/* <Text style={pdfStyles.approvalCell}></Text> */}
              {/* <Text style={[pdfStyles.approvalCell, pdfStyles.approvalLastCell]}></Text> */}
            </View>
            <View style={pdfStyles.approvalLastRow}>
              <Text style={pdfStyles.approvalEmptyCell}></Text>
              <Text style={pdfStyles.approvalCell}>/</Text>
              {/* <Text style={pdfStyles.approvalCell}>/</Text> */}
              {/* <Text style={pdfStyles.approvalCell}>/</Text> */}
              {/* <Text style={[pdfStyles.approvalCell, pdfStyles.approvalLastCell]}>/</Text> */}
            </View>
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
              <Text style={pdfStyles.tableValue}>{expense.clubName}</Text>
            </View>
            <View style={pdfStyles.tableRowDouble}>
              <Text style={pdfStyles.tableLabelHalf}>회장</Text>
              <Text style={pdfStyles.tableValueHalf}>
                {leaders["운영장"] || ""}
              </Text>
              <Text style={pdfStyles.tableLabelHalf}>부회장</Text>
              <Text style={pdfStyles.tableValueHalfLast}>
                {leaders["부운영장"] || ""}
              </Text>
            </View>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabelHalf}>총무</Text>
              <Text style={pdfStyles.tableValueHalf}>
                {leaders["총무"] || ""}
              </Text>
              <Text style={pdfStyles.tableLabelHalf}>.</Text>
              <Text style={pdfStyles.tableValueHalfLast}>.</Text>
            </View>
          </View>
          <Text style={pdfStyles.infoName}>기본 정보</Text>
          <View style={pdfStyles.clubInfoTable}>
            <View style={pdfStyles.tableRowLast}>
              <Text style={pdfStyles.tableLabel}>행사명</Text>
              <Text style={pdfStyles.tableValue}>{expense.eventName}</Text>
            </View>
          </View>
          <View style={pdfStyles.clubInfoTable}>
            <Text style={pdfStyles.fullRowTitle}>활동 내용</Text>
            <View style={pdfStyles.fullRowDescContainer}>
              <Text style={pdfStyles.fullRowDesc}>{expense.description}</Text>
            </View>
          </View>
          <View style={pdfStyles.clubInfoTable}>
            <Text style={pdfStyles.fullRowTitle}>주요 내용</Text>
            <View style={pdfStyles.fullRowDescContainer}>
              <Text style={pdfStyles.fullRowDesc}>{expense.content}</Text>
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
          <Text style={pdfStyles.infoName}>품의 정보</Text>
          <View style={pdfStyles.clubInfoTable}>
            <View style={pdfStyles.tableRowDouble}>
              <Text style={pdfStyles.tableLabelHalf}>사용처</Text>
              <Text style={pdfStyles.tableValueHalf}>{expense.location}</Text>
              <Text style={pdfStyles.tableLabelHalf}>참여인원</Text>
              <Text style={pdfStyles.tableValueHalfLast}>
                {expense.participantCount}
              </Text>
            </View>
            <View style={pdfStyles.tableRowDouble}>
              <Text style={pdfStyles.tableLabelHalf}>신청금액</Text>
              <Text style={pdfStyles.tableValueHalf}>{expense.amount}</Text>
              <Text style={pdfStyles.tableLabelHalf}>첨부파일</Text>
              <Text style={pdfStyles.tableValueHalfLast}>
                {expense.file ? "유" : "무"}
              </Text>
            </View>
            <View style={pdfStyles.fullRowDescContainer}>
              <Text style={pdfStyles.fullRowTitle}>산출 내역</Text>
              <Text style={pdfStyles.fullRowDesc}>{expense.details}</Text>
            </View>
          </View>
          <View style={pdfStyles.bottomLine}>
            <View style={pdfStyles.bottomTextsContainer}>
              <Text style={pdfStyles.bottomText}>
                상기와 같이 {expense.eventName}의 지원금을 요청합니다.
              </Text>
              <Text style={pdfStyles.bottomText2}>
                {formatDate2(expense.createdAt)}
              </Text>
              <Text style={pdfStyles.bottomText}>
                동호회 @{leaders["총무"] || ""}
              </Text>
              <Text style={pdfStyles.bottomText3}>당사 주무부서 귀하</Text>
            </View>
          </View>
        </View>
        <Text style={pdfStyles.pageNumber}>- 2 -</Text>
      </Page>
    </PDFDocument>
  );
};
