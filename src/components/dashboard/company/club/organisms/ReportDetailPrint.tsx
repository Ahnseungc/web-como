import { ActivityReportDetail } from "@/api/types/company/report";

interface Props {
  data: ActivityReportDetail;
}

export default function ReportDetailPrint({ data }: Props) {
  return (
    <div style={{ width: "100%", background: "#fff" }}>
      {/* 상단 정보 테이블 */}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "16px 16px",
          marginBottom: 48,
          background: "#f8f9fa",
          borderRadius: 16,
        }}
      >
        <tbody>
          <tr>
            <td
              rowSpan={4}
              style={{ width: 220, padding: 8, verticalAlign: "top" }}
            >
              {data?.clubImage && (
                <img
                  src={data.clubImage}
                  alt="clubImage"
                  style={{
                    width: 200,
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
            </td>
            <td
              colSpan={3}
              style={{
                fontWeight: 700,
                fontSize: 20,
                color: "#111827",
                padding: 8,
              }}
            >
              {data.eventName}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
              동호회명
            </td>
            <td
              style={{
                background: "#f1f3f5",
                borderRadius: 6,
                padding: "12px 16px",
                fontSize: 16,
              }}
            >
              {data.clubName}
            </td>
            <td
              rowSpan={2}
              style={{ fontWeight: 600, fontSize: 16, padding: 8 }}
            >
              작성자
              <br />
              {data.writerName}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
              활동 일정
            </td>
            <td
              style={{
                background: "#f1f3f5",
                borderRadius: 6,
                padding: "12px 16px",
                fontSize: 16,
              }}
            >
              {Array.isArray(data.activityDate)
                ? data.activityDate.join("-")
                : data.activityDate}
            </td>
          </tr>
          <tr>
            <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
              활동 장소
            </td>
            <td
              colSpan={2}
              style={{
                background: "#f1f3f5",
                borderRadius: 6,
                padding: "12px 16px",
                fontSize: 16,
              }}
            >
              {data.location} {data.locationDetail}
            </td>
          </tr>
        </tbody>
      </table>

      {/* 주요활동 내용, 비고, 사진 테이블 */}
      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "16px 16px",
          marginBottom: 48,
        }}
      >
        <tbody>
          <tr>
            <td
              style={{
                fontWeight: 600,
                fontSize: 18,
                padding: 8,
                width: 180,
                verticalAlign: "top",
              }}
            >
              주요활동 내용
            </td>
            <td
              style={{
                background: "#f1f3f5",
                borderRadius: 6,
                padding: "18px 20px",
                whiteSpace: "pre-line",
                fontSize: 16,
              }}
            >
              {data.activityContent}
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontWeight: 600,
                fontSize: 18,
                padding: 8,
                width: 180,
                verticalAlign: "top",
              }}
            >
              비고
            </td>
            <td
              style={{
                background: "#f1f3f5",
                borderRadius: 6,
                padding: "18px 20px",
                whiteSpace: "pre-line",
                fontSize: 16,
              }}
            >
              {data.note}
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontWeight: 600,
                fontSize: 18,
                padding: 8,
                width: 180,
                verticalAlign: "top",
              }}
            >
              지출 증빙용 활동 사진 첨부
            </td>
            <td>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "separate",
                  borderSpacing: 12,
                }}
              >
                <tbody>
                  <tr>
                    {data.photos &&
                      data.photos.map((photo) => (
                        <td
                          key={photo.id}
                          style={{ padding: 0, verticalAlign: "top" }}
                        >
                          <div
                            style={{
                              width: 180,
                              height: 180,
                              borderRadius: 8,
                              overflow: "hidden",
                              background: "#eee",
                            }}
                          >
                            <img
                              src={photo.url}
                              alt="photo"
                              style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: 8,
                              }}
                            />
                          </div>
                        </td>
                      ))}
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>

      {/* 정산서(활동 지원비 정산서) 테이블 - 각 정산서마다 page break */}
      {data.expenses.map((item, idx) => (
        <table
          key={idx}
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: "16px 16px",
            marginBottom: 48,
            marginTop: 12,
            background: "#f8f9fa",
            borderRadius: 16,
            padding: 32,
            pageBreakBefore: "always",
          }}
          className="print-page-break-before"
        >
          <tbody>
            <tr>
              <td
                colSpan={4}
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  padding: 16,
                  borderBottom: "2px solid #e5e7eb",
                }}
              >
                활동 지원비 정산서
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                과목
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.category}
              </td>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                지원액
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.supportAmount}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                집행액
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.usedAmount}
              </td>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                잔액
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.remainingAmount}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                집행내역
              </td>
              <td
                colSpan={3}
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "18px 20px",
                  whiteSpace: "pre-line",
                  fontSize: 16,
                }}
              >
                {item.usageDetail}
              </td>
            </tr>
            <tr>
              <td
                style={{ fontWeight: 700, fontSize: 20, padding: 16 }}
                colSpan={4}
              >
                활동 지원비 영수증
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                담당자
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.submittedBy}
              </td>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                일자
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {Array.isArray(item.issuedDate)
                  ? item.issuedDate.join("-")
                  : item.issuedDate}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                사용처
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.vendor}
              </td>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                금액
              </td>
              <td
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "12px 16px",
                  fontSize: 16,
                }}
              >
                {item.usedAmount}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                내용
              </td>
              <td
                colSpan={3}
                style={{
                  background: "#f1f3f5",
                  borderRadius: 6,
                  padding: "18px 20px",
                  whiteSpace: "pre-line",
                  fontSize: 16,
                }}
              >
                {item.description}
              </td>
            </tr>
            <tr>
              <td style={{ fontWeight: 600, fontSize: 16, padding: 8 }}>
                영수증
              </td>
              <td colSpan={3}>
                {(item as any).file && (
                  <div
                    style={{
                      width: 300,
                      height: 400,
                      borderRadius: 8,
                      overflow: "hidden",
                      background: "#eee",
                      margin: "12px 0",
                    }}
                  >
                    <img
                      src={(item as any).file}
                      alt="photo"
                      style={{
                        borderRadius: 8,
                        objectFit: "cover",
                        width: "100%",
                        height: "100%",
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
}
