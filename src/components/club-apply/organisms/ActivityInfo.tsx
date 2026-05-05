import ClubApplyGeo from "./ClubApplyGeo";
import ClubApplySchedule from "./ClubApplySchedule";

export default function ActivityInfo() {
  return (
    <div className="space-y-12">
      <div>
        <h3 className="text-[20px] font-bold text-gray-900">
          사내동호회 활동 정보
        </h3>
        <p className="text-[16px] text-gray-400 mt-2 font-medium">
          사내동호회를 어떻게 운영할 계획인지 작성해주세요.
        </p>
      </div>

      <div className="border-b border-gray-100">
        <ClubApplyGeo type="EDIT" />
        <ClubApplySchedule />
      </div>
    </div>
  );
}
