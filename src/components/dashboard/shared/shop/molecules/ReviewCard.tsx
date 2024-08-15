import Avatar from "@/components/common/Avatar";
import StarRating from "@/components/common/StarRating";

export default function ReviewCard() {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Avatar />
        <div className="h4 font-semibold text-gray-900">{"김오모"}</div>
      </div>
      <div className="flex gap-3">
        <div className="flex-1 aspect-square rounded-xl object-cover bg-gray-300"></div>
        <div className="flex-1 aspect-square rounded-xl object-cover bg-gray-300"></div>
        <div className="flex-1 aspect-square rounded-xl object-cover bg-gray-300"></div>
        <div className="flex-1 aspect-square rounded-xl object-cover bg-gray-300"></div>
        <div className="flex-1 aspect-square rounded-xl object-cover bg-gray-300"></div>
      </div>
      <div className="space-y-2">
        <StarRating readonly currentValue={4} size="small" />
        <p className="h4 font-medium text-gray-900">
          {"직원 모두가 너무너무 만족한 활동이었습니다."}
        </p>
        <div className="body-1 font-medium text-gray-600">
          <div>
            {"이드커피, 몰입이 될 수밖에 없는 동굴 속 도서관 [SQNC 052] "}
          </div>
          <div>{"2024-08-12"}</div>
        </div>
      </div>
    </div>
  );
}
