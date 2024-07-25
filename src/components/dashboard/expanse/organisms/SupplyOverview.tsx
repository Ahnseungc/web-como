import { Info } from "@/assets/icons/info";

export default function SupplyOverview() {
  return (
    <div className="space-y-2 p-8 rounded-xl bg-gray-0">
      <div className="flex items-center gap-2">
        <h2 className="h1 font-bold text-gray-900">{"비품관리"}</h2>
        <Info className="w-6 h-6 text-gray-400" />
      </div>
      <div className="flex items-end justify-between">
        <p className="h4 font-medium text-gray-900">{`비품을 대여하기 위해서는 비품 신청서를 작성해주셔야 합니다.\n작성이 완료되면 담당 주무부서에게 전달되어 비품대여 및 반납을 할 수 있게됩니다.`}</p>
        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900">
          {"비품구매 규정 안내서 다운받기"}
        </button>
      </div>
    </div>
  );
}
