export default async function ScheduleDetailPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>{params.id} 일정 상세 페이지</div>;
}
