import Chip from "@/components/common/Chip";
import ClubProfileInfo from "@/components/dashboard/club/common/ClubProfileInfo";

export default function ClubTitle() {
  return (
    <div className="flex items-center gap-3 p-[38px] rounded-2xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"동호회명"}</h2>
      <Chip content="카테고리" primary />
      <ClubProfileInfo />
    </div>
  );
}
