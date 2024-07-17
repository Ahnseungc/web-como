import Image from "next/image";
import Avatar from "@/components/common/Avatar";
import Chip from "@/components/common/Chip";
import ProfileIcon from "@/assets/icons/itemOverview/profile.svg";
import CalendarIcon from "@/assets/icons/itemOverview/calendar.svg";
import MarkerIcon from "@/assets/icons/itemOverview/marker.svg";
import PeopleIcon from "@/assets/icons/itemOverview/people.svg";
import CategoryIcon from "@/assets/icons/itemOverview/category.svg";
import RoleIcon from "@/assets/icons/itemOverview/role.svg";
import ChevronRightIcon from "@/assets/icons/itemOverview/chevron_right.svg";

export default function ItemDetailOverview() {
  const image = null;

  return (
    <div className="flex gap-8 p-8 rounded-xl bg-gray-0">
      <div className="min-w-[460px] min-h-[460px] rounded-xl bg-gray-300 object-cover">
        {image && <Image src={image} alt="대표 이미지" fill sizes="40vw" />}
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <Chip content="카테고리" primary />
          <h2 className="mt-2 font-semibold text-gray-900 whitespace-pre-line">
            {`이드커피, 몰입이 될 수밖에 없는 동굴 속 도서관 [SQNC 052]`}
          </h2>
          <div className="flex gap-2 mt-3">
            <span className="h2 font-extrabold text-point-red">{"7%"}</span>
            <span className="h2 font-extrabold text-gray-900">{`${(30000).toLocaleString()}원~`}</span>
            <span className="h3 font-normal text-gray-500">{"/인"}</span>
          </div>
          <div className="flex gap-10 mt-8">
            <div className="space-y-1">
              <div className="flex gap-1">
                <Image src={ProfileIcon} alt="날짜" width={16} height={16} />
                {"OMO전용 호스트"}
              </div>
              <div className="flex gap-1">
                <Image src={CalendarIcon} alt="날짜" width={16} height={16} />
                {"5/1부터"}
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex gap-1">
                <Image src={MarkerIcon} alt="위치" width={16} height={16} />
                {"서울시 구로구"}
              </div>
              <div className="flex gap-1">
                <Image src={PeopleIcon} alt="인원" width={16} height={16} />
                {"최대 30명"}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="w-full pb-2 border-b border-gray-200 h4 font-bold text-gray-900">
            {"호스트의 다른 상품 보기"}
          </div>
          <div className="flex items-center gap-2 w-fit py-8 pr-4 cursor-pointer select-none">
            <Avatar size="w-[56px] h-[56px]" />
            <div>
              <div className="flex h4 font-bold text-gray-900">
                {"호스트명"}
                <Image
                  src={ChevronRightIcon}
                  alt="▶︎"
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex gap-1 mt-[3px] caption-1 font-medium text-gray-500">
                <div className="flex">
                  <Image
                    src={CategoryIcon}
                    alt="카테고리"
                    width={14}
                    height={14}
                  />
                  {"카테고리"}
                </div>
                <div className="flex">
                  <Image src={RoleIcon} alt="역할" width={14} height={14} />
                  {"역할"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
