import Image from "next/image";
import { cn } from "@/lib/utils";
import ClubProfileInfo from "@/components/dashboard/club/common/ClubProfileInfo";
import { getClubId } from "@/lib/cookies";
import { getData } from "@/api/action";

interface Props {
  padding?: string;
}

export default async function ClubInfoCard({ padding }: Props) {
  const clubId = await getClubId();
  const { data } = await getData(`v1/executive/club/${clubId}/card`, false);

  return (
    <div
      className={cn("h-fit rounded-xl bg-gray-0", padding ? padding : "p-5")}
    >
      <div className="relative w-[350px] h-[350px] mb-6 rounded-lg object-cover bg-gray-300">
        <Image
          src={data.clubImage}
          alt="동호회 이미지"
          fill
          sizes="30vw"
          priority
          className="rounded-lg"
        />
      </div>
      <div className="space-y-4">
        <div className="flex items-end gap-2 ">
          <h3 className="h2 font-bold text-gray-900 max-w-[300px] truncate ">
            {data.clubName}
          </h3>
          {/* <span className="body-1 font-medium text-point-blue">{"활동중"}</span> */}
        </div>
        {/* <div className="flex flex-col body-1 font-medium text-gray-600">
          <span className="font-bold text-gray-700">{"최근 활동"}</span>
          <span>{"2024.05.26 (일) 15시"}</span>
          <span>{"서울시 동대문구 경희대학교 수영장"}</span>
        </div> */}

        <div className="body-1 font-medium text-gray-500">
          <ClubProfileInfo
            createdAt={data.createdAt}
            memberCount={data.memberCount}
            activityPlan={data.activityPlan}
          />
          <span>{`회장_${data.headName}  ${data.deputyName === "" ? "" : ` / 부회장_${data.deputyName}`} ${data.affairsName === "" ? "" : ` / 총무_${data.affairsName}`} `}</span>
        </div>
      </div>
    </div>
  );
}
