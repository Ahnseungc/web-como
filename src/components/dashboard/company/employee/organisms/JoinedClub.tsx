import ClubCard from "@/components/dashboard/company/employee/molecules/ClubCard";
import { useState, useEffect } from "react";
import { getData } from "@/api/action";

export default function JoinedClub({ memberId }: { memberId: string }) {
  console.log("memberId", memberId);

  const [clubs, setClubs] = useState([]);

  const fetchClubs = async () => {
    try {
      const response = await getData(`v1/manager/member/${memberId}/clubs`); // API 호출
      console.log("response", response);
      setClubs(response.data); // 클럽 데이터 설정
    } catch (error) {
      console.error('클럽 데이터 로딩 오류:', error);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);
  
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h2 font-bold text-gray-900">{"가입한 동호회"}</h3>
      <ul className="flex gap-3">
      {clubs.length === 0 ? (
        <p className="text-lg text-gray-500">가입 중인 동호회가 없습니다.</p>
      ) : (
        clubs.map((club: any) => (
          <ClubCard key={club.id} club={club} />
        ))
      )}
      </ul>
    </div>
  );
}
