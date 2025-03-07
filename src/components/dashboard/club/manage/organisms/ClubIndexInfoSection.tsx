// 기본 정보와 활동 정보를 융합할 organisms

import ClubActivityInfo from "../molecules/ClubActivityInfo";
import ClubBasicInfo from "../molecules/ClubBasicInfo";

export default function ClubIndexInfoSection() {
  return (
    <section className="flex w-full flex-col gap-15">
      {/* 기본 정보 */}
      <ClubBasicInfo />
      {/* 활동 정보 */}
      <ClubActivityInfo />
    </section>
  );
}
