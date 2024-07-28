import AnnouncementOverview from "@/components/dashboard/club/announcement/organisms/AnnouncementOverview";
import AnnouncementSearch from "@/components/dashboard/club/announcement/organisms/AnnouncementSearch";
import AnnouncementList from "@/components/dashboard/club/announcement/organisms/AnnouncementList";

export default function AnnouncementPage() {
  return (
    <>
      <AnnouncementOverview />
      <AnnouncementSearch />
      <AnnouncementList />
    </>
  );
}
