import ClubActivityInfo from "../molecules/ClubActivityInfo";
import ClubBasicInfo from "../molecules/ClubBasicInfo";

interface ClubIndexInfoSectionProps {
  clubId: string | null;
}

export default function ClubIndexInfoSection({
  clubId,
}: ClubIndexInfoSectionProps) {
  return (
    <section className="flex w-full flex-col gap-15">
      {/* 기본 정보 */}
      <ClubBasicInfo clubId={clubId} />
      {/* 활동 정보 */}
      <ClubActivityInfo clubId={clubId} />
    </section>
  );
}
