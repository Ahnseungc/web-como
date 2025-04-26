"use client";

import { useParams } from "next/navigation";
import BackButton from "@/components/dashboard/common/BackButton";
import EmployeeInfo from "@/components/dashboard/company/club/molecules/EmployeeInfo";
import JoinedClub from "@/components/dashboard/company/employee/organisms/JoinedClub";
import OmoHistoryList from "@/components/dashboard/company/employee/organisms/OmoHistoryList";
import ClubInfoModal from "@/components/dashboard/company/employee/modals/ClubInfoModal";

export default function Page() {
  const params = useParams();
  const memberId = params.id as string;

  return (
    <>
      <BackButton />
      <EmployeeInfo memberId={memberId} />
      <JoinedClub memberId={memberId} />
      {/* <OmoHistoryList /> */}
      <div className="m-0">
        <ClubInfoModal />
      </div>
    </>
  );
}
