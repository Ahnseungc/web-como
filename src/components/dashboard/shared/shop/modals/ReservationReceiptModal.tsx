"use client";

import Image from "next/image";
import Backdrop from "@/components/common/Backdrop";
import Chip from "@/components/common/Chip";

export default function ReservationReceiptModal() {
  const image = null;

  return (
    <div id="reservation-receipt" className="modal hidden">
      <Backdrop />
      <div className="fixed bottom-1/2 right-1/2 translate-y-1/2 translate-x-1/2 z-50 w-[960px] p-4 rounded-xl bg-gray-0 shadow">
        <div className="space-y-6 h-full max-h-screen overflow-y-auto p-4 scrollbar-custom">
          <div className="flex gap-8">
            <div className="min-w-[200px] min-h-[200px] rounded-xl bg-gray-300 object-cover">
              {image && (
                <Image src={image} alt="대표 이미지" fill sizes="40vw" />
              )}
            </div>
            <div className="flex flex-col justify-between py-3">
              <div className="caption-1 font-medium text-gray-500">
                {"주문번호: 000000"}
              </div>
              <div className="space-y-2">
                <Chip content="카테고리" primary />
                <h2 className="w-[300px] break-keep font-semibold text-gray-900 whitespace-pre-line">
                  {`이드커피, 몰입이 될 수밖에 없는 동굴 속 도서관 [SQNC 052]`}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="h2 font-extrabold text-point-red">{"7%"}</span>
                <span className="h2 font-extrabold text-gray-900">{`${(30000).toLocaleString()}원~`}</span>
                <span className="h3 font-normal text-gray-500">{"/인"}</span>
              </div>
            </div>
          </div>
          <hr className="border-gray-400" />
          <div className="space-y-2">
            <h3 className="body-1 font-bold text-gray-900">{"예약자"}</h3>
            <hr className="border-gray-400" />
            <div className="space-y-1">
              <div className="flex gap-2 body-2 font-medium text-gray-500">
                <div className="w-14">{"예약자"}</div>
                <span className="font-bold text-gray-900">{"운영장"}</span>
              </div>
              <div className="flex gap-2 body-2 font-medium text-gray-500">
                <div className="w-14">{"연락처"}</div>
                <span className="font-bold text-gray-900">
                  {"010-1234-1234"}
                </span>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="body-1 font-bold text-gray-900">{"결제 정보"}</h3>
              <span className="caption-1 font-medium text-gray-500">
                {"24시간 이내 입금을 완료해 주세요."}
              </span>
            </div>
            <hr className="border-gray-400" />
            <div className="space-y-1">
              <div className="flex gap-2 body-2 font-medium text-gray-500">
                <div className="w-14">{"호스트명"}</div>
                <span className="font-bold text-gray-900">{"호스트 이름"}</span>
              </div>
              <div className="flex gap-2 body-2 font-medium text-gray-500">
                <div className="w-14">{"진행장소"}</div>
                <span className="font-bold text-gray-900">
                  {"강원도 양양군 하조대"}
                </span>
              </div>
              <div className="flex gap-2 body-2 font-medium text-gray-500">
                <div className="w-14">{"결제방식"}</div>
                <span className="font-bold text-gray-900">{"카카오페이"}</span>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="body-1 font-bold text-gray-900">{"옵션"}</h3>
            <div className="space-y-2">
              <div className="space-y-1 p-3 rounded-md body-1 bg-gray-200">
                <span className="font-medium text-gray-900">{"옵션명"}</span>
                <div className="font-bold text-gray-500">{`${(135000).toLocaleString()}원 / ${3}개`}</div>
              </div>
              <div className="space-y-1 p-3 rounded-md body-1 bg-gray-200">
                <span className="font-medium text-gray-900">{"옵션명"}</span>
                <div className="font-bold text-gray-500">{`${(135000).toLocaleString()}원 / ${3}개`}</div>
              </div>
              <div className="space-y-1 p-3 rounded-md body-1 bg-gray-200">
                <span className="font-medium text-gray-900">{"옵션명"}</span>
                <div className="font-bold text-gray-500">{`${(135000).toLocaleString()}원 / ${3}개`}</div>
              </div>
              <div className="space-y-1 p-3 rounded-md body-1 bg-gray-200">
                <span className="font-medium text-gray-900">{"옵션명"}</span>
                <div className="font-bold text-gray-500">{`${(135000).toLocaleString()}원 / ${3}개`}</div>
              </div>
              <div className="space-y-1 p-3 rounded-md body-1 bg-gray-200">
                <span className="font-medium text-gray-900">{"옵션명"}</span>
                <div className="font-bold text-gray-500">{`${(135000).toLocaleString()}원 / ${3}개`}</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="body-1 font-bold text-gray-900">{"금액"}</h3>
            <hr className="border-gray-400" />
            <div className="space-y-1">
              <div className="flex justify-between body-2 font-medium text-gray-500">
                <div className="w-14">{"상품금액"}</div>
                <span className="caption-1 font-bold text-gray-900">
                  {"270,000원"}
                </span>
              </div>
              <div className="flex justify-between body-2 font-medium text-gray-500">
                <div className="w-14">{"잔여회비"}</div>
                <span className="caption-1 font-bold text-gray-900">
                  {"970,000원"}
                </span>
              </div>
              <hr className="border-gray-700" />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="h4 font-bold text-gray-900">{"총 6개"}</span>
            <h4 className="font-poppins h2 font-bold text-brand-orange">
              {"270,000원"}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
}
