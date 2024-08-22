import { Calendar, Category, People } from "@/assets/icons/info";

export default function ClubProfileInfo() {
  return (
    <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
      <span>{"개설일자 2024.05.03"}</span>
      <div className="flex items-center gap-0.5">
        <People className="w-5 h-5 text-gray-500" />
        {"23"}
      </div>
      <div className="flex items-center gap-0.5">
        <Calendar className="w-[18px] h-[18px] text-gray-500" />
        {"주 1회"}
      </div>
    </div>
  );
}

export  function ClubProfileCategoryInfo() {
  return (
    <div className="flex items-center gap-2 body-1 font-medium text-gray-500">
      <div className="flex items-center gap-0.5">
        <People className="w-4 h-4 text-gray-500" />
        {"23"}
      </div>
      <div className="flex items-center gap-0.5">
        <Category className="w-4 h-4 text-gray-500" />
        {"카테고리"}
      </div>
      <div className="flex items-center gap-0.5">
        <Calendar className="w-4 h-4 text-gray-500" />
        {"주 1회"}
      </div>
    </div>
  );
}
