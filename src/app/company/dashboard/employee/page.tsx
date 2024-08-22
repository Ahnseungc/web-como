import EmployeeTitle from "@/components/dashboard/company/employee/molecules/EmployeeTitle";
import EmployeeShortcut from "@/components/dashboard/company/main/molecules/EmployeeShortcut";
import ClubFigures from "@/components/dashboard/company/main/molecules/ClubFigures";
import DownloadFigure from "@/components/dashboard/company/main/molecules/DownloadFigure";
import EmployeeView from "@/components/dashboard/company/employee/templates/EmployeeView";
import AddNewEmployeeModal from "@/components/dashboard/company/employee/modals/AddNewEmployeeModal";

export default function Page() {
  return (
    <>
      <EmployeeTitle />
      <div className="flex gap-3">
        <EmployeeShortcut />
        <ClubFigures />
        <DownloadFigure />
      </div>
      <EmployeeView />
      <div className="m-0">
        <AddNewEmployeeModal />
      </div>
    </>
  );
}
