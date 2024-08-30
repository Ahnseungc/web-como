import BackButton from "@/components/dashboard/common/BackButton";
import AnnouncementDetailContent from "@/components/dashboard/shared/organisms/AnnouncementDetailContent";

export default function ClubAnnouncementDetailPage() {
  return (
    <>
      <BackButton />
      <AnnouncementDetailContent isEditable />
    </>
  );
}
