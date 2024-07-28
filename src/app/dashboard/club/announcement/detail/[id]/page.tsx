import { cn } from "@/lib/utils";
import BackButton from "@/components/dashboard/club/common/BackButton";

const announcement = [
  {
    name: "제목",
    content:
      "임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가임직원들의 원활한 교류와 소통 그리고 커뮤니케이션을 통한 영업이익의 증가",
  },
  {
    name: "부서",
    content: "주무부서",
  },
  {
    name: "작성일자",
    content: "20240704 12:33:57",
  },
  {
    name: "첨부파일",
    content: "파일명.pdf",
  },
];

export default function AnnouncementDetailPage() {
  return (
    <>
      <BackButton />
      <div className="p-8 rounded-xl bg-gray-0">
        <h2 className="mb-6 font-semibold text-gray-900">{"공지사항"}</h2>
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
                <div className="py-3 px-6 body-1 font-medium text-gray-800 bg-gray-0 truncate">
                  {item.content}
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="py-8 px-6 border-b-2 border-gray-500">
          <p className="body-1 font-medium text-gray-700">{`올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. 올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. 올해 첫 중증열성혈소판감소증후군(Severe Fever with Thrombocytopenia Syndrome, 이하 SFTS) 환자가 경북 상주에서 발생한 가운데 농작업과 야외활동 때 각별한 주의가 요구된다.경북도에 따르면 상주에 거주하는 60대 여성 A씨는 4월초순 과수원에서 농작업을 했고, 16일 식욕부진으로 인근 병원에서 진료받았지만 이후에도 발열 증상이 있어 19일 도내 의료기관에 입원했다. `}</p>
        </div>
      </div>
    </>
  );
}
