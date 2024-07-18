import BackButton from "@/components/dashboard/common/BackButton";
import ClubInfoCard from "@/components/dashboard/expanse/molecules/ClubInfoCard";

export default function NewExpanseReportPage() {
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <h2 className="h3 font-bold text-gray-800">{"활동비 지급 신청"}</h2>
      </div>
      <div className="flex gap-3">
        <ClubInfoCard />
      </div>
    </>
  );
}
