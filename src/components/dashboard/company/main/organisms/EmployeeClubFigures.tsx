import EmployeeShortcut from "@/components/dashboard/company/main/molecules/EmployeeShortcut";
import ClubFigures from "@/components/dashboard/company/main/molecules/ClubFigures";
import DownloadShortcut from "@/components/dashboard/company/main/molecules/DownloadShortcut";

export default function EmployeeClubFigures() {
  return (
    <div className="flex gap-3">
      <EmployeeShortcut />
      <ClubFigures />
      <DownloadShortcut />
    </div>
  );
}
