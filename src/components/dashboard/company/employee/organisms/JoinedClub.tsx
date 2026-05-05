import ClubCard from "@/components/dashboard/company/employee/molecules/ClubCard";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/lib/client-utils";

export default function JoinedClub({ memberId }: { memberId: string }) {
  const { data: clubs = [] } = useQuery({
    queryKey: ["member", memberId, "clubs"],
    queryFn: () => getData(`v1/club/my`).then((res) => res.data ?? []),
    enabled: !!memberId,
  });

  console.log(clubs);

  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h2 font-bold text-gray-900">가입한 동호회</h3>
      <ul className="flex flex-wrap gap-5">
        {clubs.length === 0 ? (
          <p className="text-lg text-gray-500">가입 중인 동호회가 없습니다.</p>
        ) : (
          clubs.map((club: any) => <ClubCard key={club.id} club={club} />)
        )}
      </ul>
    </div>
  );
}
