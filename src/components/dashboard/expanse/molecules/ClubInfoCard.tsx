import Image from "next/image";
import PeopleIcon from "@/assets/icons/people.svg";
import CalendarIcon from "@/assets/icons/calendar.svg";

export default function ClubInfoCard() {
  const image = null;
  return (
    <div className="p-5 rounded-xl bg-gray-0">
      <div className="relative w-[350px] h-[350px] mb-6 rounded-lg object-cover bg-gray-300">
        {image && (
          <Image
            src={image}
            alt="동호회 이미지"
            fill
            sizes="30vw"
            priority
            className="rounded-lg"
          />
        )}
      </div>
      <div className="space-y-4">
        <div className="flex items-end gap-2">
          <h3 className="h2 font-bold text-gray-900">{"동호회명"}</h3>
          <span className="body-1 font-medium text-point-blue">{"활동중"}</span>
        </div>
        <div className="flex flex-col body-1 font-medium text-gray-600">
          <span className="font-bold text-gray-700">{"최근 활동"}</span>
          <span>{"2024.05.26 (일) 15시"}</span>
          <span>{"서울시 동대문구 경희대학교 수영장"}</span>
        </div>
        <hr />
        <div className="body-1 font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <span>{"개설일자 2024.05.03"}</span>
            <div className="flex items-center gap-0.5">
              <Image src={PeopleIcon} alt="인원" width={20} height={20} />
              {"23"}
            </div>
            <div className="flex items-center gap-0.5">
              <Image src={CalendarIcon} alt="횟수" width={18} height={18} />
              {"주 1회"}
            </div>
          </div>
          <span>{"회장_김오모 / 부회장_박오모 / 총무_문오모 "}</span>
        </div>
      </div>
    </div>
  );
}
