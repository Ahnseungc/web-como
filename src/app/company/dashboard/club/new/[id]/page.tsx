"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { openModal } from "@/lib/utils";
import BackButton from "@/components/dashboard/common/BackButton";
import PDFViewer from "@/components/dashboard/club/common/PDFViewer";
import RejectApplicationModal from "@/components/dashboard/company/club/modals/RejectApplicationModal";
import RevertRejectionModal from "@/components/dashboard/company/club/modals/RevertRejectionModal";
import { getData } from "@/api/action";

export default function ApplicationDetailPage() {
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true); // 로딩 상태 변수 추가
  const status = useSearchParams().get("status");
  const params = useParams();
  const clubId = params.id as string;

  const categoryMapping = {
    "ART_CULTURE": "문화/예술",
    "ACTIVITY": "액티비티",
    "CREATIVE": "크리에이티브",
    "FOODBEVERAGE": "F&B",
    "NETWORKING": "네트워킹",
    "STUDY": "스터디",
    "ETC": "기타",
  }
  
  const keyMapping = {
    name: "동호회명",
    intro: "동호회 한줄 소개",
    location: "활동 지역",
    activityPlan: "활동 일정",
    goal: "개설 목적",
    operationPlan: "운영 방침",
    duePerMonth: "월회비",
    headName: "운영진 이름",
    headPosition: "운영진 직책",
    headDepartment: "운영진 부서",
    deputyName: "부영진 이름",
    deputyPosition: "부영진 직책",
    deputyDepartment: "부영진 부서",
    affairsName: "총무 이름",
    affairsPosition: "총무 직책",
    affairsDepartment: "총무 부서",
    category: "카테고리",
    maxMember: "최대 인원",
    currentMember: "최소 인원",
    duesPerMonth: "월회비",
    detail: "주요 운영 계획",
    calculationBasis: "산출 기초",
    businessItem: "사업 항목 및 내용",
    bank: "동호회 회칙",
    signature : "서명 이미지"
  };

  useEffect(() => {
    const fetchRegistrationData = async () => {
      try {
        const response = await getData(`v1/manager/club/${clubId}/registration`); // API 호출
        console.log("response", response);
        if (response.resultCode === 'OK') {
          setRegistrationData(response.data);
        }
      } catch (err) {
        console.error('동호회 개설 신청서 로딩 오류:', err);      
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };

    fetchRegistrationData();
  }, [clubId]);

  // 로딩 중일 때 처리
  if (loading) {
      return <div className="text-lg">로딩 중...</div>; // 로딩 메시지 또는 스피너 표시
  }

  return (
    <>
      <BackButton />
      <div className="space-y-3 p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between">
          <h2 className="h3 font-semibold text-gray-900">{"작성한 신청서"}</h2>
          {/* {status === "new" ? (
            <div className="flex gap-2">
              <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-point-blue">
                {"승인"}
              </button>
              <button
                className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-600"
                onClick={() => openModal("reject-application")}
              >
                {"반려"}
              </button>
            </div>
          ) : (
            status === "reject" && (
              <button
                className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0"
                onClick={() => openModal("revert-rejection")}
              >
                {"반려 취소"}
              </button>
            )
          )} */}
        </div>
        {/* <PDFViewer file="../../../../../sample.pdf" /> */}
        
        <div style={{ padding: "20px" }}>
          <div>
            {registrationData ? (
              <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                {Object.entries(registrationData)
                  .filter(([key]) => !["id", "longitude", "latitude", "headId", "deputyId", "affairsId", "rule", "thumbnail"].includes(key)) // 제외할 키 목록
                  .map(([key, value]) => (
                    <div key={key} style={{ padding: "10px", border: "1px solid #ccc", backgroundColor: "#f9f9f9" }}>
                      <strong style={{ fontSize: "18px" }}>
                        {keyMapping[key as keyof typeof keyMapping] || key} : 
                      </strong>
                      
                      {/* 빈 값 처리: null, undefined, 빈 문자열 */}
                      {value === null || value === undefined || value === "" ? null : (
                        // 이미지 여부 먼저 확인
                        typeof value === "string" && (value.startsWith("http") || value.startsWith("https")) ? (
                          <img 
                            src={value} 
                            alt={key} 
                            style={{ maxWidth: "50%", height: "auto", marginTop: "5px" }} 
                          />
                        ) : (
                          // 카테고리일 경우 한글로 변환하여 출력
                          <span style={{ fontSize: "16px" }}>
                            {key === "category" && typeof value === "string" && value in categoryMapping 
                              ? categoryMapping[value as keyof typeof categoryMapping] 
                              : String(value)}
                          </span>
                        )
                      )}
                    </div>
                ))}
              </div>
            ) : (
                <p>작성된 신청서가 없습니다.</p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-0">
        <RejectApplicationModal />
        <RevertRejectionModal />
      </div>
    </>
  );
}
