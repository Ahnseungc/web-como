"use client";

import { useSearchParams, useParams } from "next/navigation";
// import { openModal } from "@/lib/utils";
import BackButton from "@/components/dashboard/common/BackButton";
import RejectApplicationModal from "@/components/dashboard/company/club/modals/RejectApplicationModal";
import RevertRejectionModal from "@/components/dashboard/company/club/modals/RevertRejectionModal";
import { getData } from "@/lib/client-utils";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

const categoryMapping = {
  ART_CULTURE: "문화/예술",
  ACTIVITY: "액티비티",
  CREATIVE: "크리에이티브",
  FOODBEVERAGE: "F&B",
  NETWORKING: "네트워킹",
  STUDY: "스터디",
  ETC: "기타",
};

const keyMapping = {
  name: "동호회명",
  intro: "동호회 한줄 소개",
  clubCategory: "카테고리",
  companyName: "회사명",
  location: "활동 지역",
  activityPlan: "활동 일정",
  goal: "개설 목적",
  operationPlan: "운영 방침",
  detail: "주요 운영 계획",
  duesPerMonth: "월회비",
  duesPerYear: "연회비",
  minMemberCount: "최소 인원",
  maxMemberCount: "최대 인원",
  currentMember: "현재 인원",
  headName: "운영장 이름",
  headPosition: "운영장 직책",
  headDepartment: "운영장 부서",
  subHeadName: "부운영장 이름",
  subHeadDepartment: "부운영장 부서",
  affairsName: "총무 이름",
  affairsPosition: "총무 직책",
  affairsDepartment: "총무 부서",
  calculationBasis: "산출 기초",
  businessItem: "사업 항목 및 내용",
  bank: "은행",
  clubImage: "동호회 이미지",
  bankbookImage: "통장 사본",
  signature: "서명 이미지",
  latitude: "위도",
  longitude: "경도",
  createdAt: "생성일",
  isJoined: "가입 여부",
};

export default function ApplicationDetailPage() {
  const params = useParams();
  const clubId = params.id as string;

  const { data: registrationData, isLoading } = useQuery({
    queryKey: ["club", clubId, "registration"],
    queryFn: () =>
      getData(`v1/manager/club/${clubId}/registration`).then(
        (res) => res.data ?? null
      ),
    enabled: !!clubId,
  });

  if (isLoading) {
    return <div className="text-lg">로딩 중...</div>;
  }

  return (
    <>
      <BackButton />
      <div className="space-y-3 p-8 rounded-xl bg-gray-0">
        <div className="flex items-center justify-between">
          <h2 className="h3 font-semibold text-gray-900">{"작성한 신청서"}</h2>
        </div>

        <div style={{ padding: "20px" }}>
          <div>
            {registrationData ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {Object.entries(registrationData)
                  .filter(
                    ([key]) =>
                      ![
                        "id",
                        "longitude",
                        "latitude",
                        "headId",
                        "deputyId",
                        "affairsId",
                        "rule",
                        "thumbnail",
                      ].includes(key)
                  )
                  .map(([key, value]) => (
                    <div
                      key={key}
                      style={{
                        padding: "10px",
                        border: "1px solid #ccc",
                        backgroundColor: "#f9f9f9",
                      }}
                    >
                      <strong style={{ fontSize: "18px" }}>
                        {keyMapping[key as keyof typeof keyMapping] || key} :
                      </strong>

                      {value === null ||
                      value === undefined ||
                      value === "" ? null : typeof value === "string" &&
                        (value.startsWith("http") ||
                          value.startsWith("https")) ? (
                        <Image
                          src={value}
                          alt={key}
                          width={400}
                          height={400}
                          style={{
                            maxWidth: "50%",
                            height: "auto",
                            marginTop: "5px",
                          }}
                        />
                      ) : (
                        <span style={{ fontSize: "16px" }}>
                          {key === "category" &&
                          typeof value === "string" &&
                          value in categoryMapping
                            ? categoryMapping[
                                value as keyof typeof categoryMapping
                              ]
                            : String(value)}
                        </span>
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
