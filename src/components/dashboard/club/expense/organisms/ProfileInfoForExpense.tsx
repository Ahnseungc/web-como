import { Calendar, People } from "@/assets/icons/info";

export default function ProfileInfoForExpense({
  activityPlan,
  memberCount,
}: {
  activityPlan: string;
  memberCount: number;
}) {
  return (
    <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
      <div className="flex items-center gap-0.5">
        <People className="w-5 h-5 text-gray-500" />
        {memberCount}
      </div>
      <div className="flex items-center gap-0.5">
        <Calendar className="w-[18px] h-[18px] text-gray-500" />
        {activityPlan}
      </div>
    </div>
  );
}
