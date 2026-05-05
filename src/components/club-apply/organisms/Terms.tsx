"use client";

import { useFormContext, Controller } from "react-hook-form";
import RadioButton from "@/components/common/RadioButton";

export default function Terms() {
  const { control } = useFormContext();

  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[20px] font-bold text-gray-900">
          신규 사내동호회 개설 신청 동의서
        </h3>
        <p className="text-[16px] text-gray-400 mt-2 font-medium">
          신규 사내동호회 개설 시 이용약관 입니다.
        </p>
      </div>

      <div className="border-t border-gray-100 pt-8">
        <div className="flex">
          <div className="w-[240px] shrink-0">
            <span className="text-[18px] font-bold text-gray-800">
              이용약관
            </span>
          </div>

          <div className="flex-1">
            <div className="w-full bg-white p-8 rounded-lg border border-gray-200 h-[450px] overflow-y-auto text-[15px] leading-relaxed text-gray-600 custom-scrollbar">
              <div className="space-y-6">
                {/* 기본 취소 규정 */}
                <section className="space-y-2">
                  <p className="font-bold text-gray-800">
                    1. 결제 후 1시간 이내에는 무료 취소가 가능합니다.
                  </p>
                  <p className="text-sm text-gray-500 pl-4">
                    (단, 신청마감 이후 취소 시, 콘텐츠 진행 당일 결제 후 취소 및
                    환불 불가)
                  </p>
                </section>

                {/* 환불 규정 상세 */}
                <section className="space-y-3">
                  <p className="font-bold text-gray-800">
                    2. 결제 후 1시간이 초과한 경우, 아래의 환불규정에 따라
                    취소수수료가 부과됩니다.
                  </p>
                  <ul className="pl-5 space-y-2 list-disc marker:text-gray-300">
                    <li>
                      신청마감 2일 이전 취소시 :{" "}
                      <span className="text-blue-600 font-medium">
                        전액 환불
                      </span>
                    </li>
                    <li>
                      신청마감 1일 ~ 신청마감 이전 취소시 :{" "}
                      <span className="text-orange-600 font-medium">
                        상품 금액의 50% 취소 수수료 배상 후 환불
                      </span>
                    </li>
                    <li>
                      신청마감 이후 취소시, 또는 당일 불참 :{" "}
                      <span className="text-red-500 font-medium">
                        환불 불가
                      </span>
                    </li>
                  </ul>
                </section>

                {/* 주의 사항 유의 사항 */}
                <section className="space-y-2 text-[14px]">
                  <p>
                    ※ 다회권의 경우, 1회라도 사용시 부분 환불이 불가하며, 기간
                    내 코모 크루와 예약 확정 되지 않은 콘텐츠는 코모 포인트로
                    환불 됩니다.
                  </p>
                  <p>
                    ※ 여행사 상품의 경우 상품 상세 페이지의 여행사 환불 규정이
                    우선 적용 됩니다.
                  </p>
                  <p>
                    ※ 여행사 상품, 숙박, 이벤트 상품 등 객실, 버스 등 사전 예약
                    확정이 필요한 콘텐츠는 예약 확정 이후 신청마감일 이전이라도
                    취소 및 환불 불가합니다.
                  </p>
                  <p>※ 취소 수수료는 신청 마감일을 기준으로 산정됩니다.</p>
                </section>

                {/* 신청 마감일 안내 */}
                <section className="bg-gray-50 p-4 rounded-md space-y-2">
                  <p className="font-bold text-gray-800">
                    ※ 신청 마감일은 무엇인가요?
                  </p>
                  <p className="text-sm">
                    코모 크루님들이 장소 대관, 강습, 재료 구비 등 콘텐츠 진행을
                    준비하기 위해, 콘텐츠 진행일보다 일찍 신청을 마감합니다.
                    환불은 진행일이 아닌 신청 마감일 기준으로 이루어집니다.
                    콘텐츠마다 신청 마감일이 다르니, 꼭 날짜와 시간을 확인 후
                    결제해주세요! : )
                  </p>
                  <div className="mt-3 pt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700">
                      ※ 신청 마감일 기준 환불 규정 예시
                    </p>
                    <ul className="text-sm pl-4 mt-1 space-y-1 text-gray-500">
                      <li>• 콘텐츠 진행일 : 10월 27일</li>
                      <li>• 신청 마감일 : 10월 26일</li>
                      <li className="text-orange-600 font-medium">
                        → 10월 25일에 취소 할 경우, 신청마감일 1일 전에 해당하며
                        50%의 수수료가 발생합니다.
                      </li>
                    </ul>
                  </div>
                </section>

                {/* 환불 신청 방법 */}
                <section className="space-y-3">
                  <p className="font-bold text-gray-800">[환불 신청 방법]</p>
                  <ol className="pl-5 space-y-1 list-decimal">
                    <li>해당 콘텐츠 결제한 계정으로 로그인</li>
                    <li>마이 페이지 - 신청내역 or 결제내역</li>
                    <li>취소를 원하는 콘텐츠 상세 정보 버튼 - 취소</li>
                  </ol>
                  <p className="text-[13px] text-gray-400">
                    ※ 결제 수단에 따라 환불 수단이 다를 수 있습니다.
                  </p>
                </section>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex">
          <div className="w-[240px] shrink-0"></div>
          <div className="flex-1">
            <Controller
              name="agreeToTerms"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <RadioButton
                  name={field.name}
                  label="동의합니다."
                  checked={field.value === true}
                  onChange={() => field.onChange(true)}
                  labelStyle="text-[16px] text-gray-800"
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
