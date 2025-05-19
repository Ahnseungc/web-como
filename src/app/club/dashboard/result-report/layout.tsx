import BackButton from "@/components/dashboard/common/BackButton";

const ResultReportLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <BackButton />
      {children}
    </>
  );
};

export default ResultReportLayout;
