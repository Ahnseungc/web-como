import ClubInfoCard from "@/components/dashboard/club/common/ClubInfoCard";
import ResultReportFormProvider from "@/components/dashboard/club/result-report/organisms/ResultReportFormProvider";

const ResultReportPage = async () => {
  return (
    <main className="flex gap-3 justify-center">
      <ClubInfoCard />
      <ResultReportFormProvider />
    </main>
  );
};

export default ResultReportPage;
