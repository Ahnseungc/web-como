import { cn } from "@/lib/utils";
import BackButton from "@/components/dashboard/common/BackButton";
import { Pin } from "@/assets/icons/info";

const announcement = [
  {
    name: "제목",
    content:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
  },
  {
    name: "작성자",
    content: "운영장",
  },
  {
    name: "작성일자",
    content: "2024-08-05",
  },
  {
    name: "조회수",
    content: "34",
  },
];

export default function ClubAnnouncementDetailPage() {
  const isPinned = true;
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <div className="flex items-start justify-between">
          <h2 className="mb-6 font-semibold text-gray-900">{"공지사항"}</h2>
          {isPinned ? (
            <button className="py-1 px-4 rounded border border-gray-800 body-1 font-medium text-gray-800 bg-gray-0">
              {"고정 해제"}
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="py-1 px-4 rounded body-1 font-medium text-gray-50 bg-gray-800">
                {"고정"}
              </button>
              <button className="py-1 px-4 rounded border border-point-red body-1 font-medium text-point-red bg-gray-0">
                {"삭제"}
              </button>
            </div>
          )}
        </div>
        <div>
          <ul>
            {announcement.map((item, i) => (
              <li
                key={item.name}
                className={cn(
                  "flex border-gray-400",
                  i === 0 ? "border-y" : "border-b"
                )}
              >
                <div className="w-28 py-3 px-6 body-1 font-bold text-gray-900 bg-gray-200">
                  {item.name}
                </div>
                <div className="flex items-center py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
                  {i === 0 && isPinned ? (
                    <>
                      <div className="mr-2 px-1">
                        <Pin />
                      </div>
                      <p className="truncate">{item.content}</p>
                    </>
                  ) : (
                    item.content
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="py-8 px-6 border-b-2 border-gray-500">
          <p className="body-1 font-medium text-gray-800">{`올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. 올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. 올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. `}</p>
        </div>
      </div>
    </>
  );
}
