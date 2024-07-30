import AnnouncementTable from "@/components/dashboard/shared/molecules/AnnouncementTable";

export default function Announcement() {
  return (
    <div className="p-8 rounded-xl bg-gray-0">
      <h2 className="mb-6 font-bold text-gray-900">{"omo 공지사항"}</h2>
      <AnnouncementTable number={5} />
    </div>
  );
}
