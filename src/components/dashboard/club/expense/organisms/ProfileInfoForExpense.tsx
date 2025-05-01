import { Calendar, People } from "@/assets/icons/info";
import { formatDate } from "@/lib/utils";

export default function ProfileInfoForExpense({
  activityPlan,
  memberCount,
  createdAt,
}: {
  activityPlan: string;
  memberCount: number;
  createdAt: number[];
}) {
  const formatCreatedAt = (createdAt: number[]) => {
    const [year, month, day] = createdAt;
    return `${year}.${month}.${day}`;
  };
  return (
    <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
      <span>{`개설일자 ${formatCreatedAt(createdAt)}`}</span>
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
