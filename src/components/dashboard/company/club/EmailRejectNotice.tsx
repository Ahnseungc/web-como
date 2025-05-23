import Image from "next/image";
import React from "react";

interface EmailRejectNoticeProps {
  clubName: string;
  requestDate: string;
  reason: string;
  manageUrl: string;
}

export default function EmailRejectNotice({
  clubName,
  requestDate,
  reason,
  manageUrl,
}: EmailRejectNoticeProps) {
  return (
    <div style={{ background: "#e5eaf2", minHeight: "100vh", padding: 32 }}>
      <div
        style={{
          maxWidth: 580,
          margin: "0 auto",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 16px #0001",
          padding: 32,
          textAlign: "center",
        }}
      >
        <Image
          src="/logo.png"
          alt="logo"
          width={186}
          height={32}
          style={{ width: 186, height: "auto", margin: "0 auto 16px" }}
        />
        <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 24 }}>
          활동지원비 신청이 반려되었습니다
        </div>
        <div style={{ textAlign: "left", marginBottom: 8, fontSize: 16 }}>
          <b style={{ color: "#989899", marginRight: 8 }}>동호회명</b>{" "}
          {clubName}
        </div>
        <div style={{ textAlign: "left", marginBottom: 8, fontSize: 16 }}>
          <b style={{ color: "#989899", marginRight: 8 }}>신청일자</b>{" "}
          {requestDate}
        </div>
        <div
          style={{
            borderTop: "1px solid #989899",
            margin: "0px 0 0 0",
            paddingTop: 24,
            textAlign: "left",
          }}
        >
          <div
            style={{
              marginBottom: 24,
              fontSize: 16,
              textAlign: "center",
            }}
          >
            당사의 활동지원비 규정을 검토한 결과 지원 신청이 반려되었습니다.
          </div>
          <div style={{ fontSize: 16 }}>
            <span style={{ color: "#FD7E2D", fontWeight: 700 }}>반려사유:</span>
            <div style={{ fontSize: 18 }}>{reason}</div>
          </div>
        </div>
        <a
          href={manageUrl}
          style={{
            display: "block",
            background: "#111",
            color: "#fff",
            borderRadius: 8,
            padding: "12px 0",
            fontWeight: 700,
            textDecoration: "none",
            margin: "24px auto",
            fontSize: 18,
            width: "300px",
            textAlign: "center",
          }}
        >
          동호회 관리 바로가기
        </a>
        <div style={{ color: "#6b7280", fontSize: 14, marginBottom: 0 }}>
          다음 사이트에서 동호회를 관리해보세요.
          <br />
          <a
            href="https://web-como-bay.vercel.app"
            style={{ color: "#2563eb", textDecoration: "none" }}
          >
            https://web-como-bay.vercel.app
          </a>
        </div>
      </div>
      <footer
        style={{
          marginTop: 32,
          color: "#444",
          fontSize: 14,
          textAlign: "left",
          maxWidth: 480,
          marginLeft: "auto",
          marginRight: "auto",
          lineHeight: 1.7,
          fontWeight: 400,
        }}
      >
        <b>(주) 핀데브</b>
        <br />
        대표: 송지은 | 개인정보 보호 책임자: 송지은
        <br />
        광고 및 제휴 문의: findev@omoapp.co.kr
        <br />
        주소: 동대문구 경희대로 26 삼의원창업센터 2층 216호 | 대표번호:
        010-4818-2081
        <br />
        사업자등록번호: 148-86-02774
        <br />
        통신판매업신고번호: 2023-서울동대문-1310
      </footer>
    </div>
  );
}
