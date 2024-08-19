import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import SupplyDetail from "@/components/dashboard/club/supply/organisms/SupplyDetail";

export default function Page() {
  return (
    <>
      <BackButton />
      <div className="p-6 rounded-xl border border-point-red h3 font-bold text-point-red bg-gray-0">
        {
          "해당 비품은 현재 폐기 상태로 등록되어 있습니다. 폐기 경위는 하단의 폐기 사유에서 확인해 주세요."
        }
      </div>
      <div className="flex gap-3">
        <ClubInfoCard />
        <SupplyDetail />
      </div>
    </>
  );
}
