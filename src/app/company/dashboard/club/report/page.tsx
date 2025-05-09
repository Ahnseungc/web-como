import ReportOverview from "@/components/dashboard/company/club/molecules/ReportOverview";
import ReportView from "@/components/dashboard/company/club/templates/ReportView";
import Image from "next/image";

export default function Page() {
  return (
    <>
      <div className="bg-gray-0 rounded-[16px] py-[38px] px-[32px] flex flex-col gap-[8px]">
        <div className="flex items-center gap-[8px]">
          <span className="text-[#292726] font-[700] text-[28px]">
            활동보고서 기능 안내
          </span>
          <Image src={"/caution.png"} alt="caution" width={24} height={24} />
        </div>
        <span className="font-suit font-[500] text-[18px]">
          동호회 활동 보고서 기능은 05/09 14:00 부터 사용 가능합니다.
        </span>
      </div>
      <ReportOverview />
      <ReportView />
    </>
  );
}
