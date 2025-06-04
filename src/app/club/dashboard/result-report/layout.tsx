import BackButton from "@/components/dashboard/common/BackButton";

const ResultReportLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <main className="flex flex-col gap-3 w-full p-8">
      <BackButton />
      {children}
    </main>
  );
};

export default ResultReportLayout;
