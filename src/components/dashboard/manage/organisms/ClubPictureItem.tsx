import Avatar from "@/components/common/Avatar";
import { ClubPicture } from "../templates/ClubPicture";

interface Props {
  item: ClubPicture;
}

export default function ClubPictureItem({ item }: Props) {
  return (
    <div className="space-y-6 p-8 rounded-2xl bg-gray-0">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Avatar size="w-[60px] h-[60px]" />
          <div className="flex flex-col">
            <span className="h4 font-bold text-gray-900">{item.name}</span>
            <div className="space-x-2 body-1 font-medium text-gray-500">
              <span>{item.department}</span>
              <span>{item.date}</span>
            </div>
          </div>
        </div>
        <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800">
          {"삭제"}
        </button>
      </div>
      <p className="h3 font-medium text-gray-900">{item.content}</p>
      <div className="flex gap-4 flex-nowrap w-[75vw] pb-4 overflow-x-scroll">
        {Array.from({ length: 8 }).map((picture, i) => (
          <div key={i} className="min-w-96 min-h-96 bg-gray-300" />
        ))}
      </div>
    </div>
  );
}
