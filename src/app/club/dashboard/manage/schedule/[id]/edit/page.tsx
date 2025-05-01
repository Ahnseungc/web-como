import ScheduleDetailCard from "@/components/dashboard/club/schedule/molecues/ScheduleDetail/ScheduleDetailCard";
import { fetchScheduleData } from "../page";

const EditSchedulePage = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { initialData } = await fetchScheduleData(id, "1");
  return (
    <ScheduleDetailCard
      type="EDIT"
      initialData={initialData}
      scheduleId={Number(id)}
    />
  );
};

export default EditSchedulePage;
