import AnnouncementTable from "@/components/dashboard/shared/molecules/AnnouncementTable";

export default function Announcement() {
  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <h2 className="mb-6 font-bold text-gray-900">{"omo 공지사항"}</h2>
      <div className="flex-1 mt-2.5">데이터가 없습니다.</div>
      {/* <AnnouncementTable number={5} /> */}
    </div>
  );
}
