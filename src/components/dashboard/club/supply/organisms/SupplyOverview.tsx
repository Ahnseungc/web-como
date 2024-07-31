import { Info } from "@/assets/icons/info";

export default function SupplyOverview() {
  return (
    <div className="space-y-2 p-8 rounded-xl bg-gray-0">
      <div className="flex items-center gap-2">
        <h2 className="h1 font-bold text-gray-900">{"비품관리대장"}</h2>
        <Info className="w-6 h-6 text-gray-400" />
      </div>
      <div className="flex items-end justify-between">
        <p className="h4 font-medium text-gray-900">{`품의서 작성을 통해 지급받은 비품의 소유권 및 관리의 책임은 동호회에게 귀속됩니다.\n비품관리대장에서는 비품들의 현황을 기록하고 살펴볼 수 있습니다.`}</p>
        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-900">
          {"비품 관련 안내서 다운받기"}
        </button>
      </div>
    </div>
  );
}
