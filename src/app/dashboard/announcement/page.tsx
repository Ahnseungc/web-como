import AnnouncementOverview from "@/components/dashboard/announcement/organisms/AnnouncementOverview";
import AnnouncementSearch from "@/components/dashboard/announcement/organisms/AnnouncementSearch";
import AnnouncementList from "@/components/dashboard/announcement/organisms/AnnouncementList";

export default function AnnouncementPage() {
  return (
    <>
      <AnnouncementOverview />
      <AnnouncementSearch />
      <AnnouncementList />
    </>
  );
}
