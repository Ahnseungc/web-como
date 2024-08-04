import EmployeeShortcut from "@/components/dashboard/company/main/molecules/EmployeeShortcut";
import ClubFigures from "@/components/dashboard/company/main/molecules/ClubFigures";
import DownloadFigure from "@/components/dashboard/company/main/molecules/DownloadFigure";

export default function EmployeeClubFigures() {
  return (
    <div className="flex gap-3">
      <EmployeeShortcut />
      <ClubFigures />
      <DownloadFigure />
    </div>
  );
}
