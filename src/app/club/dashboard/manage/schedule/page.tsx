import { getData } from "@/api/action";
import ScheduleList from "@/components/dashboard/club/schedule/molecues/ScheduleList";
import ScheduleTitle from "@/components/dashboard/club/schedule/molecues/ScheduleTitle";

export default async function ManageSchedulePage({
  searchParams: { page = "1" },
}: {
  searchParams: { page: string };
}) {
  const response = await getData(
    `v1/executive/club/{clubId}/schedules?page=${page}`,
    true
  );
  const SchedulesList = response.data;

  const isExist = await getData(
    `v1/executive/club/{clubId}/schedule/existence`,
    true
  );

  return (
    <>
      <ScheduleTitle />
      <ScheduleList
        schedules={SchedulesList.List}
        currentPage={SchedulesList.currentPage}
        maxPage={SchedulesList.maxPage}
        isExist={isExist.data}
      />
    </>
  );
}
