import Image from "next/image";
import Chip from "@/components/common/Chip";

export default function PurchaseDetail() {
  const image = null;

  return (
    <div className="flex-1 space-y-6 p-8 rounded-xl bg-gray-0">
      <div className="flex gap-8">
        <div className="min-w-[200px] min-h-[200px] rounded-xl bg-gray-300 object-cover">
          {image && <Image src={image} alt="대표 이미지" fill sizes="40vw" />}
        </div>
        <div className="flex flex-col justify-between py-3">
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
      <div className="space-y-6">
        <div className="space-y-3">
          <h4 className="font-bold text-gray-900">{"결제정보"}</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-3 body-1 font-medium text-gray-900">
              <span className="font-bold text-gray-500">{"신청 동호회"}</span>
              {"동호회 이름"}
            </div>
            <div className="flex items-center gap-3 body-1 font-medium text-gray-900">
              <span className="font-bold text-gray-500">{"진행장소"}</span>
              {"강원도 양양군 하조대"}
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h4 className="font-bold text-gray-900">{"옵션"}</h4>
          <div className="space-y-2">
            <div className="space-y-1 p-3 rounded-md body-1 bg-gray-200">
              <span className="font-medium text-gray-900">{"옵션명"}</span>
              <div className="font-bold text-gray-500">{`${(135000).toLocaleString()}원 / ${3}개`}</div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-gray-400" />
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <h4 className="font-bold text-gray-900">{"결제수단"}</h4>
          <p className="body-2 font-medium text-gray-500">
            {
              "코모 포인트는 각 동호회에게 충전된 동호회비 입니다. 충전 문의는 당사 주무부서에 문의해주세요."
            }
          </p>
        </div>
        <button className="w-[200px] py-3.5 rounded h4 font-semibold text-gray-400 bg-gray-200">
          {"코모 포인트"}
        </button>
      </div>
      <hr className="border-gray-400" />
      <div className="space-y-3">
        <h4 className="font-bold text-gray-900">{"현재 잔여 회비"}</h4>
        <div className="flex items-center gap-6">
          <div className="h1 font-extrabold text-brand-orange">{`${(1000000).toLocaleString()}원`}</div>
          <div className="flex items-center gap-2 body-1 font-bold text-gray-900">
            <span className="text-gray-500">{"사용 후 잔여 회비"}</span>
            {"9,730,000원"}
          </div>
        </div>
      </div>
    </div>
  );
}
