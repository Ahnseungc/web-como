import Chip from "@/components/common/Chip";
import ClubProfileInfo from "@/components/dashboard/common/ClubProfileInfo";

export default function ClubInfo() {
  return (
    <div className="flex items-center gap-5 p-8 rounded-xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"동호회명"}</h2>
      <Chip content="운영 중" orange />
      <span>{"#카테고리"}</span>
      <ClubProfileInfo />
    </div>
  );
}
