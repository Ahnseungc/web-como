import EmployeeInfo from "@/components/dashboard/company/club/molecules/EmployeeInfo";
import AttendanceList from "@/components/dashboard/company/club/organisms/AttendanceList";
import { useParams } from "next/navigation";

export default function ClubDetailAttendanceDetailTabView() {
  const params = useParams();
  const memberId = params.id as string;
  return (
    <>
      <EmployeeInfo
        memberId={memberId}
      />
      <AttendanceList />
    </>
  );
}
