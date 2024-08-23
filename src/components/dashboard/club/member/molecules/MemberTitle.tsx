import { getClubName } from "@/lib/cookies";

export default async function MemberTitle() {
  const clubName = await getClubName();

  return (
    <div className="space-y-2 p-8 rounded-xl bg-gray-0">
      <h2 className="h1 font-bold text-brand-orange">{"동호회원 신청 관리"}</h2>
      <p className="h4 font-medium text-gray-900">
        {`${clubName}에 새롭게 가입 신청한 임직원들을 조회하고 관리합니다.`}
      </p>
    </div>
  );
}
