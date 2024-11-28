import Link from "next/link";
import Image from "next/image";
import Avatar from "@/components/common/Avatar";
import Chip from "@/components/common/Chip";
import {
  Calendar,
  Category,
  Marker,
  People,
  Profile,
} from "@/assets/icons/info";
import { ChevronRight } from "@/assets/icons/chevron";
import Thumbnail from "@/assets/images/shop/spain_thumbnail.png";

export default function ItemDetailOverview() {
  const image = Thumbnail;

  return (
    <div className="flex gap-8 p-8 rounded-xl bg-gray-0">
      <div className="min-w-[460px] max-w-[460px] aspect-square rounded-xl bg-gray-300 object-cover">
        {image && (
          <Image
            priority
            src={image}
            alt="대표 이미지"
            width={460}
            height={460}
            className="rounded-xl"
          />
        )}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <Chip content="액티비티" primary />
          <h2 className="mt-2 font-semibold text-gray-900 whitespace-pre-line">
            {`고고에스파냐 - 스페인 바르셀로나 일주일 살기`}
          </h2>
          <div className="flex gap-2 mt-3">
            <span className="h2 font-extrabold text-point-red">{"7%"}</span>
            <span className="h2 font-extrabold text-gray-900">{`${(30000).toLocaleString()}원~`}</span>
            <span className="h3 font-normal text-gray-500">{"/인"}</span>
          </div>
          <div className="flex gap-10 mt-8 body-2 font-medium text-gray-700">
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Profile className="w-4 h-4" />
                {"OMO전용 호스트"}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {"11/28부터"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Marker className="w-4 h-4" />
                {"스페인 바르셀로나"}
              </div>
              <div className="flex items-center gap-1">
                <People className="w-4 h-4" />
                {"최대 30명"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full pb-2 border-b border-gray-200 h4 font-bold text-gray-900">
            {"호스트의 다른 상품 보기"}
          </div>
          <Link href={`../host/${1}`}>
            <div className="flex items-center gap-2 w-fit py-8 pr-4 cursor-pointer select-none">
              <Avatar size="w-[56px] h-[56px]" />
              <div>
                <div className="flex items-center h4 font-bold text-gray-900">
                  {"호스트명"}
                  <ChevronRight className="w-5 h-5" />
                </div>
                <div className="flex items-center mt-[3px] caption-1 font-medium text-gray-500">
                  <Category className="w-3.5 h-3.5" />
                  {"카테고리"}
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
