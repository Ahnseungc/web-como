import Image from "next/image";
import EditIcon from "@/assets/icons/edit.svg";
import Input from "@/components/common/Input";

const image = null;

export default function ClubInfoTab() {
  return (
    <form className="flex gap-3">
      <div className="space-y-6">
        <div className="space-y-6 p-5 rounded-xl bg-gray-0">
          <div className="flex items-center justify-between">
            <h3 className="h2 font-bold text-gray-900">{"대표 이미지"}</h3>
            <Image
              src={EditIcon}
              alt="편집"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div className="w-[350px] h-[342px] rounded-lg bg-gray-300">
            {image && (
              <Image
                src={image}
                alt="대표 이미지"
                fill
                priority
                sizes="(max-width: 800px) 50vw, (max-width: 1000px) 40vw, (max-width: 1500px) 33vw, 20vw"
                className="rounded-lg"
              />
            )}
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-4 rounded-md text-center h3 font-bold text-gray-50 bg-gray-900"
        >
          {"저장하기"}
        </button>
      </div>
      <div className="space-y-3 w-full">
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"기본 정보"}</h3>
          <Input
            name="companyName"
            label="소속 기업명"
            type="text"
            value="코모컴퍼니"
            readonly
          />
          <Input
            name="clubName"
            label="동호회명"
            type="text"
            placeholder="예) 에너제틱 산악 동호회"
          />
          <Input name="category" label="카테고리" type="text" />
          <Input
            name="purpose"
            label="설립 목적"
            type="text"
            placeholder="예) 임직원 단합을 위한 건강한 산악 모임"
          />
          <Input name="overview" label="한줄 소개" type="text" maxChar={18} />
          <Input
            name="description"
            label="상세 소개"
            type="text"
            maxChar={300}
          />
        </div>
        <div className="flex flex-col gap-6 p-8 rounded-xl bg-gray-0">
          <h3 className="h2 font-bold text-gray-900">{"활동 정보"}</h3>
        </div>
      </div>
    </form>
  );
}
