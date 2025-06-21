import Card from "@/components/dashboard/common/Card";
import TitleCard, { ScheduleDetailCardType } from "../../atoms/TilteCard";
import ScheduleDetailForm from "../../organisms/ScheduleDetailForm";

export type ScheduleDetailCardInitialData = {
  title: string;
  detail: string;
  date: string;
  time: string;
  location: string;
  addressDetail: string;
  recruitStartDate: string;
  recruitEndDate: string;
};
interface ScheduleDetailCardProps {
  type: keyof typeof ScheduleDetailCardType;
  scheduleId?: number;
  initialData?: ScheduleDetailCardInitialData;
}
const ScheduleDetailCard = async ({
  type,
  scheduleId,
  initialData,
}: ScheduleDetailCardProps) => {
  return (
    <Card>
      <TitleCard type={type} scheduleId={scheduleId} />
      <ScheduleDetailForm
        type={type}
        initialData={initialData}
        scheduleId={scheduleId}
      />
    </Card>
  );
};

export default ScheduleDetailCard;
