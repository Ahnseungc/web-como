import AnnouncementOverview from "@/components/dashboard/club/announcement/organisms/AnnouncementOverview";
import AnnouncementSearch from "@/components/dashboard/club/announcement/molecules/AnnouncementSearch";
import AnnouncementList from "@/components/dashboard/shared/organisms/AnnouncementList";

export default function AnnouncementPage() {
  return (
    <>
      <AnnouncementOverview />
      <AnnouncementSearch />
      <AnnouncementList />
    </>
  );
}
