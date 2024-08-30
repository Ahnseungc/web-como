import BackButton from "@/components/dashboard/common/BackButton";
import AnnouncementDetailContent from "@/components/dashboard/shared/organisms/AnnouncementDetailContent";

export default function Page() {
  return (
    <>
      <BackButton />
      <AnnouncementDetailContent isEditable />
    </>
  );
}
