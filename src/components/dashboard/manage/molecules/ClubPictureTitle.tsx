import Image from "next/image";
import Chip from "@/components/common/Chip";
import PeopleIcon from "@/assets/icons/club/people.svg";
import CalendarIcon from "@/assets/icons/club/calendar.svg";

export default function ClubPictureTitle() {
  return (
    <div className="flex items-center gap-3 p-[38px] rounded-2xl bg-gray-0">
      <h2 className="font-semibold text-gray-900">{"동호회명"}</h2>
      <Chip content="카테고리" />
      <div className="flex gap-2 body-1 font-medium text-gray-500">
        <span>{`개설일자 ${"2024.05.03"}`}</span>
        <div className="flex items-center gap-0.5">
          <Image src={PeopleIcon} alt="인원" width={20} height={20} />
          <span>{"23"}</span>
        </div>
        <div className="flex items-center gap-0.5">
          <Image src={CalendarIcon} alt="인원" width={18} height={18} />
          <span>{`주 ${1}회`}</span>
        </div>
      </div>
    </div>
  );
}
