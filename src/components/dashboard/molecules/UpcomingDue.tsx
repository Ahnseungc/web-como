import { cn } from "@/lib/utils";

const DaysOfWeek = () => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  return (
    <div className="flex">
      {days.map((day, i) => (
        <div
          key={day}
          className={cn(
            "w-12 py-3.5 text-center caption-1 font-medium",
            i === 0 ? "text-point-red" : "text-gray-900"
          )}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

interface DatesProps {
  eventDates: number[];
}

const Dates = ({ eventDates }: DatesProps) => {
  const now = new Date();
  const dayOfWeek = now.getDay(); // 0 (Sunday) to 6 (Saturday)
  const startOfWeek = new Date(now); // Copy current date
  startOfWeek.setDate(now.getDate() - dayOfWeek); // Set to the previous Sunday

  const weekDates = [];
  for (let i = 0; i < 7; i++) {
    const currentDay = new Date(startOfWeek);
    currentDay.setDate(startOfWeek.getDate() + i); // Add i days to the start of the week
    weekDates.push(currentDay);
  }

  return (
    <div className="flex">
      {weekDates.map((date, i) => (
        <div
          key={date.toDateString()}
          className={cn(
            "w-12 text-center body-2 font-bold",
            i === 0
              ? "text-point-red"
              : i === 6
                ? "text-point-blue"
                : "text-gray-900"
          )}
        >
          {date.getDate()}
          <div className="flex items-center justify-center h-[18px]">
            {eventDates.includes(date.getDate()) && (
              <span className="w-1 h-1 rounded-full bg-brand-orange" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function DashboardUpcomingDue() {
  const now = new Date();
  const eventDates = [now.getDate(), now.getDate() + 2, now.getDate() - 2];

  return (
    <div className="flex flex-col gap-[18px] p-8 rounded-xl bg-gray-0">
      <h3 className="h1 font-bold text-brand-black">{"다가오는 마감"}</h3>
      <div className="space-y-3">
        <DaysOfWeek />
        <Dates eventDates={eventDates} />
      </div>
      <div className="space-y-1">
        <div className="space-x-2 h3 font-bold">
          <span className="text-brand-orange">{"일정 모집 마감"}</span>
          <span className="text-gray-900">{"~8/12(금)18시"}</span>
        </div>
        <div className="h3 font-medium text-gray-600">
          {"동호회 관리비 제출 및 등등"}
        </div>
      </div>
    </div>
  );
}
