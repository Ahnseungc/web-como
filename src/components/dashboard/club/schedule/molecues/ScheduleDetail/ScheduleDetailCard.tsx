import Card from "@/components/dashboard/common/Card";
import TitleCard from "../../atoms/TilteCard";
import ScheduleDetailForm from "../../organisms/ScheduleDetailForm";

enum ScheduleDetailCardType {
  REGISTER = "일정 등록",
  DETAIL = "일정 상세 정보",
}

export type ScheduleDetailCardInitialData = {
  title: string;
  detail: string;
  date: string;
  time: string;
  location: string;
};
interface ScheduleDetailCardProps {
  type: keyof typeof ScheduleDetailCardType;
  initialData?: ScheduleDetailCardInitialData;
}
const ScheduleDetailCard = async ({
  type,
  initialData,
}: ScheduleDetailCardProps) => {
  const title = ScheduleDetailCardType[type];
  return (
    <Card>
      <TitleCard title={title} />
      <ScheduleDetailForm type={type} initialData={initialData} />
    </Card>
  );
};

export default ScheduleDetailCard;
