import ClubCard from "@/components/dashboard/company/employee/molecules/ClubCard";

export default function JoinedClub() {
  return (
    <div className="space-y-6 p-8 rounded-xl bg-gray-0">
      <h3 className="h2 font-bold text-gray-900">{"가입한 동호회"}</h3>
      <ul className="flex gap-3">
        {[1, 2, 3].map((club) => (
          <ClubCard key={club} />
        ))}
      </ul>
    </div>
  );
}
